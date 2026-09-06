"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  ArrowUpRight,
  Check,
  Eye,
  Heart,
  LucideIcon,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export interface ProductFeature {
  icon: LucideIcon
  text: string
}

export interface ExpandableProductItem {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  tag?: string
  description: string
  features: ProductFeature[]
}

interface ProductExpandableCardProps {
  product: ExpandableProductItem
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
}

export function ProductExpandableCard({
  product,
  isExpanded,
  onToggle,
  onClose,
}: ProductExpandableCardProps) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { isItemInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const router = useRouter()

  const [isAdding, setIsAdding] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isWishlisted = isItemInWishlist(product.id)

  useEffect(() => {
    setMounted(true)
  }, [])

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Close on Escape key
  useEffect(() => {
    if (!isExpanded) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isExpanded, onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isExpanded])

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add products to your shopping bag.",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=${encodeURIComponent("/products/" + product.id)}`)
      return
    }

    setIsAdding(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    } as any)

    toast({
      title: "Bag Updated",
      description: `${product.name} added to your bag.`,
    })

    setTimeout(() => setIsAdding(false), 600)
  }

  const handleBuyNow = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your order.",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=${encodeURIComponent("/checkout")}`)
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    } as any)

    router.push("/checkout")
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save items to your wishlist.",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=${encodeURIComponent("/products/" + product.id)}`)
      return
    }

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your saved list.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      } as any)
      toast({
        title: "Saved to Wishlist",
        description: `${product.name} added to your saved list.`,
      })
    }
  }

  return (
    <>
      {/* --- 1. Architectural Product Card (Proper Vertical Grid Item) --- */}
      <div
        onClick={onToggle}
        className="group relative w-full rounded-[28px] bg-white border border-[#181818]/10 hover:border-[#181818]/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
      >
        {/* Visual Stage Container */}
        <div className="relative w-full aspect-[4/3] bg-[#f0ebe6]/60 p-6 flex items-center justify-center overflow-hidden border-b border-[#181818]/8">
          {/* Top Pill Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold text-[#181818] shadow-xs border border-[#181818]/5">
              {product.tag || "Curated Edition"}
            </span>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleWishlistToggle}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs border border-[#181818]/5 text-[#181818] hover:scale-110 active:scale-95 transition-all"
              title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              aria-label="Toggle Wishlist"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-[#181818]/70"
                }`}
              />
            </button>
          </div>

          {/* Product Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full max-h-[175px] sm:max-h-[195px] mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />
          </div>

          {/* Hover Inspect Indicator Pill */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <span className="px-4 py-1.5 rounded-full bg-[#181818]/90 backdrop-blur-md text-white text-[11px] font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-md">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Specifications</span>
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
          <div>
            {/* Category */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#7c7c7c] uppercase">
                {product.category}
              </span>
              {discountPercent > 0 && (
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Product Title */}
            <h3 className="text-base sm:text-lg font-bold text-[#181818] tracking-tight leading-snug group-hover:text-[#4f4742] transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Rating Stars */}
            <div className="flex items-center mt-2 gap-1.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-[#7c7c7c]">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>

          {/* Price & Primary Action Row */}
          <div className="pt-3 border-t border-[#181818]/8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold font-mono text-[#181818]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#7c7c7c] line-through font-mono">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <Button
              type="button"
              onClick={handleAddToCart}
              size="sm"
              className="rounded-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] text-xs font-semibold uppercase tracking-wider px-4 py-2 h-9 flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              {isAdding ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5" />
              )}
              <span>{isAdding ? "Added" : "Add"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* --- 2. Silky-Smooth Centered Studio Inspect Modal (Portaled directly to document.body) --- */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
                {/* Backdrop with Smooth Blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/50 backdrop-blur-md"
                  aria-label="Close modal backdrop"
                />

            {/* Centered Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-[32px] border border-[#181818]/15 shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Left Column: Visual Presentation */}
              <div className="md:w-5/12 bg-[#f0ebe6]/70 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#181818]/10 relative">
                {/* Header Tag */}
                <div className="flex items-center justify-between w-full">
                  <Badge
                    variant="secondary"
                    className="bg-[#181818]/10 text-[#181818] border-0 text-[11px] font-mono tracking-wider uppercase font-semibold"
                  >
                    {product.tag || "Signature Release"}
                  </Badge>
                  <span className="text-[10px] font-mono tracking-widest text-[#7c7c7c] uppercase">
                    {product.category}
                  </span>
                </div>

                {/* Hero Product Visual */}
                <div className="my-6 sm:my-8 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full max-h-[240px] sm:max-h-[280px] mix-blend-multiply"
                  />
                </div>

                {/* Studio Trust Badge */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7c7c7c] pt-3 border-t border-[#181818]/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Studio Original
                  </span>
                  <span>ArcSphere Protocol</span>
                </div>
              </div>

              {/* Right Column: Architectural Specifications & Actions */}
              <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[75vh] md:max-h-[85vh]">
                <div>
                  {/* Top Bar: Kicker + Close Button */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7c7c7c]">
                      [ SPECIFICATION SHEET ]
                    </span>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-9 h-9 rounded-full bg-[#181818]/5 hover:bg-[#181818] hover:text-[#f0ebe6] transition-all flex items-center justify-center text-[#181818]"
                      aria-label="Close specifications"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Product Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] leading-tight mb-2">
                    {product.name}
                  </h2>

                  {/* Star Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[#4f4742] font-medium">
                      {product.reviews} verified reviews · {product.rating} / 5.0
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-3 mb-5 p-3.5 rounded-2xl bg-[#f0ebe6]/40 border border-[#181818]/8">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-[#181818]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#7c7c7c] line-through font-mono">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="ml-auto text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Save ₹{(product.originalPrice! - product.price).toLocaleString("en-IN")} ({discountPercent}% OFF)
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4f4742] leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Architectural Specifications Grid (Zero Truncation) */}
                  <div className="mb-6">
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#7c7c7c] mb-3">
                      Architectural & Material Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#f0ebe6]/50 border border-[#181818]/10">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-xs font-medium text-[#181818]"
                        >
                          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#181818]/10 shadow-xs mt-0.5">
                            <feature.icon className="w-3.5 h-3.5 text-[#181818]" />
                          </div>
                          <span className="leading-snug pt-0.5 text-[#4f4742]">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Block */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 mb-4">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] text-xs font-bold uppercase tracking-wider py-3.5 h-12 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      variant="outline"
                      className="w-full border-[#181818]/25 hover:bg-[#181818] hover:text-[#f0ebe6] text-[#181818] text-xs font-bold uppercase tracking-wider py-3.5 h-12 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>Instant Buy</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Trust Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#7c7c7c] pt-3 border-t border-[#181818]/10 gap-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Free Dispatch & Taxes Included
                    </span>
                    <span>30-Day Return Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}
