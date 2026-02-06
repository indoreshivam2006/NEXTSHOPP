"use client";

import { useEffect } from "react";
import { ProductDetail } from "@/components/product-detail";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ProductNav } from "@/components/product-nav";
import { GSAPReveal } from "@/components/ui/gsap-reveal";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function ProductPage() {
  // Check if images are loaded - for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const imageBlack = new window.Image();
      imageBlack.src = "/football_shoes_black1.avif";
      imageBlack.onload = () => console.log("Black image loaded successfully");
      imageBlack.onerror = () => console.error("Error loading black image");

      const imageWhite = new window.Image();
      imageWhite.src = "/football_shoes1.avif";
      imageWhite.onload = () => console.log("White image loaded successfully");
      imageWhite.onerror = () => console.error("Error loading white image");
      
      // Verify that public directory contains the images
      console.log("Image paths being used:", {
        black: "/football_shoes_black1.avif",
        white: "/football_shoes1.avif"
      });
    }
  }, []);

  // Sample product data
  const productData = {
    title: "Nike Mercurial Vapor 16 Elite By You",
    price: 24500,
    originalPrice: 28895,
    discount: 15,
    rating: 4,
    reviewCount: 213,
    features: [
      "Lightweight running shoes with responsive cushioning.",
      "Breathable mesh upper keeps your feet cool.",
      "Durable rubber outsole for excellent traction.",
      "Custom design options available.",
      "Perfect for both casual wear and performance running."
    ],
    colors: [
      { 
        color: "black", 
        name: "Black", 
        image: "/football_shoes_black1.avif",
        fallbackImage: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0a149f18-5a05-4ea1-a93c-c9c32a2ac416/custom-nike-mercurial-vapor-15-elite-by-you.png"
      },
      { 
        color: "white", 
        name: "White", 
        image: "/football_shoes1.avif",
        fallbackImage: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/mercurial-vapor-15-elite-fg-high-top-football-boot-6XK2Kq.png"
      }
    ],
    sizes: [
      { label: "UK 7", value: "uk-7" },
      { label: "UK 8", value: "uk-8" },
      { label: "UK 9", value: "uk-9" },
      { label: "UK 10", value: "uk-10" },
      { label: "UK 11", value: "uk-11" },
      { label: "UK 12", value: "uk-12" },
    ]
  };

  return (
    <div className="relative">
      {/* Product Navigation with smooth scrolling */}
      <ProductNav 
        items={[
          { label: "Overview", href: "#overview" },
          { label: "Features", href: "#features" },
          { label: "Specifications", href: "#specs" },
          { label: "Reviews", href: "#reviews" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Overview Section */}
        <AnimatedSection id="overview" className="py-12">
          <ProductDetail {...productData} />
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection id="features" className="py-12" parallax>
          <div className="max-w-3xl mx-auto">
            <GSAPReveal animation="fade" direction="up">
              <h2 className="text-2xl font-bold mb-6">Product Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Lightweight Design</h3>
                  <p className="text-gray-700">
                    The Nike Mercurial Vapor 16 Elite features an ultra-lightweight design that enhances speed and agility on the field, giving you the competitive edge.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Responsive Cushioning</h3>
                  <p className="text-gray-700">
                    Enjoy superior comfort and energy return with the advanced cushioning system that adapts to your movements and playing style.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Precision Control</h3>
                  <p className="text-gray-700">
                    The textured upper provides enhanced ball control in all weather conditions, allowing for precise passes and shots.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Custom Design</h3>
                  <p className="text-gray-700">
                    With the "By You" customization, create a unique look that reflects your personal style and stands out on the pitch.
                  </p>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </AnimatedSection>

        {/* Specifications Section */}
        <AnimatedSection id="specs" className="py-12">
          <div className="max-w-3xl mx-auto">
            <GSAPReveal animation="fade" direction="up">
              <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium bg-gray-50">Upper Material</td>
                      <td className="py-3 px-4">Synthetic with Flyknit technology</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium bg-gray-50">Outsole Type</td>
                      <td className="py-3 px-4">Firm Ground (FG)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium bg-gray-50">Cleat Pattern</td>
                      <td className="py-3 px-4">Chevron studs for explosive acceleration</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium bg-gray-50">Weight</td>
                      <td className="py-3 px-4">Approximately 190g (Size UK 9)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium bg-gray-50">Recommended For</td>
                      <td className="py-3 px-4">Speed players, forwards, wingers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GSAPReveal>
          </div>
        </AnimatedSection>

        {/* Reviews Section */}
        <AnimatedSection id="reviews" className="py-12" parallax>
          <div className="max-w-3xl mx-auto">
            <GSAPReveal animation="fade" direction="up">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < 5 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="font-semibold">Game Changer</h3>
                    <span className="ml-auto text-sm text-gray-500">3 days ago</span>
                  </div>
                  <p className="text-gray-700">
                    These boots are incredible! The touch and feel on the ball is excellent, and they're so lightweight. I've scored more goals since wearing these. Highly recommend for any serious player.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="font-semibold">Great Fit</h3>
                    <span className="ml-auto text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-700">
                    I love how these fit right out of the box. Almost no break-in period needed. The customization options are fantastic too. Only giving 4 stars because they're a bit pricey, but still worth it.
                  </p>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
} 