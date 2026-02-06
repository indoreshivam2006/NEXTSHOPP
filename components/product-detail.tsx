"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothImage } from "@/components/ui/smooth-image";
import { GSAPReveal } from "@/components/ui/gsap-reveal";
import { Star } from "lucide-react";
import { gsap } from "gsap";

interface ProductColor {
  color: string;
  name: string;
  image: string;
  fallbackImage?: string;
}

interface ProductSize {
  label: string;
  value: string;
}

interface ProductDetailProps {
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  className?: string;
}

export function ProductDetail({
  title = "Nike Mercurial Vapor 16 Elite By You",
  price = 24500,
  originalPrice = 24895,
  discount = 15,
  rating = 4,
  reviewCount = 213,
  features = ["Lightweight running shoes with responsive cushioning."],
  colors = [
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
  sizes = [
    { label: "UK 7", value: "uk-7" },
    { label: "UK 8", value: "uk-8" },
    { label: "UK 9", value: "uk-9" },
    { label: "UK 10", value: "uk-10" },
    { label: "UK 11", value: "uk-11" },
    { label: "UK 12", value: "uk-12" },
  ],
  className = "",
}: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [nextImage, setNextImage] = useState("");
  const [imgError, setImgError] = useState(false);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);

  // Format the price to include commas for thousands
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price).replace('₹', '₹');
  };

  // Preload images on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preload all color images to avoid loading delays during color switches
      colors.forEach(color => {
        const img = new window.Image();
        img.src = color.image;
        // Also preload fallback images
        if (color.fallbackImage) {
          const fallbackImg = new window.Image();
          fallbackImg.src = color.fallbackImage;
        }
      });
    }
  }, [colors]);

  // Handle color selection with GSAP animation
  const handleColorChange = (color: ProductColor) => {
    if (selectedColor.color === color.color || !imageContainerRef.current) return;
    
    console.log(`Changing color to ${color.name}, image: ${color.image}`);
    
    // Set next image to load it
    setNextImage(color.image);
    setImgError(false);
    
    // Animate with GSAP for smoother transition
    if (activeImageRef.current) {
      // Fade out current image
      gsap.to(activeImageRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Update selected color after animation completes
          setSelectedColor(color);
          setActiveImage(color.image);
          setNextImage("");
          
          // Prepare for next animation
          if (activeImageRef.current) {
            gsap.set(activeImageRef.current, { opacity: 0, scale: 0.95 });
            gsap.to(activeImageRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      });
    } else {
      // Fallback if refs aren't available
      setSelectedColor(color);
      setActiveImage(color.image);
    }
  };

  // Handle image error
  const handleImageError = () => {
    console.error(`Error loading image: ${activeImage}`);
    
    if (selectedColor.fallbackImage && !imgError) {
      console.log(`Using fallback image: ${selectedColor.fallbackImage}`);
      setImgError(true);
      setActiveImage(selectedColor.fallbackImage);
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {/* Product Image with GSAP animation */}
      <div 
        ref={imageContainerRef}
        className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square"
      >
        {/* Active image */}
        <div 
          ref={activeImageRef}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={activeImage} 
            alt={`${title} in ${selectedColor.name}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        
        {/* Next image preload (hidden) */}
        {nextImage && (
          <div 
            ref={nextImageRef}
            className="absolute inset-0 w-full h-full opacity-0"
          >
            <img 
              src={nextImage} 
              alt={`${title}`}
              className="w-full h-full object-cover"
              onError={() => console.error(`Error loading next image: ${nextImage}`)}
            />
          </div>
        )}

        {/* Current color indicator */}
        <div className="absolute bottom-4 right-4 flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <div 
            className="w-4 h-4 rounded-full mr-2"
            style={{ 
              backgroundColor: selectedColor.color === "white" ? "#FFFFFF" : "#000000",
              border: selectedColor.color === "white" ? "1px solid #E5E7EB" : "none"
            }}
          ></div>
          <span className="text-sm font-medium">{selectedColor.name}</span>
        </div>
      </div>

      {/* Product details */}
      <GSAPReveal animation="fade" direction="up" className="space-y-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        
        {/* Price section */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-xl">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discount && (
            <span className="text-green-600 font-semibold text-xl">
              {discount}%
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Key Features</h2>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300 mt-2"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Color selection - with enhanced animation */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Select Color</h2>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.color}
                onClick={() => handleColorChange(color)}
                className={`w-14 h-14 rounded-full transition-all ${
                  selectedColor.color === color.color
                    ? "ring-2 ring-offset-2 ring-black scale-110 transform"
                    : "hover:ring-1 hover:ring-offset-1 hover:ring-gray-300 hover:scale-105 transform"
                }`}
                style={{ overflow: "hidden", transition: "all 0.3s ease" }}
                aria-label={`Select ${color.name} color`}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: color.color === "white" 
                      ? "#FFFFFF" 
                      : "#000000",
                    border: color.color === "white" 
                      ? "1px solid #E5E7EB" 
                      : "none" 
                  }}
                >
                  {selectedColor.color === color.color && (
                    <div className="w-3 h-3 rounded-full bg-white border border-gray-300" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">Selected: {selectedColor.name}</p>
        </div>

        {/* Size selection */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Select Size</h2>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={`px-4 py-2 border rounded-md transition-all duration-200 ${
                  selectedSize === size.value
                    ? "border-black ring-1 ring-gray-400 bg-gray-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart button */}
        <button className="w-full bg-black text-white rounded-md py-3 font-semibold hover:bg-gray-800 transition-colors transform hover:scale-[1.01] active:scale-[0.98] duration-200">
          Add to Cart
        </button>
      </GSAPReveal>
    </div>
  );
} 