"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export default function ArcSphereExpertise() {
  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
            [ 04 // SPECIALIZED FOCUS ]
          </span>
          <span className="h-[1px] w-12 bg-[#181818]/20" />
        </div>

        {/* 50/50 Dual Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Studio Acoustics */}
          <div className="group relative rounded-[28px] overflow-hidden border border-[#181818]/15 bg-[#181818] min-h-[460px] flex flex-col justify-between p-8 sm:p-12 text-[#f0ebe6] shadow-xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/electronics_bg.jpg"
                alt="Studio Sound Systems"
                fill
                className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f0ebe6]/70">
                DISCIPLINE 01
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0ebe6] uppercase mt-2">
                Acoustic Engineering & Precision Sound
              </h3>
            </div>

            <div className="relative z-10 pt-12">
              <p className="text-sm text-[#f0ebe6]/80 max-w-md leading-relaxed mb-6">
                Calibrated transducers, brushed metal hardware, and zero-distortion drivers engineered for sound designers, architects, and critical listeners.
              </p>
              <Link
                href="/products?category=Electronics"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>Explore Acoustic Line</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Minimalist Living & Apparel */}
          <div className="group relative rounded-[28px] overflow-hidden border border-[#181818]/15 bg-[#2c2723] min-h-[460px] flex flex-col justify-between p-8 sm:p-12 text-[#f0ebe6] shadow-xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/cloth_bg.png"
                alt="Architectural Apparel"
                fill
                className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2723] via-[#2c2723]/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f0ebe6]/70">
                DISCIPLINE 02
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0ebe6] uppercase mt-2">
                Structured Apparel & Material Craft
              </h3>
            </div>

            <div className="relative z-10 pt-12">
              <p className="text-sm text-[#f0ebe6]/80 max-w-md leading-relaxed mb-6">
                Monochrome silhouettes constructed from heavy Japanese denim, water-repellent membrane weaves, and organic heavyweight fleece.
              </p>
              <Link
                href="/products?category=Clothing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <span>Explore Apparel Line</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
