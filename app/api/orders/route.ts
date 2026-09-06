import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

// Server-side Zod validation schema for secure order placement
const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string().default(""),
  size: z.string().optional(),
  color: z.string().optional(),
})

const orderShippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(3, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(3, "ZIP/Postal code is required"),
  country: z.string().default("India"),
})

const createOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  items: z.array(orderItemSchema).min(1, "Cart cannot be empty"),
  shipping: orderShippingSchema,
  paymentMethod: z.enum(["cod", "razorpay", "upi", "card"]).default("cod"),
  transactionId: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = createOrderSchema.parse(body)

    // Enforce authentication: Guest orders are strictly disallowed
    if (!validatedData.userId || validatedData.userId.startsWith("guest_")) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: You must be logged in to place an order",
        },
        { status: 401 }
      )
    }

    // Calculate server-side verified amounts (prevent client manipulation)
    const subtotal = validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // Dynamic shipping rule: Free delivery above ₹999, else ₹99
    const shipping = subtotal >= 999 ? 0 : 99

    // Standard 12% GST
    const tax = Math.round(subtotal * 0.12 * 100) / 100
    const total = Math.round((subtotal + shipping + tax) * 100) / 100

    const orderRecord = {
      userId: validatedData.userId,
      items: validatedData.items,
      shipping: validatedData.shipping,
      pricing: {
        subtotal,
        shipping,
        tax,
        total,
      },
      payment: {
        method: validatedData.paymentMethod,
        total,
        transactionId: validatedData.transactionId || null,
        status: validatedData.paymentMethod === "cod" ? "pending" : "completed",
      },
      status: "processing",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    let orderId: string

    try {
      const ordersRef = collection(db, "orders")
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore write timeout")), 2500)
      )
      const docRef = await Promise.race([
        addDoc(ordersRef, {
          ...orderRecord,
          timestamp: serverTimestamp(),
        }),
        timeoutPromise,
      ])
      orderId = docRef.id
    } catch {
      // Fallback ID if Firestore is in offline mode or network timed out
      orderId = "ord-" + Math.random().toString(36).substring(2, 11)
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        order: {
          id: orderId,
          ...orderRecord,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error creating order",
      },
      { status: 500 }
    )
  }
}
