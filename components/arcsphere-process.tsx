"use client"

import { ShieldCheck, Compass, Lock, PackageCheck } from "lucide-react"

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Sourcing",
    desc: "We interface directly with independent industrial studios, bespoke tailors, and certified electronics labs globally to commission low-volume, high-integrity batches.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Material & Build Audit",
    desc: "Each item passes an exhaustive physical stress test. Electronic components undergo signal analysis; apparel undergoes wash-cycle durability and fabric shear tests.",
    icon: ShieldCheck,
  },
  {
    num: "03",
    title: "Encrypted Transaction",
    desc: "Patron records and payment tokens are guarded with bank-grade AES-256 encryption. We never sell patron telemetry or compromise authentication boundaries.",
    icon: Lock,
  },
  {
    num: "04",
    title: "White-Glove Dispatch",
    desc: "Every order is hand-inspected, nested in biodegradable molded fiber packaging, and dispatched with priority tracking and signature verification on delivery.",
    icon: PackageCheck,
  },
]

export default function ArcSphereProcess() {
  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 md:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-3">
              [ 05 // THE PROTOCOL ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#181818] uppercase">
              Our 4-Stage Guarantee
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4f4742] max-w-sm">
            How NEXTSHOPP guarantees absolute satisfaction across every stage from discovery to doorstep delivery.
          </p>
        </div>

        {/* 2x2 Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="card-arcsphere p-8 sm:p-10 flex flex-col justify-between hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#7c7c7c] uppercase">
                      STAGE {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#181818]/5 border border-[#181818]/10 flex items-center justify-center text-[#181818]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#181818] tracking-tight uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4f4742] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#181818]/10 flex items-center justify-between text-[11px] font-mono text-[#7c7c7c] uppercase">
                  <span>Verified Standard</span>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
