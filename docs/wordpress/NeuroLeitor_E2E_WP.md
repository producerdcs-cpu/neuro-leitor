---
title: "Validação E2E de Produção — NeuroLeitor (Resumo)"
date: 2026-08-17
categories: [NeuroLeitor, QA, Release]
---

Resumo: Este post descreve o plano de Validação E2E executado para NeuroLeitor (Fase 2) e os resultados esperados para autorizar o avanço para a Fase 3.

## Objetivo
Validar em produção (Vercel + Railway) os fluxos principais: Health, Upload/Process, Visualizar, Ouvir (TTS) e PWA install. Documentar gaps e recomendações.

## Casos críticos
- INF-01: Health API — GET /api/health deve retornar ok:true e phase:2.
- INF-03: Header "Sistema Online" deve aparecer no frontend.
- API-01/API-02: /api/process deve processar imagens/PDFs/text.
- UI-02/UI-03/UI-04: Upload, Visualizar, Ouvir.
- UI-07: PWA install.

## Como reproduzir (smoke tests)
1. Health
```
curl -s https://neuro-leitor-copy-production.up.railway.app/api/health | jq
```
2. Process (imagem)
```
curl -s -F "file=@teste.png" https://neuro-leitor-copy-production.up.railway.app/api/process | jq
```
3. Correct
```
curl -s -X POST https://neuro-leitor-copy-production.up.railway.app/api/correct \
  -H "Content-Type: application/json" \
  -d '{"text":"reconehcimento multimod@l"}' | jq
```

## Recomendações rápidas
- Sessões: armazenadas em disco (efêmero). Migrar para Redis/S3/DB ou documentar comportamento MVP.
- CORS: garantir Vercel em CORS_ORIGIN.
- Upload: considerar diskStorage/streaming se houver uploads concorrentes.

