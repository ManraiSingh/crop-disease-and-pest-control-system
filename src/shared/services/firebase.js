// Firebase config — supply real values via .env (see .env.example).
//
// Every field is optional at build time so the app still runs with no Firebase
// project configured: `isFirebaseConfigured` stays false, `getDb()` returns null,
// and callers fall back to local-only behaviour instead of throwing.
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// apiKey and projectId are the two the Firestore client cannot start without.
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let db = null

/** Firestore instance, or null when no Firebase project is configured. */
export function getDb() {
  if (!isFirebaseConfigured) return null

  if (!db) {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
    db = getFirestore(app)
  }

  return db
}

export default firebaseConfig
