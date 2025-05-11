"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getCategories } from "@/lib/firebase/categories";

// Define category interface
interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export default function MobileCategoryNav() {
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
    <div className="py-1">
      {/* Category Dropdown Toggle */}
      <button 
        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Categories</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Category List */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pl-6 py-2 space-y-1">
          {loading ? (
            // Loading skeleton
            Array(5).fill(null).map((_, index) => (
              <div key={index} className="animate-pulse h-8 bg-gray-100 rounded my-1"></div>
            ))
          ) : (
            // Simple category list items
            categories.map((category) => {
              let displayName = category.name;
              if (category.slug === "basic-needs") displayName = "Basic Needs";
              
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block py-2 text-sm text-gray-700 hover:text-indigo-600"
                >
                  {displayName}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 