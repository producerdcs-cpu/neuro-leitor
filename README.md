# 🧠 NeuroLeitor

**BioData Reader v0.3 — Plataforma de Inteligência Bioneural**

![NeuroLeitor](./public/hero-neural.webp)

![version](https://img.shields.io/badge/version-0.3.0-cyan?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square)

---

## Visão Geral

O **NeuroLeitor** é uma plataforma de leitura multimodal com motor bioneural:

- **Painel Principal** — métricas em tempo real, status do sistema e hero neural
- **Leitor Multimodal** — upload de PDF, imagem, áudio e texto
- **Reconhecimento & Correção** — erros OCR, ortográficos, gramaticais e contextuais
- **Motor Bioneural** — rede neural animada (Canvas 2D) + métricas
- **Arquitetura & Roadmap** — pipeline, stack e fases de evolução

Tema **OLED Dark** com acentos neon cyan / purple / orange.

### Protótipo

🔗 [Ver protótipo no Atoms](https://atoms.dev/pt-BR/share/d71e4f814ed043f5a305e90285d79a99/v4)

---

## Estrutura do Projeto

```
src/
├── pages/
│   └── Index.tsx                 ← Dashboard + navegação por abas
├── components/
│   ├── DashboardPanel.tsx        ← Painel Principal (hero + métricas)
│   ├── MultimodalReader.tsx      ← Leitor Multimodal
│   ├── RecognitionCorrection.tsx ← Reconhecimento e Correção
│   ├── BioneuralEngine.tsx       ← Motor Bioneural animado
│   ├── ArchitecturePanel.tsx     ← Arquitetura + Roadmap
│   └── ui/                       ← Shadcn/ui
├── lib/utils.ts
├── index.css
├── App.tsx
└── main.tsx

public/
├── favicon.svg
├── hero-neural.webp              ← Capa / hero
└── readme-cover.webp
```

---

## Como rodar

```bash
git clone https://github.com/producerdcs-cpu/neuro-leitor.git
cd neuro-leitor
npm install
npm run dev
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

---

## Features (v0.3)

- [x] Painel Principal com hero neural e métricas
- [x] 5 abas de navegação
- [x] Upload drag-and-drop multimodal
- [x] Pipeline simulado OCR / ASR / Vision / NLP
- [x] Correção de erros
- [x] Motor bioneural animado
- [x] Status do sistema (Transformer, SNN, GNN)
- [x] Arquitetura + roadmap
- [x] Tema OLED dark neon

---

## Roadmap

| Fase | Status |
|------|--------|
| **1 — MVP** | ✅ |
| **2 — Backend** OCR, Whisper, LLM | 🔄 |
| **3 — Avançado** Vision, TTS, WASM | 📋 |
| **4 — Escala** Fine-tuning, PWA | 📋 |

---

## Licença

MIT © 2026 Producer DCS

**GitHub:** [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
