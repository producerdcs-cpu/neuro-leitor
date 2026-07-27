export function speakText(
  text: string,
  opts: { lang?: string; rate?: number; pitch?: number } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      reject(new Error("SpeechSynthesis não disponível"));
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 4000));
    u.lang = opts.lang || "pt-BR";
    u.rate = opts.rate ?? 1;
    u.pitch = opts.pitch ?? 1;
    u.onend = () => resolve();
    u.onerror = (e) => reject(e);
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechAvailable() {
  return typeof window !== "undefined" && !!window.speechSynthesis;
}
