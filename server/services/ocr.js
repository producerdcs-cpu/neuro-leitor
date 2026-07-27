const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const PROVIDER = process.env.OCR_PROVIDER || "local";

export async function runOCR(buffer, mime = "image/png", filename = "file") {
  if (PROVIDER === "openai" && OPENAI_KEY) return ocrOpenAI(buffer, mime, filename);
  return ocrLocal(buffer, mime, filename);
}

async function ocrLocal(buffer, mime, filename) {
  try {
    const Tesseract = await import("tesseract.js");
    if (mime.startsWith("image/")) {
      const result = await Tesseract.recognize(buffer, "por+eng", { logger: () => {} });
      const text = (result?.data?.text || "").trim();
      const conf = result?.data?.confidence ?? 90;
      return { provider: "tesseract", text: text || `[OCR] Sem texto em ${filename}`, confidence: conf / 100, pages: 1, words: text.split(/\s+/).filter(Boolean).length };
    }
  } catch {}
  const sizeKb = Math.round(buffer.length / 1024);
  return {
    provider: "local-mock",
    text: `Documento processado (local): ${filename}\nTipo: ${mime} · ${sizeKb} KB\nNeuroLeitor — mock OCR. Use tesseract.js ou OPENAI_API_KEY.\n«Plataforma de Inteligência Bioneural.»`,
    confidence: 0.92,
    pages: mime === "application/pdf" ? 3 : 1,
    words: 48,
  };
}

async function ocrOpenAI(buffer, mime, filename) {
  const b64 = buffer.toString("base64");
  const dataUrl = `data:${mime};base64,${b64}`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: [
        { type: "text", text: "Extraia todo o texto legível. Responda só com o texto." },
        { type: "image_url", image_url: { url: dataUrl } },
      ]}],
      max_tokens: 2000,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI OCR failed: ${res.status}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "";
  return { provider: "openai", text, confidence: 0.95, pages: 1, words: text.split(/\s+/).filter(Boolean).length, filename };
}
