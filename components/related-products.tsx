"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getRelatedProducts } from "@/lib/firebase/products"
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
}

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const productsData = await getRelatedProducts(categoryId, currentProductId)
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching related products:", error)
        toast({
          title: "Error",
          description: "Failed to load related products.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [categoryId, currentProductId, toast])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden border">
            <div className="bg-gray-200 h-48 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="group rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.images[0] || "/product-placeholder.png"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <div className="font-bold">{formatPrice(product.price)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
