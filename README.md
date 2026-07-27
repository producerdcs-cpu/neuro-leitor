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

## Estrutura

```
public/
├── favicon.svg
└── hero-neural.webp          ← Capa README + hero do app

src/
├── pages/Index.tsx
└── components/
    ├── DashboardPanel.tsx
    ├── MultimodalReader.tsx
    ├── RecognitionCorrection.tsx
    ├── BioneuralEngine.tsx
    └── ArchitecturePanel.tsx
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

## Capa

Arquivo: **`public/hero-neural.webp`**

- README: `![NeuroLeitor](./public/hero-neural.webp)`
- App (Dashboard): `src="/hero-neural.webp"`

---

## Licença

MIT © 2026 Producer DCS

**GitHub:** [producerdcs-cpu/neuro-leitor](https://github.com/producerdcs-cpu/neuro-leitor)
