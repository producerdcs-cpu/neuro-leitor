import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, History, Layers, Workflow, BookMarked, Image,
  FileCode, GraduationCap, Library, Printer, ChevronRight, FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sections, DOC_VERSION, DOC_UPDATED, apostilleTitle, type DocSectionId } from "@/data/docsContent";
import { cn } from "@/lib/utils";

const iconMap = { BookOpen, History, Layers, Workflow, BookMarked, Image, FileCode, GraduationCap, Library } as const;

export default function DocsPanel() {
  const [active, setActive] = useState<DocSectionId>("intro");
  const section = useMemo(() => sections.find((s) => s.id === active) || sections[0], [active]);
  const Icon = iconMap[section.icon as keyof typeof iconMap] || BookOpen;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-cyan-300 font-display tracking-wide">Documentação & Apostila</h2>
          <p className="text-sm text-zinc-400 mt-1">Histórico, processos, padrões de leitura/imagem e material de estudo</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">Docs v{DOC_VERSION}</Badge>
          <Badge variant="outline">{DOC_UPDATED}</Badge>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="h-3.5 w-3.5" /> Exportar / imprimir PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-4">
        <nav className="card-glow p-2 h-fit lg:sticky lg:top-20 print:hidden">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-1.5">Sumário</p>
          <ul className="space-y-0.5">
            {sections.map((s) => {
              const I = iconMap[s.icon as keyof typeof iconMap] || FileText;
              return (
                <li key={s.id}>
                  <button type="button" onClick={() => setActive(s.id)}
                    className={cn("w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                      active === s.id ? "bg-cyan-500/15 text-cyan-300" : "text-zinc-400 hover:bg-zinc-800/80")}>
                    <I className="h-3.5 w-3.5 shrink-0" />
                    <span className="leading-snug">{s.title}</span>
                    {active === s.id && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.div key={section.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="card-glow p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3 border-b border-cyan-500/15 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/25">
              <Icon className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100">{section.title}</h3>
              {section.subtitle && <p className="text-sm text-zinc-500 mt-0.5">{section.subtitle}</p>}
            </div>
          </div>
          <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
            {section.content.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {section.table && (
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-xs">
                <thead><tr className="bg-zinc-900/80 text-cyan-400/90">
                  {section.table.headers.map((h) => <th key={h} className="text-left font-medium px-3 py-2 border-b border-zinc-800">{h}</th>)}
                </tr></thead>
                <tbody>
                  {section.table.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-zinc-800/80 text-zinc-400">
                      {row.map((cell, ci) => <td key={ci} className="px-3 py-2 align-top">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {section.bullets && (
            <ul className="space-y-1.5">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-zinc-400">
                  <span className="text-cyan-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {section.id === "apostille" && (
            <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
              <p className="text-sm font-medium text-purple-300 mb-1">{apostilleTitle}</p>
              <p className="text-xs text-zinc-500 mb-3">Material virtual · v{DOC_VERSION} · imprimir → Salvar como PDF</p>
              <Button size="sm" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Gerar apostila PDF</Button>
            </div>
          )}
        </motion.div>
      </div>

      <div className="hidden print:block space-y-8 p-6 text-black">
        <header className="border-b border-zinc-300 pb-4">
          <h1 className="text-2xl font-bold">{apostilleTitle}</h1>
          <p className="text-sm">NeuroLeitor · Docs v{DOC_VERSION} · {DOC_UPDATED}</p>
        </header>
        {sections.map((s) => (
          <section key={s.id} className="break-inside-avoid">
            <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
            {s.content.map((p, i) => <p key={i} className="text-sm mb-2">{p}</p>)}
            {s.bullets && <ul className="list-disc pl-5 text-sm space-y-1">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
      </div>
    </div>
  );
}
