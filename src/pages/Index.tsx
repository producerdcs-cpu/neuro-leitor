import { useState, lazy, Suspense, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  ScanSearch,
  Network,
  Layers,
  LayoutDashboard,
  Github,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPanel from "@/components/DashboardPanel";
import { useApiHealth } from "@/hooks/useApiHealth";

const MultimodalReader = lazy(() => import("@/components/MultimodalReader"));
const RecognitionCorrection = lazy(() => import("@/components/RecognitionCorrection"));
const BioneuralEngine = lazy(() => import("@/components/BioneuralEngine"));
const ArchitecturePanel = lazy(() => import("@/components/ArchitecturePanel"));
const DocsPanel = lazy(() => import("@/components/DocsPanel"));

function TabFallback() {
  return (
    <div className="flex items-center justify-center py-16 text-xs text-zinc-500" aria-busy="true">
      Carregando…
    </div>
  );
}

const tabs: {
  value: string;
  label: string;
  icon: typeof LayoutDashboard;
  component: ComponentType;
  eager?: boolean;
}[] = [
  { value: "dashboard", label: "Painel Principal", icon: LayoutDashboard, component: DashboardPanel, eager: true },
  { value: "reader", label: "Leitor Multimodal", icon: BookOpen, component: MultimodalReader },
  { value: "correction", label: "Reconhecimento", icon: ScanSearch, component: RecognitionCorrection },
  { value: "engine", label: "Motor Bioneural", icon: Network, component: BioneuralEngine },
  { value: "architecture", label: "Arquitetura", icon: Layers, component: ArchitecturePanel },
  { value: "docs", label: "Docs & Apostila", icon: FileText, component: DocsPanel },
];

export default function Index() {
  const [active, setActive] = useState("dashboard");
  const { online, providers, loading: apiLoading } = useApiHealth();

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 border-b border-cyan-500/15 bg-black/90 supports-[backdrop-filter]:bg-black/75 backdrop-blur-md safe-top">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold font-display tracking-wider text-gradient truncate">NeuroLeitor</h1>
              <p className="text-[9px] sm:text-[10px] text-zinc-500 -mt-0.5 tracking-widest uppercase">BioData Reader v0.6</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className={`hidden sm:flex items-center gap-1.5 text-[10px] sm:text-xs ${online ? "text-green-400" : "text-yellow-400"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
              <span className="hidden md:inline">{apiLoading ? "API…" : online ? `API · ${providers?.ocr || "local"}` : "Offline"}</span>
            </div>
            <a href="https://github.com/producerdcs-cpu/neuro-leitor" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-300 p-1" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-3 sm:px-4 py-4 sm:py-6">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 mb-3 touch-manipulation">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1 text-[11px] sm:text-xs py-2 px-2.5">
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {active === tab.value && (
                <motion.div key={tab.value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {tab.eager ? (
                    <tab.component />
                  ) : (
                    <Suspense fallback={<TabFallback />}>
                      <tab.component />
                    </Suspense>
                  )}
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="border-t border-cyan-500/10 py-3 safe-bottom">
        <div className="mx-auto max-w-6xl px-3 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs text-zinc-600">
          <p>© 2026 NeuroLeitor · Producer DCS · <span className="text-cyan-600">v0.6.1</span></p>
          <p className="font-mono">PWA mobile · React · Vite</p>
        </div>
      </footer>
    </div>
  );
}
