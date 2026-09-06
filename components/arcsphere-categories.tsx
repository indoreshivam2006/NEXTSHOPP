"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const DEPARTMENTS = [
  {
    num: "01",
    name: "Acoustic Engineering & Audio",
    subtitle: "High-fidelity monitors, noise-canceling cans, and wireless spatial audio systems.",
    count: "18 Models",
    category: "Electronics",
    href: "/products?category=Electronics",
  },
  {
    num: "02",
    name: "Architectural Apparel & Outerwear",
    subtitle: "Technical weather-resistant parkas, organic cotton basics, and structured tailoring.",
    count: "32 Silhouettes",
    category: "Clothing",
    href: "/products?category=Clothing",
  },
  {
    num: "03",
    name: "Minimalist Footwear & Leather",
    subtitle: "Low-profile sneakers, Goodyear-welted dress shoes, and full-grain travel slides.",
    count: "24 Pairs",
    category: "Footwear",
    href: "/products?category=Footwear",
  },
  {
    num: "04",
    name: "Interior Ceramics & Illumination",
    subtitle: "Warm architectural lamps, brushed aluminum task lights, and studio vessels.",
    count: "15 Artifacts",
    category: "Home",
    href: "/products?category=Home",
  },
  {
    num: "05",
    name: "Precision Accessories & Daily Carry",
    subtitle: "Swiss sapphire timepieces, titanium cardholders, and protective optical lenses.",
    count: "29 Essentials",
    category: "Accessories",
    href: "/products?category=Accessories",
  },
]

export default function ArcSphereCategories() {
  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 md:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-3">
              [ 03 // DEPARTMENTS & DISCIPLINES ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#181818] uppercase">
              Curated Departments
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4f4742] max-w-sm">
            Categorized by functional discipline. Every department follows identical standards of material honesty.
          </p>
        </div>

        {/* Numbered Sequential Rows */}
        <div className="divide-y divide-[#181818]/15 border-y border-[#181818]/15">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.num}
              href={dept.href}
              className="group py-8 sm:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 hover:px-4 hover:bg-[#e2dacf]/40"
            >
              <div className="flex items-start gap-6 sm:gap-10">
                <span className="text-sm font-mono text-[#7c7c7c] group-hover:text-[#181818] transition-colors mt-1">
                  {dept.num}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">
                    {dept.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4f4742] mt-2 max-w-xl">
                    {dept.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center">
                <span className="text-xs font-mono font-semibold text-[#7c7c7c] uppercase tracking-wider">
                  {dept.count}
                </span>
                <div className="w-10 h-10 rounded-full border border-[#181818]/20 flex items-center justify-center group-hover:bg-[#181818] group-hover:text-[#f0ebe6] transition-colors">
                  <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
