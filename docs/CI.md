# CI / CD — NeuroLeitor

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

## O que roda automaticamente

| Evento | Frontend | Backend | Deploy Vercel | Deploy Railway |
|--------|----------|---------|---------------|----------------|
| Push / PR (qualquer branch) | ✅ build + typecheck | ✅ smoke health | ❌ | ❌ |
| Push em `main` | ✅ | ✅ | ✅ se secret existir | ✅ se secret existir |
| Manual (Actions → Run workflow) | ✅ | ✅ | só se main | só se main |

Deploy **nunca** acontece se os Secrets não estiverem configurados — o job só imprime um aviso e passa.

---

## Secrets (GitHub → Settings → Secrets and variables → Actions)

Crie apenas o que for usar. **Nunca** coloque tokens no código ou no `.yml`.

### Frontend (Vercel) — opcional

| Secret | Onde pegar |
|--------|------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Project → Settings → General → (ou `vercel link`) |
| `VERCEL_PROJECT_ID` | Idem |

> O Vercel já faz deploy automático pelo Git. O job no Actions é **extra** (útil se quiser controlar pelo CI). Pode deixar vazio.

### Backend (Railway) — opcional

| Secret | Onde pegar |
|--------|------------|
| `RAILWAY_TOKEN` | Railway → Account → Tokens |
| `RAILWAY_SERVICE_ID` | (opcional) ID do serviço |

> Alternativa mais simples: conectar o repo no Railway e deixar o **Railway fazer o deploy no push** (sem precisar do job do Actions).

### Variáveis de ambiente do app (não são Secrets do Actions)

| Onde | Variável | Valor |
|------|----------|-------|
| Vercel (Project → Env) | `VITE_API_URL` | URL pública da API (Railway) |
| Railway (Variables) | `CORS_ORIGIN` | URL do frontend Vercel |
| Railway | `OCR_PROVIDER` etc. | `local` (ou `openai` + `OPENAI_API_KEY`) |

`OPENAI_API_KEY` (se usar) → **só no Railway** (secret do provedor), nunca no frontend nem no Git.

---

## Boas práticas já aplicadas

- `.env` e `.env.*` no `.gitignore` (só `.env.example` versionado)
- Secrets só via GitHub Actions Secrets / variáveis do provedor
- `GITHUB_TOKEN` automático para checkout e artefatos (não precisa criar)
- Deploy condicionado a `secrets.XXX != ''` → seguro por padrão
- Concurrency: cancela runs antigos da mesma branch

---

## Fluxo recomendado agora (celular)

1. Push → CI testa e faz build (você vê o ✓ no GitHub)
2. Deploy frontend continua pelo Vercel (já conectado)
3. Quando fechar Fase 2: suba a API no Railway (manual ou com `RAILWAY_TOKEN`)
4. Configure `VITE_API_URL` no Vercel → redeploy

Solidificar depois (desktop): testes unitários, job de deploy obrigatório, etc.

---

## Variáveis úteis do GitHub Actions

| Variável | Uso |
|----------|-----|
| `GITHUB_SHA` | commit exato sendo buildado |
| `GITHUB_REF` | branch/tag (`refs/heads/main`) |
| `GITHUB_TOKEN` | token automático (checkout, packages) |

Exemplo futuro no deploy:

```yaml
env:
  RELEASE: ${{ github.sha }}
  BRANCH: ${{ github.ref_name }}
```

---

MIT © 2026 Producer DCS
