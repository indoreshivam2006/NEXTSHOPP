"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { auth, db } from "@/lib/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Define types for cart items and context
export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: CartItem) => boolean
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)
const LOCAL_CART_KEY = "nextshopp_cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // 1. Initial load from localStorage only if authenticated session
  useEffect(() => {
    try {
      if (auth.currentUser) {
        const savedCart = localStorage.getItem(`${LOCAL_CART_KEY}_${auth.currentUser.uid}`)
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  }, [])

  // 2. Auth listener: Sync with Firestore when logged in, clear when logged out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        const userCartKey = `${LOCAL_CART_KEY}_${user.uid}`
        try {
          const cartDocRef = doc(db, "carts", user.uid)
          const cartSnapshot = await getDoc(cartDocRef)
          if (cartSnapshot.exists()) {
            const data = cartSnapshot.data()
            if (Array.isArray(data.items) && data.items.length > 0) {
              setCart(data.items)
              localStorage.setItem(userCartKey, JSON.stringify(data.items))
              return
            }
          }
        } catch {
          // Fallback to local storage if firestore is offline
        }

        const savedLocal = localStorage.getItem(userCartKey)
        if (savedLocal) {
          try {
            setCart(JSON.parse(savedLocal))
          } catch {}
        }
      } else {
        setUserId(null)
        setCart([])
      }
    })

    return () => unsubscribe()
  }, [])

  // 3. Save to localStorage and Firestore on changes when user is authenticated
  useEffect(() => {
    if (!userId) return

    const userCartKey = `${LOCAL_CART_KEY}_${userId}`
    try {
      localStorage.setItem(userCartKey, JSON.stringify(cart))
    } catch {
      // Storage quota exceeded
    }

    try {
      const cartDocRef = doc(db, "carts", userId)
      setDoc(cartDocRef, {
        items: cart,
        updatedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {})
    } catch {
      // Silent catch for network issues
    }
  }, [cart, userId])

  const addToCart = (product: CartItem): boolean => {
    const currentUser = auth.currentUser
    if (!currentUser && !userId) {
      toast({
        title: "Please log in",
        description: "You must be logged in to add items to your cart.",
        variant: "destructive",
      })
      if (typeof window !== "undefined") {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search)
        router.push(`/auth/login?redirect=${returnUrl}`)
      }
      return false
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      )

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + product.quantity,
        }
        return updatedCart
      } else {
        return [...prevCart, product]
      }
    })
    return true
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
    if (userId) {
      try {
        const cartDocRef = doc(db, "carts", userId)
        setDoc(cartDocRef, { items: [], updatedAt: new Date().toISOString() }, { merge: true }).catch(() => {})
      } catch {}
    }
  }

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
