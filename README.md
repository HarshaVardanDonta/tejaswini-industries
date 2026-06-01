# Tejaswini Industries

Industrial marketing site (Vite + React) with **Sanity CMS** and a custom content admin at `/admin`.

## Sanity CMS setup

The `sanity/` folder is **already configured** (schemas, Studio structure, seed scripts). You do **not** need to run `npx sanity init` again — that command fails with “Given path is not empty” because the Studio lives in the existing `sanity/` directory.

Your Sanity project was created successfully:

- **Project:** tejaswini-industries  
- **Project ID:** `y5p55fqj`  
- **Dataset:** `production` (public, default)  
- **Manage:** https://www.sanity.io/manage/project/y5p55fqj  

### Finish setup

1. Copy [`.env.example`](.env.example) to `.env` (or use the `.env` already in the repo with the project ID).
2. Create an **Editor** API token at [API → Tokens](https://www.sanity.io/manage/project/y5p55fqj/api) and set `VITE_SANITY_WRITE_TOKEN` in `.env`.
3. Under **API → CORS origins**, add `http://localhost:5173` (and your production URL when you deploy).
4. Seed content: `npm run seed:sanity`
5. Start the app: `npm run dev`
   - Site: http://localhost:5173  
   - Admin: http://localhost:5173/admin/login (after seed: `admin` / `changeme`)

The admin UI is a first-party React app (sidebar navigation, sectioned forms, list views). It reads and writes Sanity via `VITE_SANITY_WRITE_TOKEN` in the browser—the same model as the former embedded Studio.

Optional: run standalone Sanity Studio with `npm run sanity:dev` for schema development only (not linked from the public site).

### Admin security note

Admin login checks username/password stored in the Sanity `adminCredentials` document (editable under **Settings → Admin Credentials** in `/admin`). Change the default password after first login. Writes and image uploads require the Editor API token in `.env`. This is basic access control, not enterprise auth.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
