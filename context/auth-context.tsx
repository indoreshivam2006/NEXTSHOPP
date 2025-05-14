"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { auth, googleProvider } from "@/lib/firebase/config"
import { signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth"

// Define types for user
export type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  refreshUserSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

// Session key for checking login status
const USER_SESSION_KEY = "Next_mart_auth_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)

  // Function to check and refresh the user session
  const refreshUserSession = async (): Promise<void> => {
    try {
      if (typeof window === 'undefined') return;
      
      // Get the current user from Firebase
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // Map the current user to our User type
        const updatedUser: User = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || null,
          photoURL: currentUser.photoURL || null
        };
        
        // Update the session information
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
          timestamp: Date.now(),
          userId: currentUser.uid
        }));
        
        setUser(updatedUser);
      } else {
        // No current user, but don't clear the state here
        // This function is just for refreshing, not for signing out
      }
    } catch (error) {
      console.error("Error refreshing user session:", error);
    }
  };

  // Set up auth state listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let unsubscribe: () => void;
    
    const setupAuthListener = () => {
      setLoading(true);
      
      unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // Map Firebase user to our User type
          const mappedUser: User = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || null,
            photoURL: authUser.photoURL || null
          };
          
          // Store session information
          sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
            timestamp: Date.now(),
            userId: authUser.uid
          }));
          
          setUser(mappedUser);
        } else {
          // If there's no auth user but there's a session, try to recover
          const sessionData = sessionStorage.getItem(USER_SESSION_KEY);
          
          if (sessionData) {
            // There was a session but auth state says logged out
            // This could happen during page reloads - should retry auth check
            console.log("Session found but no auth user, refreshing auth state...");
            refreshUserSession();
          } else {
            // No session data, definitely logged out
            setUser(null);
            sessionStorage.removeItem(USER_SESSION_KEY);
          }
        }
        setLoading(false);
        setAuthInitialized(true);
      });
    };
    
    setupAuthListener();
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      if (!auth.createUserWithEmailAndPassword) {
        throw new Error("Authentication service is not available");
      }
      
      const { user: newUser } = await auth.createUserWithEmailAndPassword(email, password);
      
      // Update user profile if display name is provided
      if (displayName && newUser.displayName !== displayName) {
        // In a real implementation, you'd want to update the user profile here
        // await updateProfile(newUser, { displayName });
      }
      
      // Make sure to store session info
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
          timestamp: Date.now(),
          userId: newUser.uid
        }));
      }
      
      const mappedUser: User = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.displayName || displayName || null,
        photoURL: newUser.photoURL || null
      };
      
      setUser(mappedUser);
      return mappedUser;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!auth.signInWithEmailAndPassword) {
        throw new Error("Authentication service is not available");
      }
      
      const { user: authUser } = await auth.signInWithEmailAndPassword(email, password);
      
      // Store session information
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
          timestamp: Date.now(),
          userId: authUser.uid
        }));
      }
      
      const mappedUser: User = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || null,
        photoURL: authUser.photoURL || null
      };
      
      setUser(mappedUser);
      return mappedUser;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in process");
      
      // Make sure auth and signInWithPopup are available
      if (!auth.signInWithPopup) {
        throw new Error("Google authentication is not available");
      }
      
      // Use the auth object's signInWithPopup method
      // This will use the real Google sign-in in both development and production
      const { user: authUser } = await auth.signInWithPopup(googleProvider);
      console.log("Google sign-in successful:", authUser);
      
      // Store session information
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify({
          timestamp: Date.now(),
          userId: authUser.uid
        }));
      }
      
      const mappedUser: User = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || null,
        photoURL: authUser.photoURL || null
      };
      
      setUser(mappedUser);
      return mappedUser;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      
      // Handle popup closed by user
      if (error.code === 'auth/popup-closed-by-user' || 
          error.code === 'auth/cancelled-popup-request') {
        const customError = new Error('Sign-in popup was closed before completing the sign-in process');
        customError.name = 'PopupClosedError';
        throw customError;
      }
      
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (!auth.signOut) {
        throw new Error("Authentication service is not available");
      }
      
      await auth.signOut();
      
      // Clear session information
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(USER_SESSION_KEY);
      }
      
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading: loading || !authInitialized,
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
