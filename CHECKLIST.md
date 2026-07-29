# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.1

> Gerado em 2026-07-28 · Ambiente sandbox + análise do repositório `producerdcs-cpu/neuro-leitor`

## 1. Estado atual (análise)

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React 18 + Vite 6 + Tailwind + Framer + Radix. Instalado como app web no celular (manifest + sw.js). |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, upload simulado, motor bioneural animado, correção mock. |
| **Fase 2 — Backend** | 🟡 Em andamento / parcial | API Express em `server/` (OCR, ASR, correção, sessões). Providers: local-mock / tesseract / OpenAI / Whisper. Funciona localmente; **não está deployado em cloud** (por isso o app mobile usa fallback mock/offline). |
| **Fase 3 — Avançado** | 📋 Planejado | Vision caption real, TTS multilíngue, offline WASM, extensão navegador. |
| **Fase 4 — Escala** | 📋 Planejado (parcial PWA) | Fine-tuning, analytics, multi-user/auth, edge deploy. PWA já existe (manifest + service worker). |
| **Vercel** | ✅ Site online | Frontend deployado. Plugin Vercel no editor é opcional. Painel Vercel = só gestão do projeto. |
| **Redeploy necessário?** | Sim (frontend) | Após este push o Vercel deve rebuild automático. Backend precisa de deploy separado (Railway/Render/Fly ou Vercel serverless). |

## 2. Checklist de verificação rápida (PWA mobile)

- [x] App instalado pelo navegador (Add to Home Screen)
- [x] Manifest + ícones + theme_color pretos
- [x] Service Worker presente (`public/sw.js`)
- [ ] API backend online (health check verde no header)
- [ ] Upload real de PDF/imagem/áudio processando via API
- [ ] Persistência de sessões entre abas/recargas
- [ ] TTS “Ouvir” funcionando (cliente já tem `src/lib/tts.ts`)
- [ ] Correção ortográfica/semântica real (não só mock)

## 3. Checklist Fase 2 (Backend) — o que falta para “completo de verdade”

- [x] Rotas `/api/health`, `/api/process`, `/api/correct`, `/api/sessions`
- [x] Pipeline: ingest → OCR/ASR → correction → meta
- [x] Sessões em memória/JSON local
- [ ] Deploy do `server/` em produção (URL pública)
- [ ] `VITE_API_URL` apontando para a URL de produção no frontend
- [ ] Variáveis `OPENAI_API_KEY` / providers em produção (opcional)
- [ ] CORS e rate-limit básicos
- [ ] Persistência de sessões em DB (SQLite/Postgres) em vez de arquivo local

## 4. Checklist Fase 3 / 4 (futuro)

**Fase 3**
- [ ] Vision caption real (BLIP-2 / CLIP / OpenAI Vision)
- [ ] TTS multilíngue (gTTS / Web Speech / cloud)
- [ ] Offline (WASM Tesseract + modelos leves)
- [ ] Extensão de navegador

**Fase 4**
- [ ] Fine-tuning / embeddings + vector store
- [ ] Dashboard analytics
- [ ] Auth multi-usuário
- [ ] Deploy edge completo (PWA + backend edge)

## 5. Ações deste push

1. Alinhar status da tela **Arquitetura** com a realidade (Fase 2 parcial).
2. Documentação técnica completa da tela Arquitetura (`docs/ARCHITECTURE.md`).
3. README e `docsContent` sincronizados com v0.6.1.
4. Preparar frontend para redeploy automático no Vercel.

## 6. Como forçar redeploy do frontend

```bash
# Local (se tiver Vercel CLI)
npx vercel --prod

# Ou: push neste repositório → Vercel detecta e rebuilda automaticamente
```

Após o rebuild, reabra o PWA no celular (ou “limpar cache / reabrir”) para ver a UI atualizada.

---

**Resumo em uma frase:** o site e a apostila já operam; a Fase 2 tem backend funcional localmente; para fases 2–4 “completas de verdade” com API cloud + PWA full é preciso deploy do backend + um redeploy do frontend com a URL da API.
