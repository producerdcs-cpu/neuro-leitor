export type DocSectionId =
  | "intro"
  | "history"
  | "phases"
  | "processes"
  | "reading"
  | "image"
  | "standards"
  | "apostille"
  | "complements";

export interface DocSection {
  id: DocSectionId;
  title: string;
  subtitle?: string;
  icon: string;
  content: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export const DOC_VERSION = "1.1.0";
export const DOC_UPDATED = "2026-07-28";

export const sections: DocSection[] = [
  {
    id: "intro",
    title: "1. Introdução",
    subtitle: "O que é o NeuroLeitor e para quem foi feito",
    icon: "BookOpen",
    content: [
      "O NeuroLeitor (BioData Reader) é uma plataforma de inteligência bioneural orientada à leitura multimodal: texto, imagem, áudio e documentos estruturados.",
      "O objetivo é unificar extração (OCR/ASR), compreensão (NLP), correção e saída acessível (texto limpo, síntese de voz e legendas visuais) em um único pipeline.",
      "Este material serve como apostila de referência para criação, desenvolvimento e aprendizagem — do conceito histórico às fases de produto e aos padrões técnicos de leitura e imagem.",
    ],
    bullets: [
      "Leitura inclusiva (dislexia, baixa visão, multilíngue)",
      "Fluxo único PDF → imagem → áudio → texto",
      "Backend Fase 2 com OCR/ASR/correção e sessões (local pronto; cloud em andamento)",
      "PWA instalável no celular · Fase 3: vision caption, TTS e bases offline",
    ],
  },
  {
    id: "history",
    title: "2. Histórico e linha do tempo",
    subtitle: "Da ideia ao produto em fases",
    icon: "History",
    content: [
      "A evolução do NeuroLeitor segue um modelo incremental: protótipo visual → MVP de interface → backend de processamento → camadas avançadas de visão e voz.",
    ],
    table: {
      headers: ["Marco", "Versão", "Entrega principal"],
      rows: [
        ["Protótipo Atoms", "v0.x", "UI dark OLED, abas e mock multimodal"],
        ["Fase 1 — MVP", "v0.3", "Dashboard, leitor, correção, motor bioneural"],
        ["Fase 2 — Backend", "v0.4–0.6", "API Express: OCR, ASR, correção, sessões + PWA"],
        ["Fase 3 — Avançado", "planejado", "Vision caption, TTS multilíngue, offline"],
        ["Fase 4 — Escala", "planejado", "Fine-tuning, multi-usuário, edge"],
      ],
    },
  },
  {
    id: "phases",
    title: "3. Fases do projeto",
    icon: "Layers",
    content: [
      "As fases organizam o trabalho de produto e de aprendizagem. O frontend e a PWA já estão em produção; o backend Fase 2 funciona localmente e aguarda deploy cloud para fechar o ciclo.",
    ],
    table: {
      headers: ["Fase", "Foco", "Status"],
      rows: [
        ["1 MVP", "UI, UX, mocks", "✅"],
        ["2 Backend", "API, OCR/ASR, sessões", "🟡 (local ok · cloud pendente)"],
        ["3 Avançado", "Vision, TTS, offline", "📋"],
        ["4 Escala", "Auth, analytics, edge", "📋"],
      ],
    },
  },
  {
    id: "processes",
    title: "4. Processos do pipeline",
    icon: "Workflow",
    content: [
      "O pipeline padroniza o fluxo: ingestão → layout → OCR/ASR → correção → vision → fusion → saída (TTS/resumo).",
      "Documentação técnica detalhada: docs/ARCHITECTURE.md",
    ],
    table: {
      headers: ["Estágio", "Saída", "Status"],
      rows: [
        ["OCR", "Texto + confiança", "✅"],
        ["ASR", "Transcrição", "✅"],
        ["Correção", "Texto limpo + itens", "✅"],
        ["Vision Caption", "Descrição semântica", "🟡"],
        ["TTS / Saída", "Áudio sintético + resumo", "🟡"],
      ],
    },
  },
  {
    id: "reading",
    title: "5. Leitura — padrões e aprendizagem",
    icon: "BookMarked",
    content: [
      "Leitura digital eficaz: legibilidade, compreensibilidade e acessibilidade.",
      "Texto passa por OCR/ASR, correção e pode ser reapresentado via TTS.",
    ],
    bullets: [
      "Contraste alto OLED + cyan",
      "Correção de erros OCR típicos",
      "Métricas: confiança, taxa de correção",
    ],
  },
  {
    id: "image",
    title: "6. Imagem — padrões e aprendizagem",
    icon: "Image",
    content: [
      "Imagens entram como documento (OCR) ou cena (caption).",
      "Padrões: resolução, contraste, alt text, caption objetiva em PT.",
    ],
    bullets: [
      "~150 DPI para OCR de documento",
      "PNG/JPEG/WebP; hero-neural.webp",
      "Sempre texto extraído + descrição da cena",
    ],
  },
  {
    id: "standards",
    title: "7. Padrões de criação e desenvolvimento",
    icon: "FileCode",
    content: ["Convenções de código, UI e documentação entre fases."],
    bullets: [
      "src/components + ui/; serviços em server/services/*",
      "Cliente API: src/services/api.ts",
      "Commits feat|fix|docs|chore",
      "Docs vivos neste painel + apostila PDF + docs/ARCHITECTURE.md",
    ],
  },
  {
    id: "apostille",
    title: "8. Apostila — guia de estudo",
    icon: "GraduationCap",
    content: [
      "Roteiro virtual e material para PDF/impressão.",
      "Use o botão Exportar / imprimir apostila no painel Docs.",
    ],
    bullets: [
      "Módulos A–F: conceitos, fases, leitura, imagem",
      "Exercícios: upload, correção OCR, caption, gerar PDF",
      "Checklist operacional: CHECKLIST.md no repositório",
    ],
  },
  {
    id: "complements",
    title: "9. Complementos necessários",
    icon: "Library",
    content: ["Ferramentas e referências para aprofundar."],
    bullets: [
      "Node 20+, tesseract.js opcional, OPENAI_API_KEY opcional",
      "WCAG 2.2, Dehaene (neurônios da leitura), CLIP/BLIP",
      "Deploy backend: Railway / Render / Fly · Frontend: Vercel",
    ],
  },
];

export const apostilleTitle =
  "Apostila NeuroLeitor — Leitura, Imagem e Desenvolvimento Multimodal";
