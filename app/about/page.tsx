"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react"

const TIMELINE_EVENTS = [
  {
    year: "2024",
    stage: "STAGE 01",
    title: "Atelier Genesis",
    description: "NEXTSHOPP was founded in Bhopal as an architectural digital department store rejecting fast retail in favor of tactile raw materials, acoustic engineering, and timeless minimalism."
  },
  {
    year: "2024",
    stage: "STAGE 02",
    title: "Cloud & Security Architecture",
    description: "Integrated bank-grade Firebase authentication, real-time Firestore database clusters, and cloud-encrypted order tracking pipelines."
  },
  {
    year: "2025",
    stage: "STAGE 03",
    title: "Editorial Motion & Precision Design",
    description: "Introduced high-performance micro-interactions, responsive typography hierarchies, and strict WCAG accessibility compliance across all touchpoints."
  },
  {
    year: "2026",
    stage: "STAGE 04",
    title: "ArcSphere Visual Realization",
    description: "Completed full architectural UI transformation based on ArcSphere luxury aesthetic: warm greige palettes, pill geometries, and uncompromising functional longevity."
  }
]

const STUDIO_VALUES = [
  {
    num: "01",
    title: "Material Integrity",
    description: "We work exclusively with honest raw substances: brushed aeronautical aluminum, vegetable-tanned full-grain leathers, architectural ceramics, and organic heavyweight weaves."
  },
  {
    num: "02",
    title: "Industrial Longevity",
    description: "Every item must pass severe stress analysis. If an object cannot endure at least a decade of rigorous everyday utility, it has no place in our directory."
  },
  {
    num: "03",
    title: "Acoustic & Visual Calm",
    description: "Our living artifacts and sound systems are designed to declutter mental bandwidth, absorbing auditory reflection and creating serene spatial sanctuaries."
  },
  {
    num: "04",
    title: "Radical Transparency",
    description: "From factory ethics and labor transparency to clear tax-inclusive pricing and zero telemetry tracking, we honor patron trust as an inviolable contract."
  }
]

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f0ebe6] text-[#181818]">
      {/* 1. Hero Section */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
              STUDIO & ATELIER
            </span>
            <span className="h-[1px] w-8 bg-[#181818]/20" />
            <span className="text-xs font-mono tracking-widest text-[#7c7c7c]">
              BHOPAL · BHARAT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.03em] leading-[1.05] text-[#181818] uppercase">
                About NEXTSHOPP Studio & Atelier.
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <p className="text-sm md:text-base text-[#4f4742] leading-relaxed">
                An architectural digital store curating precision electronics, structured wardrobe silhouettes, acoustic monitors, and living ceramics.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/products" className="btn-arcsphere-primary">
                  <span>Browse Directory</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-arcsphere-secondary">
                  <span>Contact Concierge</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Large Architectural Canvas */}
          <div className="relative rounded-[28px] overflow-hidden border border-[#181818]/10 aspect-[16/9] md:aspect-[21/9] bg-[#e2dacf]/50 shadow-2xl">
            <Image
              src="/atelier_spatial_study.jpg"
              alt="NEXTSHOPP Studio Atelier Spatial Study"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f0ebe6]/70">
                  Spatial Study
                </span>
                <p className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#f0ebe6]">
                  The Sanctuary of Form & Utilitarian Restraint
                </p>
              </div>
              <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">
                Grade 01 Production
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Ethos Section (2-Column Asymmetrical) */}
      <section className="py-20 md:py-32 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
                [ 01 // ARCHITECTURAL ETHOS ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-[#181818] leading-[1.1]">
                Rejecting The Disposable. Celebrating The Permanent.
              </h2>
              <p className="text-sm md:text-base text-[#4f4742] leading-relaxed">
                Modern commerce treats objects as transient consumables to be discarded after brief seasons. At NEXTSHOPP, we operate under architectural permanence.
              </p>
              <p className="text-sm md:text-base text-[#4f4742] leading-relaxed">
                We obsess over weight, texture, sound absorption, and physical tactile balance. Every headphone dial, zipper pull, lamp shade, and sneaker sole is selected for lifetime durability.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <span className="text-3xl font-bold font-mono text-[#181818]">100%</span>
                  <p className="text-xs font-mono uppercase text-[#7c7c7c] mt-1">Authentic Guarantee</p>
                </div>
                <div className="h-10 w-[1px] bg-[#181818]/15" />
                <div>
                  <span className="text-3xl font-bold font-mono text-[#181818]">0%</span>
                  <p className="text-xs font-mono uppercase text-[#7c7c7c] mt-1">Plastic Packaging</p>
                </div>
                <div className="h-10 w-[1px] bg-[#181818]/15" />
                <div>
                  <span className="text-3xl font-bold font-mono text-[#181818]">5-YR</span>
                  <p className="text-xs font-mono uppercase text-[#7c7c7c] mt-1">Structural Warranty</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] overflow-hidden border border-[#181818]/10 aspect-[4/3] bg-[#e2dacf]/50 shadow-xl">
                <Image
                  src="/atelier_material_craft.jpg"
                  alt="Craftsmanship Material Focus - Hand-Turned Brass & Sanded Ceramic"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-[#f0ebe6]">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#f0ebe6]/70">Atelier Standard</p>
                  <p className="text-lg font-bold">Solid Hand-Turned Brass & Sanded Ceramic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 md:py-32 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-14">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
              [ 02 // FOUNDATIONAL TENETS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-[#181818]">
              The Four Pillars of NEXTSHOPP
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {STUDIO_VALUES.map((val) => (
              <div
                key={val.num}
                className="card-arcsphere p-8 sm:p-10 flex flex-col justify-between hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#7c7c7c] uppercase block mb-6">
                    PILLAR {val.num}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-[#181818] mb-3">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4f4742] leading-relaxed">
                    {val.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#181818]/10 flex justify-between text-[11px] font-mono uppercase text-[#7c7c7c]">
                  <span>Mandatory Code</span>
                  <span>Non-Negotiable</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Studio Evolution Timeline */}
      <section className="py-20 md:py-32 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-14">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
              [ 03 // CHRONOLOGY ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-[#181818]">
              Studio Evolution & Milestones
            </h2>
          </div>

          <div className="divide-y divide-[#181818]/15 border-y border-[#181818]/15">
            {TIMELINE_EVENTS.map((item, idx) => (
              <div
                key={idx}
                className="py-8 sm:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:px-4 hover:bg-[#e2dacf]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-6 sm:gap-12">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#181818]">
                    {item.year}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#7c7c7c]">
                      {item.stage}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#181818] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4f4742] mt-2 max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full border border-[#181818]/20 flex items-center justify-center group-hover:bg-[#181818] group-hover:text-[#f0ebe6] transition-colors self-end md:self-center">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Closing CTA Banner */}
      <section className="py-20 md:py-28 bg-[#181818] text-[#f0ebe6]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f0ebe6]/60 block mb-3">
            [ 04 // PATRON INVITATION ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#f0ebe6] max-w-3xl mx-auto mb-6">
            Experience The NEXTSHOPP Directory in Person.
          </h2>
          <p className="text-sm text-[#f0ebe6]/80 max-w-lg mx-auto mb-8 font-mono">
            Browse our full catalog of acoustic devices, apparel, and furniture pieces backed by our 5-year structural guarantee.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="px-8 py-4 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Explore Catalog Archive
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-full border border-white/30 text-[#f0ebe6] text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#181818] transition-all">
              Contact Patron Concierge
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
