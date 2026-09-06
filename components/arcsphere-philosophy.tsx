"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function ArcSpherePhilosophy() {
  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
            [ 01 // BRAND PHILOSOPHY ]
          </span>
          <span className="h-[1px] w-12 bg-[#181818]/20" />
        </div>

        {/* 2-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Monumental Headline */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#181818] uppercase leading-[1.08]">
              Curating Timeless Design With Absolute Discipline.
            </h2>
            <p className="text-sm md:text-base text-[#4f4742] leading-relaxed">
              We reject the ephemeral cycle of fast retail. Every product in the NEXTSHOPP catalog is evaluated against architectural tenets: honest materials, physical durability, acoustic warmth, and ergonomics that outlast seasonal trends.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/about" className="btn-arcsphere-secondary">
                <span>Our Sourcing Manifesto</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual & Metric Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-[24px] overflow-hidden border border-[#181818]/10 aspect-[4/3] bg-[#e2dacf]/60 shadow-lg">
              <Image
                src="/atelier_material_craft.jpg"
                alt="Architectural Material Detail - Hand-Turned Brass & Sanded Ceramic"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#f0ebe6]/80">Material Focus</span>
                  <p className="text-sm font-semibold text-[#f0ebe6]">Brushed Brass & Textured Ceramics</p>
                </div>
                <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                  Grade A1
                </span>
              </div>
            </div>

            {/* 3 Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="card-arcsphere p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">99.4%</span>
                <span className="text-[11px] font-semibold text-[#7c7c7c] uppercase tracking-wider mt-1 block">Patron CSAT</span>
              </div>
              <div className="card-arcsphere p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">48H</span>
                <span className="text-[11px] font-semibold text-[#7c7c7c] uppercase tracking-wider mt-1 block">Global Dispatch</span>
              </div>
              <div className="card-arcsphere p-4 text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">100%</span>
                <span className="text-[11px] font-semibold text-[#7c7c7c] uppercase tracking-wider mt-1 block">Zero Plastic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
