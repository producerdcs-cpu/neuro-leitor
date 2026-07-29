# Deploy do Backend — Fechar Fase 2

**Tempo estimado:** 10–15 minutos  
**Recomendado:** Railway (gratuito para começar, Node + Docker simples)

---

## Opção A — Railway (recomendada)

### 1. Conta e projeto
1. Acesse [railway.app](https://railway.app) e entre com GitHub.
2. **New Project** → **Deploy from GitHub repo** → escolha `producerdcs-cpu/neuro-leitor`.
3. No serviço criado:
   - **Settings → Root Directory** = `server`
   - Ou use o Dockerfile da raiz (`railway.toml` já aponta para `server/Dockerfile`).

### 2. Variáveis de ambiente (Settings → Variables)

```
PORT=3001
HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://SEU-FRONTEND.vercel.app,http://localhost:5173
OCR_PROVIDER=local
ASR_PROVIDER=local
CORRECTION_PROVIDER=local
# Opcional (OCR/ASR/correção reais):
# OPENAI_API_KEY=sk-...
# OCR_PROVIDER=openai
# ASR_PROVIDER=openai
# CORRECTION_PROVIDER=openai
```

> Substitua `https://SEU-FRONTEND.vercel.app` pela URL real do Vercel (ex.: `https://neuro-leitor.vercel.app`).

### 3. Gerar domínio público
- **Settings → Networking → Generate Domain**
- Anote a URL, ex.: `https://neuro-leitor-api-production.up.railway.app`

### 4. Testar
```bash
curl https://SUA-API.up.railway.app/api/health
```
Deve retornar `{"ok":true,"phase":2,...}`.

### 5. Ligar o frontend
No projeto Vercel (ou no repositório):
1. **Environment Variables** → `VITE_API_URL` = `https://SUA-API.up.railway.app`
2. Redeploy do frontend (ou push qualquer commit).
3. No celular: feche e reabra o PWA → o indicador no header deve ficar **verde** (API online).

---

## Opção B — Render

1. [render.com](https://render.com) → New → Web Service → conecte o repo.
2. **Root Directory:** `server`
3. **Build:** `npm install`
4. **Start:** `node index.js`
5. Mesmas variáveis de ambiente da Opção A.
6. Domínio grátis `*.onrender.com`.

---

## Opção C — Fly.io

```bash
# Na pasta server/
cd server
fly launch --name neuro-leitor-api --region gru
fly secrets set CORS_ORIGIN=https://SEU-FRONTEND.vercel.app
fly deploy
```

Use o `Dockerfile` já existente.

---

## Opção D — Vercel Serverless (alternativa)

Express + multer + upload de arquivo funciona melhor como **serviço contínuo** (Railway/Render).  
Serverless no Vercel exige adaptações (`@vercel/node`, limite de body ~4,5 MB, cold start).  
Para Fase 2, **prefira Railway**.

Se quiser depois: podemos criar `api/index.js` como handler serverless.

---

## Checklist pós-deploy (Fase 2 fechada)

- [ ] `GET /api/health` responde 200
- [ ] `CORS_ORIGIN` inclui a URL do frontend Vercel
- [ ] `VITE_API_URL` no Vercel aponta para a API
- [ ] Frontend redeployado
- [ ] Header do app no celular mostra API verde
- [ ] Upload de imagem/PDF processa de verdade (não só mock)

---

## CORS e produção

O `server/index.js` já aceita vários origins separados por vírgula:

```
CORS_ORIGIN=https://neuro-leitor.vercel.app,https://neuro-leitor-xxx.vercel.app,http://localhost:5173
```

Sem `CORS_ORIGIN` em produção, o padrão continua `localhost` e o browser bloqueia.

---

## Sessões em disco

As sessões ficam em `store/sessions/` (arquivo JSON).  
Em Railway/Render o disco é **efêmero** (some no redeploy). Para MVP da Fase 2 isso é aceitável.  
Fase 4: migrar para Postgres/SQLite persistente.

---

## Fazer hoje ou amanhã?

| Hoje (10–15 min) | Amanhã |
|------------------|--------|
| Railway + 5 variáveis + Generate Domain | Mesmo fluxo, com mais calma |
| Setar `VITE_API_URL` no Vercel e redeploy | — |
| Testar health + upload no celular | — |

O **frontend e a PWA já estão estáveis**. Fechar a Fase 2 hoje dá a sensação de “API real no bolso”; deixar para amanhã também é perfeito se estiver cansado.

---

MIT © 2026 Producer DCS
