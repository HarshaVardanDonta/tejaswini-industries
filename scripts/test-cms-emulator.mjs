/**
 * Exercises Firestore rules and an admin edit against the local emulators.
 * Run via `firebase emulators:exec` so FIRESTORE_EMULATOR_HOST and
 * FIREBASE_AUTH_EMULATOR_HOST are set. Requires the seed script first.
 */
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'tejaswini-industries-32349'
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
if (!email || !password) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD.')
  process.exit(1)
}
if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.error('Start this script with firebase emulators:exec so the emulator hosts are set.')
  process.exit(1)
}

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: 'localhost',
  projectId,
})
const auth = getAuth(app)
const db = getFirestore(app)
const [firestoreHost, firestorePort] = process.env.FIRESTORE_EMULATOR_HOST.split(':')
connectFirestoreEmulator(db, firestoreHost, Number(firestorePort))
connectAuthEmulator(auth, `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true })

const publicDoc = await getDoc(doc(db, 'content', 'landingPage'))
if (!publicDoc.exists()) {
  throw new Error('Public read of content/landingPage failed. Seed the emulator first.')
}
const originalTitle = publicDoc.data().hero.title
console.log('public read ok')

let anonymousWriteFailed = false
try {
  await setDoc(doc(db, 'content', 'landingPage'), { hacked: true }, { merge: true })
} catch (error) {
  anonymousWriteFailed = String(error).includes('permission') || error.code === 'permission-denied'
}
if (!anonymousWriteFailed) throw new Error('Anonymous write was allowed.')
console.log('anonymous write denied')

await signInWithEmailAndPassword(auth, email, password)
const marker = `Emulator edit ${Date.now()}`
const current = (await getDoc(doc(db, 'content', 'landingPage'))).data()
await setDoc(doc(db, 'content', 'landingPage'), { ...current, hero: { ...current.hero, title: marker } })
const updated = await getDoc(doc(db, 'content', 'landingPage'))
if (updated.data().hero.title !== marker) throw new Error('Admin edit was not saved.')
await setDoc(doc(db, 'content', 'landingPage'), {
  ...updated.data(),
  hero: { ...updated.data().hero, title: originalTitle },
})
await signOut(auth)
console.log('admin edit ok')

const outsider = await fetch(
  `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'outsider@example.com',
      password: 'outsider-password',
      returnSecureToken: true,
    }),
  },
)
const outsiderBody = await outsider.json()
if (!outsider.ok) throw new Error(`Could not create outsider: ${JSON.stringify(outsiderBody)}`)
const outsiderApp = initializeApp({ apiKey: 'demo-key', authDomain: 'localhost', projectId }, 'outsider')
const outsiderAuth = getAuth(outsiderApp)
const outsiderDb = getFirestore(outsiderApp)
connectAuthEmulator(outsiderAuth, `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true })
connectFirestoreEmulator(outsiderDb, firestoreHost, Number(firestorePort))
await signInWithEmailAndPassword(outsiderAuth, 'outsider@example.com', 'outsider-password')
let outsiderDenied = false
try {
  await setDoc(doc(outsiderDb, 'content', 'landingPage'), { hacked: true }, { merge: true })
} catch (error) {
  outsiderDenied = error.code === 'permission-denied'
}
if (!outsiderDenied) throw new Error('Non-admin signed-in write was allowed.')
console.log('non-admin write denied')

await signOut(outsiderAuth)
const lead = {
  _type: 'lead',
  source: 'contact',
  handled: false,
  submittedAt: new Date().toISOString(),
  name: 'Test Buyer',
  company: 'Test Co',
  role: 'Consultant',
  email: 'test@example.com',
  phone: '9000000000',
  inquiryLabel: 'Product inquiry',
  kvaRating: '500',
  voltage: '11 kV',
  projectLocation: 'Hyderabad',
  message: 'Preview test, please ignore.',
}
const created = await addDoc(collection(db, 'leads'), lead)
console.log('anonymous lead create ok', created.id)

let publicReadDenied = false
try {
  await getDocs(collection(db, 'leads'))
} catch (error) {
  publicReadDenied = error.code === 'permission-denied'
}
if (!publicReadDenied) throw new Error('Anonymous lead read was allowed.')
console.log('anonymous lead read denied')

let invalidDenied = false
try {
  await addDoc(collection(db, 'leads'), { ...lead, message: 'x'.repeat(2001) })
} catch (error) {
  invalidDenied = error.code === 'permission-denied'
}
if (!invalidDenied) throw new Error('Oversized lead was allowed.')
console.log('oversized lead denied')

await signInWithEmailAndPassword(auth, email, password)
const leads = await getDocs(collection(db, 'leads'))
if (!leads.docs.some((entry) => entry.id === created.id)) throw new Error('Admin could not read the lead.')
await updateDoc(doc(db, 'leads', created.id), { handled: true, handledAt: new Date().toISOString() })
const handled = await getDoc(doc(db, 'leads', created.id))
if (handled.data().handled !== true) throw new Error('Admin could not mark the lead handled.')
console.log('admin lead inbox ok')
console.log('emulator cms test passed')
process.exit(0)
