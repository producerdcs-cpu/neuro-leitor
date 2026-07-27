const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
const PROVIDER = process.env.CORRECTION_PROVIDER || "local";

const RULES = [
  { re: /\bbioneura1\b/gi, suggestion: "bioneural", type: "ocr", confidence: 0.94 },
  { re: /\bmultimod@l\b/gi, suggestion: "multimodal", type: "ocr", confidence: 0.91 },
  { re: /\breconehcimento\b/gi, suggestion: "reconhecimento", type: "spelling", confidence: 0.97 },
  { re: /\brede neral\b/gi, suggestion: "rede neural", type: "context", confidence: 0.96 },
  { re: /\binteligençia\b/gi, suggestion: "inteligência", type: "spelling", confidence: 0.95 },
  { re: /\bprocessameto\b/gi, suggestion: "processamento", type: "spelling", confidence: 0.94 },
  { re: /\bdocumneto\b/gi, suggestion: "documento", type: "ocr", confidence: 0.93 },
];

export async function runCorrection(text) {
  if (!text || !text.trim()) return { items: [], correctedText: text || "", provider: PROVIDER };
  if (PROVIDER === "openai" && OPENAI_KEY) return correctionOpenAI(text);
  return correctionLocal(text);
}

function correctionLocal(text) {
  const items = [];
  let corrected = text;
  let i = 0;
  for (const rule of RULES) {
    const matches = text.match(rule.re);
    if (!matches) continue;
    for (const m of matches) {
      items.push({ id: `c-${++i}`, original: m, suggestion: rule.suggestion, type: rule.type, confidence: rule.confidence, fixed: false });
    }
    corrected = corrected.replace(rule.re, rule.suggestion);
  }
  return {
    items,
    correctedText: corrected,
    provider: "local-rules",
    stats: { detected: items.length, byType: items.reduce((a, it) => { a[it.type] = (a[it.type] || 0) + 1; return a; }, {}) },
  };
}

async function correctionOpenAI(text) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Corrige OCR/ortografia/gramática em PT. JSON: { correctedText, items: [{ original, suggestion, type, confidence }] }" },
        { role: "user", content: text.slice(0, 8000) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });
  if (!res.ok) throw new Error(`Correction LLM failed: ${res.status}`);
  const data = await res.json();
  let parsed;
  try { parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}"); } catch { parsed = { correctedText: text, items: [] }; }
  const items = (parsed.items || []).map((it, idx) => ({
    id: `c-${idx + 1}`, original: it.original || "", suggestion: it.suggestion || "",
    type: it.type || "spelling", confidence: Number(it.confidence) || 0.9, fixed: false,
  }));
  return { items, correctedText: parsed.correctedText || text, provider: "openai", stats: { detected: items.length } };
}
