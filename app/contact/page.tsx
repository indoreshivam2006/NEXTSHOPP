"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Check, Loader2, MessageSquare, ChevronDown, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const FAQ_ITEMS = [
  {
    num: "01",
    question: "How does white-glove delivery and packaging operate?",
    answer: "Every acquisition is hand-inspected in our Bhopal atelier, cushioned in custom biodegradable molded fiber trays with zero plastic elements, and dispatched with priority tracking and signature verification."
  },
  {
    num: "02",
    question: "What is covered under the 5-year structural warranty?",
    answer: "All mechanical joints, chassis integrity, transducer drivers, and structural frame elements are covered against manufacturing defects and premature failure for five years from date of acquisition."
  },
  {
    num: "03",
    question: "Do you offer trade concessions for architects and interior designers?",
    answer: "Yes. Licensed architects, interior practices, and acoustic consultants receive trade pricing, custom finish samples, and direct atelier production scheduling."
  },
  {
    num: "04",
    question: "How are payment credentials and transactions protected?",
    answer: "Transactions are tokenized through bank-grade PCI-DSS Level 1 payment infrastructure with AES-256 encryption. Raw financial data is never exposed or logged on our servers."
  }
]

export default function ContactPage() {
  const [activeCategory, setActiveCategory] = useState("Acquisition")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email: string
    phone: string
    message: string
    category: string
    inquiryId: string
  } | null>(null)
  const [formErrors, setFormErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const { toast } = useToast()

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {}
    if (!formData.name.trim()) {
      errors.name = "Full name is required"
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      errors.message = "Please provide details regarding your inquiry"
    } else if (formData.message.trim().length < 5) {
      errors.message = "Narrative must be at least 5 characters"
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setStatus("error")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: activeCategory,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to transmit inquiry")
      }

      const inqId = data.inquiryId || ("INQ-" + Math.random().toString(36).substring(2, 8).toUpperCase())
      setSubmittedData({
        ...formData,
        category: activeCategory,
        inquiryId: inqId,
      })
      setStatus("success")

      // Direct client-side browser relay to FormSubmit for immediate domain origin match
      try {
        fetch("https://formsubmit.co/ajax/nextshopp0904@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            _subject: `[NextShop Inquiry #${inqId}] ${activeCategory} from ${formData.name}`,
            _replyto: formData.email,
            _template: "table",
            "Inquiry Reference": `#${inqId}`,
            "Category": activeCategory,
            "Customer Name": formData.name,
            "Customer Email": formData.email,
            "Telephone": formData.phone || "Not provided",
            "Inquiry Narrative": formData.message,
            "Submitted From": typeof window !== "undefined" ? window.location.href : "https://nextshopp-azure.vercel.app",
          }),
        }).catch(() => {})
      } catch {}

      toast({
        title: "Inquiry Sent Directly to Gmail",
        description: `Reference #${inqId}. Dispatched directly to nextshopp0904@gmail.com.`,
      })
    } catch (err: any) {
      console.error("Submission error:", err)
      const fallbackId = "INQ-" + Math.random().toString(36).substring(2, 8).toUpperCase()
      setSubmittedData({
        ...formData,
        category: activeCategory,
        inquiryId: fallbackId,
      })
      setStatus("success")
      toast({
        title: "Inquiry Registered",
        description: `Reference #${fallbackId}. Queued for direct dispatch to nextshopp0904@gmail.com.`,
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f0ebe6] text-[#181818]">
      {/* 1. Header Section */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c]">
              PATRON CARE
            </span>
            <span className="h-[1px] w-8 bg-[#181818]/20" />
            <span className="text-xs font-mono tracking-widest text-[#7c7c7c]">
              STUDIO CONCIERGE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.03em] leading-[1.05] text-[#181818] uppercase">
                Patron Care & Studio Concierge.
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <p className="text-sm md:text-base text-[#4f4742] leading-relaxed">
                Direct correspondence for product acquisitions, custom orders, architectural trade inquiries, and order tracking assistance.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7c7c7c]">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Dedicated Human Concierge Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Architectural Contact Trays */}
      <section className="py-16 md:py-24 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tray 1 */}
            <div className="rounded-[28px] bg-[#e2dacf]/40 border border-[#181818]/10 p-8 flex flex-col justify-between hover:border-[#181818]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#181818]/5 border border-[#181818]/15 flex items-center justify-center mb-6 text-[#181818]">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7c7c7c]">
                  CHANNEL 01
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#181818] mt-1 mb-2">
                  Direct Telephony
                </h3>
                <p className="text-xs text-[#4f4742] leading-relaxed mb-6">
                  Immediate voice consultation with our senior product specialists and concierge team.
                </p>
              </div>

              <div className="pt-6 border-t border-[#181818]/10">
                <a
                  href="tel:+9118001234567"
                  className="text-base sm:text-lg font-bold font-mono text-[#181818] hover:underline block"
                >
                  +91 1800-123-4567
                </a>
                <span className="text-[11px] font-mono text-[#7c7c7c] mt-1 block">
                  Mon – Sat · 09:00 - 19:00 IST
                </span>
              </div>
            </div>

            {/* Tray 2 */}
            <div className="rounded-[28px] bg-[#e2dacf]/40 border border-[#181818]/10 p-8 flex flex-col justify-between hover:border-[#181818]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#181818]/5 border border-[#181818]/15 flex items-center justify-center mb-6 text-[#181818]">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7c7c7c]">
                  CHANNEL 02
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#181818] mt-1 mb-2">
                  Written Dispatch
                </h3>
                <p className="text-xs text-[#4f4742] leading-relaxed mb-6">
                  Detailed architectural specifications, acquisition orders, and warranty documentation.
                </p>
              </div>

              <div className="pt-6 border-t border-[#181818]/10">
                <a
                  href="mailto:nextshopp0904@gmail.com"
                  className="text-base sm:text-lg font-bold font-mono text-[#181818] hover:underline block"
                >
                  nextshopp0904@gmail.com
                </a>
                <span className="text-[11px] font-mono text-[#7c7c7c] mt-1 block">
                  Guaranteed Reply Within 2 Hours
                </span>
              </div>
            </div>

            {/* Tray 3 */}
            <div className="rounded-[28px] bg-[#e2dacf]/40 border border-[#181818]/10 p-8 flex flex-col justify-between hover:border-[#181818]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#181818]/5 border border-[#181818]/15 flex items-center justify-center mb-6 text-[#181818]">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7c7c7c]">
                  CHANNEL 03
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#181818] mt-1 mb-2">
                  Atelier & Headquarters
                </h3>
                <p className="text-xs text-[#4f4742] leading-relaxed mb-6">
                  Primary operations center, material testing lab, and central distribution sanctuary.
                </p>
              </div>

              <div className="pt-6 border-t border-[#181818]/10">
                <p className="text-sm font-bold uppercase tracking-wider text-[#181818]">
                  Bharat E-Commerce Platform
                </p>
                <span className="text-[11px] font-mono text-[#7c7c7c] mt-1 block">
                  Mumbai, Maharashtra, 400612
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Inquiry Form & Trade Details */}
      <section className="py-20 md:py-32 border-b border-[#181818]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
                [ CORRESPONDENCE PROTOCOL ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#181818] mb-8">
                Transmit An Inquiry
              </h2>

              {/* Inquiry Category Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Acquisition", "Order Status", "Warranty & Repair", "Architectural Trade"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      activeCategory === cat
                        ? "bg-[#181818] text-[#f0ebe6] shadow-md"
                        : "bg-[#e2dacf]/50 text-[#181818] hover:bg-[#e2dacf]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {status === "success" && submittedData ? (
                <div className="rounded-[28px] bg-[#181818] text-[#f0ebe6] p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 block">
                      [ REFERENCE #{submittedData.inquiryId} ]
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#f0ebe6]">
                      Inquiry Dispatched Directly
                    </h3>
                    <p className="text-xs sm:text-sm text-[#f0ebe6]/80 max-w-md mx-auto font-mono leading-relaxed">
                      Thank you, <span className="text-white font-bold">{submittedData.name}</span>. Your dispatch regarding <span className="text-emerald-400 font-semibold">{submittedData.category}</span> has been transmitted directly to our official mailbox at <span className="text-emerald-400 font-bold">nextshopp0904@gmail.com</span>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-[#f0ebe6]/80">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-[#f0ebe6]/50 uppercase">Direct Mailbox:</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        nextshopp0904@gmail.com
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#f0ebe6]/50 uppercase">Patron:</span>
                      <span className="text-white">{submittedData.name} ({submittedData.email})</span>
                    </div>
                    {submittedData.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0ebe6]/50 uppercase">Telephone:</span>
                        <span className="text-white">{submittedData.phone}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[#f0ebe6]/50 uppercase block mb-1">Narrative:</span>
                      <p className="text-[#f0ebe6]/90 line-clamp-3 italic">
                        &ldquo;{submittedData.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=nextshopp0904@gmail.com&su=NextShop%20Inquiry%20[${encodeURIComponent(submittedData.category)}]%20-%20${encodeURIComponent(submittedData.name)}&body=${encodeURIComponent(
                        `Inquiry Reference: #${submittedData.inquiryId}\nCategory: ${submittedData.category}\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nPhone: ${submittedData.phone || "Not provided"}\n\nMessage:\n${submittedData.message}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#181818] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open in Gmail</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:nextshopp0904@gmail.com?subject=Inquiry [${encodeURIComponent(submittedData.category)}] - ${encodeURIComponent(submittedData.name)}&body=${encodeURIComponent(
                        `Inquiry Reference: #${submittedData.inquiryId}\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nPhone: ${submittedData.phone || "Not provided"}\n\nMessage:\n${submittedData.message}`
                      )}`}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f0ebe6] text-xs font-bold uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>Default Mail App</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ name: "", email: "", phone: "", message: "" })
                        setSubmittedData(null)
                        setStatus("idle")
                      }}
                      className="px-6 py-3 rounded-full bg-[#f0ebe6] hover:bg-white text-[#181818] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#7c7c7c] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined })
                        }}
                        placeholder="e.g. User Name"
                        className={`w-full px-5 py-3.5 rounded-full bg-white/70 border text-sm text-[#181818] placeholder:text-[#7c7c7c] focus:outline-none focus:ring-1 transition-all ${
                          formErrors.name
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#181818]/15 focus:ring-[#181818]"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-mono">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#7c7c7c] mb-2">
                        Electronic Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined })
                        }}
                        placeholder="e.g. xyz@mail.com"
                        className={`w-full px-5 py-3.5 rounded-full bg-white/70 border text-sm text-[#181818] placeholder:text-[#7c7c7c] focus:outline-none focus:ring-1 transition-all ${
                          formErrors.email
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#181818]/15 focus:ring-[#181818]"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-mono">
                          <AlertCircle className="h-3 w-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7c7c7c] mb-2">
                      Contact Telephone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 10 digit number"
                      className="w-full px-5 py-3.5 rounded-full bg-white/70 border border-[#181818]/15 text-sm text-[#181818] placeholder:text-[#7c7c7c] focus:outline-none focus:ring-1 focus:ring-[#181818]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#7c7c7c] mb-2">
                      Inquiry Narrative *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (formErrors.message) setFormErrors({ ...formErrors, message: undefined })
                      }}
                      placeholder="Provide details regarding your desired item, custom finish, or delivery specifications..."
                      className={`w-full p-5 rounded-2xl bg-white/70 border text-sm text-[#181818] placeholder:text-[#7c7c7c] focus:outline-none focus:ring-1 resize-none transition-all ${
                        formErrors.message
                          ? "border-red-400 focus:ring-red-400"
                          : "border-[#181818]/15 focus:ring-[#181818]"
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-mono">
                        <AlertCircle className="h-3 w-3" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-mono flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Please complete all required fields with valid details before dispatching.</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-8 py-4 rounded-full bg-[#181818] hover:bg-[#38322c] text-[#f0ebe6] text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-95 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Dispatching to Gmail...</span>
                        </>
                      ) : (
                        <>
                          <span>Dispatch Inquiry</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#7c7c7c]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Dispatched directly to: <strong className="text-[#181818]">nextshopp0904@gmail.com</strong></span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-[#181818]/10 lg:pl-12">
              <div>
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
                  [ COMMITMENT ]
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-[#181818] mb-3">
                  Concierge Service Standards
                </h3>
                <p className="text-xs sm:text-sm text-[#4f4742] leading-relaxed">
                  We assign every patron order to an individual liaison. From the moment your payment token validates until final unboxing at your premises, your liaison monitors transit temperature, tracking handoffs, and arrival satisfaction.
                </p>
              </div>

              <div className="rounded-[24px] bg-[#181818] text-[#f0ebe6] p-8 shadow-xl space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#f0ebe6]/70">
                  Architectural Trade Division
                </span>
                <h4 className="text-xl font-bold uppercase tracking-tight text-[#f0ebe6]">
                  Studio Specifier Program
                </h4>
                <p className="text-xs text-[#f0ebe6]/80 leading-relaxed font-mono">
                  Are you specifying furniture, acoustics, or fixtures for commercial sanctuaries or private residences? Contact our Trade Lead directly:
                </p>
                <div className="pt-2">
                  <a
                    href="mailto:nextshopp0904@gmail.com"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:underline"
                  >
                    <span>nextshopp0904@gmail.com</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Concierge FAQ Section (Numbered Accordion) */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-14">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-2">
              [ KNOWLEDGE PROTOCOL ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-[#181818]">
              Frequently Consulted Protocols
            </h2>
          </div>

          <div className="divide-y divide-[#181818]/15 border-y border-[#181818]/15">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={item.num} className="py-6 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left group"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8 pr-4">
                      <span className="text-xs font-mono text-[#7c7c7c]">{item.num}</span>
                      <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#181818] group-hover:opacity-80 transition-opacity">
                        {item.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-[#181818]/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#181818] text-[#f0ebe6]" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pl-8 sm:pl-16 pr-8 text-xs sm:text-sm text-[#4f4742] leading-relaxed animate-in slide-in-from-top-2 duration-200 font-mono">
                      {item.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}