import express from "express";
import cors from "cors";
import api from "./routes/api.js";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";
const isProd = process.env.NODE_ENV === "production";

// Aceita lista separada por vírgula; em produção exige CORS_ORIGIN configurado
const rawOrigins = process.env.CORS_ORIGIN || "http://localhost:5173";
const allowedOrigins = rawOrigins.split(",").map((s) => s.trim()).filter(Boolean);

const app = express();

app.use(
  cors({
    origin(origin, cb) {
      // Requests sem Origin (curl, health checks, same-origin)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return cb(null, true);
      }
      // Em dev libera qualquer localhost
      if (!isProd && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return cb(null, true);
      }
      cb(new Error(`CORS blocked: ${origin}`));
    },
    exposedHeaders: ["X-Session-Id"],
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "NeuroLeitor API",
    phase: 2,
    version: "0.2.1",
    env: isProd ? "production" : "development",
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
  const status = err.message?.startsWith("CORS") ? 403 : 500;
  res.status(status).json({ error: err.message || "Internal error" });
});

app.listen(PORT, HOST, () => {
  console.log(`\n  🧠 NeuroLeitor API v0.2.1 — Fase 2`);
  console.log(`  → http://${HOST}:${PORT}`);
  console.log(`  → health: http://${HOST}:${PORT}/api/health`);
  console.log(`  → CORS: ${allowedOrigins.join(", ")}\n`);
});
