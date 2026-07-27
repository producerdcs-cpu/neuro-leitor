# 🧠 Neuro Leitor

**Leitor Multimodal com Motor Bioneural, Reconhecimento e Correção de Erros**

![Neuro Leitor](https://img.shields.io/badge/version-1.0.0-cyan?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square)

---

## Visão Geral

O **Neuro Leitor** é uma plataforma de leitura multimodal que unifica:

- **Upload e processamento** de PDF, imagem, áudio e texto
- **Reconhecimento e correção** de erros OCR, ortográficos, gramaticais e contextuais
- **Motor Bioneural** — visualização animada de rede neural em tempo real
- **Painel de Arquitetura** — pipeline, stack e roadmap

Tema **OLED Dark** com acentos neon cyan/purple, tipografia Orbitron + Inter + JetBrains Mono.

### Protótipo

🔗 [Ver protótipo no Atoms](https://atoms.dev/pt-BR/share/d71e4f814ed043f5a305e90285d79a99/v4)

---

## Estrutura do Projeto

```
src/
├── pages/
│   └── Index.tsx              ← Página principal (dashboard + navegação por abas)
├── components/
│   ├── MultimodalReader.tsx   ← Leitor Multimodal (upload + processamento)
│   ├── RecognitionCorrection.tsx ← Reconhecimento e Correção de erros
│   ├── BioneuralEngine.tsx    ← Motor Bioneural (rede neural animada)
│   ├── ArchitecturePanel.tsx  ← Painel de Arquitetura (diagramas + roadmap)
│   └── ui/                    ← Componentes Shadcn/ui
├── lib/
│   └── utils.ts               ← Utilitários (cn, formatBytes, delay)
├── index.css                  ← Estilos globais (tema escuro OLED)
├── App.tsx                    ← Roteador da aplicação
└── main.tsx                   ← Ponto de entrada React
```

### Arquivos de configuração

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | HTML principal |
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Configuração do Vite |
| `tailwind.config.ts` | Configuração do Tailwind CSS |
| `tsconfig.json` | Configuração TypeScript |
| `components.json` | Configuração Shadcn/ui |
| `site.config.json` | Metadados do site |
| `image_manifest.json` | Manifesto de imagens |

---

## Como rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

Abre em `http://localhost:5173`

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS 3 + Shadcn/ui |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Primitivos | Radix UI |

---

## Features (MVP)

- [x] Dashboard com navegação por abas
- [x] Upload drag-and-drop multimodal (PDF, imagem, áudio, texto)
- [x] Simulação de pipeline OCR / ASR / Vision / NLP
- [x] Correção de erros com classificação (OCR, ortografia, gramática, contexto)
- [x] Motor bioneural animado (Canvas 2D)
- [x] Métricas em tempo real (ativações, latência, throughput, acurácia)
- [x] Painel de arquitetura + roadmap por fases
- [x] Tema OLED dark com neon cyan/purple

---

## Roadmap

### Fase 1 — MVP ✅
UI completa, upload simulado, motor animado, correção mock.

### Fase 2 — Backend (em andamento)
API real de OCR, ASR Whisper, pipeline de correção com LLM, persistência.

### Fase 3 — Avançado
Vision captioning, TTS multilíngue, modo offline (WASM), extensão de navegador.

### Fase 4 — Escala
Fine-tuning, analytics, multi-usuário, PWA edge.

---

## Licença

MIT © 2026 Producer DCS

---

**GitHub:** [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
