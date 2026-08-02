# Deploy — Vercel (frontend) + Railway (backend)

**Status:** ✅ Produção ativa (Fase 2 concluída · 2026-08-01)

---

## URLs de produção

| Serviço | URL |
|---------|-----|
| **Frontend (Vercel)** | https://neuro-leitor.vercel.app |
| **API (Railway)** | https://neuro-leitor-copy-production.up.railway.app |
| **Health** | https://neuro-leitor-copy-production.up.railway.app/api/health |
| **Repo GitHub** | https://github.com/producerdcs-cpu/neuro-leitor |

---

# Parte 1 — Railway (Backend / API)

## 1.1 Criar / conectar projeto

1. Acesse [railway.app](https://railway.app) e entre com **GitHub**.
2. **New Project** → **Deploy from GitHub repo**.
3. Escolha o repositório: `producerdcs-cpu/neuro-leitor`.
4. Selecione o serviço (ex.: `neuro-leitor` ou `neuro-leitor Copy`).

## 1.2 Settings do serviço

| Campo | Valor |
|-------|--------|
| **Root Directory** | `server` (sem barra no início) |
| **Branch** | `main` |
| **Região** | US West (California, USA) — ou a disponível |
| **Replicas** | 1 |

Caminho na UI: serviço → **Settings** (Configurações) → **Source** → Root Directory.

## 1.3 Variáveis de ambiente (Variables)

Aba **Variables** → **Raw Editor** (ou uma a uma):

```
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://neuro-leitor.vercel.app,http://localhost:5173
OCR_PROVIDER=local
ASR_PROVIDER=local
CORRECTION_PROVIDER=local
SESSION_DIR=./store/sessions
```

Opcional (Fase 3 — OCR/ASR reais):

```
OPENAI_API_KEY=sk-...
OCR_PROVIDER=openai
ASR_PROVIDER=openai
CORRECTION_PROVIDER=openai
```

## 1.4 Domínio público

1. **Settings** → **Networking** → **Public Networking**
2. **Generate Domain**
3. Anote a URL (ex.: `https://neuro-leitor-copy-production.up.railway.app`)

> Rede **privada** (`*.railway.internal`) não serve para o frontend Vercel. Use sempre o domínio público.

## 1.5 Deploy

- Botão **Deploy** / **Implantar** no serviço
- Ou push em `main` (se auto-deploy estiver ativo)

Aguarde status **Active** / verde.

## 1.6 Testar a API

```bash
curl https://neuro-leitor-copy-production.up.railway.app/api/health
```

Esperado: JSON com `ok` / `phase: 2` / `env: production`.

```bash
curl -F "file=@algum.png" https://neuro-leitor-copy-production.up.railway.app/api/process
```

## 1.7 Manutenção Railway

| Ação | Como |
|------|------|
| Redeploy | Deploy no painel ou push em `server/` |
| Ver logs | Aba **Deployments** → registros / Console |
| Auto-deploy GitHub | Settings → Source → Enable (se desabilitado) |
| Disco de sessões | Efêmero (some no redeploy) — ok na Fase 2 |

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
| **Value** | `https://neuro-leitor-copy-production.up.railway.app` |
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
| `RAILWAY_TOKEN` | Railway → Account → Tokens (opcional para CI deploy) |

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

### Railway
- [x] Repo conectado
- [x] Root Directory = `server`
- [x] Variáveis de ambiente
- [x] Generate Domain público
- [x] Deploy Active
- [x] `/api/health` OK

### Vercel
- [x] Projeto online
- [x] `VITE_API_URL` configurada
- [x] Redeploy Production
- [x] PWA no celular
- [x] Header verde + upload via API

---

# Parte 4 — CORS

No Railway, `CORS_ORIGIN` deve incluir a URL do frontend:

```
CORS_ORIGIN=https://neuro-leitor.vercel.app,http://localhost:5173
```

Vários origins: separados por vírgula, sem espaço obrigatório.

Sem isso o browser bloqueia as chamadas da API.

---

# Parte 5 — Recriar do zero (se precisar)

### Railway de novo
1. New Project → GitHub → `neuro-leitor`
2. Root Directory = `server`
3. Variables (bloco da seção 1.3)
4. Generate Domain
5. Deploy → testar health

### Vercel de novo
1. Import repo
2. Env `VITE_API_URL` = URL pública do Railway
3. Deploy

### Alternativas ao Railway
| Plataforma | Root | Start |
|------------|------|--------|
| **Render** | `server` | `node index.js` |
| **Fly.io** | pasta `server/` | `fly launch` + `fly deploy` |
| Vercel Serverless | não ideal para multer/upload contínuo | — |

---

# Parte 6 — Comandos úteis

```bash
# Health produção
curl https://neuro-leitor-copy-production.up.railway.app/api/health

# Processar arquivo
curl -F "file=@documento.pdf" https://neuro-leitor-copy-production.up.railway.app/api/process

# Correção de texto
curl -X POST https://neuro-leitor-copy-production.up.railway.app/api/correct \
  -H "Content-Type: application/json" \
  -d '{"text":"reconehcimento multimod@l"}'

# Backend local
cd server && npm install && npm run dev

# Frontend local (aponta para API se VITE_API_URL estiver no .env)
npm install && npm run dev
```

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
