"use client";

import { useState } from "react";
import ProductGallery from "@/components/product-gallery";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

export default function GalleryExamplePage() {
  // Sample product data with real images from the public directory
  const productImages = [
    {
      id: "1",
      src: "/headphone_1.webp",
      alt: "Headphones front view"
    },
    {
      id: "2",
      src: "/football shoes1.avif",
      alt: "Shoes side view"
    },
    {
      id: "3",
      src: "/jacket_1.avif",
      alt: "Jacket front view"
    },
    {
      id: "4",
      src: "/sunglasses.webp",
      alt: "Sunglasses view"
    }
  ];

  // Alternative product data - smartphone images
  const smartphoneImages = [
    {
      id: "1",
      src: "/samsung_25.jpg",
      alt: "Smartphone front view"
    },
    {
      id: "2",
      src: "/football shoes2.avif",
      alt: "Product image 2"
    },
    {
      id: "3",
      src: "/jacket_2.avif",
      alt: "Product image 3"
    },
    {
      id: "4",
      src: "/razer_1.jpg",
      alt: "Product image 4"
    }
  ];

  // Use state to toggle between products
  const [currentProduct, setCurrentProduct] = useState(1);
  const images = currentProduct === 1 ? productImages : smartphoneImages;
  const productName = currentProduct === 1 ? "Premium Headphones" : "Smartphone Model X";

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Product Gallery Example</h1>
      
      <div className="mb-6 flex justify-center space-x-4">
        <Button 
          onClick={() => setCurrentProduct(1)} 
          variant={currentProduct === 1 ? "default" : "outline"}
        >
          Product 1
        </Button>
        <Button 
          onClick={() => setCurrentProduct(2)} 
          variant={currentProduct === 2 ? "default" : "outline"}
        >
          Product 2
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <ProductGallery images={images} productName={productName} />
        
        {/* Product Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{productName}</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">₹{currentProduct === 1 ? "2,999" : "12,999"}</span>
            <span className="text-gray-500 line-through">₹{currentProduct === 1 ? "4,999" : "16,999"}</span>
            <span className="text-green-600 font-medium">{currentProduct === 1 ? "40%" : "23%"} off</span>
          </div>
          
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star, i) => (
              <svg 
                key={i}
                className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-2">4.5 (1,234 reviews)</span>
          </div>
          
          <p className="text-gray-700">
            {currentProduct === 1 
              ? "Wireless Headphones with 80 Hours Playback, Dolby Audio, Touch & Swipe Controls. Perfect for music lovers and gamers alike."
              : "Experience next-generation speed and performance. Featuring a stunning display, fast charging, and a sleek design with pro-grade camera system."}
          </p>
          
          <div className="border-t border-b py-4 my-4">
            <h3 className="font-medium mb-2">Key Features</h3>
            <ul className="space-y-2">
              {(currentProduct === 1 
                ? ["80 Hours Battery Life", "Dolby Audio", "Touch & Swipe Controls", "Active Noise Cancellation"] 
                : ["5G Connectivity", "45W Fast Charging", "120Hz Display", "Pro-grade Camera System"]
              ).map((spec, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="bg-gray-200 rounded-full h-1.5 w-1.5"></span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 