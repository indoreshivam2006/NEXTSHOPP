"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles, ShieldCheck, Compass } from "lucide-react"

export default function ArcSphereHero() {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Hero Title & Subtext Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-14">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold tracking-[-0.03em] leading-[1.04] text-[#181818] uppercase">
              Where Modern Aesthetics Meet Curated Living.
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
            <p className="text-sm md:text-base text-[#4f4742] leading-relaxed font-normal">
              A bespoke digital department store engineered with architectural minimalism. Sourcing high-calibre electronics, enduring garments, acoustic gear, and interior fixtures.
            </p>

            {/* Dual Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-arcsphere-primary">
                <span>Explore Catalog</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/categories" className="btn-arcsphere-secondary">
                <span>View Collections</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Large Curved Visual Canvas */}
        <div className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#181818]/10 bg-[#e2dacf]/50 shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <Image
              src="/Home_bg.jpg"
              alt="ArcSphere Curated Architectural Living Space"
              fill
              priority
              className="object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Ambient vignette and warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/70 via-transparent to-black/10" />

            {/* Floating Top-Left Status Badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[#181818] text-xs font-semibold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wider uppercase">150+ Verified Designs in Stock</span>
              </div>
            </div>

            {/* Floating Bottom Details */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
              <div className="max-w-md">
                <span className="text-[11px] font-mono tracking-widest text-[#f0ebe6]/80 uppercase">
                  Featured Setting
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#f0ebe6]">
                  Acoustic Sanctuary & Minimalist Essentials
                </h3>
                <p className="text-xs text-[#f0ebe6]/70 mt-1 hidden sm:block">
                  Curated pairing of high-texture ceramics, noise-cancelling acoustics, and ambient illumination.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/products?category=Electronics"
                  className="px-5 py-2.5 rounded-full bg-white/95 text-[#181818] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                >
                  Shop This Space →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Trust Bar Under Hero */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#181818]/10 text-xs font-medium text-[#4f4742]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#181818]" />
            <span>100% Authentic Originals</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#181818]" />
            <span>Curated Worldwide Sourcing</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#181818]" />
            <span>Zero Plastic Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#181818]">₹ INR</span>
            <span>Transparent Pricing & Taxes Included</span>
          </div>
        </div>
      </div>
    </section>
  )
}
