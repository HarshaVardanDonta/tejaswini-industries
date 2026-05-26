import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { stitch } from '@google/stitch-sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const mcp = JSON.parse(
  readFileSync(join(process.env.USERPROFILE, '.cursor', 'mcp.json'), 'utf8')
)
process.env.STITCH_API_KEY =
  mcp.mcpServers.stitch.headers['X-Goog-Api-Key']

const PROJECT_ID = '4534954802294244816'
const SCREEN_ID = 'ad3fb22cfb6249f9be709444f996b1f2'
const OUT_DIR = join(__dirname, 'stitch', 'contact-industrial-inquiry')

const project = stitch.project(PROJECT_ID)
const screen = await project.getScreen(SCREEN_ID)
const htmlUrl = await screen.getHtml()
const imageUrl = await screen.getImage()

mkdirSync(OUT_DIR, { recursive: true })

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

await download(htmlUrl, join(OUT_DIR, 'index.html'))
await download(imageUrl, join(OUT_DIR, 'screenshot.png'))
console.log('Done:', OUT_DIR)
