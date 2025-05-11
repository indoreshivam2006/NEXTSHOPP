import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import ProductGrid from "@/components/product-grid"
import ProductSort from "@/components/product-sort"
import ProductFilters from "@/components/product-filters"
import { getCategoryBySlug, Category } from "@/lib/firebase/categories"
import { formatRupees } from "@/lib/utils"
import { Suspense } from "react"
import { ShoppingCart, MessageCircle, Heart, ShoppingBag } from "lucide-react"

// Use the Category interface imported from firebase/categories

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found | NextShop",
      description: "The requested category could not be found on NextShop",
    }
  }

  return {
    title: `${category.name} | NextShop`,
    description: `Shop our premium selection of ${category.name} products at NextShop`,
    openGraph: {
      title: `${category.name} | NextShop`,
      description: `Explore our collection of premium ${category.name} products at NextShop`,
      type: 'website',
      url: `/categories/${category.slug}`,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  // Extract product count and rating from category data
  const productCount = category.productCount || 135
  const rating = category.rating || 4.8

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Simple Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-900 font-medium" aria-current="page">{category.name}</span>
      </nav>

      {/* Minimalist Hero Section */}
      <section className="mb-16 rounded-xl overflow-hidden bg-slate-900" aria-labelledby="category-title">
        <div className="relative">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800/80 z-10"
            style={{
              backgroundImage: params.slug === "clothing" ? "url('/cloth_bg.png')" :
                params.slug === "footwear" ? "url('/footwear_bg.jpg')" :
                params.slug === "accessories" ? "url('/Accessories_bg.jpg')" :
                params.slug === "home" ? "url('/Home_bg.jpg')" :
                params.slug === "beauty" ? "url('/beauty_bg.jpg')" :
                params.slug === "electronics" ? "url('/electronics_bg.jpg')" :
                params.slug === "toys" ? "url('/toys_bg.jpg')" :
                "",

              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
              opacity: 0.85
            }}
          ></div>
          
          {/* Content container */}
          <div className="relative px-8 py-12 md:py-16 z-30">
            <div className="max-w-3xl">
              {/* Category name with simplified design */}
              <h1 id="category-title" className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
                {category.name}
              </h1>

              {/* Simple underline */}
              <div className={`h-1 w-32 ${
                params.slug === "home" ? "bg-amber-100" :
                params.slug === "clothing" ? "bg-yellow-500" :
                params.slug === "footwear" ? "bg-red-500" :
                params.slug === "accessories" ? "bg-purple-500" :
                params.slug === "electronics" ? "bg-blue-500" :
                params.slug === "beauty" ? "bg-pink-500" :
                params.slug === "toys" ? "bg-amber-500" :
                "bg-teal-500"
              } mb-8`} aria-hidden="true"></div>

              {/* Clean description */}
              <p className="text-white/90 text-lg mb-10 max-w-xl leading-relaxed">
                {category.description || `Premium collection of ${category.name.toLowerCase()} for all your needs.`}
              </p>

              {/* Stats in minimal boxes */}
              <div className="flex flex-wrap gap-6 mb-8 relative z-30">
                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-slate-800 border border-slate-700 mr-4" aria-hidden="true">
                    <Heart className={`w-6 h-6 ${
                      params.slug === "home" ? "text-amber-100" :
                      params.slug === "clothing" ? "text-yellow-400" :
                      params.slug === "footwear" ? "text-red-400" :
                      params.slug === "accessories" ? "text-purple-400" :
                      params.slug === "electronics" ? "text-blue-400" :
                      params.slug === "beauty" ? "text-pink-400" :
                      params.slug === "toys" ? "text-amber-400" :
                      "text-teal-400"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">{rating}/5</div>
                    <div className={`text-xs ${
                      params.slug === "home" ? "text-amber-100/70" :
                      params.slug === "clothing" ? "text-yellow-300/70" :
                      params.slug === "footwear" ? "text-red-300/70" :
                      params.slug === "accessories" ? "text-purple-300/70" :
                      params.slug === "electronics" ? "text-blue-300/70" :
                      params.slug === "beauty" ? "text-pink-300/70" :
                      params.slug === "toys" ? "text-amber-300/70" :
                      "text-teal-300/70"
                    }`}>Customer Rating</div>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-slate-800 border border-slate-700 mr-4" aria-hidden="true">
                    <ShoppingBag className={`w-6 h-6 ${
                      params.slug === "home" ? "text-amber-100" :
                      params.slug === "clothing" ? "text-yellow-400" :
                      params.slug === "footwear" ? "text-red-400" :
                      params.slug === "accessories" ? "text-purple-400" :
                      params.slug === "electronics" ? "text-blue-400" :
                      params.slug === "beauty" ? "text-pink-400" :
                      params.slug === "toys" ? "text-amber-400" :
                      "text-teal-400"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">{productCount}+</div>
                    <div className={`text-xs ${
                      params.slug === "home" ? "text-amber-100/70" :
                      params.slug === "clothing" ? "text-yellow-300/70" :
                      params.slug === "footwear" ? "text-red-300/70" :
                      params.slug === "accessories" ? "text-purple-300/70" :
                      params.slug === "electronics" ? "text-blue-300/70" :
                      params.slug === "beauty" ? "text-pink-300/70" :
                      params.slug === "toys" ? "text-amber-300/70" :
                      "text-teal-300/70"
                    }`}>Products</div>
                  </div>
                </div>
              </div>

              {/* Cleaner action buttons */}
              <div className="flex flex-wrap gap-4 relative z-30">
                <Button 
                  className={`${
                    params.slug === "home" 
                      ? "bg-amber-50 hover:bg-amber-100 text-slate-900" 
                      : params.slug === "clothing"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : params.slug === "footwear"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : params.slug === "accessories"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : params.slug === "electronics"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : params.slug === "beauty"
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : params.slug === "toys"
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  } shadow-md px-6 flex items-center gap-2`}
                  size="lg"
                  aria-label="Shop Now"
                >
                  <ShoppingCart className={`w-5 h-5 ${params.slug === "home" ? "text-slate-900" : ""}`} aria-hidden="true" />
                  <span className="font-medium">Shop Now</span>
                </Button>
                
                <Button 
                  className={`${
                    params.slug === "home" 
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-amber-100/30" 
                      : params.slug === "clothing"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-yellow-500/30"
                      : params.slug === "footwear"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-red-800/20"
                      : params.slug === "accessories"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-purple-800/20"
                      : params.slug === "electronics"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-blue-800/20"
                      : params.slug === "beauty"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-pink-800/20"
                      : params.slug === "toys"
                      ? "bg-slate-900 hover:bg-slate-800 text-white border border-amber-800/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  } shadow-md px-6 flex items-center gap-2`}
                  size="lg"
                  variant="outline"
                  aria-label="View Lookbook"
                >
                  <MessageCircle className={`w-5 h-5 ${
                    params.slug === "home" ? "text-amber-100" : 
                    params.slug === "clothing" ? "text-yellow-400" :
                    params.slug === "footwear" ? "text-red-400" :
                    params.slug === "accessories" ? "text-purple-400" :
                    params.slug === "electronics" ? "text-blue-400" :
                    params.slug === "beauty" ? "text-pink-400" :
                    params.slug === "toys" ? "text-amber-400" :
                    "text-teal-400"
                  }`} aria-hidden="true" />
                  <span>View Lookbook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Product section with improved styling and accessibility */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <div className="sticky top-24 bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-bold mb-6 pb-4 border-b border-gray-100 flex items-center" id="filter-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2" aria-hidden="true">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              Refine Your Search
            </h2>
            <div aria-labelledby="filter-heading">
              <ProductFilters />
            </div>
          </div>
        </aside>

        <div className="lg:w-3/4">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-100">
            <div>
              <p className="text-gray-700 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
                <span>Showing:</span> <span className="text-indigo-700 ml-1">{category.name} Products</span>
              </p>
              <div className="text-sm text-gray-500 mt-1">Find the perfect {category.name.toLowerCase()} for your needs</div>
            </div>
            <ProductSort />
          </div>

          {/* Add Suspense boundary for better loading UX */}
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80"></div>
              ))}
            </div>
          }>
            <ProductGrid categoryId={category.id} />
          </Suspense>

          <section aria-labelledby="about-category" className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100 shadow-md">
            <h2 id="about-category" className="text-2xl font-bold mb-6 text-indigo-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-3" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              About {category.name}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our {category.name.toLowerCase()} collection features premium products sourced from the best brands and manufacturers.
                We ensure quality and durability in every item, providing you with exceptional value for your money.
              </p>
              <p>
                Whether you're looking for the latest trends or timeless classics, our {category.name.toLowerCase()} category has
                something for everyone. Shop with confidence with our easy returns and secure payment options.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" aria-hidden="true">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" x2="4" y1="22" y2="15" />
                </svg>
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" aria-hidden="true">
                  <path d="M21 5H3v14h18V5Z" />
                  <path d="M3 9h18" />
                  <path d="m9 5-2 4" />
                  <path d="m9 5-2 4" />
                  <path d="M15 5h0" />
                  <path d="M15 9h0" />
                </svg>
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600" aria-hidden="true">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span>Premium Selection</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 