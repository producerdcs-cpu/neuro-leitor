import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = process.env.SESSION_DIR || path.join(__dirname, "sessions");

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

function sessionPath(id) {
  return path.join(DIR, `${id}.json`);
}

export function createSession() {
  ensureDir();
  const now = new Date().toISOString();
  const session = {
    id: randomUUID(),
    jobs: [],
    corrections: [],
    createdAt: now,
    updatedAt: now,
  };
  fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));
  return session;
}

export function getSession(id) {
  ensureDir();
  const p = sessionPath(id);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

export function saveSession(session) {
  ensureDir();
  session.updatedAt = new Date().toISOString();
  fs.writeFileSync(sessionPath(session.id), JSON.stringify(session, null, 2));
  return session;
}

export function listSessions(limit = 20) {
  ensureDir();
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DIR, f), "utf-8"));
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, limit);
}

export function deleteSession(id) {
  const p = sessionPath(id);
  if (fs.existsSync(p)) fs.unlinkSync(p);
  return true;
}
