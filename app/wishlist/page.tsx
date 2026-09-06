"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { useWishlist, WishlistItem } from "@/context/wishlist-context"
import { Heart, Trash2 } from "lucide-react"
import { formatRupees } from "@/lib/utils"

export default function WishlistPage() {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { wishlist, removeFromWishlist } = useWishlist()

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      router.push("/auth/login?redirect=/wishlist")
      return
    }

    // Set loading to false after a short delay to ensure wishlist is loaded
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [user, router])

  const handleAddToCart = (product: WishlistItem) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-64"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            You haven't added any products to your wishlist yet. Start exploring our products to find items you love.
          </p>
          <Button asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden group">
            <div className="relative h-64">
              <Image
                src={product.image || "/product-placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-600 hover:text-red-500"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              {product.category && <p className="text-gray-600 text-sm mb-2">{product.category}</p>}
              <div className="flex justify-between items-center">
                <span className="font-bold">{formatRupees(product.price)}</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/products/${product.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
