import { db } from "@/lib/firebase/config"
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from "firebase/firestore"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

export interface OrderShipping {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface OrderPayment {
  method: string
  total: number
  transactionId?: string
  status?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shipping: OrderShipping
  payment: OrderPayment
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  createdAt?: any
}

export interface CreateOrderInput {
  userId: string
  items: OrderItem[]
  shipping: OrderShipping
  payment: OrderPayment
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date?: string
}

const LOCAL_ORDERS_KEY = "nextshopp_orders"

export async function createOrder(orderData: CreateOrderInput): Promise<string> {
  const normalizedOrder = {
    userId: orderData.userId,
    items: orderData.items,
    shipping: orderData.shipping,
    payment: orderData.payment,
    status: orderData.status || "processing",
    date: orderData.date || new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  try {
    const ordersCollection = collection(db, "orders")
    const docRef = await addDoc(ordersCollection, {
      ...normalizedOrder,
      serverTimestamp: serverTimestamp(),
    })

    // Also cache locally
    cacheOrderLocally({ id: docRef.id, ...normalizedOrder } as Order)
    return docRef.id
  } catch (error) {
    // If offline or permissions prevent write, persist locally
    const fallbackId = "ord-" + Math.random().toString(36).substring(2, 11)
    cacheOrderLocally({ id: fallbackId, ...normalizedOrder } as Order)
    return fallbackId
  }
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const ordersCollection = collection(db, "orders")
    const q = query(ordersCollection, where("userId", "==", userId))
    const ordersSnapshot = await getDocs(q)

    if (!ordersSnapshot.empty) {
      return ordersSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          userId: data.userId || userId,
          items: data.items || [],
          shipping: data.shipping || {},
          payment: data.payment || { method: "cod", total: 0 },
          status: data.status || "processing",
          date: data.date || (data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString()),
        } as Order
      })
    }
  } catch {
    // Network or firestore offline fallback
  }

  // Fallback to local storage cache
  return getLocalOrders(userId)
}

export async function getAllOrdersAdmin(): Promise<Order[]> {
  try {
    const ordersCollection = collection(db, "orders")
    const ordersSnapshot = await getDocs(ordersCollection)

    if (!ordersSnapshot.empty) {
      return ordersSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          userId: data.userId || "customer",
          items: data.items || [],
          shipping: data.shipping || {},
          payment: data.payment || { method: "cod", total: 0 },
          status: data.status || "processing",
          date: data.date || (data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString()),
        } as Order
      })
    }
  } catch {
    // Network or firestore offline fallback
  }

  // Return all local orders
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]")
  } catch {
    return []
  }
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<boolean> {
  if (typeof window === "undefined") return true
  try {
    const existing: Order[] = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]")
    const updated = existing.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated))
  } catch {}
  return true
}

function cacheOrderLocally(order: Order) {
  if (typeof window === "undefined") return
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]")
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([order, ...existing]))
  } catch {}
}

function getLocalOrders(userId: string): Order[] {
  if (typeof window === "undefined") return []
  try {
    const existing: Order[] = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]")
    return existing.filter((o) => o.userId === userId)
  } catch {
    return []
  }
}
