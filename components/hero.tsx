import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ 
        backgroundImage: "url('/hero-2025.jpg')" 
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mesh grid overlay with animated movement */}
      <div className="absolute inset-0 bg-[url('/mesh-grid.svg')] bg-repeat opacity-10 animate-subtle-drift"></div>
      
      {/* Floating tech elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-[5%] w-12 h-12 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center animate-float-slow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300 opacity-80">
            <path d="M12 2v1" />
            <path d="M12 21v1" />
            <path d="m4.93 4.93.707.707" />
            <path d="m18.36 18.36.707.707" />
            <path d="M2 12h1" />
            <path d="M21 12h1" />
            <path d="m4.93 19.07.707-.707" />
            <path d="m18.36 5.64.707-.707" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        <div className="absolute top-2/3 left-[15%] w-16 h-16 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center animate-float-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300 opacity-80">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <path d="M3.29 7 12 12l8.71-5" />
            <line x1="12" x2="12" y1="22" y2="12" />
          </svg>
        </div>
        <div className="absolute bottom-[20%] right-[20%] w-14 h-14 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center animate-float-fast">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 opacity-80">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <circle cx="10" cy="13" r="2" />
            <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
          </svg>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse-glow opacity-40"></div>
        <div className="absolute right-1/3 top-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse-glow animation-delay-500 opacity-40"></div>
        <div className="absolute left-2/3 top-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse-glow animation-delay-1000 opacity-40"></div>
        <div className="absolute left-1/2 bottom-1/3 w-2 h-2 bg-pink-500 rounded-full animate-pulse-glow animation-delay-1500 opacity-40"></div>
      </div>

      {/* Main hero content */}
      <div className="relative container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-xl">
            <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            <span className="text-white/90">Next Generation • 2025 E-Commerce Experience</span>
          </div>
          
          <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-gradient-x">Future of</span>
              <span className="absolute -top-1 left-0 bg-clip-text text-transparent bg-gradient-to-r from-white/10 to-blue-300/10 blur-[2px] animate-gradient-x">Future of</span>
            </span>
            <span className="block mt-1 text-4xl md:text-6xl relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient-x">Shopping in 2025</span>
              <span className="absolute -top-1 left-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-[2px] animate-gradient-x">Shopping in 2025</span>
            </span>
          </h1>
          
          <p className="mb-8 text-lg md:text-xl leading-relaxed text-white/80 backdrop-blur-sm max-w-md">
            Experience the next generation of e-commerce with AI-curated collections, neural sizing, and immersive blockchain-verified experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-0.5"
            >
              <Link href="/products" className="flex items-center gap-2 rounded-[10px] bg-black px-5 py-2 font-medium transition-all group-hover:bg-opacity-0 group-hover:text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span>Browse 2025 Collection</span>
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
                  className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <Link href="/categories" className="flex items-center gap-2 relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-transform duration-300 group-hover:rotate-90"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span>Virtual Showroom</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              </Link>
            </Button>
          </div>
          
          {/* New features badges */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md hover:bg-white/15 transition-colors cursor-default group relative">
              <span className="relative z-10">Neural Styling</span>
              <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md hover:bg-white/15 transition-colors cursor-default group relative">
              <span className="relative z-10">Quantum Eco Fibers</span>
              <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full bg-gradient-to-r from-green-600/20 to-cyan-600/20"></span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md hover:bg-white/15 transition-colors cursor-default group relative">
              <span className="relative z-10">Holographic Try-On</span>
              <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md hover:bg-white/15 transition-colors cursor-default group relative">
              <span className="relative z-10">Adaptive Fabrics</span>
              <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20"></span>
            </span>
          </div>
          
          {/* Animated stats counter */}
          <div className="mt-12 flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-100">99%</span>
              <span className="text-xs text-white/60">Carbon Negative</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">3D</span>
              <span className="text-xs text-white/60">Neural Fitting</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-100">24/7</span>
              <span className="text-xs text-white/60">AI Assistance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
