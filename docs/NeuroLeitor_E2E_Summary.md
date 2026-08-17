# NeuroLeitor — Resumo da Validação E2E de Produção

Data: 17/08/2026
Versão alvo: v0.6.2 (Fase 2)

Resumo executivo

Este documento resume o plano de Validação E2E em produção (Vercel + Railway) para o projeto NeuroLeitor. O objetivo é validar que a Fase 2 está estável em produção antes de avançar para a Fase 3 (OCR/ASR reais).

Casos críticos verificados

- INF-01: Health API — GET /api/health deve responder ok:true e phase:2
- INF-03: Header "Sistema Online" deve ser exibido no frontend
- API-01 / API-02: /api/process deve processar imagens/PDFs/text
- UI-02 / UI-03 / UI-04: Upload, Visualizar, Ouvir (TTS)
- UI-07: PWA install

Procedimentos de verificação (smoke tests)

1. Health:
   curl -s https://neuro-leitor-copy-production.up.railway.app/api/health | jq
   Critério: HTTP 200, payload ok:true, phase:2, latency < 1.5s

2. Process (imagem):
   curl -s -F "file=@teste.png" https://neuro-leitor-copy-production.up.railway.app/api/process | jq
   Critério: retorno JSON com text e/ou correctedText, job.status = done

3. Correct:
   curl -s -X POST https://neuro-leitor-copy-production.up.railway.app/api/correct \
     -H "Content-Type: application/json" \
     -d '{"text":"reconehcimento multimod@l"}' | jq
   Critério: texto corrigido retornado (items / corrections)

4. CORS / Upload via UI:
   curl -I -H "Origin: https://neuro-leitor.vercel.app" https://neuro-leitor-copy-production.up.railway.app/api/health
   Critério: sem erro CORS; frontend consegue enviar multipart/form-data

Observações técnicas importantes

- Sessões são armazenadas em disco (server/store/sessions.js). Em Railway o disco é efêmero — sessões se perdem após restart. Para persistência durável use Redis/S3/DB ou mapeie um volume persistente.
- CORS depende da variável CORS_ORIGIN. Confirme que https://neuro-leitor.vercel.app está listada.
- Versão inconsistente: index.js exibe v0.2.1 enquanto /api/health retorna version 0.2.0 — recomendo alinhar.
- Limite de upload: multer.memoryStorage com fileSize 25MB pode causar pressão de memória em uploads concorrentes; considerar diskStorage/streaming.

Ações recomendadas (itens para issue)

1. (High) Documentar comportamento efêmero das sessões ou migrar para persistência externa.
2. (High) Confirmar/atualizar CORS_ORIGIN na Railway para incluir Vercel.
3. (Medium) Sincronizar versão entre index.js e /api/health.
4. (Medium) Revisar estratégia de upload (memory → disk/streaming) se houver múltiplos uploads concorrentes.
5. (Low) Validar manifest/icons do PWA e fluxo de Service Worker após redeploy.

Evidências e tracking

- Planilha de tracking: docs/NeuroLeitor_E2E_Tracking.csv (na branch e2e-prod-validation)
- Após execução, preencher Pass/Fail e anexar evidências (curl outputs, screenshots, logs).

Responsável pela execução: (preencher)

