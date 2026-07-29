# NeuroLeitor API — Fase 2
FROM node:20-alpine

WORKDIR /app

# Dependências do sistema (opcional tesseract nativo — usamos tesseract.js)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

# Sessões em volume efêmero (ok para MVP)
RUN mkdir -p store/sessions

ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

EXPOSE 3001

CMD ["node", "index.js"]
