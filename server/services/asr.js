const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const PROVIDER = process.env.ASR_PROVIDER || "local";

export async function runASR(buffer, mime = "audio/mpeg", filename = "audio") {
  if (PROVIDER === "openai" && OPENAI_KEY) return asrOpenAI(buffer, mime, filename);
  return asrLocal(buffer, mime, filename);
}

async function asrLocal(buffer, mime, filename) {
  const sizeKb = Math.round(buffer.length / 1024);
  const durationEst = Math.max(1, Math.round(sizeKb / 16));
  return {
    provider: "local-mock",
    text: `Transcrição simulada de ${filename} (${mime}, ~${durationEst}s).\n«Bem-vindo ao NeuroLeitor. O motor bioneural está ativo.»\nConfigure OPENAI_API_KEY + ASR_PROVIDER=openai para Whisper.`,
    confidence: 0.91,
    durationSec: durationEst,
    language: "pt",
  };
}

async function asrOpenAI(buffer, mime, filename) {
  const form = new FormData();
  form.append("file", new Blob([buffer], { type: mime }), filename);
  form.append("model", "whisper-1");
  form.append("language", "pt");
  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}` },
    body: form,
  });
  if (!res.ok) throw new Error(`Whisper failed: ${res.status}`);
  const data = await res.json();
  return { provider: "openai-whisper", text: data.text || "", confidence: 0.96, durationSec: null, language: "pt" };
}
