/**
 * Writes seed content into Cloud Firestore with the Admin SDK.
 *
 * Production (service account — never commit the JSON):
 *   FIREBASE_SERVICE_ACCOUNT_JSON=/absolute/path/to/service-account.json \
 *   ADMIN_EMAIL=owner@example.com ADMIN_PASSWORD='a-long-password' \
 *   npm run seed:firestore
 *
 * FIREBASE_SERVICE_ACCOUNT_JSON may be a file path or the raw JSON string.
 *
 * Emulator (no service account):
 *   firebase emulators:exec --only auth,firestore --project tejaswini-industries-32349 \
 *     "FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 npm run seed:firestore"
 *
 * The admin user is created only when ADMIN_EMAIL and ADMIN_PASSWORD are set.
 * Rules allow writes solely for UIDs that have an admins/{uid} document.
 */
import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { buildDocuments } from './seed-documents.mjs'
import { retiredContentIds } from './retired-content.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'tejaswini-industries-32349'
const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST)
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON

if (!usingEmulator && !serviceAccount) {
  console.error(
    'Set FIREBASE_SERVICE_ACCOUNT_JSON (file path or JSON string), or point FIRESTORE_EMULATOR_HOST at the emulator.',
  )
  process.exit(1)
}

if (serviceAccount) {
  const parsed = serviceAccount.trim().startsWith('{')
    ? JSON.parse(serviceAccount)
    : JSON.parse(readFileSync(serviceAccount, 'utf8'))
  initializeApp({ credential: cert(parsed), projectId })
} else {
  initializeApp({ projectId })
}

const images = JSON.parse(readFileSync(join(root, 'scripts/seed-images.json'), 'utf8'))
const docs = buildDocuments(images).filter((doc) => doc._type !== 'adminCredentials' && doc._type !== 'siteInquiry')
const db = getFirestore()

for (const document of docs) {
  await db.collection('content').doc(document._id).set(document)
  console.log('  ✓', document._id)
}

// Remove the retired demo documents (old placeholder blog posts and "Most Read" entries).
for (const id of retiredContentIds) {
  await db.collection('content').doc(id).delete()
  console.log('  ✗ removed retired', id)
}

const email = process.env.ADMIN_EMAIL?.trim()
const password = process.env.ADMIN_PASSWORD
if (email && password) {
  const auth = getAuth()
  let user
  try {
    user = await auth.getUserByEmail(email)
    if (!usingEmulator) {
      await auth.updateUser(user.uid, { password })
    }
  } catch {
    user = await auth.createUser({ email, password, emailVerified: true })
  }
  await db.collection('admins').doc(user.uid).set({ email })
  console.log(`Admin allowlisted: ${email} (${user.uid})`)
} else {
  console.log('Skipped admin user. Set ADMIN_EMAIL and ADMIN_PASSWORD to create one.')
}

console.log(`Seeded ${docs.length} content documents to project ${projectId}.`)
