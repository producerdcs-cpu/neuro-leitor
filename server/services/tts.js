const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const PROVIDER = process.env.TTS_PROVIDER || "browser";

export async function runTTS(text, opts = {}) {
  const lang = opts.lang || "pt-BR";
  const voice = opts.voice || "alloy";
  if (!text || !text.trim()) return { provider: PROVIDER, error: "Texto vazio", audioBase64: null };
  const clipped = text.slice(0, 4000);
  if (PROVIDER === "openai" && OPENAI_KEY) return ttsOpenAI(clipped, voice);
  return {
    provider: "browser",
    text: clipped,
    lang,
    instruction: "Use window.speechSynthesis no cliente (lang pt-BR).",
    audioBase64: null,
    chars: clipped.length,
  };
}

async function ttsOpenAI(text, voice) {
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tts-1", input: text, voice: voice || "alloy", response_format: "mp3" }),
  });
  if (!res.ok) throw new Error(`TTS failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { provider: "openai", audioBase64: buf.toString("base64"), mime: "audio/mpeg", chars: text.length };
}
