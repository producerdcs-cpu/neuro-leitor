# Testes — NeuroLeitor (preparação mínima)

**Status:** Estrutura preparada · dependências de teste **ainda não instaladas**.  
Objetivo: evoluir a nota de Testes (atualmente 4/10) de forma cautelosa.

---

## Situação atual (guardião)

| Camada | O que existe hoje | Tipo |
|--------|-------------------|------|
| Frontend | `tsc --noEmit` + `npm run build` | Typecheck + Build |
| Backend | Smoke `curl /api/health` no CI | Smoke local |
| Produção | Job `production-health` (Render) | Health check |

Isso já protege o pipeline. Testes unitários/E2E virão depois.

---

## Próximo passo (quando solidificar no desktop)

### 1. Instalar (só quando decidir)

```bash
# Frontend
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Backend (opcional)
cd server && npm i -D node:test  # ou vitest também
```

### 2. Scripts sugeridos (já preparados no package.json)

```json
"test": "echo \"Testes ainda não ativados — veja docs/TESTING.md\" && exit 0",
"test:unit": "vitest run",
"test:watch": "vitest"
```

### 3. Estrutura recomendada

```
src/
  __tests__/
    smoke.test.ts          ← exemplo mínimo
  components/
  ...
server/
  __tests__/
    health.test.js         ← futuro
```

### 4. Exemplo mínimo (já criado)

Arquivo: `src/__tests__/smoke.test.ts`

Quando Vitest estiver instalado, ele valida se o ambiente de teste sobe.

---

## Critérios de evolução da nota

| Nota | Critério |
|------|----------|
| 4/10 | Smoke + typecheck + build (atual) |
| 6/10 | + 3–5 testes unitários reais |
| 8/10 | + testes de API + coverage mínima |
| 9+/10 | + E2E (Playwright) em pipeline |

---

## Regras de cautela

- Não instalar Vitest no CI até o typecheck estar estável.
- Manter `continue-on-error: true` no typecheck enquanto a base de testes cresce.
- Preferir testes que não dependam de rede externa no CI.
- Health de produção já existe no job `production-health`.

---

## Comandos úteis (hoje)

```bash
# Typecheck
npx tsc --noEmit

# Build
npm run build

# Smoke backend local
cd server && node index.js &
curl http://127.0.0.1:3001/api/health
```

---

MIT © 2026 Producer DCS · NeuroLeitor
