/**
 * Public Firebase web config for project tejaswini-industries-32349.
 * These values are safe to ship. A VITE_FIREBASE_* env var overrides its field.
 */
export const publicFirebaseConfig = {
  apiKey: 'AIzaSyB626vQdimA3KGEPqqLXpnZX6Cu8u0nDr8',
  authDomain: 'tejaswini-industries-32349.firebaseapp.com',
  projectId: 'tejaswini-industries-32349',
  storageBucket: 'tejaswini-industries-32349.firebasestorage.app',
  messagingSenderId: '210045151538',
  appId: '1:210045151538:web:c5cb9b1b17abded77acf2b',
} as const

function envOrPublic(value: string | undefined, fallback: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export const firebaseConfig = {
  apiKey: envOrPublic(import.meta.env.VITE_FIREBASE_API_KEY, publicFirebaseConfig.apiKey),
  authDomain: envOrPublic(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, publicFirebaseConfig.authDomain),
  projectId: envOrPublic(import.meta.env.VITE_FIREBASE_PROJECT_ID, publicFirebaseConfig.projectId),
  storageBucket: envOrPublic(
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    publicFirebaseConfig.storageBucket,
  ),
  messagingSenderId: envOrPublic(
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    publicFirebaseConfig.messagingSenderId,
  ),
  appId: envOrPublic(import.meta.env.VITE_FIREBASE_APP_ID, publicFirebaseConfig.appId),
}

export const FIREBASE_SETUP_HINT =
  'The public web config is built in, so login works without a .env file. To override it, copy .env.example to .env and restart the dev server. On Vercel, set the same VITE_FIREBASE_* variables under Project Settings → Environment Variables. They are public, not a secret. A service-account key is only for seeding and must not be committed.'

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

export const useFirebaseEmulators =
  import.meta.env.VITE_FIREBASE_EMULATORS === 'true'
