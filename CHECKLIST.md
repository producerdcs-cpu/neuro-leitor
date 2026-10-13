# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.2

> Atualizado **2026-10-13** · **Ordem 1 (Gate) FECHADA** · API migrada Railway → **Render**

## 1. Estado atual

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React + Vite + PWA · [neuro-leitor.vercel.app](https://neuro-leitor.vercel.app) |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, motor bioneural, mocks |
| **Fase 2 — Backend** | ✅ Concluído | **Render** online + Vercel `VITE_API_URL` + Visualizar/Ouvir |
| **Ordem 1 (governança)** | ✅ **FECHADA 13 out 2026** | Secrets limpo · health 200 · Sistema Online · LICENSE MIT · escopo congelado |
| **Fase 3 / 4** | 📋 Planejado | OCR real, Whisper, Vision, TTS multi, auth |
| **Vercel** | ✅ Frontend online | Sistema Online (verde) |
| **Render (API)** | ✅ API online | https://neuro-leitor.onrender.com |
| **Railway** | ⛔ Legado | Trial expired — offline; pode deletar |

## 2. Fase 2 — itens fechados

- [x] Web Service Render (Root Directory = `server`)
- [x] Variáveis: `PORT`, `HOST`, `NODE_ENV`, `CORS_ORIGIN`, providers locais
- [x] Domínio público Render
- [x] `GET /api/health` → produção OK (200)
- [x] Vercel: `VITE_API_URL` = `https://neuro-leitor.onrender.com` (tipo **Config**)
- [x] Redeploy frontend sem cache
- [x] Header **Sistema Online** (verde)
- [x] Upload processa via API (badge · API)
- [x] **Visualizar** / **Ouvir** (TTS browser)
- [x] Secrets scan limpo (sem chaves no git)
- [x] LICENSE MIT

## 3. Checklist PWA mobile

- [x] App instalado (Add to Home Screen)
- [x] Manifest + service worker
- [x] API backend online (health verde)
- [x] Upload via API
- [x] TTS “Ouvir”
- [ ] Sessões persistentes entre redeploys (disco efêmero no free tier — ok para MVP)

## 4. Validação de Produção E2E

> Plano histórico 13/08/2026. Infra crítica revalidada em **13/10/2026** após migração Render.

| Caso crítico | 13/10/2026 |
|--------------|------------|
| INF-01 Health API | ✅ PASS |
| INF-03 Header Sistema Online | ✅ PASS |
| API providers locais | ✅ PASS |

**Critério Go Ordem 1:** health + header + secrets + LICENSE + escopo Fase 2 congelado → **atingido**.

## 5. Fase 3 / 4 (futuro)

**Fase 3:** OCR real (Tesseract / cloud) · ASR Whisper · Vision caption · TTS multilíngue  
**Fase 4:** Fine-tuning · analytics · multi-user/auth · edge · mais formatos

## 6. URLs de produção (canônicas)

| Serviço | URL |
|---------|-----|
| Frontend | https://neuro-leitor.vercel.app |
| API | https://neuro-leitor.onrender.com |
| Health | https://neuro-leitor.onrender.com/api/health |

> URLs Railway antigas estão **obsoletas** e não devem ser usadas.

---

**Resumo:** Ordem 1 FECHADA (13 out 2026). API em Render; frontend Vercel alinhado. Próximo na sequência de governança: **Sublima Decryptor (Ordem 2)**.

© 2026 Producer DCS® / DcsProducer® Creative Studio
