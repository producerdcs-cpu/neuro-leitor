# Documentação Técnica — Arquitetura & Roadmap

**NeuroLeitor BioData Reader v0.6.2**  
Tela: `Arquitetura` (`src/components/ArchitecturePanel.tsx`)  
Atualizado: 2026-08-01 · **Fase 2 concluída**

---

## 1. Visão geral

A tela **Arquitetura & Roadmap** apresenta:

1. **Pipeline de Processamento** multimodal (7 estágios)
2. **Stack Frontend**
3. **Camadas Planejadas** (backend/serviços)
4. **Roadmap** em 4 fases com status visual

Fonte de verdade visual do progresso. Dados em `ArchitecturePanel.tsx` (offline/PWA-friendly).

---

## 2. Pipeline de Processamento

| # | Estágio | Descrição | Tech | Status | Implementação |
|---|---------|-----------|------|--------|---------------|
| 1 | **Ingestão** | Upload PDF / Imagem / Áudio / Texto | File API · Drag & Drop | ✅ done | `MultimodalReader` + `POST /api/process` |
| 2 | **Layout Analysis** | Regiões, tabelas, figuras | YOLOv8-like · Document AI | ✅ done (mock) | Placeholder; futuro Document AI |
| 3 | **OCR / ASR** | Extração e transcrição | Tesseract · Whisper | ✅ done (local) | `server/services/ocr.js`, `asr.js` — reais na Fase 3 |
| 4 | **Vision Caption** | Descrição de imagens | BLIP-2 / CLIP | 🟡 wip | `server/services/vision.js` (stub) |
| 5 | **NLP & Correção** | Ortografia e contexto | Transformer · Spellcheck | ✅ done | `server/services/correction.js` |
| 6 | **Fusion Bioneural** | Multimodal + embeddings | Cross-Attention | 🟡 wip | UI (`BioneuralEngine`) |
| 7 | **Saída** | Texto, TTS, resumo | SpeechSynthesis | ✅ done | `src/lib/tts.ts` + Visualizar |

### Fluxo de dados

```
Cliente (MultimodalReader)
  → FormData + X-Session-Id
  → POST /api/process  (Railway produção)
  → pipeline.js (detectType → OCR|ASR|text → correction)
  → sessão (store/sessions.js)
  → JSON { text, correctedText, corrections, meta }
  → UI: Visualizar (expande) · Ouvir (TTS)
```

Fallback: se a API falhar, o leitor usa mock local e mostra badge **· mock**.

---

## 3. Stack Frontend

- React 18 + TypeScript · Vite 6 · Tailwind + Shadcn/ui · Framer Motion · Lucide · PWA

Arquivos principais:
- `src/pages/Index.tsx` — shell com abas
- `src/components/ArchitecturePanel.tsx` — roadmap
- `src/components/MultimodalReader.tsx` — upload + Visualizar/Ouvir
- `src/services/api.ts` — cliente HTTP + sessão
- `src/hooks/useApiHealth.ts` — status no header
- `src/lib/tts.ts` — SpeechSynthesis

---

## 4. Camadas Backend (produção)

| Camada | Status | Local |
|--------|--------|-------|
| API Gateway (Express / Node) | ✅ Railway | `server/index.js` + `routes/api.js` |
| OCR Service | ✅ local (mock) | `server/services/ocr.js` |
| ASR Service | ✅ local (mock) | `server/services/asr.js` |
| LLM Correction | ✅ | `server/services/correction.js` |
| Vector Store | 📋 | — |
| TTS | ✅ cliente | `src/lib/tts.ts` |

**Produção**
- API: `https://neuro-leitor-copy-production.up.railway.app`
- Health: `GET /api/health` → `phase: 2`, `env: production`
- Frontend: `VITE_API_URL` no Vercel

---

## 5. Roadmap oficial

### Fase 1 — MVP ✅ Concluído
UI Dashboard, upload multimodal, motor bioneural, correção mock.

### Fase 2 — Backend ✅ Concluído (2026-08-01)
- API online (Railway) + health
- Frontend ligado (`VITE_API_URL`)
- Upload → process → Visualizar / Ouvir
- Sessões + providers locais

### Fase 3 — Avançado 📋 Planejado
- OCR real (Tesseract / cloud)
- ASR Whisper real
- Vision captioning
- TTS multilíngue aprimorado

### Fase 4 — Escala 📋 Planejado
Fine-tuning, analytics, multi-usuário/auth, edge, mais formatos (DOCX, vídeo, IoT…).

---

## 6. Visão de produto (referência Atom)

O protótipo Atom listou ~8 famílias (documentos, áudio, vídeo, imagens, código, IoT, biometria, estruturado).  
O NeuroLeitor evolui **por fases**: núcleo PDF/imagem/áudio já operacional; demais formatos entram nas Fases 3–4 conforme prioridade de produto.

---

## 7. Como atualizar status na UI

```ts
// src/components/ArchitecturePanel.tsx
status: "done" | "wip" | "planned"
```

---

## 8. Deploy

Ver **[docs/DEPLOY.md](./DEPLOY.md)** (Railway + Vercel já aplicados).

---

## 9. Arquivos relacionados

```
src/components/ArchitecturePanel.tsx
src/components/MultimodalReader.tsx
src/services/api.ts
server/services/pipeline.js
CHECKLIST.md · README.md · docs/DEPLOY.md · docs/CI.md
```

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
