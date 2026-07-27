import { Router } from "express";
import multer from "multer";
import { randomUUID } from "crypto";
import { processFile } from "../services/pipeline.js";
import { runCorrection } from "../services/correction.js";
import {
  createSession,
  getSession,
  saveSession,
  listSessions,
  deleteSession,
} from "../store/sessions.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "neuro-leitor-api",
    version: "0.2.0",
    phase: 2,
    providers: {
      ocr: process.env.OCR_PROVIDER || "local",
      asr: process.env.ASR_PROVIDER || "local",
      correction: process.env.CORRECTION_PROVIDER || "local",
    },
    timestamp: new Date().toISOString(),
  });
});

router.post("/sessions", (_req, res) => {
  res.status(201).json(createSession());
});

router.get("/sessions", (_req, res) => {
  res.json({ sessions: listSessions() });
});

router.get("/sessions/:id", (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

router.delete("/sessions/:id", (req, res) => {
  deleteSession(req.params.id);
  res.json({ ok: true });
});

router.post("/process", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo obrigatório (field: file)" });
    }
    let sessionId = req.headers["x-session-id"] || req.body.sessionId;
    let session = sessionId ? getSession(sessionId) : null;
    if (!session) {
      session = createSession();
      sessionId = session.id;
    }
    const jobId = randomUUID();
    const job = {
      id: jobId,
      sessionId,
      filename: req.file.originalname,
      type: "unknown",
      status: "processing",
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    session.jobs.push(job);
    saveSession(session);

    const result = await processFile({
      buffer: req.file.buffer,
      mime: req.file.mimetype,
      filename: req.file.originalname,
      onProgress: (p) => {
        job.progress = p;
        job.updatedAt = new Date().toISOString();
      },
    });

    job.type = result.type;
    job.status = "done";
    job.progress = 100;
    job.result = result.correctedText || result.text;
    job.meta = result.meta;
    job.updatedAt = new Date().toISOString();

    if (result.corrections?.length) {
      session.corrections = [...(session.corrections || []), ...result.corrections];
    }
    saveSession(session);

    res.json({
      sessionId,
      job,
      text: result.text,
      correctedText: result.correctedText,
      corrections: result.corrections,
      meta: result.meta,
    });
  } catch (err) {
    console.error("[process]", err);
    res.status(500).json({ error: err.message || "Processing failed" });
  }
});

router.post("/correct", async (req, res) => {
  try {
    const text = req.body?.text;
    if (typeof text !== "string") {
      return res.status(400).json({ error: "Body { text: string } obrigatório" });
    }
    const result = await runCorrection(text);
    const sessionId = req.headers["x-session-id"] || req.body.sessionId;
    if (sessionId) {
      const session = getSession(sessionId);
      if (session) {
        session.corrections = [...(session.corrections || []), ...result.items];
        saveSession(session);
      }
    }
    res.json(result);
  } catch (err) {
    console.error("[correct]", err);
    res.status(500).json({ error: err.message || "Correction failed" });
  }
});

export default router;
