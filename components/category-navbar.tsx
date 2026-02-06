"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Shirt, Monitor, ShoppingBag, Home, Sparkles, Watch, HeartHandshake, ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/firebase/categories";

// Define category interface
interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

// Define category icons
const categoryIcons = {
  "electronics": <Monitor className="text-white" size={20} />,
  "clothing": <Shirt className="text-white" size={20} />,
  "footwear": <ShoppingBag className="text-white" size={20} />,
  "home": <Home className="text-white" size={20} />,
  "beauty": <Sparkles className="text-white" size={20} />,
  "accessories": <Watch className="text-white" size={20} />,
  "basic-needs": <HeartHandshake className="text-white" size={20} />,
};

// Define category colors
const categoryColors = {
  "electronics": {
    main: "bg-blue-600",
    text: "text-blue-600"
  },
  "clothing": {
    main: "bg-indigo-600", 
    text: "text-indigo-600"
  },
  "footwear": {
    main: "bg-red-600",
    text: "text-red-600"
  },
  "home": {
    main: "bg-amber-600",
    text: "text-amber-600"
  },
  "beauty": {
    main: "bg-pink-600",
    text: "text-pink-600"
  },
  "accessories": {
    main: "bg-purple-600",
    text: "text-purple-600"
  },
  "basic-needs": {
    main: "bg-teal-600",
    text: "text-teal-600"
  },
};

// Define discount information
const categoryDiscounts = {
  "electronics": "65% OFF",
  "clothing": "65% OFF",
  "footwear": "65% OFF",
  "home": "65% OFF",
  "beauty": "65% OFF",
  "accessories": "65% OFF",
  "basic-needs": "75% OFF",
};

// Define description information
const categoryDescriptions = {
  "electronics": "Cutting-edge devices for everyday use.",
  "clothing": "Innovative apparel with adaptive materials.",
  "footwear": "Smart shoes for comfort and performance.",
  "home": "Smart home solutions for modern living.",
  "beauty": "Advanced beauty products for self-care.",
  "accessories": "Modern accessories for every occasion.",
  "basic-needs": "Essentials for daily living, comfort, and well-being.",
};

export default function CategoryNavbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative group">
      {/* Category Navbar Trigger */}
      <button 
        className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <span>Categories</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Category Dropdown */}
      <div 
        className={`absolute left-0 mt-2 w-60 bg-white shadow-xl rounded-lg z-50 transform origin-top transition-all duration-200 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-3">
          {loading ? (
            // Loading skeleton
            Array(6).fill(null).map((_, index) => (
              <div key={index} className="animate-pulse h-8 bg-gray-100 rounded my-1"></div>
            ))
          ) : (
            // Simple category list
            <ul className="space-y-1">
              {categories.map((category) => {
                let displayName = category.name;
                if (category.slug === "basic-needs") displayName = "Basic Needs";
                
                return (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {displayName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 