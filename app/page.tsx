import ProductGrid from "@/components/product-grid"
import Hero from "@/components/hero"
import Newsletter from "@/components/newsletter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShopCategories } from "./client-imports"
import { Zap, ChevronRight } from "lucide-react"

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
          
          {/* Shopping Benefits - Updated for 2025 */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M14 9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M7 14a2 2 0 0 1-2-2V4" />
                    <path d="M22 14v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2Z" />
                    <path d="M12 14v7" />
                    <path d="M17 14v7" />
                  </svg>
                ),
                title: "Drone Delivery",
                description: "30-minute delivery by AI-powered drones"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                title: "Blockchain Verified",
                description: "Authentic products with digital certificates"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                title: "Carbon Negative",
                description: "Every purchase removes 1kg of CO2"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M3 5v14" />
                    <path d="M21 12H7" />
                    <path d="m15 18 6-6-6-6" />
                  </svg>
                ),
                title: "Virtual Try-On",
                description: "AR technology for perfect fit every time"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-indigo-50 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Integration Section - New for 2025 */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Technology</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our 2025 collections combine fashion with cutting-edge technology for an enhanced lifestyle experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Climate Adaptation",
                description: "Clothing that adjusts to your body temperature and environmental conditions.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                  </svg>
                ),
              },
              {
                title: "Biometric Feedback",
                description: "Integrated sensors track vital signs and adjust fabric tension for optimal comfort.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                ),
              },
              {
                title: "Solar Charging Fabrics",
                description: "Embedded micro-solar cells keep your devices charged throughout the day.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2" />
                    <path d="M12 21v2" />
                    <path d="M4.22 4.22l1.42 1.42" />
                    <path d="M18.36 18.36l1.42 1.42" />
                    <path d="M1 12h2" />
                    <path d="M21 12h2" />
                    <path d="M4.22 19.78l1.42-1.42" />
                    <path d="M18.36 5.64l1.42-1.42" />
                  </svg>
                ),
              },
            ].map((tech, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-100 inline-block">
                  <span className="text-indigo-600">{tech.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </main>
  )
}
