"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Loader2 } from "lucide-react"

export default function ArcSphereCta() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error")
      return
    }

    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 4000)
    }, 900)
  }

  return (
    <section className="py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="rounded-[32px] bg-[#181818] text-[#f0ebe6] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38322c15_1px,transparent_1px),linear-gradient(to_bottom,#38322c15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f0ebe6]/60 block mb-4">
              [ 07 // PRIVATE COMMUNIQUÉ ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f0ebe6] uppercase mb-4 leading-tight">
              Join The NextShopp Patron Collective.
            </h2>
            <p className="text-sm text-[#f0ebe6]/80 leading-relaxed mb-8">
              Receive confidential access to limited atelier drops, private release previews, and architectural living monographs. Zero spam, unsubscribe anytime.
            </p>

            {status === "success" ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-[#f0ebe6] text-xs font-bold uppercase tracking-wider">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>You have been registered for collective access.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === "error") setStatus("idle")
                  }}
                  placeholder="Enter your email address..."
                  className={`flex-1 px-6 py-3.5 rounded-full bg-white/10 border text-sm text-[#f0ebe6] placeholder:text-[#f0ebe6]/50 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                    status === "error" ? "border-red-400" : "border-white/20"
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-7 py-3.5 rounded-full bg-[#f0ebe6] text-[#181818] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-xs text-red-400 mt-2 font-mono">
                Please provide a valid electronic mail address.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
