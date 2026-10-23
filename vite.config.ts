import 'dotenv/config'
import { existsSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Vite preview otherwise falls back to the homepage HTML for extensionless routes. */
function prerenderPreviewPlugin(): Plugin {
  return {
    name: 'prerender-preview',
    configurePreviewServer(server) {
      return () => {
        const stack = server.middlewares.stack as Array<{
          route: string
          handle: (req: IncomingMessage, res: ServerResponse, next: () => void) => void
        }>
        stack.unshift({
          route: '',
          handle(req, _res, next) {
            const raw = req.url ?? ''
            const path = raw.split('?')[0] ?? ''
            const search = raw.includes('?') ? raw.slice(raw.indexOf('?')) : ''
            if (!path || path.includes('.')) return next()
            const rel = path.endsWith('/') ? `${path}index.html` : `${path}/index.html`
            if (existsSync(join(process.cwd(), 'dist', rel))) {
              req.url = `${rel}${search}`
            }
            next()
          },
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), prerenderPreviewPlugin()],
})
