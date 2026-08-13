# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.2

> Atualizado 2026-08-13 · **Fase 2 concluída** · Plano de Validação E2E de Produção adicionado

## 1. Estado atual

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React + Vite + PWA no celular |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, motor bioneural, mocks |
| **Fase 2 — Backend** | ✅ Concluído | Railway online + Vercel `VITE_API_URL` + Visualizar/Ouvir |
| **Validação E2E Produção** | 📋 Em andamento | Plano detalhado + planilha de tracking (13/08/2026) |
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

## 4. Validação de Produção E2E (Plano 13/08/2026)

> Fonte: Sequência A — Plano de Testes E2E + Checklist de Validação de Produção  
> Tracking: planilha `NeuroLeitor_E2E_Tracking.xlsx` (DcsProducer®)

### 4.1 Categorias de teste

| Categoria | Qtd. casos | Foco |
|-----------|------------|------|
| Infraestrutura | 7 | Health, CORS, env, header online, redeploy |
| API Backend | 8 | `/api/health`, `/api/process`, `/api/correct`, sessões |
| Frontend + UI + PWA | 10 | Upload, Visualizar, Ouvir, fallback, install, mobile |
| Resiliência | 7 | Arquivos inválidos, UTF-8, conexão lenta, console |
| **Total** | **32** | — |

### 4.2 Casos críticos para decisão Go/No-Go

- INF-01 Health API
- INF-03 Header Sistema Online
- API-01 / API-02 Process
- UI-02 Upload · UI-03 Visualizar · UI-04 Ouvir
- UI-07 PWA Install

**Critério Go:** ≥ 90% dos casos críticos = Pass + nenhum bloqueante de infra/API/UI principal.  
**Critério No-Go:** Health/Process intermitente, Header offline persistente, Upload não chega na API, PWA quebrada.

### 4.3 Status da execução

| Campo | Valor |
|-------|-------|
| Data de início | 13/08/2026 |
| Executor | A preencher |
| Resultado | 📋 Pendente de execução |
| Decisão | A definir após preenchimento da planilha |

> Após a execução: atualizar esta seção com Pass/Fail, evidências e decisão formal (Go para Fase 3 / Corrigir antes / Pausar).

## 5. Fase 3 / 4 (futuro)

**Fase 3:** OCR real (Tesseract / cloud) · ASR Whisper · Vision caption · TTS multilíngue  
**Fase 4:** Fine-tuning · analytics · multi-user/auth · edge completo · mais formatos (DOCX, vídeo, IoT…)

## 6. URLs de produção

| Serviço | URL |
|---------|-----|
| Frontend | https://neuro-leitor.vercel.app |
| API | https://neuro-leitor-copy-production.up.railway.app |
| Health | https://neuro-leitor-copy-production.up.railway.app/api/health |

---

**Resumo:** Fase 2 fechada de ponta a ponta (infra + UI). Plano de validação E2E de produção criado em 13/08/2026. Próximo passo: executar a planilha de tracking e decidir início da Fase 3.

© 2026 Producer DCS® / DcsProducer® Creative Studio
