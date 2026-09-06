"use client"

import React from "react"

const MARQUEE_ITEMS = [
  "100% AUTHENTIC ORIGINALS",
  "EXPRESS WORLDWIDE DISPATCH",
  "24/7 PATRON CONCIERGE",
  "10,000+ SATISFIED CLIENTS",
  "MINIMALIST LUXURY LIVING",
  "5-YEAR STRUCTURAL WARRANTY",
  "HAND-CURATED ATELIER GOODS",
  "INSTANT SECURE CHECKOUT",
]

export default function ArcSphereMarquee() {
  return (
    <div className="relative w-full py-4 md:py-6 bg-[#181818] text-[#f0ebe6] overflow-hidden border-y border-[#38322c]">
      <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase">
        {/* Repeating sequence for continuous smooth loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 whitespace-nowrap">
            <span>{item}</span>
            <span className="text-[#f0ebe6]/40 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
