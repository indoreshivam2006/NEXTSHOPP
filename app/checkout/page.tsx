"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { formatRupees } from "@/lib/utils"
import { ShieldCheck, Truck, CreditCard, Banknote, QrCode } from "lucide-react"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi" | "cod">("cod")
  const [mounted, setMounted] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })

  useEffect(() => {
    setMounted(true)
    if (!authLoading && !user) {
      toast({
        title: "Please log in",
        description: "You must be logged in to complete your purchase.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout")
      return
    }

    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
      }))
    }
  }, [user, authLoading, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  // Dynamic shipping: Free above ₹999, else ₹99
  const shipping = subtotal >= 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.12 * 100) / 100
  const total = subtotal + shipping + tax

  // Redirect if cart is empty after mount (unless order was just completed)
  useEffect(() => {
    if (mounted && cart.length === 0 && !orderPlaced) {
      router.push("/cart")
    }
  }, [cart.length, router, mounted, orderPlaced])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your order.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout")
      return
    }

    setIsLoading(true)

    try {
      // 1. Submit order securely to server API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            size: item.size,
            color: item.color,
          })),
          shipping: formData,
          paymentMethod,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to place order")
      }

      // 2. Set orderPlaced flag, clear cart and redirect
      setOrderPlaced(true)
      clearCart()
      toast({
        title: "Order placed successfully!",
        description: `Order #${data.orderId} is being processed.`,
      })
      router.push("/checkout/success")
    } catch (error: any) {
      console.error("Order error:", error)
      toast({
        title: "Order failed",
        description: error.message || "Please check your details and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading checkout...</div>
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20 bg-[#f0ebe6] text-[#181818]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
            [ TRANSACTION // CHECKOUT PROTOCOL ]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#181818]">
            Checkout & Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-[#4f4742] mt-2 font-mono">
            Bank-grade encrypted token checkout with express white-glove courier delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address */}
              <div className="rounded-[24px] bg-[#e2dacf]/40 p-6 sm:p-8 border border-[#181818]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="h-5 w-5 text-[#181818]" />
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#181818]">
                    Shipping Destination
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House/Flat No., Street, Landmark"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Maharashtra"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">PIN Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="400001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} disabled />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="rounded-[24px] bg-[#e2dacf]/40 p-6 sm:p-8 border border-[#181818]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#181818]">
                    Payment Protocol
                  </h2>
                </div>
                <p className="text-xs text-[#7c7c7c] font-mono mb-6">
                  100% Secure & PCI-DSS compliant. Raw card telemetry is never collected.
                </p>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(val: any) => setPaymentMethod(val)}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "cod" ? "border-[#181818] bg-white/70 shadow-sm" : "border-[#181818]/15 hover:border-[#181818]/30"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <div>
                        <Label htmlFor="cod" className="font-bold text-sm uppercase tracking-wider cursor-pointer">
                          Cash / UPI on Delivery
                        </Label>
                        <p className="text-xs text-[#7c7c7c]">Pay upon signature delivery at your doorstep</p>
                      </div>
                    </div>
                    <Banknote className="h-5 w-5 text-[#181818]" />
                  </div>

                  <div
                    className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "razorpay" ? "border-[#181818] bg-white/70 shadow-sm" : "border-[#181818]/15 hover:border-[#181818]/30"
                    }`}
                    onClick={() => setPaymentMethod("razorpay")}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <div>
                        <Label htmlFor="razorpay" className="font-bold text-sm uppercase tracking-wider cursor-pointer">
                          Cards, NetBanking, Wallets
                        </Label>
                        <p className="text-xs text-[#7c7c7c]">Encrypted payment via secure Razorpay modal</p>
                      </div>
                    </div>
                    <CreditCard className="h-5 w-5 text-[#181818]" />
                  </div>

                  <div
                    className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "upi" ? "border-[#181818] bg-white/70 shadow-sm" : "border-[#181818]/15 hover:border-[#181818]/30"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <div>
                        <Label htmlFor="upi" className="font-bold text-sm uppercase tracking-wider cursor-pointer">
                          Instant UPI & QR Scan
                        </Label>
                        <p className="text-xs text-[#7c7c7c]">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <QrCode className="h-5 w-5 text-[#181818]" />
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full py-5 rounded-full bg-[#181818] hover:bg-[#38322c] text-[#f0ebe6] text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-xl disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Validating & Placing Order..." : `Confirm & Authorize Order (${formatRupees(total)})`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-[24px] bg-[#181818] text-[#f0ebe6] p-6 sm:p-8 shadow-xl sticky top-24 space-y-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#f0ebe6] pb-3 border-b border-white/10">
                Order Protocol
              </h2>

              <div className="divide-y max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0 border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">{formatRupees(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatRupees(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : formatRupees(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated GST (12%)</span>
                  <span>{formatRupees(tax)}</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatRupees(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted-foreground mt-4 text-center bg-muted/40 p-2 rounded">
                  Add {formatRupees(999 - subtotal)} more for <strong>FREE Delivery</strong>!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
