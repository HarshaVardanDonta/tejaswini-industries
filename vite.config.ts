import 'dotenv/config'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { parseInquiryPayload } from './lib/contact-inquiry'
import { sendInquiryEmail } from './lib/send-inquiry-email'

function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', async () => {
          let body: unknown
          try {
            body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid JSON body' }))
            return
          }

          const { payload, errors } = parseInquiryPayload(body)
          if (!payload) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Validation failed', fields: errors }))
            return
          }

          const result = await sendInquiryEmail(payload)
          if (!result.ok) {
            res.statusCode = result.error === 'not_configured' ? 503 : 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: result.message }))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiDevPlugin()],
})
