import ArcSphereHero from "@/components/arcsphere-hero"
import ArcSphereMarquee from "@/components/arcsphere-marquee"
import ArcSpherePhilosophy from "@/components/arcsphere-philosophy"
import ArcSphereFeaturedShowcase from "@/components/arcsphere-featured-showcase"
import ArcSphereCategories from "@/components/arcsphere-categories"
import ArcSphereExpertise from "@/components/arcsphere-expertise"
import ArcSphereProcess from "@/components/arcsphere-process"
import ArcSphereTestimonials from "@/components/arcsphere-testimonials"
import ArcSphereCta from "@/components/arcsphere-cta"

export const metadata = {
  title: "NEXTSHOPP — Architectural Minimalist E-Commerce & Curated Living",
  description: "Bespoke digital department store featuring high-precision acoustics, structured apparel, footwear, and interior artifacts.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f0ebe6] text-[#181818]">
      {/* 1. ArcSphere Hero Section */}
      <ArcSphereHero />

      {/* 2. Marquee Ticker */}
      <ArcSphereMarquee />

      {/* 3. Brand Philosophy & Craftsmanship */}
      <ArcSpherePhilosophy />

      {/* 4. Featured Product Showcase (Gated Cart & Buy) */}
      <ArcSphereFeaturedShowcase />

      {/* 5. Numbered Department Categories */}
      <ArcSphereCategories />

      {/* 6. Specialized Focus 50/50 Cards */}
      <ArcSphereExpertise />

      {/* 7. 4-Stage Curation & Quality Protocol */}
      <ArcSphereProcess />

      {/* 8. Patron Critique Editorial Testimonial */}
      <ArcSphereTestimonials />

      {/* 9. Collective Communique Newsletter CTA */}
      <ArcSphereCta />
    </main>
  )
}
