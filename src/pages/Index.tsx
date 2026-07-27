import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  ScanSearch,
  Network,
  Layers,
  LayoutDashboard,
  Github,
  ExternalLink,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPanel from "@/components/DashboardPanel";
import MultimodalReader from "@/components/MultimodalReader";
import RecognitionCorrection from "@/components/RecognitionCorrection";
import BioneuralEngine from "@/components/BioneuralEngine";
import ArchitecturePanel from "@/components/ArchitecturePanel";

const tabs = [
  {
    value: "dashboard",
    label: "Painel Principal",
    icon: LayoutDashboard,
    component: DashboardPanel,
  },
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
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-neon">
              <Brain className="h-5 w-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display tracking-wider text-gradient">
                NeuroLeitor
              </h1>
              <p className="text-[10px] text-zinc-500 -mt-0.5 tracking-widest uppercase">
                BioData Reader v0.3
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Sistema Online
            </div>
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

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="w-full sm:w-auto flex-wrap h-auto gap-1 mb-2">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.label.split(" ")[0]}</span>
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

      <footer className="border-t border-cyan-500/10 py-4">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <p>
            © 2026 NeuroLeitor · Producer DCS ·{" "}
            <span className="text-cyan-600">v0.3.0</span>
          </p>
          <p className="font-mono">React · Vite · Tailwind · Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}
