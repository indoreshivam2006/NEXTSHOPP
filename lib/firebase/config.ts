// Firebase configuration
// This file will either load real Firebase in production or mock in development

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  setPersistence, 
  browserLocalPersistence,
  UserCredential,
  Auth,
  User as FirebaseUser
} from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"
import { getStorage, FirebaseStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

// Define user type
interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBojJmQWSKd2JkP4GuX8_Uzgf9-uPMuxBY",
  authDomain: "nextshop-38869.firebaseapp.com",
  projectId: "nextshop-38869",
  storageBucket: "nextshop-38869.appspot.com",
  messagingSenderId: "962181322515",
  appId: "1:962181322515:web:e9cb5190fd0efe5e9e6ce6",
  measurementId: "G-C08S30GLEK"
};

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Create Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firebase - initialized as undefined first, then populated in the try block
let firebaseApp: FirebaseApp | undefined = undefined;
let realAuth: Auth | null = null;
let analytics;

// Initialize or get existing Firebase app
try {
  // Check if we already have initialized apps
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }
  
  // If firebaseApp is defined, initialize auth
  if (firebaseApp) {
    // Only initialize auth on the client side or in a Node.js environment
    realAuth = getAuth(firebaseApp);

    // Set up authentication persistence only on client side
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

    // Only initialize analytics on the client side
    if (typeof window !== 'undefined') {
      try {
        analytics = getAnalytics(firebaseApp);
      } catch (error) {
        console.error("Analytics could not be initialized:", error);
      }
    }
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

// Create mock implementations for database and storage
const mockDb = {
  collection: (path: string) => ({
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
      set: async (data: any) => {},
      update: async (data: any) => {},
      delete: async () => {},
    }),
    add: async (data: any) => ({ id: 'mock-doc-id' }),
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

const mockStorage = {
  ref: (path?: string) => ({
    put: async (file: any) => ({
      ref: {
        getDownloadURL: async () => 'https://via.placeholder.com/300',
      },
    }),
    getDownloadURL: async () => 'https://via.placeholder.com/300',
  }),
};

// Improved mock implementation for authentication
const createMockAuth = () => {
  const isClient = typeof window !== 'undefined';
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
    
    onAuthStateChanged: (callback: (user: User | null) => void) => {
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
    
    createUserWithEmailAndPassword: async (email: string, password: string): Promise<{user: User}> => {
      const newUser: User = { 
        uid: `mock-${Date.now()}`, 
        email, 
        displayName: email.split('@')[0] 
      };
      
      if (isClient) {
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        currentUserData = newUser;
      }
      
      return { user: newUser };
    },
    
    signInWithEmailAndPassword: async (email: string, password: string): Promise<{user: User}> => {
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
      }
      
      return { user };
    },
    
    signInWithPopup: async (provider: any): Promise<{user: User}> => {
      // For Google authentication, always use the real Firebase implementation
      if (provider && provider.providerId === 'google.com' && realAuth) {
        try {
          const result = await signInWithPopup(realAuth, provider);
          const user: User = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || null,
            photoURL: result.user.photoURL || null
          };
          
          if (isClient) {
            localStorage.setItem('mockUser', JSON.stringify(user));
            currentUserData = user;
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
        }
        
        return { user };
      }
    },
    
    signOut: async (): Promise<void> => {
      if (isClient) {
        localStorage.removeItem('mockUser');
        currentUserData = null;
      }
    }
  };
};

// Export either real Firebase (in production) or mock (in development)
let auth: any;
let db: any;
let storage: any;

// Always use real Firebase in production environment
if (isDevelopment) {
  console.log("Using mock Firebase implementation for development (except for Google sign-in)");
  auth = createMockAuth();
  db = mockDb;
  storage = mockStorage;
} else {
  console.log("Using real Firebase implementation for production");
  auth = realAuth;
  
  // Make sure firebaseApp is defined before initializing other services
  if (firebaseApp) {
    db = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
  } else {
    console.error("Firebase app not initialized properly, services may not work.");
    // Provide fallback implementations
    db = mockDb;
    storage = mockStorage;
  }
}

export { auth, db, storage, googleProvider };
export default firebaseApp;
