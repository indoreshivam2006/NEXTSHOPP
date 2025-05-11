"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart } from "lucide-react"

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      // Simulate a delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <button
          className="w-10 h-10 border border-gray-300 flex items-center justify-center"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">{quantity}</div>
        <button
          className="w-10 h-10 border border-gray-300 flex items-center justify-center"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={loading}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}
