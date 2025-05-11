"use client"

import { useEffect } from 'react'
import ProductStats from '@/components/ProductStats'
import { Metadata } from 'next'

// Sample products data
const sampleProducts = {
  popular: [
    {
      id: "running-shoes-1",
      name: "Nike Mercurial Vapor 16 Elite By You",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 24500.00,
      originalPrice: 24895.00,
      discount: 15,
      image: "/products/shoe-1.jpg",
    },
    {
      id: "running-shoes-2",
      name: "Adidas Ultraboost 23",
      description: "Premium running shoes with energy return tech.",
      price: 18999.00,
      originalPrice: 19999.00,
      discount: 5,
      image: "/products/shoe-2.jpg",
    },
    {
      id: "running-shoes-3",
      name: "Puma Velocity Nitro 2",
      description: "Speed-focused running shoes for athletes.",
      price: 12999.00,
      originalPrice: 14999.00,
      discount: 13,
      image: "/products/shoe-3.jpg",
    },
  ],
  sellers: [
    {
      id: "seller-products-1",
      name: "Own the Run Colorblock Jacket",
      description: "A running jacket for all your daily miles, made with recycled materials.",
      price: 6999.99,
      originalPrice: 6999.99,
      discount: 20,
      image: "/jacket_1.avif",
    },
    {
      id: "seller-products-2",
      name: "Premium Yoga Mat",
      description: "Eco-friendly non-slip yoga mat for maximum comfort.",
      price: 45.99,
      originalPrice: 59.99,
      discount: 23,
      image: "/products/yoga-mat.jpg",
    },
    {
      id: "seller-products-3",
      name: "Wireless Earbuds",
      description: "Sweat-resistant wireless earbuds for workouts.",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      image: "/products/earbuds.jpg",
    },
  ],
  newest: [
    {
      id: "fitness-tracker-1",
      name: "Fitness Tracker",
      description: "Smart fitness tracker with heart rate monitoring.",
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      image: "/products/fitness-tracker.jpg",
    },
    {
      id: "water-bottle-1",
      name: "Insulated Water Bottle",
      description: "Double-walled insulated bottle that keeps drinks cold for 24 hours.",
      price: 34.99,
      originalPrice: 44.99,
      discount: 22,
      image: "/products/water-bottle.jpg",
    },
    {
      id: "smart-watch-1",
      name: "Smart Watch Pro",
      description: "Advanced fitness and health tracking with GPS.",
      price: 299.99,
      originalPrice: 349.99,
      discount: 14,
      image: "/products/smart-watch.jpg",
    },
  ],
  cities: [
    {
      id: "delhi-special-1",
      name: "Delhi Special Package",
      description: "Same-day delivery exclusive products for Delhi.",
      price: 1499.00,
      originalPrice: 1999.00,
      discount: 25,
      image: "/products/delhi-package.jpg",
    },
    {
      id: "mumbai-special-1",
      name: "Mumbai Special Bundle",
      description: "Exclusive offers for Mumbai customers.",
      price: 1599.00,
      originalPrice: 1899.00,
      discount: 16,
      image: "/products/mumbai-bundle.jpg",
    },
    {
      id: "bangalore-special-1",
      name: "Bangalore Tech Bundle",
      description: "Tech products with special prices for Bangalore.",
      price: 2999.00,
      originalPrice: 3499.00,
      discount: 14,
      image: "/products/bangalore-tech.jpg",
    },
  ]
}

export default function ProductStatsPage() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Statistics</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our impressive product statistics and browse featured items from each category.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ProductStats 
              statValue={2000000} 
              statLabel="Happy Customers" 
              statSuffix="+" 
              products={sampleProducts.popular}
            />
            
            <ProductStats 
              statValue={5000} 
              statLabel="Verified Sellers" 
              statSuffix="+" 
              products={sampleProducts.sellers}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductStats 
              statValue={50000} 
              statLabel="Products" 
              statSuffix="+" 
              products={sampleProducts.newest}
            />
            
            <ProductStats 
              statValue={100} 
              statLabel="Cities Served" 
              statSuffix="+" 
              products={sampleProducts.cities}
            />
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to explore our complete catalog?</h2>
            <a 
              href="/products" 
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Browse All Products
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 