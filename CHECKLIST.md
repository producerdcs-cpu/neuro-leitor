# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.2

> Atualizado 2026-08-01 · **Fase 2 concluída**

## 1. Estado atual

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React + Vite + PWA no celular |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, motor bioneural, mocks |
| **Fase 2 — Backend** | ✅ Concluído | Railway online + Vercel `VITE_API_URL` + Visualizar/Ouvir |
| **Fase 3 / 4** | 📋 Planejado | OCR real, Whisper, Vision, TTS multi, auth |
| **Vercel** | ✅ Frontend online | [neuro-leitor.vercel.app](https://neuro-leitor.vercel.app) |
| **Railway** | ✅ API online | `neuro-leitor-copy-production.up.railway.app` |

## 2. Fase 2 — itens fechados

- [x] Projeto Railway (Root Directory = `server`)
- [x] Variáveis: `PORT`, `HOST`, `NODE_ENV`, `CORS_ORIGIN`, providers locais
- [x] Generate Domain público
- [x] `GET /api/health` → produção OK
- [x] Vercel: `VITE_API_URL` apontando para a API
- [x] Redeploy frontend
- [x] Header **Sistema Online** (verde) no celular
- [x] Upload processa via API (badge · API)
- [x] **Visualizar** expande conteúdo extraído
- [x] **Ouvir** (SpeechSynthesis / TTS do navegador)
- [x] Roadmap na UI marca Fase 2 como Concluído

## 3. Checklist PWA mobile

- [x] App instalado (Add to Home Screen)
- [x] Manifest + service worker
- [x] API backend online (health verde)
- [x] Upload via API
- [x] TTS “Ouvir”
- [ ] Sessões persistentes entre redeploys (disco efêmero no Railway — ok para MVP)

## 4. Fase 3 / 4 (futuro)

**Fase 3:** OCR real (Tesseract / cloud) · ASR Whisper · Vision caption · TTS multilíngue  
**Fase 4:** Fine-tuning · analytics · multi-user/auth · edge completo · mais formatos (DOCX, vídeo, IoT…)

## 5. URLs de produção

| Serviço | URL |
|---------|-----|
| Frontend | https://neuro-leitor.vercel.app |
| API | https://neuro-leitor-copy-production.up.railway.app |
| Health | https://neuro-leitor-copy-production.up.railway.app/api/health |

---

**Resumo:** Fase 2 fechada de ponta a ponta (infra + UI). Próximo foco opcional: OCR/ASR reais (Fase 3) ou pausa para outros projetos.
