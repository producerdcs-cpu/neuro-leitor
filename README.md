# 🧠 NeuroLeitor

**BioData Reader v0.4 — Fase 2 Backend**

![NeuroLeitor](./public/hero-neural.webp)

![version](https://img.shields.io/badge/version-0.4.0-cyan?style=flat-square)
![phase](https://img.shields.io/badge/phase-2%20backend-purple?style=flat-square)

---

## Fase 2 — Backend (pronto)

| Módulo | Endpoint | Providers |
|--------|----------|-----------|
| **OCR** | `POST /api/process` | local-mock · tesseract.js · OpenAI vision |
| **ASR** | `POST /api/process` | local-mock · OpenAI Whisper |
| **Correção** | `POST /api/correct` | local-rules · OpenAI |
| **Sessões** | `/api/sessions` | JSON em `server/store/sessions/` |
| **Health** | `GET /api/health` | status + providers |

Frontend usa a API quando `:3001` está online; senão usa mock.

---

## Como rodar

### Backend

```bash
cd server
npm install
npm run dev
# → http://localhost:3001/api/health
```

Opcional cloud:

```bash
cp .env.example .env
# OPENAI_API_KEY=sk-...
# OCR_PROVIDER=openai ASR_PROVIDER=openai CORRECTION_PROVIDER=openai
```

### Frontend

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## API

```bash
curl http://localhost:3001/api/health
curl -F "file=@doc.png" http://localhost:3001/api/process
curl -X POST http://localhost:3001/api/correct -H "Content-Type: application/json" \
  -d '{"text":"reconehcimento multimod@l"}'
```

---

## Estrutura

```
server/
├── index.js routes/api.js
├── services/ ocr.js asr.js correction.js pipeline.js
└── store/sessions.js

src/services/api.ts
src/hooks/useApiHealth.ts
```

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
