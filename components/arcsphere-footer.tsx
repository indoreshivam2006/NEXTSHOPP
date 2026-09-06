"use client"

import Link from "next/link"
import { Github, Globe, Briefcase, ShieldCheck, ArrowUpRight } from "lucide-react"

export default function ArcSphereFooter() {
  return (
    <footer className="bg-[#181818] text-[#f0ebe6] pt-16 md:pt-24 pb-10 border-t border-[#38322c] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Studio Identity & Engineer Credit */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl md:text-3xl tracking-tighter text-[#f0ebe6] uppercase">
                NEXTSHOPP
              </span>
              <span className="block text-[10px] font-mono tracking-[0.25em] text-[#f0ebe6]/60 uppercase mt-1">
                Architectural Studio & E-Commerce
              </span>
            </Link>

            <p className="text-xs text-[#f0ebe6]/70 leading-relaxed max-w-sm">
              An architectural department store curated with industrial restraint. Engineered with Next.js App Router, TypeScript, Tailwind CSS, and Firebase.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#f0ebe6]/80 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Crafted by Shivam Indore · Bhopal, India</span>
              </div>
              <div>
                <a
                  href="https://github.com/indoreshivam2006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>github.com/indoreshivam2006</span>
                </a>
              </div>
              <div>
                <a
                  href="https://shivamindoreportfolio.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>shivamindoreportfolio.vercel.app</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Catalog Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#f0ebe6]/50">
              [ DIRECTORY ]
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider text-[#f0ebe6]/80">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Catalog (24)
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/products?category=Electronics" className="hover:text-white transition-colors">
                  Acoustic Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=Clothing" className="hover:text-white transition-colors">
                  Minimalist Apparel
                </Link>
              </li>
              <li>
                <Link href="/products?category=Home" className="hover:text-white transition-colors">
                  Living & Light
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Patron Services */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#f0ebe6]/50">
              [ PATRON CARE ]
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider text-[#f0ebe6]/80">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Studio Concierge
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Craft Standards
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch & Location */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#f0ebe6]/50">
              [ DISPATCH ]
            </h4>
            <div className="text-xs text-[#f0ebe6]/80 space-y-2 font-mono leading-relaxed">
              <p>Bharat E-Commerce Platform</p>
              <p>Mumbai, Maharashtra, 400612</p>
              <p>Bharat (India)</p>
              <a
                href="mailto:nextshopp0904@gmail.com"
                className="text-emerald-400 hover:text-emerald-300 transition-colors block pt-1 break-all"
              >
                nextshopp0904@gmail.com
              </a>
              <p className="pt-2 text-[11px] text-[#f0ebe6]/60">Mon – Sat · 09:00 - 19:00 IST</p>
            </div>
          </div>
        </div>

        {/* Large ArcSphere Watermark Marquee */}
        <div className="py-10 md:py-14 select-none pointer-events-none opacity-15 overflow-hidden">
          <div className="flex w-max animate-marquee space-x-8 text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter uppercase font-mono">
            <span>NEXTSHOPP STUDIO</span>
            <span>✦</span>
            <span>ARCHITECTURAL COMMERCE</span>
            <span>✦</span>
            <span>NEXTSHOPP STUDIO</span>
            <span>✦</span>
            <span>ARCHITECTURAL COMMERCE</span>
            <span>✦</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#f0ebe6]/60 gap-4">
          <p>© {new Date().getFullYear()} NEXTSHOPP Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Security</Link>
            <Link href="/admin" className="hover:text-white transition-colors text-emerald-400">Staff Console</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
