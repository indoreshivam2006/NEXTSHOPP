"use client"

import { Star } from "lucide-react"

export default function ArcSphereTestimonials() {
  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 text-center">
        {/* Section Kicker */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
            [ 06 // PATRON CRITIQUE ]
          </span>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center justify-center gap-1 text-[#181818] mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-[#181818]" />
          ))}
        </div>

        {/* Monumental Editorial Quote */}
        <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#181818] leading-[1.2] uppercase mb-10">
          “NEXTSHOPP redefined how we curate tech and daily carry items for our architectural studio. The material honesty, weight, and finish of every object exceeds commercial standards.”
        </blockquote>

        {/* Attribution */}
        <div className="space-y-1">
          <p className="text-sm font-bold uppercase tracking-wider text-[#181818]">
            Ar. Kabir Sengupta
          </p>
          <p className="text-xs font-mono text-[#7c7c7c] uppercase tracking-widest">
            Principal Director, Sengupta & Partners Architecture Studio · Mumbai
          </p>
        </div>
      </div>
    </section>
  )
}
