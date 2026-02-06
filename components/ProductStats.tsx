"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import AnimatedStat from '@/components/AnimatedStat'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image?: string
}

interface ProductStatsProps {
  statValue: number
  statLabel: string
  statPrefix?: string
  statSuffix?: string
  products: Product[]
}

export default function ProductStats({
  statValue,
  statLabel,
  statPrefix = '',
  statSuffix = '',
  products = []
}: ProductStatsProps) {
  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
        <AnimatedStat 
          value={statValue} 
          label={statLabel} 
          prefix={statPrefix} 
          suffix={statSuffix} 
          linkTo="/products" 
        />
      </div>
      
      <div className="bg-white p-6">
        <h3 className="text-lg font-medium mb-4">Featured {statLabel.replace('Happy ', '').replace('Verified ', '')}</h3>
        
        <div className="space-y-4">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              {/* Product Image */}
              <div className="h-20 w-20 bg-gray-100 flex-shrink-0 mr-4 flex items-center justify-center rounded shadow-sm overflow-hidden">
                {product.image ? (
                  <div className="relative h-full w-full">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/product-placeholder.png";
                        target.onerror = null; // Prevent infinite loop
                      }}
                      unoptimized
                    />
                    {product.discount && product.discount > 0 && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 py-0.5 font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 flex items-center justify-center h-full w-full">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8" 
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
              
              {/* Product Details */}
              <div className="flex-grow">
                <Link href={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-indigo-600 line-clamp-1">
                  {product.name}
                </Link>
                <p className="text-gray-500 text-sm line-clamp-1">{product.description}</p>
                <div className="flex items-center mt-1">
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-xs ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* View Button */}
              <Link href={`/products/${product.id}`} className="ml-2">
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </div>
          ))}
        </div>
        
        {products.length > 0 && (
          <div className="mt-6 text-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              View all {products.length} {statLabel.replace('Happy ', '').replace('Verified ', '').toLowerCase()}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 