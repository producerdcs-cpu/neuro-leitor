import express from "express";
import cors from "cors";
import api from "./routes/api.js";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN.split(",").map((s) => s.trim()),
    exposedHeaders: ["X-Session-Id"],
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "NeuroLeitor API",
    phase: 2,
    version: "0.2.0",
    docs: {
      health: "GET /api/health",
      process: "POST /api/process (multipart file)",
      correct: "POST /api/correct { text }",
      sessions: "GET|POST /api/sessions",
    },
  });
});

app.use("/api", api);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal error" });
});

app.listen(PORT, HOST, () => {
  console.log(`\n  🧠 NeuroLeitor API v0.2 — Fase 2`);
  console.log(`  → http://localhost:${PORT}`);
  console.log(`  → health: http://localhost:${PORT}/api/health\n`);
});
