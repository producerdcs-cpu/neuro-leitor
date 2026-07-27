import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scan,
  AlertTriangle,
  Check,
  RefreshCw,
  Sparkles,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ErrorItem {
  id: string;
  original: string;
  suggestion: string;
  type: "ocr" | "spelling" | "grammar" | "context";
  confidence: number;
  fixed: boolean;
}

const initialErrors: ErrorItem[] = [
  {
    id: "1",
    original: "bioneura1",
    suggestion: "bioneural",
    type: "ocr",
    confidence: 0.94,
    fixed: false,
  },
  {
    id: "2",
    original: "multimod@l",
    suggestion: "multimodal",
    type: "ocr",
    confidence: 0.91,
    fixed: false,
  },
  {
    id: "3",
    original: "reconehcimento",
    suggestion: "reconhecimento",
    type: "spelling",
    confidence: 0.97,
    fixed: false,
  },
  {
    id: "4",
    original: "a engine processou os dados",
    suggestion: "a engine processou os dados → o motor processou os dados",
    type: "grammar",
    confidence: 0.88,
    fixed: false,
  },
  {
    id: "5",
    original: "rede neral",
    suggestion: "rede neural",
    type: "context",
    confidence: 0.96,
    fixed: false,
  },
];

const typeLabel: Record<ErrorItem["type"], string> = {
  ocr: "OCR",
  spelling: "Ortografia",
  grammar: "Gramática",
  context: "Contexto",
};

const typeColor: Record<ErrorItem["type"], "warning" | "destructive" | "secondary" | "default"> = {
  ocr: "warning",
  spelling: "destructive",
  grammar: "secondary",
  context: "default",
};

export default function RecognitionCorrection() {
  const [errors, setErrors] = useState<ErrorItem[]>(initialErrors);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const fixedCount = errors.filter((e) => e.fixed).length;
  const total = errors.length;

  const applyFix = (id: string) => {
    setErrors((prev) =>
      prev.map((e) => (e.id === id ? { ...e, fixed: true } : e))
    );
  };

  const applyAll = () => {
    setErrors((prev) => prev.map((e) => ({ ...e, fixed: true })));
  };

  const rescan = async () => {
    setScanning(true);
    setScanProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120));
      setScanProgress(i);
    }
    setErrors(initialErrors.map((e) => ({ ...e, fixed: false })));
    setScanning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-cyan-300 font-display tracking-wide">
            Reconhecimento & Correção
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Detecção automática de erros OCR, ortográficos, gramaticais e de contexto
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={rescan} disabled={scanning}>
            <RefreshCw className={cn("h-3.5 w-3.5", scanning && "animate-spin")} />
            Reescanear
          </Button>
          <Button size="sm" onClick={applyAll} disabled={fixedCount === total}>
            <Sparkles className="h-3.5 w-3.5" />
            Corrigir todos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Erros detectados", value: total, color: "text-yellow-400" },
          { label: "Corrigidos", value: fixedCount, color: "text-green-400" },
          { label: "Pendentes", value: total - fixedCount, color: "text-red-400" },
          {
            label: "Confiança média",
            value: `${Math.round(
              (errors.reduce((a, e) => a + e.confidence, 0) / total) * 100
            )}%`,
            color: "text-cyan-400",
          },
        ].map((stat) => (
          <div key={stat.label} className="card-glow p-3 text-center">
            <p className={cn("text-2xl font-bold font-mono", stat.color)}>
              {stat.value}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {scanning && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <Scan className="h-4 w-4 animate-pulse" />
            Escaneando documento...
          </div>
          <Progress value={scanProgress} />
        </div>
      )}

      <div className="space-y-3">
        {errors.map((error, i) => (
          <motion.div
            key={error.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "card-glow p-4 flex items-start gap-3 transition-opacity",
              error.fixed && "opacity-50"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                error.fixed
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-yellow-500/10 border-yellow-500/30"
              )}
            >
              {error.fixed ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={typeColor[error.type]}>
                  {typeLabel[error.type]}
                </Badge>
                <span className="text-xs text-zinc-500 font-mono">
                  conf. {(error.confidence * 100).toFixed(0)}%
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm flex-wrap">
                <span className="line-through text-red-400/80 font-mono">
                  {error.original}
                </span>
                <Type className="h-3.5 w-3.5 text-zinc-600" />
                <span className="text-green-400 font-mono">
                  {error.suggestion}
                </span>
              </div>
            </div>

            {!error.fixed && (
              <Button size="sm" variant="outline" onClick={() => applyFix(error.id)}>
                Aplicar
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
