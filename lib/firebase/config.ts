// Firebase configuration
// This file will either load real Firebase in production or mock in development

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

// Define user type
interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

// Define types for our Firebase interfaces
interface FirebaseAuth {
  onAuthStateChanged: (callback: (user: User | null) => void) => () => void;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<{user: User}>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<{user: User}>;
  signInWithPopup: (provider?: any) => Promise<{user: User}>;
  signOut: () => Promise<void>;
  currentUser: User | null;
}

interface FirebaseFirestore {
  collection: (path: string) => any;
}

interface FirebaseStorage {
  ref: (path?: string) => any;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDp6rsiFkQUuowBKAkJD32_Wt-W8fFfrg",
  authDomain: "connectmart-976e1.firebaseapp.com",
  projectId: "connectmart-976e1",
  storageBucket: "connectmart-976e1.firebasestorage.app",
  messagingSenderId: "1007621246915",
  appId: "1:1007621246915:web:c475b0b0784bbbfaf93776",
  measurementId: "G-530737VE49"
};

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Create Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realAuth = getAuth(app);

// Set up authentication persistence
if (typeof window !== 'undefined') {
  // Enable persistent auth state for real Firebase auth
  setPersistence(realAuth, browserLocalPersistence)
    .then(() => {
      console.log("Firebase auth persistence configured successfully");
    })
    .catch((error) => {
      console.error("Error setting auth persistence:", error);
    });
}

let analytics;

// Only initialize analytics on the client side
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Analytics could not be initialized:", error);
  }
}

// Improved mock implementation for authentication
// Using localStorage to persist mock auth state between refreshes
const createMockAuth = (): FirebaseAuth => {
  const isClient = typeof window !== 'undefined'; // Check if we're in browser
  let currentUserData: User | null = null;
  
  // Try to restore user from localStorage if we're in browser
  if (isClient) {
    try {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        currentUserData = JSON.parse(storedUser);
      }
    } catch (e) {
      console.warn('Failed to load mock user from localStorage', e);
    }
  }
  
  return {
    currentUser: currentUserData,
    
    onAuthStateChanged: (callback) => {
      // Immediately call with current auth state
      callback(currentUserData);
      
      // Only set up listener if in browser
      if (isClient) {
        // Listen for storage events to sync auth state across tabs
        const handleStorageChange = (event: StorageEvent) => {
          if (event.key === 'mockUser') {
            const user = event.newValue ? JSON.parse(event.newValue) : null;
            currentUserData = user;
            callback(user);
          }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
      }
      
      return () => {};
    },
    
    createUserWithEmailAndPassword: async (email, password) => {
      const newUser: User = { 
        uid: `mock-${Date.now()}`, 
        email, 
        displayName: email.split('@')[0] 
      };
      
      if (isClient) {
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        currentUserData = newUser;
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', { 
          key: 'mockUser', 
          newValue: JSON.stringify(newUser)
        }));
      }
      
      return { user: newUser };
    },
    
    signInWithEmailAndPassword: async (email, password) => {
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const user: User = { 
        uid: `mock-${Date.now()}`, 
        email, 
        displayName: email.split('@')[0] 
      };
      
      if (isClient) {
        localStorage.setItem('mockUser', JSON.stringify(user));
        currentUserData = user;
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', { 
          key: 'mockUser', 
          newValue: JSON.stringify(user)
        }));
      }
      
      return { user };
    },
    
    signInWithPopup: async (provider) => {
      // For Google authentication, always use the real Firebase implementation
      if (provider && provider.providerId === 'google.com') {
        // Forward to the real implementation for Google authentication
        try {
          const result = await signInWithPopup(realAuth, provider);
          const user: User = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || null,
            photoURL: result.user.photoURL || null
          };
          
          if (isClient) {
            // Still store in localStorage for consistent auth state management
            localStorage.setItem('mockUser', JSON.stringify(user));
            currentUserData = user;
            window.dispatchEvent(new StorageEvent('storage', { 
              key: 'mockUser', 
              newValue: JSON.stringify(user)
            }));
          }
          
          return { user };
        } catch (error) {
          console.error("Google sign-in error:", error);
          throw error;
        }
      } else {
        // For non-Google providers or tests, use the mock implementation
        const randomNum = Math.floor(Math.random() * 1000);
        const user: User = { 
          uid: `mock-provider-${Date.now()}`, 
          email: `mock-user-${randomNum}@example.com`, 
          displayName: `Provider User ${randomNum}` 
        };
        
        if (isClient) {
          localStorage.setItem('mockUser', JSON.stringify(user));
          currentUserData = user;
          window.dispatchEvent(new StorageEvent('storage', { 
            key: 'mockUser', 
            newValue: JSON.stringify(user)
          }));
        }
        
        return { user };
      }
    },
    
    signOut: async () => {
      if (isClient) {
        localStorage.removeItem('mockUser');
        currentUserData = null;
        // Trigger storage event for other tabs
        window.dispatchEvent(new StorageEvent('storage', { 
          key: 'mockUser', 
          newValue: null
        }));
      }
    }
  };
};

// Setup mock implementations
const mockAuth: FirebaseAuth = createMockAuth();

const mockDb: FirebaseFirestore = {
  collection: (path) => ({
    doc: (id: string) => ({
      get: async () => ({
        exists: true,
        data: () => ({ 
          id, 
          name: `Mock ${path} ${id}`,
          description: 'This is mock data for development',
          createdAt: new Date(),
          price: 99.99,
          image: 'https://via.placeholder.com/300',
        }),
        id,
      }),
      set: async () => {},
      update: async () => {},
      delete: async () => {},
    }),
    add: async () => ({ id: 'mock-doc-id' }),
    where: () => ({
      get: async () => ({
        docs: Array(5).fill(0).map((_, i) => ({
          id: `mock-doc-${i}`,
          data: () => ({ 
            id: `mock-doc-${i}`, 
            name: `Mock Item ${i}`,
            description: 'This is mock data for development',
            price: 99.99 + i,
            image: 'https://via.placeholder.com/300',
          }),
        })),
        empty: false,
      }),
    }),
  }),
};

const mockStorage: FirebaseStorage = {
  ref: () => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => 'https://via.placeholder.com/300',
      },
    }),
    getDownloadURL: async () => 'https://via.placeholder.com/300',
  }),
};

// Export either real Firebase (in production) or mock (in development)
let auth: FirebaseAuth;
let db: FirebaseFirestore;
let storage: FirebaseStorage;

if (isDevelopment) {
  console.log("Using mock Firebase implementation for development (except for Google sign-in)");
  auth = mockAuth;
  db = mockDb;
  storage = mockStorage;
} else {
  console.log("Using real Firebase implementation for production");
  auth = realAuth as unknown as FirebaseAuth;
  db = getFirestore(app) as unknown as FirebaseFirestore;
  storage = getStorage(app) as unknown as FirebaseStorage;
}

export { auth, db, storage, googleProvider };
export default app;
