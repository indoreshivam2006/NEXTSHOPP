"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Battery,
  Bluetooth,
  Camera,
  Cpu,
  Fingerprint,
  Mic,
  ShieldCheck,
  Sparkles,
  Watch,
  Zap,
} from "lucide-react"
import {
  ProductExpandableCard,
  ExpandableProductItem,
} from "@/components/product-expandable-card"

// Curated signature items from the active catalog formatted for the Expandable Showcase
const SIGNATURE_PRODUCTS: ExpandableProductItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25 AI Edition",
    category: "High-Precision Tech",
    price: 80999,
    originalPrice: 89999,
    image: "/samsung_25.jpg",
    rating: 4.9,
    reviews: 142,
    tag: "Signature Release",
    description:
      "Next-generation architectural titanium flagship featuring Galaxy AI, 3nm Snapdragon 8 Elite, and pro-grade quad sensor optics.",
    features: [
      { icon: Battery, text: "30-hour battery life (5000mAh)" },
      { icon: Cpu, text: "Snapdragon 8 Elite (3nm)" },
      { icon: Camera, text: "200MP Quad Pro-Visual Engine" },
      { icon: ShieldCheck, text: "Titanium frame & Gorilla Armor Glass" },
    ],
  },
  {
    id: "5",
    name: "Acoustic Over-Ear Studio Monitors",
    category: "Acoustic Engineering",
    price: 4999,
    originalPrice: 7999,
    image: "/headphone_1.webp",
    rating: 4.8,
    reviews: 98,
    tag: "Best Seller",
    description:
      "Experience crystal-clear audio with our latest noise-cancelling technology. Perfect for studio work, travel, or acoustic contemplation.",
    features: [
      { icon: Battery, text: "30-hour battery life" },
      { icon: Bluetooth, text: "Bluetooth 5.2 Hi-Res Audio" },
      { icon: Fingerprint, text: "Touch controls & tactile volume dials" },
      { icon: Mic, text: "Voice assistant with beamforming dual mics" },
    ],
  },
  {
    id: "10",
    name: "Sculptural Brass Ambient Pendant",
    category: "Architectural Living",
    price: 8499,
    originalPrice: 11999,
    image: "/hanging_lamp.jpg",
    rating: 5.0,
    reviews: 64,
    tag: "Atelier Craft",
    description:
      "Solid hand-turned brushed brass joined with warm sanded beige ceramic shade, casting a warm diffused 2700K ambient glow.",
    features: [
      { icon: Sparkles, text: "Solid hand-turned brushed brass" },
      { icon: Zap, text: "2700K warm incandescent LED" },
      { icon: Fingerprint, text: "Tactile rotary dimmable switch" },
      { icon: ShieldCheck, text: "Hand-finished sanded matte ceramic" },
    ],
  },
  {
    id: "2",
    name: "All-Weather Technical Field Jacket",
    category: "Timeless Apparel",
    price: 5599.99,
    originalPrice: 6999.99,
    image: "/jacket_1.avif",
    rating: 4.7,
    reviews: 82,
    tag: "Adaptive Fabric",
    description:
      "Weatherproof structured silhouette engineered with 3-layer breathable Japanese technical membrane and heat-welded seams.",
    features: [
      { icon: ShieldCheck, text: "20,000mm hydrostatic waterproof rating" },
      { icon: Zap, text: "YKK AquaGuard sealed zippers" },
      { icon: Sparkles, text: "Articulated 3D ergonomic silhouette" },
      { icon: Cpu, text: "3-layer breathable micro-ripstop nylon" },
    ],
  },
  {
    id: "7",
    name: "Minimalist Comet Everyday Low-Tops",
    category: "Footwear & Leather",
    price: 4299,
    originalPrice: 5999,
    image: "/comet1.webp",
    rating: 4.8,
    reviews: 110,
    tag: "Full-Grain Leather",
    description:
      "Handcrafted full-grain Italian calfskin leather low-tops with ergonomic cushioned EVA footbed and vulcanized rubber sole.",
    features: [
      { icon: Sparkles, text: "Full-grain Italian calfskin leather" },
      { icon: Zap, text: "OrthoLite dual-density memory foam" },
      { icon: ShieldCheck, text: "Reinforced vulcanized rubber outsole" },
      { icon: Cpu, text: "Minimalist blind-embossed studio insignia" },
    ],
  },
  {
    id: "12",
    name: "Heritage Swiss Precision Timepiece",
    category: "Accessories & Carry",
    price: 185000,
    originalPrice: 210000,
    image: "/rado1.png",
    rating: 4.9,
    reviews: 47,
    tag: "Limited Reserve",
    description:
      "High-tech ceramic automatic chronometer with 80-hour power reserve, skeleton dial, and anti-reflective sapphire crystal.",
    features: [
      { icon: Watch, text: "Calibre R734 automatic movement" },
      { icon: ShieldCheck, text: "High-tech scratch-resistant ceramic case" },
      { icon: Battery, text: "80-hour extended power reserve" },
      { icon: Sparkles, text: "100m water resistance & sapphire glass" },
    ],
  },
]

export default function ArcSphereFeaturedShowcase() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  return (
    <section className="relative py-20 md:py-32 bg-[#f0ebe6] border-b border-[#181818]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7c7c7c] block mb-3">
              [ 02 // CURATED CATALOGUE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#181818] uppercase">
              Featured Signatures
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4742] mt-2 font-mono">
              Tap any piece to inspect architectural specifications, audio metrics, and materials.
            </p>
          </div>

          <Link href="/products" className="btn-arcsphere-secondary">
            <span>View All (24 Objects)</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stable Architectural Grid with Harmonious Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SIGNATURE_PRODUCTS.map((product) => (
            <div key={product.id} className="w-full flex">
              <ProductExpandableCard
                product={product}
                isExpanded={activeCardId === product.id}
                onToggle={() =>
                  setActiveCardId(activeCardId === product.id ? null : product.id)
                }
                onClose={() => setActiveCardId(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
