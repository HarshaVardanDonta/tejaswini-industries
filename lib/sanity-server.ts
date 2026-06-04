import { createClient } from '@sanity/client'

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const apiVersion =
  process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2026-01-01'

const writeToken =
  process.env.SANITY_WRITE_TOKEN?.trim() ||
  process.env.VITE_SANITY_WRITE_TOKEN?.trim()

export const sanityServerClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})

export const sanityServerWriteClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
})

export const isSanityServerConfigured = Boolean(projectId && projectId !== 'placeholder')

export const isSanityServerWriteConfigured = Boolean(
  isSanityServerConfigured && writeToken,
)
