"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { auth, googleProvider } from "@/lib/firebase/config"
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth"

// Clean typed user representation
export type User = {
  uid: string
  email: string | null
  displayName?: string | null
  photoURL?: string | null
  role?: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  isAdmin: boolean
  toggleAdminMode: () => void
  signUp: (email: string, password: string, displayName?: string) => Promise<User>
  signIn: (email: string, password: string) => Promise<User>
  signInWithGoogle: () => Promise<User>
  signOut: () => Promise<void>
  refreshUserSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)
const USER_SESSION_KEY = "nextshopp_auth_session"
const ADMIN_MODE_KEY = "nextshopp_admin_mode"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)
  const [adminOverride, setAdminOverride] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem(ADMIN_MODE_KEY)
      if (storedAdmin === "true") {
        setAdminOverride(true)
      }
    }
  }, [])

  const isAdmin = Boolean(
    adminOverride || 
    (user?.email && (
      user.email.toLowerCase().includes("admin") || 
      user.email === "admin@nextshopp.com" ||
      user.email.toLowerCase() === "nextshopp0904@gmail.com"
    )) ||
    user?.role === "admin"
  )

  const toggleAdminMode = () => {
    setAdminOverride((prev) => {
      const nextVal = !prev
      if (typeof window !== "undefined") {
        localStorage.setItem(ADMIN_MODE_KEY, String(nextVal))
      }
      return nextVal
    })
  }

  const mapFirebaseUser = (authUser: FirebaseUser | null): User | null => {
    if (!authUser) return null
    return {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName || null,
      photoURL: authUser.photoURL || null,
    }
  }

  // Function to refresh user session
  const refreshUserSession = async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        setFirebaseUser(currentUser)
        const mapped = mapFirebaseUser(currentUser)
        setUser(mapped)
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            USER_SESSION_KEY,
            JSON.stringify({ timestamp: Date.now(), userId: currentUser.uid })
          )
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error refreshing session:", error)
      }
    }
  }

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setFirebaseUser(authUser)
      if (authUser) {
        const mapped = mapFirebaseUser(authUser)
        setUser(mapped)
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            USER_SESSION_KEY,
            JSON.stringify({ timestamp: Date.now(), userId: authUser.uid })
          )
        }
      } else {
        setUser(null)
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(USER_SESSION_KEY)
        }
      }
      setLoading(false)
      setAuthInitialized(true)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName })
      }
      setFirebaseUser(cred.user)
      const mapped = mapFirebaseUser(cred.user)
      if (mapped && displayName) {
        mapped.displayName = displayName
      }
      setUser(mapped)
      return mapped as User
    } catch (error) {
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      setFirebaseUser(cred.user)
      const mapped = mapFirebaseUser(cred.user)
      setUser(mapped)
      return mapped as User
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      setFirebaseUser(cred.user)
      const mapped = mapFirebaseUser(cred.user)
      setUser(mapped)
      return mapped as User
    } catch (error: any) {
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        const customError = new Error("Sign-in popup was closed before completion")
        customError.name = "PopupClosedError"
        throw customError
      }
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(USER_SESSION_KEY)
      }
      setFirebaseUser(null)
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading: loading || !authInitialized,
    isAdmin,
    toggleAdminMode,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshUserSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
