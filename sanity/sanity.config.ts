import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'tejaswini-industries',
  title: 'Tejaswini Industries CMS',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
})
