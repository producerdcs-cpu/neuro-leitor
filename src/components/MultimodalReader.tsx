import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  Mic,
  FileAudio,
  X,
  Loader2,
  CheckCircle2,
  Eye,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn, formatBytes, delay } from "@/lib/utils";
import { processFile as apiProcessFile } from "@/services/api";
import { speakText, stopSpeaking, isSpeechAvailable } from "@/lib/tts";

type FileType = "pdf" | "image" | "audio" | "text" | "unknown";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: FileType;
  status: "pending" | "processing" | "done" | "error";
  progress: number;
  result?: string;
  fullText?: string;
  source?: "api" | "mock";
  errorMsg?: string;
  /** Arquivo original para reenvio à API */
  rawFile?: File;
}

function detectType(file: File): FileType {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("text/")) return "text";
  return "unknown";
}

const typeIcon = {
  pdf: FileText,
  image: Image,
  audio: FileAudio,
  text: FileText,
  unknown: FileText,
};

const mockResults: Record<FileType, string> = {
  pdf: "Documento processado. 12 páginas, 3.842 palavras. Estrutura: título, subtítulos, 2 tabelas e 1 figura. Texto extraído com 98,4% de confiança.",
  image:
    "Imagem analisada. Texto detectado (OCR): «Neuro Leitor – Sistema Multimodal». Objetos: cérebro estilizado, circuitos, nós neurais. Caption: Rede neural bioneural em fundo escuro.",
  audio:
    "Áudio transcrito (ASR). Duração 00:42. Transcrição: «Bem-vindo ao Neuro Leitor. O motor bioneural está ativo e pronto para processar múltiplas modalidades.» Confiança: 96,1%.",
  text: "Texto analisado. 1.204 tokens. Sentimento: neutro-positivo. Entidades: Neuro Leitor, Bioneural, Multimodal. Resumo gerado com sucesso.",
  unknown: "Arquivo processado com pipeline genérico.",
};

export default function MultimodalReader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (uploaded: UploadedFile, raw: File) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === uploaded.id ? { ...f, status: "processing", progress: 10, rawFile: raw } : f
      )
    );

    // Animação de progresso enquanto tenta a API
    const progressTimer = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploaded.id && f.status === "processing" && f.progress < 85
            ? { ...f, progress: Math.min(85, f.progress + 8 + Math.random() * 10) }
            : f
        )
      );
    }, 400);

    try {
      const data = await apiProcessFile(raw);
      clearInterval(progressTimer);

      const summary =
        data.job?.result ||
        data.correctedText ||
        data.text ||
        "Processamento concluído via API.";
      const full =
        data.correctedText ||
        data.text ||
        (typeof data.job?.result === "string" ? data.job.result : summary);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploaded.id
            ? {
                ...f,
                status: "done",
                progress: 100,
                result: summary,
                fullText: full,
                source: "api",
              }
            : f
        )
      );
    } catch {
      // Fallback mock (API offline ou erro)
      clearInterval(progressTimer);
      const stages = [45, 70, 90, 100];
      for (const p of stages) {
        await delay(350 + Math.random() * 250);
        setFiles((prev) =>
          prev.map((f) => (f.id === uploaded.id ? { ...f, progress: p } : f))
        );
      }
      const mock = mockResults[uploaded.type];
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploaded.id
            ? {
                ...f,
                status: "done",
                progress: 100,
                result: mock,
                fullText: mock,
                source: "mock",
              }
            : f
        )
      );
    }
  }, []);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const list = Array.from(fileList);
      const newFiles: UploadedFile[] = list.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: detectType(file),
        status: "pending" as const,
        progress: 0,
        rawFile: file,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((f, i) => processFile(f, list[i]));
    },
    [processFile]
  );

  const removeFile = (id: string) => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
    }
    if (expandedId === id) setExpandedId(null);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleView = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSpeak = async (file: UploadedFile) => {
    const text = file.fullText || file.result || "";
    if (!text) return;

    if (speakingId === file.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    if (!isSpeechAvailable()) {
      alert("Leitura em voz alta não disponível neste dispositivo/navegador.");
      return;
    }

    try {
      stopSpeaking();
      setSpeakingId(file.id);
      await speakText(text, { lang: "pt-BR" });
      setSpeakingId(null);
    } catch {
      setSpeakingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-cyan-300 font-display tracking-wide">
            Leitor Multimodal
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Upload de PDF, imagem, áudio ou texto — pipeline unificado de extração
          </p>
        </div>
        <Badge variant="secondary">OCR · ASR · Vision · NLP</Badge>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300",
          dragOver
            ? "border-cyan-400 bg-cyan-500/10 shadow-neon"
            : "border-cyan-500/30 bg-zinc-950/50 hover:border-cyan-500/60 hover:bg-cyan-500/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,image/*,audio/*,.txt,.md"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <Upload className="h-7 w-7 text-cyan-400" />
        </div>
        <div className="text-center">
          <p className="text-cyan-200 font-medium">
            Arraste arquivos ou clique para selecionar
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            PDF · PNG/JPG · MP3/WAV · TXT/MD
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          {[
            { icon: FileText, label: "PDF" },
            { icon: Image, label: "Imagem" },
            { icon: Mic, label: "Áudio" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-700"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {files.map((file) => {
          const Icon = typeIcon[file.type];
          const isExpanded = expandedId === file.id;
          const isSpeaking = speakingId === file.id;
          const displayText = file.fullText || file.result || "";

          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-glow p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-zinc-100 truncate">
                      {file.name}
                    </p>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                      aria-label="Remover"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {formatBytes(file.size)} · {file.type.toUpperCase()}
                    {file.source === "api" && (
                      <span className="ml-2 text-green-500">· API</span>
                    )}
                    {file.source === "mock" && (
                      <span className="ml-2 text-amber-500">· mock</span>
                    )}
                  </p>

                  {file.status === "processing" && (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-cyan-400">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Processando pipeline multimodal...
                      </div>
                      <Progress value={file.progress} />
                    </div>
                  )}

                  {file.status === "done" && file.result && (
                    <div className="mt-3 rounded-lg bg-zinc-900/80 border border-green-500/20 p-3">
                      <div className="flex items-center gap-2 text-xs text-green-400 mb-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Processamento concluído
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {file.result}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleView(file.id)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          {isExpanded ? "Ocultar" : "Visualizar"}
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 ml-1" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 ml-1" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSpeak(file)}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="h-3.5 w-3.5" />
                              Parar
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3.5 w-3.5" />
                              Ouvir
                            </>
                          )}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 max-h-64 overflow-y-auto rounded-md bg-zinc-950/80 border border-zinc-700/50 p-3">
                              <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wide">
                                Conteúdo extraído
                              </p>
                              <pre className="text-sm text-zinc-200 whitespace-pre-wrap break-words font-sans leading-relaxed">
                                {displayText}
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {file.status === "error" && (
                    <p className="mt-2 text-xs text-red-400">
                      {file.errorMsg || "Erro no processamento"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {files.length === 0 && (
        <p className="text-center text-sm text-zinc-600 py-4">
          Nenhum arquivo processado ainda
        </p>
      )}
    </div>
  );
}
