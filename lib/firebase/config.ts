// Firebase Configuration
// Uses environment variables for security and initializes standard Firebase SDK services

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app"
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence,
  Auth
} from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"
import { getStorage, FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Google Auth Provider setup
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})

// Initialize Firebase App safely (singleton pattern)
let app: FirebaseApp
if (!getApps().length) {
  // If API key is present, initialize with config
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig)
  } else {
    // Graceful fallback for build/test environments where env might not be loaded yet
    app = initializeApp({
      apiKey: "demo-api-key-placeholder",
      authDomain: "demo.firebaseapp.com",
      projectId: "demo-project",
      storageBucket: "demo.appspot.com",
      messagingSenderId: "000000000000",
      appId: "1:000000000000:web:0000000000000000000000",
    })
  }
} else {
  app = getApp()
}

// Initialize core Firebase services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

// Set browser auth persistence on client side
if (typeof window !== "undefined" && auth) {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    // Silent fail for non-critical persistence errors in strict privacy modes
    if (process.env.NODE_ENV === "development") {
      console.warn("Auth persistence notice:", error?.message || error)
    }
  })
}

export default app
