const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type FileType = "pdf" | "image" | "audio" | "text" | "unknown";

export interface ProcessResult {
  sessionId: string;
  job: { id: string; filename: string; type: FileType; status: string; progress: number; result?: string; meta?: Record<string, unknown> };
  text: string;
  correctedText: string;
  corrections: CorrectionItem[];
  meta: Record<string, unknown>;
}

export interface CorrectionItem {
  id: string;
  original: string;
  suggestion: string;
  type: "ocr" | "spelling" | "grammar" | "context";
  confidence: number;
  fixed: boolean;
}

export interface HealthStatus {
  ok: boolean;
  service: string;
  version: string;
  phase: number;
  providers: { ocr: string; asr: string; correction: string };
  timestamp: string;
}

let sessionId: string | null =
  typeof localStorage !== "undefined" ? localStorage.getItem("neuro-session-id") : null;

function headers(extra: Record<string, string> = {}) {
  const h: Record<string, string> = { ...extra };
  if (sessionId) h["X-Session-Id"] = sessionId;
  return h;
}

export async function checkHealth(): Promise<HealthStatus | null> {
  try {
    const res = await fetch(`${API_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function ensureSession(): Promise<string> {
  if (sessionId) {
    try {
      const res = await fetch(`${API_URL}/api/sessions/${sessionId}`);
      if (res.ok) return sessionId;
    } catch {}
  }
  const res = await fetch(`${API_URL}/api/sessions`, { method: "POST" });
  if (!res.ok) throw new Error("Falha ao criar sessão");
  const data = await res.json();
  sessionId = data.id;
  localStorage.setItem("neuro-session-id", data.id);
  return data.id;
}

export async function processFile(file: File): Promise<ProcessResult> {
  await ensureSession();
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/api/process`, { method: "POST", headers: headers(), body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Process failed: ${res.status}`);
  }
  const data: ProcessResult = await res.json();
  if (data.sessionId) {
    sessionId = data.sessionId;
    localStorage.setItem("neuro-session-id", data.sessionId);
  }
  return data;
}

export async function correctText(text: string) {
  await ensureSession().catch(() => null);
  const res = await fetch(`${API_URL}/api/correct`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ text, sessionId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Correction failed");
  }
  return res.json();
}

export function getApiUrl() { return API_URL; }
export function getSessionId() { return sessionId; }
