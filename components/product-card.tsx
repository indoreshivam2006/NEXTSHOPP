"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  discount = 0,
  image
}: ProductCardProps) {
  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        
        {/* Image Placeholder */}
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-3">{description}</p>
        
        {/* Price Information */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="font-bold text-lg">{formatPrice(price)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-gray-500 line-through text-sm ml-2">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="default" className="text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 