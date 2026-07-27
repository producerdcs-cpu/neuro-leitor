const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const PROVIDER = process.env.VISION_PROVIDER || "local";

export async function runVisionCaption(buffer, mime = "image/png", filename = "image") {
  if (PROVIDER === "openai" && OPENAI_KEY && mime.startsWith("image/")) {
    return visionOpenAI(buffer, mime, filename);
  }
  return visionLocal(buffer, mime, filename);
}

async function visionLocal(buffer, mime, filename) {
  const sizeKb = Math.round(buffer.length / 1024);
  return {
    provider: "local-mock",
    caption: `Descrição simulada de «${filename}» (${mime}, ${sizeKb} KB). Configure VISION_PROVIDER=openai para caption real.`,
    confidence: 0.75,
    language: "pt",
  };
}

async function visionOpenAI(buffer, mime, filename) {
  const b64 = buffer.toString("base64");
  const dataUrl = `data:${mime};base64,${b64}`;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: "Descreva esta imagem em português (1–3 frases). Se houver texto, mencione-o." },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      }],
      max_tokens: 300,
    }),
  });
  if (!res.ok) throw new Error(`Vision caption failed: ${res.status}`);
  const data = await res.json();
  return { provider: "openai", caption: data.choices?.[0]?.message?.content || "", confidence: 0.92, language: "pt", filename };
}
