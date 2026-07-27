import { motion } from "framer-motion";
import {
  Activity,
  Zap,
  HardDrive,
  TrendingUp,
  Cpu,
  Network,
  Layers,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const metrics = [
  {
    label: "Fluxos de Dados Ativos",
    value: "2.847",
    icon: Activity,
    color: "text-cyan-400",
    border: "border-cyan-500/30",
  },
  {
    label: "Precisão Neural",
    value: "97,3%",
    icon: Zap,
    color: "text-orange-400",
    border: "border-orange-500/30",
  },
  {
    label: "Utilização de Memória",
    value: "64%",
    icon: HardDrive,
    color: "text-purple-400",
    border: "border-purple-500/30",
  },
  {
    label: "Taxa de Aprendizado",
    value: "+12,4%",
    icon: TrendingUp,
    color: "text-green-400",
    border: "border-green-500/30",
  },
];

const systemStatus = [
  { name: "Núcleo Transformer", load: 98, color: "bg-cyan-500" },
  { name: "Camada SNN", load: 94, color: "bg-blue-500" },
  { name: "Módulo GNN", load: 87, color: "bg-yellow-500" },
  { name: "Encoder Multimodal", load: 91, color: "bg-purple-500" },
  { name: "Decoder / TTS", load: 72, color: "bg-green-500" },
];

export default function DashboardPanel() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20">
        <img
          src="/hero-neural.webp"
          alt="Rede neural bioneural"
          className="w-full h-48 sm:h-56 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display tracking-wide">
            Plataforma de Inteligência Bioneural
          </h2>
          <p className="text-sm text-zinc-300 mt-1">
            Leitura, análise, detecção e correção universal de dados
          </p>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="success" className="animate-pulse-neon gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Sistema Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`card-glow p-4 border ${m.border}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`h-4 w-4 ${m.color}`} />
              <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                {m.label}
              </span>
            </div>
            <p className={`text-2xl sm:text-3xl font-bold font-mono ${m.color}`}>
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-glow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-zinc-200">Status do Sistema</h3>
          </div>
          <div className="space-y-3">
            {systemStatus.map((s) => (
              <div key={s.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        s.load >= 90
                          ? "bg-green-400"
                          : s.load >= 80
                          ? "bg-yellow-400"
                          : "bg-zinc-500"
                      }`}
                    />
                    <span className="text-zinc-400">{s.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono">{s.load}%</span>
                </div>
                <Progress value={s.load} />
              </div>
            ))}
          </div>
        </div>

        <div className="card-glow overflow-hidden relative min-h-[200px]">
          <img
            src="/hero-neural.webp"
            alt="Rede neural"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-purple-950/40" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <Network className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-zinc-300 font-mono">Bioneural Core v0.3</span>
            </div>
            <p className="text-sm text-zinc-200">
              Processamento em tempo real · Multimodal · Spiking Neural Networks
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            icon: Layers,
            title: "Leitor Multimodal",
            desc: "PDF, imagem, áudio e texto",
          },
          {
            icon: Zap,
            title: "Correção Neural",
            desc: "OCR, ortografia e contexto",
          },
          {
            icon: Network,
            title: "Motor Bioneural",
            desc: "Rede neural animada ao vivo",
          },
        ].map((a) => (
          <div
            key={a.title}
            className="card-glow p-4 hover:border-cyan-500/40 transition-colors cursor-default"
          >
            <a.icon className="h-5 w-5 text-cyan-400 mb-2" />
            <p className="text-sm font-medium text-zinc-200">{a.title}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
