"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getCategories } from "@/lib/firebase/categories"
import { useToast } from "@/components/ui/use-toast"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [toast])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-24 animate-pulse" />
            <div className="p-2 text-center">
              <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {categories.map((category) => (
        <Link
          href={`/categories/${category.slug}`}
          key={category.id}
          className="group rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
        >
          <div className="relative h-24 overflow-hidden">
            <Image
              src={category.image || "/category-placeholder.png"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          </div>
          <div className="p-2 text-center">
            <h3 className="font-medium text-sm">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
