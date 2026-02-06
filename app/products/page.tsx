"use client"

import { useState, useEffect, Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import ProductSort from "@/components/product-sort"
import { getFilteredProducts } from "@/lib/firebase/products"
import { useSearchParams } from "next/navigation"

function ProductsContent() {
  const [productCount, setProductCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProductCount = async () => {
      setLoading(true)
      try {
        // Build filters from URL params to count filtered products
        const filters: any = {};
        
        // Add category filters
        if (searchParams.has("categories")) {
          filters.categoryIds = searchParams.get("categories")?.split(",");
        }
        
        // Add brand filters
        if (searchParams.has("brands")) {
          filters.brandIds = searchParams.get("brands")?.split(",");
        }
        
        // Add color filters
        if (searchParams.has("colors")) {
          filters.colors = searchParams.get("colors")?.split(",");
        }
        
        // Add size filters
        if (searchParams.has("sizes")) {
          filters.sizes = searchParams.get("sizes")?.split(",");
        }
        
        // Add price range
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        if (minPrice || maxPrice) {
          filters.priceRange = [
            minPrice ? Number(minPrice) : 0,
            maxPrice ? Number(maxPrice) : 100000
          ];
        }
        
        // Add in-stock filter
        if (searchParams.has("inStock")) {
          filters.inStock = searchParams.get("inStock") === "true";
        }
        
        // Fetch filtered products count
        const products = await getFilteredProducts(filters);
        setProductCount(products.length);
      } catch (error) {
        console.error("Error fetching product count:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductCount();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 md:sticky md:top-4 md:self-start">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4 md:max-h-[calc(100vh+20rem)] md:overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10">
            <p className="text-gray-600">
              {loading ? (
                <span className="inline-block w-24 h-4 bg-gray-200 rounded animate-pulse"></span>
              ) : (
                `Showing ${productCount} product${productCount !== 1 ? 's' : ''}`
              )}
            </p>
            <ProductSort />
          </div>
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
