# Deploy do Backend — Fase 2 (concluída)

**Status:** ✅ Aplicado em produção (2026-08-01)  
**Plataforma:** Railway + Vercel

---

## Produção atual

| Item | Valor |
|------|--------|
| **API** | https://neuro-leitor-copy-production.up.railway.app |
| **Health** | https://neuro-leitor-copy-production.up.railway.app/api/health |
| **Frontend** | https://neuro-leitor.vercel.app |
| **Root Directory** | `server` |
| **Branch** | `main` |
| **Região** | US West (California) |

### Variáveis no Railway (serviço)

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

### Variável no Vercel

```
VITE_API_URL=https://neuro-leitor-copy-production.up.railway.app
```

(Ambiente: Production; rebuild sem cache após alteração.)

---

## Como foi feito (referência)

1. Railway → Deploy from GitHub → `producerdcs-cpu/neuro-leitor`
2. Settings → Root Directory = `server`
3. Variables (tabela acima)
4. Networking → Generate Domain
5. `curl …/api/health` → OK
6. Vercel → Environment Variable `VITE_API_URL` → Redeploy
7. Celular: header **Sistema Online** + upload com badge **· API**

---

## Checklist pós-deploy (todos OK)

- [x] `GET /api/health` responde 200
- [x] `CORS_ORIGIN` inclui o frontend Vercel
- [x] `VITE_API_URL` no Vercel
- [x] Frontend redeployado
- [x] Header verde no celular
- [x] Upload processa via API
- [x] Visualizar + Ouvir na UI

---

## Manutenção

### Redeploy backend
- Push em `main` com alteração em `server/` **ou** botão Deploy no Railway.
- Auto-deploy GitHub pode estar desabilitado no serviço; use Deploy manual se necessário.

### Trocar providers (Fase 3)

```
OPENAI_API_KEY=sk-...
OCR_PROVIDER=openai
ASR_PROVIDER=openai
CORRECTION_PROVIDER=openai
```

Depois: Deploy no Railway.

### CORS

Vários origins separados por vírgula:

```
CORS_ORIGIN=https://neuro-leitor.vercel.app,https://outro.vercel.app,http://localhost:5173
```

### Sessões

Disco do Railway é **efêmero** (some no redeploy). Aceitável na Fase 2.  
Fase 4: Postgres/SQLite persistente.

---

## Alternativas (se precisar recriar)

- **Render:** Root `server`, start `node index.js`
- **Fly.io:** `fly launch` na pasta `server/`
- **Vercel Serverless:** não recomendado para multer/upload contínuo

---

MIT © 2026 Producer DCS
