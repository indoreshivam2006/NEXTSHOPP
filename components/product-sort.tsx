"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "featured")

  useEffect(() => {
    // Update the sort option when URL changes
    setSortOption(searchParams.get("sort") || "featured")
  }, [searchParams])

  const handleSortChange = (value: string) => {
    setSortOption(value)
    
    // Create new URL search params
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "featured") {
      // Remove sort parameter for default sorting
      params.delete("sort")
    } else {
      // Add the selected sort option
      params.set("sort", value)
    }
    
    // Navigate to the new URL with sort parameter
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Sort by:</span>
      <Select value={sortOption} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
