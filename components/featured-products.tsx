"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/firebase/products"
import { useToast } from "@/components/ui/use-toast"
import { formatRupees } from "@/lib/utils"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getFeaturedProducts()
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        toast({
          title: "Error",
          description: "Failed to load featured products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <div className="bg-gray-200 h-80 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.slice(0, 3).map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
          >
            <div className="relative h-80 overflow-hidden">
              <Image
                src={product.images[0] || "/product-placeholder.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-medium rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  {product.originalPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{formatRupees(product.price)}</span>
                      <span className="text-gray-500 line-through text-sm">
                        {formatRupees(product.originalPrice)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">{formatRupees(product.price)}</span>
                  )}
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  )
}
