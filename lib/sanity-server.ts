import { createClient } from '@sanity/client'

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const apiVersion =
  process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2026-01-01'

export const sanityServerClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})

export const isSanityServerConfigured = Boolean(projectId && projectId !== 'placeholder')
