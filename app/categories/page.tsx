import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import ArcSphereCategories from "@/components/arcsphere-categories"

export const metadata: Metadata = {
  title: "Departments & Collections | NEXTSHOPP",
  description: "Explore curated departments organized by functional discipline and material integrity.",
}

const FEATURED_COLLECTIONS = [
  {
    title: "Acoustic Engineering & Spatial Sound",
    category: "Electronics",
    desc: "Active noise-cancelling monitors, planar magnetic drivers, and tactile brushed controls.",
    image: "/electronics_bg.jpg",
    count: "18 Objects",
    href: "/products?category=Electronics",
  },
  {
    title: "Structured Garments & Adaptive Outerwear",
    category: "Clothing",
    desc: "Weatherproof membrane field jackets, heavyweight cotton garments, and structured knitwear.",
    image: "/cloth_bg.png",
    count: "32 Objects",
    href: "/products?category=Clothing",
  },
  {
    title: "Minimalist Footwear & Full-Grain Leather",
    category: "Footwear",
    desc: "Goodyear welted boots, low-profile vulcanized sneakers, and handcrafted slides.",
    image: "/footwear_bg.jpg",
    count: "24 Objects",
    href: "/products?category=Footwear",
  },
  {
    title: "Architectural Living, Ceramics & Light",
    category: "Home",
    desc: "Ambient brass pendants, raw ceramic tableware, and minimalist desk organizers.",
    image: "/Home_bg.jpg",
    count: "15 Objects",
    href: "/products?category=Home",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f0ebe6] text-[#181818]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-20">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
            [ DIRECTORY // ARCHITECTURAL DISCIPLINES ]
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#181818]">
            Departments & Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#4f4742] mt-3 max-w-xl font-mono">
            Structured into 5 primary departments. Each represents focused material research and high-durability production.
          </p>
        </div>

        {/* 4 Large Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {FEATURED_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              href={col.href}
              className="group relative rounded-[28px] overflow-hidden border border-[#181818]/15 bg-[#181818] min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-8 sm:p-10 text-[#f0ebe6] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f0ebe6]/70">
                  DISCIPLINE 0{idx + 1}
                </span>
                <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                  {col.count}
                </span>
              </div>

              <div className="relative z-10 pt-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0ebe6] uppercase mb-2 group-hover:translate-x-1 transition-transform">
                  {col.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#f0ebe6]/80 max-w-md leading-relaxed mb-6">
                  {col.desc}
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-semibold uppercase tracking-wider group-hover:bg-white transition-colors">
                  <span>Browse Line</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Detailed Numbered Discipline List */}
        <ArcSphereCategories />
      </div>
    </div>
  )
}