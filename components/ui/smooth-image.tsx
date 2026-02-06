"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  revealOnScroll?: boolean;
  parallax?: boolean;
  parallaxAmount?: number;
  quality?: number;
  imageProps?: Record<string, any>;
}

export function SmoothImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  revealOnScroll = true,
  parallax = false,
  parallaxAmount = 0.2,
  quality = 90,
  imageProps = {},
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!revealOnScroll);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !revealOnScroll) return;

    // Create scroll trigger for reveal
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => setIsVisible(true),
    });

    // Create parallax effect
    if (parallax && imageRef.current) {
      gsap.to(imageRef.current, {
        y: `${parallaxAmount * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      // Clean up
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === containerRef.current) {
          st.kill();
        }
      });
    };
  }, [revealOnScroll, parallax, parallaxAmount]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder background */}
      <div
        className="absolute inset-0 bg-gray-100 dark:bg-gray-800 transition-opacity duration-300"
        style={{ opacity: isLoaded ? 0 : 1 }}
      />

      {/* Reveal overlay */}
      {revealOnScroll && (
        <div
          className="absolute inset-0 bg-background z-10 transform transition-transform duration-700 ease-out"
          style={{ 
            transformOrigin: 'bottom',
            transform: isVisible ? 'scaleY(0)' : 'scaleY(1)',
          }}
        />
      )}

      {/* Image container */}
      <div 
        ref={imageRef}
        className={`relative w-full h-full transition-opacity duration-700 ease-out`}
        style={{ opacity: isLoaded && isVisible ? 1 : 0 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          priority={priority}
          quality={quality}
          onLoad={() => setIsLoaded(true)}
          {...imageProps}
        />
      </div>
    </div>
  );
} 