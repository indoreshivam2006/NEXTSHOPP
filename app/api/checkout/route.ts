import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", notes = {} } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid amount specified" },
        { status: 400 }
      )
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    // If Razorpay live/test credentials are configured, initiate real order
    if (keyId && keySecret) {
      const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Amount in paise
          currency,
          receipt: `rcpt_${Date.now().toString(36)}`,
          notes,
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        return NextResponse.json(
          { success: false, error: errData.error?.description || "Payment initiation failed" },
          { status: 502 }
        )
      }

      const orderData = await response.json()
      return NextResponse.json({
        success: true,
        provider: "razorpay",
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        key: keyId,
      })
    }

    // Secure sandbox mode when keys are not configured yet
    return NextResponse.json({
      success: true,
      provider: "sandbox",
      orderId: `order_sandbox_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency,
      message: "Sandbox payment order generated successfully.",
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initialize payment session" },
      { status: 500 }
    )
  }
}
