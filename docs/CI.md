# CI / CD — NeuroLeitor

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

**Status atual (27/10/2026):** CI atua como **guardião** (typecheck + build + smoke health).  
Deploys de produção são feitos principalmente pelos próprios provedores (Vercel e Render via Git).

---

## O que roda automaticamente

| Evento | Frontend | Backend | Deploy Vercel | Health Produção (Render) |
|--------|----------|---------|---------------|--------------------------|
| Push / PR (qualquer branch) | ✅ typecheck + build | ✅ smoke local | ❌ | ❌ |
| Push em `main` | ✅ | ✅ | ✅ se secret existir | ✅ (verifica API pública) |
| Manual (Actions → Run workflow) | ✅ | ✅ | só se main | só se main |

- **Vercel** já faz deploy automático pelo Git na maioria dos casos. O job no Actions é **opcional** (extra).
- **Render** também faz auto-deploy pelo Git (Root Directory = `server`). O job Railway foi removido (legado).

---

## Secrets (GitHub → Settings → Secrets and variables → Actions)

Crie **apenas** o que for usar. Nunca coloque tokens no código ou no `.yml`.

### Frontend (Vercel) — opcional

| Secret | Onde pegar |
|--------|------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Project → Settings → General |
| `VERCEL_PROJECT_ID` | Idem |

> Sem esses secrets o CI continua fazendo **build/typecheck**. Só o job de deploy é pulado.

### Backend

Não é necessário secret de Railway (legado).  
Render usa integração Git nativa.

### Variáveis de ambiente do app (não são Secrets do Actions)

| Onde | Variável | Valor |
|------|----------|-------|
| Vercel (Project → Env) | `VITE_API_URL` | `https://neuro-leitor.onrender.com` |
| Render (Environment) | `CORS_ORIGIN` | `https://neuro-leitor.vercel.app,http://localhost:5173` |
| Render | `OCR_PROVIDER` etc. | `local` (ou cloud na Fase 3) |

---

## Boas práticas já aplicadas

- `.env` e `.env.*` no `.gitignore` (só `.env.example` versionado)
- Secrets só via GitHub Actions Secrets / variáveis do provedor
- `GITHUB_TOKEN` automático para checkout e artefatos
- Deploy condicionado a presença de secret → seguro por padrão
- Concurrency: cancela runs antigos da mesma branch
- Typecheck com `continue-on-error: true` (não bloqueia build enquanto se solidifica)

---

## Fluxo recomendado (atual)

1. **Push** → CI testa e faz build (você vê o ✓ no GitHub)
2. **Frontend** → Vercel faz deploy automático (ou via job se secrets existirem)
3. **Backend** → Render faz deploy automático (Root Directory = `server`)
4. No push em `main` o CI ainda verifica o **health da API de produção** (Render)

Solidificar depois (desktop/notebook):
- Adicionar Vitest / testes de API
- Tornar typecheck bloqueante
- Adicionar job de E2E mínimo

---

## Variáveis úteis do GitHub Actions

| Variável | Uso |
|----------|-----|
| `GITHUB_SHA` | commit exato sendo buildado |
| `GITHUB_REF` | branch/tag (`refs/heads/main`) |
| `GITHUB_TOKEN` | token automático (checkout, packages) |

Exemplo futuro:

```yaml
env:
  RELEASE: ${{ github.sha }}
  BRANCH: ${{ github.ref_name }}
```

---

## Legado

| Plataforma | Status |
|------------|--------|
| **Render** | **Canônica** (API) |
| **Vercel** | **Canônica** (Frontend + PWA) |
| Railway | Legado (trial expirado) — não usar |

Veja também: [DEPLOY.md](./DEPLOY.md) e [CHECKLIST.md](../CHECKLIST.md).

---

MIT © 2026 Producer DCS · [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
