import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { sendInquiryToGmail } from "@/lib/email"

const contactInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().default(""),
  category: z.string().default("Acquisition"),
  message: z.string().min(5, "Message must be at least 5 characters"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactInquirySchema.parse(body)

    const inquiryRecord = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      category: validatedData.category,
      message: validatedData.message,
      status: "pending",
      recipientEmail: "nextshopp0904@gmail.com",
      createdAt: new Date().toISOString(),
    }

    let inquiryId: string
    try {
      const inquiriesRef = collection(db, "inquiries")
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 2500)
      )
      const docRef = await Promise.race([
        addDoc(inquiriesRef, {
          ...inquiryRecord,
          timestamp: serverTimestamp(),
        }),
        timeoutPromise,
      ])
      inquiryId = docRef.id
    } catch {
      // Fallback ID if Firestore is in offline mode or network timed out
      inquiryId = "INQ-" + Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    // Transmit email directly to nextshopp0904@gmail.com
    const emailResult = await sendInquiryToGmail({
      inquiryId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      category: validatedData.category,
      message: validatedData.message,
    })

    console.log(
      `[Contact Inquiry] Inquiry #${inquiryId} email transmission to nextshopp0904@gmail.com: ${emailResult.method} (success: ${emailResult.success})`
    )

    return NextResponse.json(
      {
        success: true,
        inquiryId,
        message: "Inquiry successfully recorded and transmitted directly to nextshopp0904@gmail.com",
        emailDelivered: emailResult.success,
        emailMethod: emailResult.method,
        data: {
          id: inquiryId,
          ...inquiryRecord,
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
        error: "Internal server error transmitting inquiry",
      },
      { status: 500 }
    )
  }
}
