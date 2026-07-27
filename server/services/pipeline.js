import { runOCR } from "./ocr.js";
import { runASR } from "./asr.js";
import { runCorrection } from "./correction.js";

function detectType(mime, filename = "") {
  if (mime?.startsWith("image/")) return "image";
  if (mime?.startsWith("audio/")) return "audio";
  if (mime === "application/pdf") return "pdf";
  if (mime?.startsWith("text/") || /\.(txt|md|csv)$/i.test(filename)) return "text";
  return "unknown";
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function processFile({ buffer, mime, filename, onProgress }) {
  const type = detectType(mime, filename);
  const progress = (p, stage) => onProgress?.(p, stage);

  progress(10, "ingest");
  let extracted = "";
  let meta = { type, filename, mime, size: buffer.length };

  progress(25, "layout");
  await delay(80);

  if (type === "image" || type === "pdf") {
    progress(40, "ocr");
    const ocr = await runOCR(buffer, mime, filename);
    extracted = ocr.text;
    meta = { ...meta, ocr };
  } else if (type === "audio") {
    progress(40, "asr");
    const asr = await runASR(buffer, mime, filename);
    extracted = asr.text;
    meta = { ...meta, asr };
  } else if (type === "text") {
    progress(40, "nlp");
    extracted = buffer.toString("utf-8");
    meta = { ...meta, chars: extracted.length };
  } else {
    progress(40, "generic");
    extracted = `[Arquivo ${filename} processado — tipo ${mime}]`;
  }

  progress(70, "correction");
  const correction = await runCorrection(extracted);

  progress(90, "fusion");
  await delay(50);
  progress(100, "done");

  return {
    type,
    text: extracted,
    correctedText: correction.correctedText,
    corrections: correction.items,
    meta: {
      ...meta,
      correctionProvider: correction.provider,
      correctionStats: correction.stats,
    },
  };
}

export { detectType };
