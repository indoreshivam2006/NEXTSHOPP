// Database Seeding Script for NEXTSHOPP
// Usage: node scripts/seed-firestore.mjs

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import * as dotenv from "dotenv"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { readFileSync } from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, "../.env.local") })

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebaseConfig.apiKey) {
  console.error("Error: NEXT_PUBLIC_FIREBASE_API_KEY is not defined in .env.local")
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log(`Connecting to Firestore project: ${firebaseConfig.projectId}...`)

// Sample seed products
const seedProducts = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    description: "5G AI Smartphone (Silver Shadow, 12GB RAM, 256GB Storage), 50MP Camera with Galaxy AI",
    price: 80999,
    images: [
      "/samsung_25.jpg",
      "/samsung_25_1.jpg",
      "/samsung_25_2.jpg"
    ],
    category: "Electronics",
    categoryId: "4",
    featured: true,
    rating: 4.8,
    reviewCount: 9058,
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["#silver"],
    inStock: true,
  },
  {
    id: "2",
    name: "Own the Run Colorblock Jacket",
    description: "A running jacket for all your daily miles, made with recycled materials.",
    price: 5599.99,
    originalPrice: 6999.99,
    discount: 20,
    images: [
      "/jacket_1.avif",
      "/jacket_2.avif"
    ],
    category: "Jacket",
    categoryId: "1",
    featured: true,
    rating: 4.2,
    reviewCount: 95,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"],
    inStock: true,
  },
  {
    id: "3",
    name: "Decazone Boho Macrame Wall Hanging Floating Shelf",
    description: "Hand woven bohemian decor with wooden dowel for bedroom or living room.",
    price: 284.00,
    originalPrice: 899.99,
    discount: 70,
    images: ["/home.jpg", "/home1.jpg", "/home2.jpg"],
    category: "Home Decor",
    categoryId: "5",
    featured: true,
    rating: 4.2,
    reviewCount: 566,
    sizes: ["60 x 30 cm"],
    colors: ["Beige"],
    inStock: true,
  },
  {
    id: "6",
    name: "Nike Mercurial Vapor 16 Elite - Gold Edition",
    description: "Lightweight running and football boots with responsive Zoom Air cushioning for peak acceleration.",
    price: 24500.00,
    originalPrice: 24895.00,
    discount: 15,
    images: [
      "/football-shoes-1.avif",
      "/football-shoes-2.avif",
      "/football-shoes-3.avif"
    ],
    category: "Footwear",
    categoryId: "2",
    featured: true,
    rating: 4.8,
    reviewCount: 213,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["#d4af37", "#FFFFFF"],
    inStock: true,
  }
]

async function seed() {
  console.log(`Seeding ${seedProducts.length} sample products to Firestore...`)
  for (const product of seedProducts) {
    const docRef = doc(db, "products", product.id)
    await setDoc(docRef, product, { merge: true })
    console.log(`✓ Seeded product: ${product.name} (${product.id})`)
  }
  console.log("Seeding completed successfully!")
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seeding failed:", err)
  process.exit(1)
})
