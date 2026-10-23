import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'

import { firebaseConfig, isFirebaseConfigured, useFirebaseEmulators } from './config'

export { isFirebaseConfigured }

let app: FirebaseApp | null = null
let auth: Auth | null = null
let firestore: Firestore | null = null
let authEmulatorConnected = false
let firestoreEmulatorConnected = false

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error(
      'Firebase web config is missing. Set the VITE_FIREBASE_* variables from .env.example.',
    )
  }
  if (!app) app = initializeApp(firebaseConfig)
  return app
}

function inBrowser() {
  return typeof window !== 'undefined' && useFirebaseEmulators
}

export function getFirebaseAuth(): Auth {
  if (!auth) auth = getAuth(getFirebaseApp())
  if (inBrowser() && !authEmulatorConnected) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    authEmulatorConnected = true
  }
  return auth
}

export function getFirebaseDb(): Firestore {
  if (!firestore) firestore = getFirestore(getFirebaseApp())
  if (inBrowser() && !firestoreEmulatorConnected) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
    firestoreEmulatorConnected = true
  }
  return firestore
}
