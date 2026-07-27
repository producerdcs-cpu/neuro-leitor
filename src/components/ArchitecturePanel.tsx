import { motion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  GitBranch,
  Box,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const pipeline = [
  {
    id: "ingest",
    title: "Ingestão",
    desc: "Upload PDF / Imagem / Áudio / Texto",
    tech: "File API · Drag & Drop",
    status: "done" as const,
  },
  {
    id: "layout",
    title: "Layout Analysis",
    desc: "Detecção de regiões, tabelas, figuras",
    tech: "YOLOv8-like · Document AI",
    status: "done" as const,
  },
  {
    id: "ocr",
    title: "OCR / ASR",
    desc: "Extração de texto e transcrição",
    tech: "Tesseract · Whisper",
    status: "done" as const,
  },
  {
    id: "vision",
    title: "Vision Caption",
    desc: "Descrição de imagens e diagramas",
    tech: "BLIP-2 / CLIP",
    status: "wip" as const,
  },
  {
    id: "nlp",
    title: "NLP & Correção",
    desc: "Correção ortográfica, semântica e contextual",
    tech: "Transformer · Spellcheck",
    status: "done" as const,
  },
  {
    id: "fusion",
    title: "Fusion Bioneural",
    desc: "Integração multimodal e embeddings",
    tech: "Cross-Attention · Fusion Layer",
    status: "wip" as const,
  },
  {
    id: "output",
    title: "Saída",
    desc: "Texto limpo, áudio TTS, resumo",
    tech: "gTTS · Summarizer",
    status: "planned" as const,
  },
];

const roadmap = [
  {
    phase: "Fase 1 — MVP",
    items: [
      "UI Dashboard com abas",
      "Upload multimodal simulado",
      "Motor bioneural animado",
      "Correção de erros mock",
    ],
    status: "done" as const,
  },
  {
    phase: "Fase 2 — Backend",
    items: [
      "API de OCR real (Tesseract / cloud)",
      "ASR com Whisper local/API",
      "Pipeline de correção com LLM",
      "Persistência de sessões",
    ],
    status: "wip" as const,
  },
  {
    phase: "Fase 3 — Avançado",
    items: [
      "Vision captioning real",
      "TTS multilíngue",
      "Modo offline (WebAssembly)",
      "Extensão de navegador",
    ],
    status: "planned" as const,
  },
  {
    phase: "Fase 4 — Escala",
    items: [
      "Fine-tuning de modelos",
      "Dashboard analytics",
      "Multi-usuário / auth",
      "Deploy edge (PWA)",
    ],
    status: "planned" as const,
  },
];

const statusIcon = {
  done: <CheckCircle2 className="h-4 w-4 text-green-400" />,
  wip: <Clock className="h-4 w-4 text-yellow-400" />,
  planned: <Circle className="h-4 w-4 text-zinc-500" />,
};

const statusBadge = {
  done: "success" as const,
  wip: "warning" as const,
  planned: "outline" as const,
};

export default function ArchitecturePanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-cyan-300 font-display tracking-wide">
          Arquitetura & Roadmap
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Pipeline multimodal, componentes e plano de evolução
        </p>
      </div>

      <div className="card-glow p-5">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-medium text-zinc-200">Pipeline de Processamento</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {pipeline.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-xl border border-cyan-500/20 bg-zinc-900/80 px-3 py-2 min-w-[140px]">
                <div className="flex items-center gap-1.5 mb-1">
                  {statusIcon[step.status]}
                  <span className="text-xs font-semibold text-cyan-300">
                    {step.title}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">{step.desc}</p>
                <p className="text-[10px] text-purple-400/80 mt-1 font-mono">
                  {step.tech}
                </p>
              </div>
              {i < pipeline.length - 1 && (
                <ArrowRight className="h-4 w-4 text-zinc-600 shrink-0 hidden sm:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-3">
            <Box className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-zinc-200">Stack Frontend</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-zinc-400">
            {[
              "React 18 + TypeScript",
              "Vite 6",
              "Tailwind CSS + Shadcn/ui",
              "Framer Motion",
              "Radix UI Primitives",
              "Lucide Icons",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-medium text-zinc-200">Camadas Planejadas</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-zinc-400">
            {[
              "API Gateway (FastAPI / Node)",
              "OCR Service (Tesseract / Cloud)",
              "ASR Service (Whisper)",
              "LLM Correction Layer",
              "Vector Store (embeddings)",
              "TTS Engine",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-glow p-5">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="h-4 w-4 text-green-400" />
          <h3 className="text-sm font-medium text-zinc-200">Roadmap</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmap.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-200">
                  {phase.phase}
                </span>
                <Badge variant={statusBadge[phase.status]} className="text-[10px]">
                  {phase.status === "done"
                    ? "Concluído"
                    : phase.status === "wip"
                    ? "Em andamento"
                    : "Planejado"}
                </Badge>
              </div>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] text-zinc-500 flex items-start gap-1.5"
                  >
                    {statusIcon[phase.status]}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
