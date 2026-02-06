"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/firebase/categories";
import { Shirt, Monitor, ShoppingBag, Home, Sparkles, Watch, ChevronRight, HeartHandshake } from "lucide-react";

// Define category interface
interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// Define category icons with modern styling
const categoryIcons = {
  "electronics": <Monitor className="text-white" size={24} />,
  "clothing": <Shirt className="text-white" size={24} />,
  "footwear": <ShoppingBag className="text-white" size={24} />,
  "home": <Home className="text-white" size={24} />,
  "beauty": <Sparkles className="text-white" size={24} />,
  "accessories": <Watch className="text-white" size={24} />,
  "basic-needs": <HeartHandshake className="text-white" size={24} />,
};

// Define color schemes for categories (main, accent, background)
const categoryColors = {
  "electronics": {
    main: "bg-blue-600",
    accent: "from-blue-600 to-blue-500",
    bg: "bg-blue-600",
    text: "text-blue-600"
  },
  "clothing": {
    main: "bg-indigo-600", 
    accent: "from-indigo-600 to-indigo-500",
    bg: "bg-indigo-600",
    text: "text-indigo-600"
  },
  "footwear": {
    main: "bg-red-600",
    accent: "from-red-600 to-red-500",
    bg: "bg-red-600",
    text: "text-red-600"
  },
  "home": {
    main: "bg-amber-600",
    accent: "from-amber-600 to-amber-500",
    bg: "bg-amber-600",
    text: "text-amber-600"
  },
  "beauty": {
    main: "bg-pink-600",
    accent: "from-pink-600 to-pink-500",
    bg: "bg-pink-600",
    text: "text-pink-600"
  },
  "accessories": {
    main: "bg-purple-600",
    accent: "from-purple-600 to-purple-500",
    bg: "bg-purple-600",
    text: "text-purple-600"
  },
  "basic-needs": {
    main: "bg-teal-600",
    accent: "from-teal-600 to-teal-500",
    bg: "bg-teal-600",
    text: "text-teal-600"
  },
};

// Define discount information
const categoryDiscounts = {
  "electronics": "70% OFF",
  "clothing": "80% OFF",
  "footwear": "60% OFF",
  "home": "65% OFF",
  "beauty": "70% OFF",
  "accessories": "80% OFF",
  "basic-needs": "75% OFF",
};

// Define product preview counts
const categoryProducts = {
  "electronics": "2.5K+ products",
  "clothing": "5K+ products",
  "footwear": "1.8K+ products",
  "home": "3.2K+ products",
  "beauty": "1.5K+ products",
  "accessories": "2K+ products",
  "basic-needs": "1K+ products",
};

export default function ShopCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data as Category[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="aspect-square bg-slate-100 rounded-xl animate-pulse">
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((category) => {
        const slug = category.slug as keyof typeof categoryColors;
        const colors = categoryColors[slug] || {
          main: "bg-gray-600", 
          accent: "from-gray-600 to-gray-500",
          bg: "bg-gray-600",
          text: "text-gray-600"
        };
        const discount = categoryDiscounts[slug as keyof typeof categoryDiscounts] || "50% OFF";
        const icon = categoryIcons[slug as keyof typeof categoryIcons] || <ShoppingBag className="text-white" size={24} />;
        
        let displayName = category.name;
        if (slug === "basic-needs") displayName = "Basic Needs";
        
        return (
          <Link 
            key={category.id}
            href={`/categories/${slug}`}
            className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className={`${colors.bg} text-white h-full flex flex-col p-5`}>
              {/* Header with discount badge */}
              <div className="flex justify-end mb-5">
                <div className="rounded-full bg-white/20 text-xs font-bold px-2 py-1">
                  {discount}
                </div>
              </div>
              
              {/* Icon and Category */}
              <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                <div className="border border-white/60 rounded-full p-5 mb-4 transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </div>
                <h3 className="font-bold text-lg text-white text-center">{displayName}</h3>
              </div>
              
              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-white/20">
                <div className="text-sm font-medium flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Shop Now</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 