"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { cart } = useCart()

  // If someone navigates directly to this page without checking out, redirect them
  useEffect(() => {
    if (cart.length > 0) {
      router.push("/cart")
    }
  }, [cart.length, router])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We've received your order and will begin processing it right away. You will
          receive an email confirmation shortly.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="font-semibold mb-4">Order Details</h2>
          <div className="flex justify-between mb-2">
            <span>Order Number:</span>
            <span className="font-medium">#ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
