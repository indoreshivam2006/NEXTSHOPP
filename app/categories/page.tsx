import { Metadata } from "next"
import Link from "next/link"
import React from "react"
import Categories from "@/components/categories"
import { getCategories } from "@/lib/firebase/categories"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ChevronRight, ShieldCheck, Truck, Heart, HeartHandshake } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

export const metadata: Metadata = {
  title: "Smart Collections 2025 | NextShop",
  description: "Browse product categories with next-generation fashion and embedded tech",
}

// Custom styles for particle animations
const particleAnimation = `
  @keyframes float-up {
    0% { transform: translateY(0) translateX(0); opacity: 0.2; }
    50% { transform: translateY(-40px) translateX(15px); opacity: 0.6; }
    100% { transform: translateY(-80px) translateX(0); opacity: 0; }
  }
  
  @keyframes float-around {
    0% { transform: translateY(0) translateX(0) rotate(0deg); }
    33% { transform: translateY(-10px) translateX(10px) rotate(120deg); }
    66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
    100% { transform: translateY(0) translateX(0) rotate(360deg); }
  }
  
  .particle {
    position: absolute;
    animation-name: float-up;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  
  .particle-float {
    position: absolute;
    animation-name: float-around;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 12s;
  }
`;

export default async function CategoriesPage() {
  // Fetch categories on the server side for SEO
  const categories = await getCategories()
  
  // Define fallback image sources
  const desktopFallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Crect fill='%23f8fafc' width='800' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='24' fill='%2364748b'%3ECategory Navigation Preview%3C/text%3E%3C/svg%3E";
  const mobileFallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 400 600'%3E%3Crect fill='%23f8fafc' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='24' fill='%2364748b'%3EMobile Navigation Preview%3C/text%3E%3C/svg%3E";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add style tag for animations */}
      <style dangerouslySetInnerHTML={{ __html: particleAnimation }} />
      
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex py-4 px-4 md:px-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">Smart Collections</span>
        </nav>
        
        {/* Navigation Preview Section */}
        <section className="bg-white rounded-lg shadow-sm mb-8 mx-4 md:mx-8">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Navigation</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our categories through the navigation bar dropdown menu or on mobile devices.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Desktop Preview */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Desktop Navigation</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <ImageWithFallback 
                    src="/category-nav-desktop.svg" 
                    alt="Desktop Category Navigation" 
                    className="w-full h-auto rounded border border-gray-200"
                    fallbackSrc={desktopFallbackSrc}
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <p>The desktop category dropdown displays items in a clean grid layout with category information and discount badges.</p>
                  </div>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Mobile Navigation</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <ImageWithFallback 
                    src="/category-nav-mobile.svg" 
                    alt="Mobile Category Navigation" 
                    className="w-full h-auto rounded border border-gray-200 max-w-[250px] mx-auto"
                    fallbackSrc={mobileFallbackSrc}
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <p>On mobile devices, categories expand in a compact list view for easy selection and navigation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black">
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==')] opacity-60"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 px-4 md:px-8 py-16 md:py-24">
            {/* Horizontal progress tracker */}
            <div className="w-full max-w-5xl mx-auto mb-16">
              <div className="relative">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-white"></div>
                <div className="absolute -top-1 left-1/4 w-2 h-2 rounded-full bg-white"></div>
                <div className="absolute -top-1 left-2/4 w-2 h-2 rounded-full bg-white"></div>
                <div className="absolute -top-1 left-3/4 w-2 h-2 rounded-full bg-white"></div>
                <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
              {/* Left column - Typography */}
              <div className="md:col-span-5">
                {/* Eyebrow text */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-white to-transparent mr-4"></div>
                  <span className="text-white/70 text-sm tracking-widest uppercase font-light">2025 Collection</span>
                </div>
                
                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl font-[300] text-white mb-6 leading-[1.1]">
                  <span className="block">Smart</span>
                  <span className="block font-[600] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">Fashion</span>
                  <span className="block mt-2 text-3xl md:text-4xl">with embedded tech</span>
                </h1>
                
                <p className="text-white/70 text-lg mb-10 max-w-md leading-relaxed font-light">
                  Experience next-generation fashion with adaptive materials and integrated technology. Limited releases available now.
                </p>
                
                {/* Button with neumorphic styling */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
                  <Link href="/products" className="relative flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full overflow-hidden">
                    <span className="relative z-10 font-medium">Explore Collection</span>
                    <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
              
              {/* Right column - Feature cards */}
              <div className="md:col-span-7">
                <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[450px] perspective-[1000px]">
                  {/* Main feature card */}
                  <div className="col-span-8 row-span-8 col-start-5 row-start-1 transform rotate-y-[-10deg] rotate-x-[5deg] translate-z-[30px] hover:translate-z-[40px] transition-transform duration-300">
                    <FeatureCard 
                      title="Neural Fabric"
                      description="Adaptive materials that respond to your body temperature, environment, and biometric data."
                      icon={<RenderIcon type="neural" />}
                      status="CONNECTED"
                      statusColor="bg-green-400"
                      gradient="from-indigo-500 to-purple-600"
                      metric="CAPACITANCE: 98.3%"
                      lastUpdate="Last sync: 3 min ago"
                      isLarge={true}
                    />
                  </div>
                  
                  {/* Small feature card 1 */}
                  <div className="col-span-5 row-span-5 col-start-1 row-start-4 transform rotate-y-[12deg] rotate-x-[-4deg] translate-z-[-20px] hover:translate-z-[-10px] transition-transform duration-300 z-10">
                    <FeatureCard 
                      title="Bio-Sensing"
                      description="Real-time health monitoring"
                      icon={<RenderIcon type="bio" />}
                      gradient="from-purple-500 to-pink-600"
                      isLarge={false}
                    />
                  </div>
                  
                  {/* Small feature card 2 */}
                  <div className="col-span-5 row-span-5 col-start-1 row-start-9 transform rotate-y-[8deg] rotate-x-[8deg] translate-z-[15px] hover:translate-z-[25px] transition-transform duration-300">
                    <FeatureCard 
                      title="Thermal Sync"
                      description="Auto-adjusting temperature"
                      icon={<RenderIcon type="thermal" />}
                      gradient="from-blue-500 to-cyan-500"
                      isLarge={false}
                    />
                  </div>
                  
                  {/* Small feature card 3 */}
                  <div className="col-span-5 row-span-5 col-start-8 row-start-9 transform rotate-y-[-8deg] rotate-x-[10deg] translate-z-[20px] hover:translate-z-[30px] transition-transform duration-300">
                    <FeatureCard 
                      title="Adaptive Fit"
                      description="Morphing structure design"
                      icon={<RenderIcon type="adaptive" />}
                      gradient="from-emerald-500 to-green-600"
                      isLarge={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collections Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 rounded-full text-indigo-600 text-sm font-medium mb-4">
              Discover
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Smart Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse our curated 2025 product categories featuring advanced technology and adaptive materials.
            </p>
          </div>
          
          <div className="collections">
            <div className="collection-grid grid grid-cols-1 md:grid-cols-2 gap-8">
              <CategoryCard category={{ name: "Basic Needs", slug: "basic-needs", id: 1, description: "Essentials for daily living, comfort, and well-being." }} />
              <CategoryCard category={{ name: "Clothing", slug: "clothing", id: 2, description: "Innovative apparel with adaptive materials." }} />
              <CategoryCard category={{ name: "Footwear", slug: "footwear", id: 3, description: "Smart shoes for comfort and performance." }} />
              <CategoryCard category={{ name: "Home", slug: "home", id: 4, description: "Smart home solutions for modern living." }} />
              <CategoryCard category={{ name: "Electronics", slug: "electronics", id: 5, description: "Cutting-edge devices for everyday use." }} />
              <CategoryCard category={{ name: "Beauty", slug: "beauty", id: 6, description: "Advanced beauty products for self-care." }} />
            </div>
            <div className="collection-footer">
              <span>Starting from ₹1,499</span>
              <span>• Free Shipping • In Stock</span>
              <button>Browse Collection →</button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="relative bg-white overflow-hidden">
          {/* Left dark panel */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-900"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-12 gap-0">
              {/* Left side - Dark panel with heading */}
              <div className="col-span-12 md:col-span-4 bg-gray-900 text-white py-24 px-8 relative">
                <div className="sticky top-24">
                  <div className="mb-8">
                    <div className="inline-block px-3 py-1 border border-white/20 rounded text-xs font-semibold tracking-wider uppercase mb-6">
                      About NextShop
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      Our <br/>
                      <span className="text-indigo-400">Vision</span> &<br/>
                      <span className="text-indigo-400">Values</span>
                    </h2>
                    <div className="w-16 h-1 bg-indigo-400 mb-6"></div>
                    <p className="text-white/70 mb-8">
                      We're creating a new standard for digital commerce—one that combines cutting-edge technology with ethical practices and sustainable operations.
                    </p>
                    
                    <div className="space-y-6 mt-16">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-400 mr-3"></div>
                        <span className="text-white/80 text-sm">Launched 2023</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-400 mr-3"></div>
                        <span className="text-white/80 text-sm">185+ Countries</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-indigo-400 mr-3"></div>
                        <span className="text-white/80 text-sm">Carbon Neutral</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Magazine style content */}
              <div className="col-span-12 md:col-span-8 p-8 md:p-24 bg-white">
                {/* Feature 1 */}
                <div className="mb-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                      <div className="text-xs font-bold text-indigo-600 mb-4 tracking-wider uppercase">Transparent Supply Chain</div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-900">We verify every step of production</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        From raw materials to finished products, we track and verify every step using blockchain technology. Each item comes with a digital certificate of authenticity and history.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <ShieldCheck className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">100% Verified</div>
                          <div className="text-sm text-gray-500">Blockchain authenticated</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center p-10">
                      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 opacity-20">
                          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldCheck className="text-white" size={80} strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="mb-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 bg-gray-100 rounded-lg h-full flex items-center justify-center p-10">
                      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 opacity-20">
                          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id="grid2" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid2)" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Truck className="text-white" size={80} strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <div className="text-xs font-bold text-emerald-600 mb-4 tracking-wider uppercase">Sustainable Logistics</div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-900">Carbon-neutral delivery network</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Our delivery fleet runs on renewable energy, and we offset any remaining carbon footprint through vetted reforestation and carbon capture projects.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Truck className="text-emerald-600" size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">-32% CO₂</div>
                          <div className="text-sm text-gray-500">Emissions reduction YoY</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                      <div className="text-xs font-bold text-amber-600 mb-4 tracking-wider uppercase">Community Impact</div>
                      <h3 className="text-3xl font-bold mb-6 text-gray-900">Giving back with every purchase</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Each transaction contributes to our foundation that supports education and technology access for underserved communities worldwide.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                          <Heart className="text-amber-600" size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">$2.4M+</div>
                          <div className="text-sm text-gray-500">Donated in 2024</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center p-10">
                      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 opacity-20">
                          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id="grid3" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid3)" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Heart className="text-white" size={80} strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom badge */}
                <div className="mt-24 flex justify-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                    <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-gray-600">NextShop is carbon negative since 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Reusable Component for 3D Tech Feature Cards
function FeatureCard({
  title,
  description,
  icon,
  gradient,
  status,
  statusColor,
  metric,
  lastUpdate,
  isLarge
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  status?: string;
  statusColor?: string;
  metric?: string;
  lastUpdate?: string;
  isLarge: boolean;
}) {
  return (
    <div className="h-full w-full rounded-2xl p-0.5 bg-gradient-to-br from-white/20 via-transparent to-transparent">
      <div className={`h-full w-full rounded-2xl backdrop-blur-md bg-black/40 overflow-hidden ${isLarge ? 'p-6' : 'p-5'} shadow-[0_0_20px_rgba(91,33,182,0.1)]`}>
        {isLarge ? (
          <div className="flex flex-col h-full">
            <div className="mb-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-indigo-500/20 mr-3`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
                {status && (
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${statusColor} mr-1.5`}></div>
                    <span className="text-xs text-white/60">{status}</span>
                  </div>
                )}
              </div>
              <p className="text-white/70 mb-6">{description}</p>
            </div>
            
            <div className="h-48 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-sm">
                <div className="font-medium">{metric}</div>
                <div className="opacity-60 text-xs">{lastUpdate}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mr-3`}>
              {icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
              <p className="text-white/60 text-sm">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// New Feature Block component 
function FeatureBlock({ 
  icon, 
  title, 
  description, 
  accentColor,
  metric
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  metric: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-gray-800 rounded-xl p-6 h-full flex flex-col">
        <div className="mb-6 flex justify-between items-start">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${accentColor} shadow-lg`}>
            {icon}
          </div>
          <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
            {metric}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>
        <div className="mt-auto">
          <div className={`h-1 w-full rounded-full bg-white/5 overflow-hidden`}>
            <div className={`h-full w-2/3 bg-gradient-to-r ${accentColor}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Category card component
function CategoryCard({ category }: { category: any }) {
  // Define color based on category
  const colors: Record<string, { gradient: string, light: string, medium: string }> = {
    "Clothing": { 
      gradient: "from-blue-600 to-blue-800", 
      light: "bg-blue-50", 
      medium: "bg-blue-100" 
    },
    "Footwear": { 
      gradient: "from-red-600 to-red-800", 
      light: "bg-red-50", 
      medium: "bg-red-100" 
    },
    "Accessories": { 
      gradient: "from-purple-600 to-purple-800", 
      light: "bg-purple-50", 
      medium: "bg-purple-100" 
    },
    "Electronics": { 
      gradient: "from-blue-500 to-blue-700", 
      light: "bg-blue-50", 
      medium: "bg-blue-100" 
    },
    "Home": { 
      gradient: "from-amber-500 to-amber-700", 
      light: "bg-amber-50", 
      medium: "bg-amber-100" 
    },
    "Home Appliances": { 
      gradient: "from-amber-500 to-amber-700", 
      light: "bg-amber-50", 
      medium: "bg-amber-100" 
    },
    "Beauty": { 
      gradient: "from-pink-600 to-pink-800", 
      light: "bg-pink-50", 
      medium: "bg-pink-100" 
    },
    "Basic Needs": {
      gradient: "from-teal-600 to-teal-800",
      light: "bg-teal-50",
      medium: "bg-teal-100"
    },
  };
  
  // Default color if category not in our mapping
  const defaultColors = { 
    gradient: "from-indigo-600 to-purple-600", 
    light: "bg-indigo-50", 
    medium: "bg-indigo-100" 
  };
  
  const colorSet = colors[category.name] || (category.slug === "basic-needs" ? colors["Basic Needs"] : defaultColors);
  
  // Define icons based on category
  const getCategoryIcon = (categoryName: string, slug?: string) => {
    switch(categoryName) {
      case "Clothing":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
          </svg>
        );
      case "Footwear":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M2 14h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Z"/>
            <path d="M6 14v-3a1 1 0 0 1 1-1h12"/>
            <path d="M4 14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
          </svg>
        );
      case "Electronics":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" x2="16" y1="21" y2="21"/>
            <line x1="12" x2="12" y1="17" y2="21"/>
          </svg>
        );
      case "Accessories":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <circle cx="12" cy="12" r="7"/>
            <polyline points="12 9 12 12 13.5 13.5"/>
            <path d="m16.51 17.35-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
          </svg>
        );
      case "Home":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        );
      case "Beauty":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/>
            <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>
            <path d="M12 8v4"/>
            <path d="M12 16v.01"/>
          </svg>
        );
      case "Basic Needs":
        return <HeartHandshake className="text-white" size={24} />;
      default:
        if (slug === "basic-needs") return <HeartHandshake className="text-white" size={24} />;
        return <ShoppingBag className="text-white" size={24} />;
    }
  };
  
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 bg-white hover:translate-y-[-4px]"
    >
      <div className="relative overflow-hidden">
        {/* Card Header Image */}
        <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${colorSet.gradient}`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id={`grid-${category.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${category.id})`} />
            </svg>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 rotate-0 group-hover:rotate-3 transition-transform duration-500">
                {getCategoryIcon(category.name, category.slug)}
              </div>
              
              {/* Discount Badge */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-white opacity-90 backdrop-blur-md"></div>
                <div className="relative px-3 py-1.5 flex items-center">
                  <span className="text-xs font-bold text-black/80">{category.name === "Basic Needs" || category.slug === "basic-needs" ? "75%" : "65%"} </span>
                  <span className="text-[10px] font-bold ml-0.5 text-black/70">OFF</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg transform transition-all duration-300 group-hover:scale-105">
                <h2 className="text-2xl font-bold text-white mb-2">{category.name === "Basic Needs" || category.slug === "basic-needs" ? "Basic Needs" : category.name}</h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card body with meta details */}
        <div className="p-5">
          <div className="flex flex-col space-y-4">
            {/* Pricing section */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs uppercase font-medium text-gray-500 tracking-wider mb-1">Starting from</p>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-900">₹1,499</span>
                  <span className="text-sm text-gray-500 line-through ml-2">₹4,299</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-md text-xs font-medium ${colorSet.light} text-gray-800`}>
                New Collection
              </div>
            </div>
            
            {/* Features section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex space-x-4">
                <div className="flex items-center text-xs text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                  <span>In Stock</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5"></div>
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
            
            {/* Action button */}
            <div className={`mt-2 flex justify-between items-center group-hover:bg-gradient-to-r ${colorSet.gradient} transition-all duration-300 rounded-lg overflow-hidden`}>
              <div className="py-3 px-5 w-full">
                <div className="flex justify-between items-center group-hover:text-white transition-colors duration-300">
                  <span className="font-medium text-gray-900 group-hover:text-white">Browse Collection</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Icon renderer for feature cards
function RenderIcon({ type }: { type: string }) {
  switch(type) {
    case 'neural':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M6.5 6.5h11v11h-11z"></path>
          <path d="M9 9h4v4H9z"></path>
        </svg>
      );
    case 'bio':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
          <circle cx="20" cy="10" r="2"></circle>
        </svg>
      );
    case 'thermal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      );
    case 'adaptive':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M12 22v-5"></path>
          <path d="M9 7V2"></path>
          <path d="M15 7V2"></path>
          <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"></path>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
  }
} 