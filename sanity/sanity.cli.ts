import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'placeholder',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  },
  studioHost: 'tejaswini-industries',
})
