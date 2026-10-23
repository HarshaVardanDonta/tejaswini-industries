# Tejaswini Industries

Industrial marketing site (Vite + React) for a distribution transformer manufacturer in Hyderabad. Content is stored in **Cloud Firestore**. Public pages are prerendered to HTML at build time. The owner edits content at `/admin` with Firebase Auth.

Firebase project: `tejaswini-industries-32349` (Spark plan, Firestore in `asia-south1`).

## Owner setup

The public Firebase web config is the default in [`src/cms/config.ts`](src/cms/config.ts). Login and the public site reach project `tejaswini-industries-32349` even when no `.env` file is present. A `VITE_FIREBASE_*` variable overrides that default when it is set.

### Local

1. Optional: copy [`.env.example`](.env.example) to `.env` if you want to point at another Firebase project or turn on the emulators. Restart `npm run dev` after any change. Vite reads `.env` only at startup.
2. Leave `VITE_FIREBASE_EMULATORS` unset to use the live Firebase project. Set `VITE_FIREBASE_EMULATORS=true` only while the Auth emulator (port 9099) and Firestore emulator (port 8080) are running.
3. In the Firebase console, confirm Email/Password sign-in is enabled.
4. Create a service account key (Project settings → Service accounts → Generate new private key). Do not commit it. Point `FIREBASE_SERVICE_ACCOUNT_JSON` at the file. The hosted site never uses this key.
5. Deploy rules: `npx firebase deploy --only firestore:rules --project tejaswini-industries-32349`
6. Seed content and create the admin user:

   ```bash
   FIREBASE_SERVICE_ACCOUNT_JSON=/absolute/path/service-account.json \
   ADMIN_EMAIL=owner@example.com \
   ADMIN_PASSWORD='choose-a-long-password' \
   npm run seed:firestore
   ```

   The script writes every content document and an `admins/{uid}` allowlist record. Firestore rules allow public reads of `content` and writes only for that UID. Passwords are not stored in Firestore.

### Vercel

7. The build works without Firebase environment variables because the public web config is compiled in. To override it, set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID` in the Vercel project (Settings → Environment Variables), using the values in `.env.example`. Also set `VITE_SITE_URL=https://www.tejaswiniindustries.com`. Do not set SMTP, a service-account JSON, or a deploy-hook secret. Redeploy after changing variables so the static HTML is rebuilt.
8. Optional: set `VITE_GA4_ID` when a GA4 property exists. Do not invent an ID. The old Universal Analytics tag is not used.

If the admin login says Firebase is missing, a local `.env` has a blank `VITE_FIREBASE_*` line. Delete that line or copy `.env.example` again, then restart the dev server.

Local emulator (no service account):

```bash
firebase emulators:exec --only auth,firestore --project tejaswini-industries-32349 \
  "ADMIN_EMAIL=owner@example.com ADMIN_PASSWORD='emulator-only-password' npm run seed:firestore"
```

Then run the site with `VITE_FIREBASE_EMULATORS=true npm run dev` and sign in at `/admin/login`.

### How content reaches Google

`npm run build` prerenders every public route to static HTML with its own title, description, canonical and JSON-LD. The HTML is generated from `scripts/seed-documents.mjs`, overlaid with any Firestore `content` documents the build can read. There is no runtime server and no deploy hook. After an admin save, run a new Vercel deploy (or `npm run build`) so crawlers receive the new HTML. Until that deploy, visitors who run JavaScript still read the latest Firestore documents. Images stay as URLs or files in the repo. Cloud Storage and Cloud Functions are not used.

### Leads

The contact form writes a document to the Firestore `leads` collection from the browser. Rules allow a public create only when the fields and size limits match, and they deny public reads. Allowlisted admins read the inbox at `/admin` and `/admin/leads` and can mark a lead handled. The Spark plan cannot email the owner when a lead arrives. Check `/admin`, or add email later with the Blaze plan or a third-party form service. Call (`tel:+919248030362`) and WhatsApp (`https://wa.me/919248030362`) both use +91 92480 30362 and stay on the form for an immediate reply.

### NAP

Address, phone, email and hours live in the Firestore document `siteSettings` (Admin → Business details) and in [`src/constants/contactInfo.ts`](src/constants/contactInfo.ts) as the baked fallback. Edit the Firestore document; do not scatter new copies through components.

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
