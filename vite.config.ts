import 'dotenv/config'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleContactInquiry } from './lib/handle-contact-inquiry'
import { handleQuoteRequest } from './lib/handle-quote-request'

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function formApiDevPlugin(): Plugin {
  return {
    name: 'form-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readJsonBody(req)
          const result = await handleContactInquiry(body)
          sendJson(res, result.status, result.body)
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON body' })
        }
      })

      server.middlewares.use('/api/quote', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readJsonBody(req)
          const result = await handleQuoteRequest(body)
          sendJson(res, result.status, result.body)
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON body' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), formApiDevPlugin()],
})
