"use client"

import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ArrowUpRight, ShieldCheck, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatRupees } from "@/lib/utils"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = subtotal > 0 ? 0 : 0 // Free express white-glove dispatch
  const tax = subtotal * 0.18 // 18% GST standard in India
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be signed in to proceed with secure checkout.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      router.push("/checkout")
      setIsLoading(false)
    }, 400)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-24 text-center bg-[#f0ebe6] text-[#181818]">
        <div className="w-16 h-16 rounded-full bg-[#181818]/5 border border-[#181818]/15 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-7 w-7 text-[#181818]" />
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7c7c7c] block mb-2">
          [ 00 // EMPTY SELECTION ]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-4">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#4f4742] max-w-md mx-auto mb-8">
          Explore our signature catalog to discover architectural acoustic systems, structured apparel, and interior objects.
        </p>
        <Link href="/products" className="btn-arcsphere-primary">
          <span>Explore Catalog</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20 bg-[#f0ebe6] text-[#181818]">
      <div className="mb-10">
        <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
          [ PATRON BAG // {cart.length} ITEMS ]
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#181818]">
          Shopping Bag
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items Table / List */}
        <div className="lg:col-span-8">
          <div className="rounded-[24px] bg-[#e2dacf]/30 border border-[#181818]/10 overflow-hidden shadow-sm">
            <div className="divide-y divide-[#181818]/10">
              {cart.map((item) => (
                <div key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="h-20 w-20 relative rounded-2xl overflow-hidden bg-white/70 border border-[#181818]/10 shrink-0">
                      <Image
                        src={item.image || "/thumbnail-placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#181818] tracking-tight">{item.name}</h3>
                      <div className="text-xs text-[#7c7c7c] mt-1 space-x-2 font-mono uppercase">
                        <span>Price: {formatRupees(item.price)}</span>
                        {item.size && <span>· Size: {item.size}</span>}
                        {item.color && <span>· Color: {item.color}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                    <div className="flex items-center border border-[#181818]/20 rounded-full bg-white/50 overflow-hidden">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#181818]/10 text-xs font-bold"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#181818]/10 text-xs font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="text-base font-bold text-[#181818] min-w-[90px] text-right font-mono">
                      {formatRupees(item.price * item.quantity)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#7c7c7c] hover:text-red-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#e2dacf]/50 border-t border-[#181818]/10 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-mono uppercase tracking-wider text-[#7c7c7c] hover:text-[#181818] transition-colors"
              >
                Clear Entire Bag
              </button>
              <Link href="/products" className="text-xs font-mono uppercase tracking-wider font-semibold text-[#181818] hover:underline">
                Continue Browsing Catalog →
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="rounded-[24px] bg-[#181818] text-[#f0ebe6] p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#f0ebe6] pb-4 border-b border-white/10">
              Summary Protocol
            </h3>

            <div className="space-y-3 text-xs font-mono uppercase text-[#f0ebe6]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#f0ebe6]">{formatRupees(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (18% Included)</span>
                <span className="font-bold text-[#f0ebe6]">{formatRupees(tax)}</span>
              </div>
              <div className="pt-4 border-t border-white/15 flex justify-between text-base font-bold text-[#f0ebe6]">
                <span>Total Due</span>
                <span>{formatRupees(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <span>{isLoading ? "Validating Bag..." : "Proceed to Secure Checkout"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#f0ebe6]/60 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>AES-256 Encrypted Commerce</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
