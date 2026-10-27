/**
 * Smoke test mínimo — NeuroLeitor
 *
 * Este arquivo só passa a rodar depois de instalar Vitest:
 *   npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
 *
 * Até lá o CI continua usando apenas typecheck + build + health.
 * Veja docs/TESTING.md
 */

import { describe, it, expect } from 'vitest'

describe('NeuroLeitor — smoke', () => {
  it('ambiente de teste sobe corretamente', () => {
    expect(true).toBe(true)
  })

  it('versão do projeto está definida', () => {
    // Placeholder: quando quiser, importe do package.json ou de um constant
    expect('0.6.x').toMatch(/^0\.6/)
  })
})
