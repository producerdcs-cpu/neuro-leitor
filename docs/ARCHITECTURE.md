# Documentação Técnica — Arquitetura & Roadmap

**NeuroLeitor BioData Reader v0.6.1**  
Tela: `Arquitetura` (`src/components/ArchitecturePanel.tsx`)  
Atualizado: 2026-07-28

---

## 1. Visão geral

A tela **Arquitetura & Roadmap** apresenta:

1. **Pipeline de Processamento** multimodal (7 estágios)
2. **Stack Frontend**
3. **Camadas Planejadas** (backend/serviços)
4. **Roadmap** em 4 fases com status visual

É a fonte de verdade visual do progresso do produto. Os dados estão hardcoded no componente para simplicidade e performance offline/PWA.

---

## 2. Pipeline de Processamento

| # | Estágio | Descrição | Tech | Status atual | Implementação |
|---|---------|-----------|------|--------------|---------------|
| 1 | **Ingestão** | Upload PDF / Imagem / Áudio / Texto | File API · Drag & Drop | ✅ done | Frontend (`MultimodalReader`) + `POST /api/process` |
| 2 | **Layout Analysis** | Detecção de regiões, tabelas, figuras | YOLOv8-like · Document AI | ✅ done (mock) | Placeholder no pipeline; futuro Document AI real |
| 3 | **OCR / ASR** | Extração de texto e transcrição | Tesseract · Whisper | ✅ done (local/cloud) | `server/services/ocr.js`, `asr.js` |
| 4 | **Vision Caption** | Descrição de imagens e diagramas | BLIP-2 / CLIP | 🟡 wip | `server/services/vision.js` (stub) |
| 5 | **NLP & Correção** | Correção ortográfica, semântica e contextual | Transformer · Spellcheck | ✅ done | `server/services/correction.js` |
| 6 | **Fusion Bioneural** | Integração multimodal e embeddings | Cross-Attention · Fusion Layer | 🟡 wip | Conceitual + UI animada (`BioneuralEngine`) |
| 7 | **Saída** | Texto limpo, áudio TTS, resumo | gTTS · Summarizer | 📋 planned | Cliente TTS (`src/lib/tts.ts`); resumo futuro |

### Fluxo de dados (código)

```
Cliente (MultimodalReader)
  → FormData + X-Session-Id
  → POST /api/process
  → pipeline.js (detectType → OCR|ASR|text → correction)
  → sessão atualizada (store/sessions.js)
  → JSON { text, correctedText, corrections, meta }
```

---

## 3. Stack Frontend (implementado)

- **React 18 + TypeScript**
- **Vite 6**
- **Tailwind CSS + Shadcn/ui** (Radix primitives)
- **Framer Motion** (animações do pipeline e motor)
- **Lucide Icons**
- **PWA**: `manifest.webmanifest` + `sw.js`

Arquivos principais:
- `src/pages/Index.tsx` — shell com abas
- `src/components/ArchitecturePanel.tsx` — esta tela
- `src/services/api.ts` — cliente HTTP + sessão
- `src/hooks/useApiHealth.ts` — status da API no header

---

## 4. Camadas Planejadas / Backend

| Camada | Status | Local |
|--------|--------|-------|
| API Gateway (Express / Node) | ✅ | `server/index.js` + `routes/api.js` |
| OCR Service | ✅ (local + cloud opcional) | `server/services/ocr.js` |
| ASR Service | ✅ (local + Whisper) | `server/services/asr.js` |
| LLM Correction Layer | ✅ | `server/services/correction.js` |
| Vector Store (embeddings) | 📋 | — |
| TTS Engine | 🟡 (cliente) | `src/lib/tts.ts` + futuro server |

Health check: `GET /api/health` retorna `phase: 2` e providers ativos.

---

## 5. Roadmap — status oficial (pós-atualização)

### Fase 1 — MVP ✅ Concluído
- UI Dashboard com abas
- Upload multimodal (simulado + real via API quando online)
- Motor bioneural animado
- Correção de erros mock + real

### Fase 2 — Backend 🟡 Em andamento
- API de OCR real (Tesseract / cloud)
- ASR com Whisper local/API
- Pipeline de correção com LLM / rules
- Persistência de sessões (arquivo local; falta DB + deploy cloud)

> **Nota importante:** o backend roda e funciona localmente. No PWA mobile ele aparece “offline” porque a API não está publicada. Deploy do `server/` + `VITE_API_URL` resolve a maior parte da Fase 2.

### Fase 3 — Avançado 📋 Planejado
- Vision captioning real
- TTS multilíngue
- Modo offline (WebAssembly)
- Extensão de navegador

### Fase 4 — Escala 📋 Planejado
- Fine-tuning de modelos
- Dashboard analytics
- Multi-usuário / auth
- Deploy edge (PWA já parcial)

---

## 6. Como atualizar o status na UI

Edite os arrays `pipeline` e `roadmap` em:

```ts
// src/components/ArchitecturePanel.tsx
status: "done" | "wip" | "planned"
```

Ícones:
- `done` → CheckCircle2 verde
- `wip` → Clock amarelo
- `planned` → Circle cinza

Badges: “Concluído” / “Em andamento” / “Planejado”.

---

## 7. Deploy e redeploy

### Frontend (Vercel)
- `vercel.json` já configurado (SPA rewrite)
- Push em `main` → rebuild automático
- Após rebuild: reabra o PWA no celular

### Backend (recomendado)
1. Subir `server/` em Railway / Render / Fly.io / Vercel Serverless
2. Definir `OCR_PROVIDER`, `ASR_PROVIDER`, `CORRECTION_PROVIDER`, `OPENAI_API_KEY`
3. No frontend: `VITE_API_URL=https://sua-api.exemplo.com`
4. Rebuild frontend

---

## 8. Arquivos relacionados

```
src/components/ArchitecturePanel.tsx   ← UI desta tela
src/data/docsContent.ts                ← apostila / docs
server/services/pipeline.js            ← orquestração
server/routes/api.js                   ← endpoints
CHECKLIST.md                           ← checklist operacional
README.md                              ← visão rápida
```

---

## 9. Próximos passos sugeridos

1. Deploy do backend (completar Fase 2 de verdade).
2. Atualizar `VITE_API_URL` e redeploy frontend.
3. Implementar Vision Caption real (Fase 3).
4. Migrar sessões para store persistente.
5. Adicionar testes de health e pipeline.

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
