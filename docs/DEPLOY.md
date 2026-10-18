# Deploy — Vercel (frontend) + Render (backend)

**Status:** ✅ Produção ativa (Fase 2 concluída · migração Render 13/10/2026)  
**Fonte canônica de status:** [CHECKLIST.md](../CHECKLIST.md)

---

## URLs de produção (canônicas)

| Serviço | URL |
|---------|-----|
| **Frontend (Vercel)** | https://neuro-leitor.vercel.app |
| **API (Render)** | https://neuro-leitor.onrender.com |
| **Health** | https://neuro-leitor.onrender.com/api/health |
| **Repo GitHub** | https://github.com/producerdcs-cpu/neuro-leitor |

> **Railway é legado** (trial expirado). URLs `*.up.railway.app` não devem ser usadas.

---

# Parte 1 — Render (Backend / API — canônica)

## 1.1 Criar / conectar projeto

1. Acesse [render.com](https://render.com) e entre com **GitHub**.
2. **New** → **Web Service** → conecte o repositório `producerdcs-cpu/neuro-leitor`.
3. Configure:

| Campo | Valor |
|-------|--------|
| **Name** | `neuro-leitor` (ou similar) |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` (ou o definido no package.json) |
| **Instance Type** | Free / Starter conforme plano |

## 1.2 Variáveis de ambiente

```
PORT=10000
HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://neuro-leitor.vercel.app,http://localhost:5173
OCR_PROVIDER=local
ASR_PROVIDER=local
CORRECTION_PROVIDER=local
SESSION_DIR=./store/sessions
```

> No Render free tier o `PORT` é injetado automaticamente; use a variável fornecida pela plataforma quando disponível.

Opcional (Fase 3 — OCR/ASR reais):

```
OPENAI_API_KEY=sk-...
OCR_PROVIDER=openai
ASR_PROVIDER=openai
CORRECTION_PROVIDER=openai
```

## 1.3 Domínio público

Render gera automaticamente um domínio do tipo `https://neuro-leitor.onrender.com`.  
Anote a URL e use-a no frontend (`VITE_API_URL`).

## 1.4 Deploy e health

- Push em `main` (auto-deploy) ou Deploy manual no painel.
- Teste:

```bash
curl https://neuro-leitor.onrender.com/api/health
```

Esperado: JSON com `"ok": true`, `"phase": 2`, providers `local`.

## 1.5 Manutenção Render

| Ação | Como |
|------|------|
| Redeploy | Deploy no painel ou push em `server/` |
| Logs | Dashboard → Logs |
| Disco de sessões | Efêmero no free tier — ok para MVP |

---

# Parte 2 — Vercel (Frontend / PWA)

## 2.1 Projeto

1. Acesse [vercel.com](https://vercel.com) com a mesma conta GitHub.
2. Projeto: **neuro-leitor** (ou importe `producerdcs-cpu/neuro-leitor`).
3. Framework: **Vite** · Build: `npm run build` · Output: `dist`.
4. Domínio padrão: `https://neuro-leitor.vercel.app`

## 2.2 Variável de ambiente obrigatória

**Settings → Environment Variables → Add:**

| Campo | Valor |
|-------|--------|
| **Key** | `VITE_API_URL` |
| **Value** | `https://neuro-leitor.onrender.com` |
| **Environments** | Production (e Preview se quiser) |

**Importante:**
- Sem barra `/` no final da URL
- Com `https://`
- Após salvar: **Redeploy** (sem “Use existing Build Cache”)

`VITE_*` é embutida no **build**. Só mudar a env sem rebuild não atualiza o app.

## 2.3 Secrets do GitHub Actions (CI opcional)

Se usar o workflow em `.github/workflows/`:

**GitHub → repo → Settings → Secrets and variables → Actions:**

| Secret | Onde obter |
|--------|------------|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Vercel → Project → Settings → General (Team/Org ID) |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General |

Sem esses secrets o CI ainda faz **build/typecheck**; só o job de deploy é pulado.

## 2.4 Redeploy manual no Vercel

1. **Deployments**
2. Último deploy → ⋮ → **Redeploy**
3. Environment: **Production**
4. **Desmarque** “Use existing Build Cache”
5. Confirme **Redeploy**

## 2.5 Conferir no celular

1. Feche e reabra o PWA / site
2. Header: **Sistema Online** (verde)
3. Upload de arquivo → badge **· API**
4. **Visualizar** expande texto · **Ouvir** usa TTS

---

# Parte 3 — Checklist completo (já aplicado)

### Render (API)
- [x] Repo conectado
- [x] Root Directory = `server`
- [x] Variáveis de ambiente
- [x] Domínio público gerado
- [x] Deploy Active
- [x] `/api/health` OK (200)

### Vercel
- [x] Projeto online
- [x] `VITE_API_URL` = `https://neuro-leitor.onrender.com`
- [x] Redeploy Production
- [x] PWA no celular
- [x] Header verde + upload via API

---

# Parte 4 — CORS

No Render, `CORS_ORIGIN` deve incluir a URL do frontend:

```
CORS_ORIGIN=https://neuro-leitor.vercel.app,http://localhost:5173
```

Vários origins: separados por vírgula.

Sem isso o browser bloqueia as chamadas da API.

---

# Parte 5 — Recriar do zero (se precisar)

### Render de novo
1. New Web Service → GitHub → `neuro-leitor`
2. Root Directory = `server`
3. Variables (bloco da seção 1.2)
4. Deploy → testar health

### Vercel de novo
1. Import repo
2. Env `VITE_API_URL` = `https://neuro-leitor.onrender.com`
3. Deploy

### Legado / alternativas
| Plataforma | Status |
|------------|--------|
| **Render** | **Canônica (atual)** |
| Railway | Legado (trial expirado) — não usar |
| Fly.io | Alternativa viável |
| Vercel Serverless | Não ideal para multer/upload contínuo |

---

# Parte 6 — Comandos úteis

```bash
# Health produção (canônico)
curl https://neuro-leitor.onrender.com/api/health

# Processar arquivo
curl -F "file=@documento.pdf" https://neuro-leitor.onrender.com/api/process

# Correção de texto
curl -X POST https://neuro-leitor.onrender.com/api/correct \
  -H "Content-Type: application/json" \
  -d '{"text":"reconehcimento multimod@l"}'

# Backend local
cd server && npm install && npm run dev

# Frontend local (aponta para API se VITE_API_URL estiver no .env)
npm install && npm run dev
```

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
