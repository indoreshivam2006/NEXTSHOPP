"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown, Play, ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImage {
  id: string;
  src: string;
  alt: string;
  isVideo?: boolean;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<ProductImage>(images[0])
  const [startIndex, setStartIndex] = useState(0)
  const maxVisibleThumbnails = 5

  // Check if image source contains keywords that suggest it might be a video
  const getProcessedImages = () => {
    return images.map(img => {
      const isLikelyVideo = 
        img.src.includes("video") || 
        img.alt.toLowerCase().includes("video") ||
        (img.id === "2" && images.length > 3) || 
        (img.id === "3" && images.length > 4);
      
      return {
        ...img,
        isVideo: img.isVideo || isLikelyVideo
      };
    });
  };

  const processedImages = getProcessedImages();

  if (!images || images.length === 0) {
    return <div className="text-center p-8">No images available</div>
  }

  const showPagination = images.length > maxVisibleThumbnails;
  const visibleThumbnails = showPagination 
    ? processedImages.slice(startIndex, startIndex + maxVisibleThumbnails)
    : processedImages;

  const handlePrevPage = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setStartIndex(prev => Math.min(images.length - maxVisibleThumbnails, prev + 1));
  };

  return (
    <div className="flex flex-row gap-4">
      {/* Thumbnails column with top & bottom navigation */}
      <div className="w-24 flex flex-col">
        {/* Up arrow for navigation */}
        {showPagination && startIndex > 0 && (
          <button 
            onClick={handlePrevPage}
            className="flex justify-center items-center bg-gray-100 rounded-full w-8 h-8 mx-auto mb-2 hover:bg-gray-200"
            aria-label="Previous thumbnails"
          >
            <ChevronUp size={16} />
          </button>
        )}
        
        {/* Thumbnails container */}
        <div className="flex flex-col gap-2 overflow-hidden">
          {visibleThumbnails.map((image) => (
            <button
              key={image.id}
              onClick={() => setActiveImage(image)}
              className={`border rounded-none overflow-hidden w-20 h-20 ${
                activeImage.id === image.id 
                  ? "border-blue-500 border-2" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              aria-label={`View ${image.alt}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </div>
            </button>
          ))}
        </div>
        
        {/* Down arrow for navigation */}
        {showPagination && startIndex < images.length - maxVisibleThumbnails && (
          <button 
            onClick={handleNextPage}
            className="flex justify-center items-center bg-gray-100 rounded-full w-8 h-8 mx-auto mt-2 hover:bg-gray-200"
            aria-label="Next thumbnails"
          >
            <ChevronDown size={16} />
          </button>
        )}
      </div>

      {/* Main product image */}
      <div className="flex-1">
        <div className="relative aspect-square w-full bg-white overflow-hidden border border-gray-200">
          <Image 
            src={activeImage.src}
            alt={activeImage.alt || productName}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
