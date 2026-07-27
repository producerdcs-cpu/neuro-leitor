import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, RefreshCw, Trash2, Clock, FileStack } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/services/api";

interface SessionRow {
  id: string;
  jobs?: { id: string; filename?: string; status?: string }[];
  corrections?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}

export default function SessionsPanel() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${getApiUrl()}/api/sessions`);
      if (!res.ok) throw new Error("API offline");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      setError("Inicie o backend (cd server && npm run dev) para listar sessões.");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    try {
      await fetch(`${getApiUrl()}/api/sessions/${id}`, { method: "DELETE" });
      setSessions((s) => s.filter((x) => x.id !== id));
    } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-medium text-zinc-200">Sessões (multi-uso)</h3>
          <Badge variant="outline">Fase 4</Badge>
        </div>
        <Button size="sm" variant="outline" onClick={load} disabled={loading}>
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>
      {error && <p className="text-xs text-yellow-400/90 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">{error}</p>}
      {!error && sessions.length === 0 && !loading && (
        <p className="text-xs text-zinc-500">Nenhuma sessão ainda. Processe um arquivo no Leitor Multimodal.</p>
      )}
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="card-glow p-3 flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-mono text-cyan-300/90 truncate">{s.id}</p>
              <div className="flex flex-wrap gap-2 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1"><FileStack className="h-3 w-3" />{s.jobs?.length || 0} jobs</span>
                <span>{s.corrections?.length || 0} correções</span>
                {s.updatedAt && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(s.updatedAt).toLocaleString("pt-BR")}</span>}
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-3.5 w-3.5 text-zinc-500" /></Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
