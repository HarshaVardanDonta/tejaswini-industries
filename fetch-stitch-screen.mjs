import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { stitch } from '@google/stitch-sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const home = process.env.HOME ?? process.env.USERPROFILE
const mcp = JSON.parse(readFileSync(join(home, '.cursor', 'mcp.json'), 'utf8'))
process.env.STITCH_API_KEY =
  mcp.mcpServers.stitch.headers['X-Goog-Api-Key']

const PROJECT_ID = '4534954802294244816'

const SCREENS = [
  {
    screenId: '52f512cf72504a8abb5d2b2006c32b7b',
    outDir: join(__dirname, 'stitch', 'engineering-services-turnkey-solutions'),
  },
  {
    screenId: '8223d682430e4967a2991676710bd632',
    outDir: join(
      __dirname,
      'stitch',
      'corporate-profile-industrial-solutions-brochure'
    ),
  },
  {
    screenId: '9cf92b96e23746d7ae5fdb1439286a7d',
    outDir: join(__dirname, 'stitch', 'transformer-specification-comparison'),
  },
  {
    screenId: '9da28127aa1c477ea01210398eaff8ea',
    outDir: join(
      __dirname,
      'stitch',
      'distribution-transformers-listing-comparison'
    ),
  },
  {
    screenId: '30c05d2242334214914cd2d553ea2234',
    outDir: join(__dirname, 'stitch', 'centered-industrial-loading-state'),
  },
  {
    screenId: '5b109531c7094da4a93905972496e084',
    outDir: join(__dirname, 'stitch', 'request-quote-step-1'),
  },
  {
    screenId: '506203af41134bda909114860ea78a93',
    outDir: join(__dirname, 'stitch', 'request-quote-step-2'),
  },
  {
    screenId: '8d68c67dfc854b20bbe6e3a48a6beae9',
    outDir: join(__dirname, 'stitch', 'request-quote-step-3'),
  },
]

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

const project = stitch.project(PROJECT_ID)

for (const { screenId, outDir } of SCREENS) {
  const screen = await project.getScreen(screenId)
  const htmlUrl = await screen.getHtml()
  const imageUrl = await screen.getImage()

  mkdirSync(outDir, { recursive: true })
  writeFileSync(
    join(outDir, 'urls.json'),
    JSON.stringify({ htmlUrl, imageUrl }, null, 2)
  )
  await download(htmlUrl, join(outDir, 'index.html'))
  await download(imageUrl, join(outDir, 'screenshot.png'))
  console.log('Done:', outDir)
}
