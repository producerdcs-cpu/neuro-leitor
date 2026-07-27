import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  ScanSearch,
  Network,
  Layers,
  Github,
  ExternalLink,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MultimodalReader from "@/components/MultimodalReader";
import RecognitionCorrection from "@/components/RecognitionCorrection";
import BioneuralEngine from "@/components/BioneuralEngine";
import ArchitecturePanel from "@/components/ArchitecturePanel";

const tabs = [
  {
    value: "reader",
    label: "Leitor Multimodal",
    icon: BookOpen,
    component: MultimodalReader,
  },
  {
    value: "correction",
    label: "Reconhecimento",
    icon: ScanSearch,
    component: RecognitionCorrection,
  },
  {
    value: "engine",
    label: "Motor Bioneural",
    icon: Network,
    component: BioneuralEngine,
  },
  {
    value: "architecture",
    label: "Arquitetura",
    icon: Layers,
    component: ArchitecturePanel,
  },
];

export default function Index() {
  const [active, setActive] = useState("reader");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-neon">
              <Brain className="h-5 w-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display tracking-wider text-gradient">
                NEURO LEITOR
              </h1>
              <p className="text-[10px] text-zinc-500 -mt-0.5 tracking-widest uppercase">
                Multimodal · Bioneural
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/producerdcs-cpu/neuro-leitor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://atoms.dev/pt-BR/share/d71e4f814ed043f5a305e90285d79a99/v4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-purple-300 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Protótipo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div className="border-b border-cyan-500/10 bg-gradient-to-r from-cyan-950/30 via-transparent to-purple-950/30">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
                Plataforma de leitura multimodal com motor bioneural, reconhecimento
                óptico inteligente e correção automática de erros. Processa PDF,
                imagem, áudio e texto em um pipeline unificado.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["OCR", "ASR", "Vision", "NLP", "TTS"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-mono text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="w-full sm:w-auto flex-wrap h-auto gap-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <tab.component />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 py-4">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <p>
            © 2026 Neuro Leitor · Producer DCS ·{" "}
            <span className="text-cyan-600">v1.0.0</span>
          </p>
          <p className="font-mono">React · Vite · Tailwind · Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}
