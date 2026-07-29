# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.1

> Atualizado 2026-07-28 · Deploy backend pronto (`docs/DEPLOY.md`)

## 1. Estado atual

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React + Vite + PWA instalável no celular |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, motor bioneural, mocks |
| **Fase 2 — Backend** | 🟡 Código pronto · deploy pendente | API local completa. Dockerfile + Railway docs prontos. Falta subir e ligar `VITE_API_URL` |
| **Fase 3 / 4** | 📋 Planejado | Vision, TTS multi, offline, auth, edge |
| **Vercel** | ✅ Frontend online | Redeploy automático no push |

## 2. Fechar Fase 2 (hoje ou amanhã)

Siga **[docs/DEPLOY.md](./docs/DEPLOY.md)** — ~10–15 min com Railway.

- [ ] Criar projeto no Railway (GitHub → root `server`)
- [ ] Variáveis: `CORS_ORIGIN`, `OCR_PROVIDER=local`, etc.
- [ ] Generate Domain → anotar URL da API
- [ ] `curl …/api/health` → `ok: true`
- [ ] No Vercel: `VITE_API_URL=https://sua-api…`
- [ ] Redeploy frontend
- [ ] No celular: header **API verde** + upload real

## 3. Checklist PWA mobile

- [x] App instalado (Add to Home Screen)
- [x] Manifest + service worker
- [ ] API backend online (health verde)
- [ ] Upload real via API
- [ ] Sessões entre abas
- [ ] TTS “Ouvir”

## 4. Fase 3 / 4 (futuro)

**Fase 3:** Vision caption real · TTS multilíngue · offline WASM · extensão  
**Fase 4:** Fine-tuning · analytics · multi-user/auth · edge completo

## 5. Fazer hoje ou amanhã?

- **Hoje:** se tiver 10–15 min → Railway + `VITE_API_URL` → Fase 2 fechada.
- **Amanhã:** também ok. Frontend e apostila já estão estáveis; nada quebra.

---

**Resumo:** backend está *deploy-ready*. Um serviço Railway + uma env no Vercel e a Fase 2 fecha de verdade.
