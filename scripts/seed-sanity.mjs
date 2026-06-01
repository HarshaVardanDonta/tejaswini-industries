/**
 * Seeds Sanity with content from the static site data.
 * Requires VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_WRITE_TOKEN in .env
 */
import 'dotenv/config'
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { buildDocuments } from './seed-documents.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.VITE_SANITY_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Set VITE_SANITY_PROJECT_ID and VITE_SANITY_WRITE_TOKEN in .env before seeding.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2026-01-01',
  token,
  useCdn: false,
})

async function seed() {
  const images = JSON.parse(readFileSync(join(root, 'scripts/seed-images.json'), 'utf8'))
  const docs = buildDocuments(images)

  console.log(`Seeding ${docs.length} documents to ${projectId}/${dataset}…`)

  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log('  ✓', doc._id)
  }

  console.log('\nSeed complete.')
  console.log('Default admin login: admin / changeme')
  console.log('Update credentials in Sanity Studio → Admin Credentials.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
