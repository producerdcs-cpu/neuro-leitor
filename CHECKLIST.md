# ✅ Checklist Geral — NeuroLeitor BioData Reader v0.6.2

> Atualizado **2026-10-28** · **Ordem 1 (Gate) FECHADA** · **Fase 3 aberta** · API canônica = **Render**

## 1. Estado atual

| Item | Status | Observação |
|------|--------|------------|
| **Frontend (UI + PWA)** | ✅ Operacional | React + Vite + PWA · [neuro-leitor.vercel.app](https://neuro-leitor.vercel.app) |
| **Fase 1 — MVP** | ✅ Concluído | Dashboard, abas, motor bioneural, mocks |
| **Fase 2 — Backend** | ✅ Concluído | **Render** online + Vercel `VITE_API_URL` + Visualizar/Ouvir |
| **Ordem 1 (governança)** | ✅ **FECHADA 13 out 2026** | Secrets limpo · health 200 · Sistema Online · LICENSE MIT · escopo congelado |
| **Fase 3 — Avançado** | 🟡 **Aberta 28/10/2026** | OCR real (primeiro item) · Whisper · Vision · TTS multi |
| **Fase 4** | 📋 Planejado | Fine-tuning, analytics, auth, edge, mais formatos |
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

## 5. Fase 3 — Avançado (aberta 28/10/2026)

**Primeiro item em foco:** OCR real

### Caminho atual do OCR (já no código)

| Camada | Status | Detalhe |
|--------|--------|--------|
| Backend `server/services/ocr.js` | ✅ Existe | Tenta `tesseract.js` (por+eng) → fallback `local-mock` → opcional OpenAI |
| Dependência | optional | `tesseract.js` em `server/package.json` (optionalDependencies) |
| Env | `OCR_PROVIDER=local` (padrão) | ou `openai` com `OPENAI_API_KEY` |
| UI | ✅ Atualizado 28/10 | MultimodalReader mostra badge do provider (`tesseract` / `local-mock` / `openai`) + confiança |

### Checklist Fase 3

- [x] Feedback visual do provider OCR na UI (badge + confiança)
- [ ] Garantir Tesseract estável no Render (ou ativar provider cloud)
- [ ] Extração robusta de PDF (além de imagens)
- [ ] Tratamento de português validado em produção
- [ ] ASR Whisper real
- [ ] Vision Caption
- [ ] TTS multilíngue aprimorado
- [ ] Interface integrada + testes E2E + deploy

## 6. Fase 4 (futuro)

Fine-tuning · analytics · multi-user/auth · edge · mais formatos (DOCX, XLSX, EPUB…)

## 7. URLs de produção (canônicas)

| Serviço | URL |
|---------|-----|
| Frontend | https://neuro-leitor.vercel.app |
| API | https://neuro-leitor.onrender.com |
| Health | https://neuro-leitor.onrender.com/api/health |

> URLs Railway antigas estão **obsoletas** e não devem ser usadas.

---

**Resumo:** Ordem 1 FECHADA · Fase 2 fechada · **Fase 3 aberta** (OCR real como primeiro item · UI já mostra provider).  
Próximo na sequência de governança: continuar Fase 3 e, em paralelo de produto, **Sublima Decryptor (Ordem 2)**.

© 2026 Producer DCS® / DcsProducer® Creative Studio
