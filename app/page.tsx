import ProductGrid from "@/components/product-grid"
import Hero from "@/components/hero"
import Newsletter from "@/components/newsletter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShopCategories } from "./client-imports"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      
      {/* Trending 2025 Banner */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Trending in 2025</h2>
                <p className="text-white/70">AI-optimized fits based on global data patterns</p>
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10">
              <Link href="/trending">Explore Trends</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Shop Deals in Top Categories Section - Updated for 2025 */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                2025 Smart Collections
              </h2>
              <div className="mt-2 text-gray-600 max-w-md">
                Next-generation fashion with embedded tech and adaptive materials
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Button asChild variant="outline" className="rounded-full border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                <Link href="/categories" className="flex items-center gap-2 px-6">
                  <span>Explore all collections</span>
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Category Cards Grid */}
          <ShopCategories />
          
          {/* What's Actually Built - Real Features Grid */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What&apos;s Actually Built</h2>
              <p className="mt-2 text-gray-600">Real features, real code — no buzzwords</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "🛒", title: "Smart Cart", desc: "Real-time cart management with quantity controls and persistent local storage" },
                { icon: "❤️", title: "Wishlist", desc: "Save favourite products and move them to cart in one click" },
                { icon: "🔐", title: "Firebase Auth", desc: "Secure Google OAuth and email/password login with protected routes" },
                { icon: "📦", title: "Order Tracking", desc: "Multi-step checkout flow with real-time order status updates" },
                { icon: "🎨", title: "60+ UI Components", desc: "Built with shadcn/ui and Radix UI for accessible, polished interfaces" },
                { icon: "✨", title: "Smooth Animations", desc: "GSAP and Framer Motion for professional page transitions and interactions" },
                { icon: "🌙", title: "Dark / Light Mode", desc: "System-aware theme toggle with persistent preference" },
                { icon: "📊", title: "Product Dashboard", desc: "Statistics and analytics visualised with Recharts" },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-indigo-50 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                  <div className="text-4xl mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Modern tools chosen for performance and developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                items: "Next.js 15 · React 19 · TypeScript · Tailwind CSS",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
              },
              {
                title: "UI & Animation",
                items: "shadcn/ui · Radix UI · GSAP · Framer Motion",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                ),
              },
              {
                title: "Backend & Auth",
                items: "Firebase Auth · Firestore · Google OAuth · Vercel",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                ),
              },
            ].map((tech, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-100 inline-block">
                  <span className="text-indigo-600">{tech.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                <p className="text-gray-600">{tech.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </main>
  )
}
