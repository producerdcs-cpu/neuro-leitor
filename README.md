# 🧠 NeuroLeitor

**BioData Reader v0.6.2 — PWA + Backend Fase 2 concluída**

![NeuroLeitor](./public/hero-neural.webp)

![version](https://img.shields.io/badge/version-0.6.2-cyan?style=flat-square)
![phase](https://img.shields.io/badge/phase-2%20backend%20done-green?style=flat-square)
![pwa](https://img.shields.io/badge/PWA-ready-green?style=flat-square)
![api](https://img.shields.io/badge/API-Railway%20online-green?style=flat-square)

**Live**
- Frontend (Vercel): [neuro-leitor.vercel.app](https://neuro-leitor.vercel.app)
- API (Railway): [neuro-leitor-copy-production.up.railway.app](https://neuro-leitor-copy-production.up.railway.app)
- Health: […/api/health](https://neuro-leitor-copy-production.up.railway.app/api/health)

**Guia completo de deploy:** [docs/DEPLOY.md](./docs/DEPLOY.md) (Vercel + Railway passo a passo)

---

## Estado atual

| Área | Status |
|------|--------|
| **Frontend + PWA** | ✅ Online (Vercel) · instalável no celular |
| **Fase 1 — MVP** | ✅ Concluído |
| **Fase 2 — Backend** | ✅ Concluído (Railway + `VITE_API_URL` + Visualizar/Ouvir) |
| **Fase 3 / 4** | 📋 Planejado (OCR real, Whisper, Vision…) |

> Header **Sistema Online** no celular, upload via API, Visualizar (expande texto) e Ouvir (TTS do navegador).

Veja o **[CHECKLIST.md](./CHECKLIST.md)** e a **[documentação técnica](./docs/ARCHITECTURE.md)**.

---

## Deploy em produção (resumo)

### Railway (API)

| Item | Valor |
|------|--------|
| Root Directory | `server` |
| Domain | `https://neuro-leitor-copy-production.up.railway.app` |
| Variáveis | `PORT`, `HOST`, `NODE_ENV`, `CORS_ORIGIN`, `OCR_PROVIDER=local`, `ASR_PROVIDER=local`, `CORRECTION_PROVIDER=local` |

### Vercel (Frontend)

| Item | Valor |
|------|--------|
| URL | `https://neuro-leitor.vercel.app` |
| Env | `VITE_API_URL=https://neuro-leitor-copy-production.up.railway.app` |
| Após mudar env | Redeploy **sem** cache de build |

Passo a passo completo (criar projeto, Generate Domain, secrets CI, CORS, manutenção): **[docs/DEPLOY.md](./docs/DEPLOY.md)**.

---

## Fase 2 — Backend (fechada)

| Módulo | Endpoint | Status |
|--------|----------|--------|
| **Health** | `GET /api/health` | ✅ Produção |
| **Process** | `POST /api/process` | ✅ Produção (providers locais) |
| **Correção** | `POST /api/correct` | ✅ |
| **Sessões** | `/api/sessions` | ✅ JSON em disco |
| **Frontend** | `VITE_API_URL` no Vercel | ✅ |
| **UI** | Visualizar + Ouvir | ✅ |

Providers atuais: `local`. OCR/ASR **reais** (Tesseract, Whisper, OpenAI) → **Fase 3**.

---

## Como rodar local

### Backend

```bash
cd server
npm install
npm run dev
# → http://localhost:3001/api/health
```

### Frontend

```bash
npm install
npm run dev
# → http://localhost:5173
```

Opcional: `.env` com `VITE_API_URL=http://localhost:3001` ou a URL do Railway.

---

## API (produção)

```bash
curl https://neuro-leitor-copy-production.up.railway.app/api/health
curl -F "file=@doc.png" https://neuro-leitor-copy-production.up.railway.app/api/process
curl -X POST https://neuro-leitor-copy-production.up.railway.app/api/correct \
  -H "Content-Type: application/json" \
  -d '{"text":"reconehcimento multimod@l"}'
```

---

## Estrutura

```
server/
├── index.js · routes/api.js
├── services/ ocr · asr · correction · pipeline · vision · tts
└── store/sessions.js

src/
├── components/ ArchitecturePanel · MultimodalReader · DocsPanel …
├── services/api.ts
├── lib/tts.ts
└── pages/Index.tsx

docs/ARCHITECTURE.md · DEPLOY.md · CI.md
CHECKLIST.md
```

---

## Roadmap resumido

| Fase | Status |
|------|--------|
| 1 — MVP | ✅ Concluído |
| 2 — Backend (API cloud + PWA ligado) | ✅ Concluído |
| 3 — OCR/ASR reais, Vision, TTS avançado | 📋 Planejado |
| 4 — Escala, auth, analytics | 📋 Planejado |

Visão de longo prazo (referência protótipo Atom): documentos, áudio, vídeo, código, IoT, biometria — por fases.

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
