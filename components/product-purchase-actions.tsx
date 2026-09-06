"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Zap, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/lib/firebase/products"

interface ProductPurchaseActionsProps {
  product: Product
}

export default function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "")
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)

  const { addToCart } = useCart()
  const { user } = useAuth()
  const { isItemInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const isInWishlist = isItemInWishlist(product.id)

  const checkAuthOrRedirect = (actionName: string, targetRedirect?: string): boolean => {
    if (!user) {
      toast({
        title: "Please log in",
        description: `You need to be logged in to ${actionName}.`,
        variant: "destructive",
      })
      const redirectTarget = targetRedirect || pathname || `/products/${product.id}`
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`)
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (!checkAuthOrRedirect("add items to your cart")) return

    setIsAddingToCart(true)
    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/thumbnail-placeholder.png",
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    })

    if (success) {
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) added to your cart.`,
      })
    }
    setTimeout(() => setIsAddingToCart(false), 400)
  }

  const handleBuyNow = () => {
    if (!checkAuthOrRedirect("purchase products", "/checkout")) return

    setIsBuyingNow(true)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/thumbnail-placeholder.png",
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    })

    router.push("/checkout")
  }

  const handleWishlistToggle = () => {
    if (!checkAuthOrRedirect("like or save items to your wishlist")) return

    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/thumbnail-placeholder.png",
        category: product.category,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">Select Size</span>
            {selectedSize && (
              <span className="text-xs text-gray-500 font-medium">Selected: {selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-white shadow-sm ring-2 ring-primary/20"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-900">Select Color</span>
            {selectedColor && (
              <span className="text-xs text-gray-500 font-medium capitalize">{selectedColor}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-primary scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                >
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        color.toLowerCase() === "white" || color.toLowerCase() === "#ffffff"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity & Stock Status */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-900 mr-3">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {product.inStock ? "In Stock · Ready to Ship" : "Out of Stock"}
        </div>
      </div>

      {/* Action Buttons: Buy Now, Add to Cart, Wishlist */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          size="lg"
          variant="outline"
          className="flex-1 rounded-full border border-[#181818]/30 text-[#181818] hover:bg-[#181818] hover:text-[#f0ebe6] h-12 text-xs font-semibold uppercase tracking-wider transition-all"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddingToCart ? "Adding..." : "Add to Bag"}
        </Button>

        <Button
          size="lg"
          className="flex-1 rounded-full bg-[#181818] hover:bg-[#38322c] text-[#f0ebe6] h-12 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
          onClick={handleBuyNow}
          disabled={isBuyingNow}
        >
          <Zap className="mr-2 h-4 w-4 fill-[#f0ebe6]" />
          {isBuyingNow ? "Processing..." : "Instant Buy"}
        </Button>

        <Button
          size="icon"
          variant="outline"
          className={`h-12 w-12 rounded-full transition-all shrink-0 border ${
            isInWishlist
              ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
              : "border-[#181818]/20 text-[#181818] hover:bg-[#181818]/5"
          }`}
          onClick={handleWishlistToggle}
          title={isInWishlist ? "Remove from wishlist" : "Save to wishlist"}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current text-red-500" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
