"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPRevealProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale" | "flip" | "stagger";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  threshold?: number;
  staggerAmount?: number;
  className?: string;
  markers?: boolean;
  scrub?: boolean | number;
}

export function GSAPReveal({
  children,
  animation = "fade",
  direction = "up",
  duration = 1,
  delay = 0,
  threshold = 0.2,
  staggerAmount = 0.1,
  className = "",
  markers = false,
  scrub = false,
}: GSAPRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !childrenRef.current) return;

    // Get all direct children
    const elements = childrenRef.current.children;
    
    // Build animation configuration
    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { 
      opacity: 1,
      duration,
      ease: "power2.out",
      stagger: elements.length > 1 ? staggerAmount : 0,
      delay,
      clearProps: "transform",
    };

    // Add direction-based animation
    if (animation === "fade" || animation === "slide") {
      switch (direction) {
        case "up":
          fromVars.y = 50;
          toVars.y = 0;
          break;
        case "down":
          fromVars.y = -50;
          toVars.y = 0;
          break;
        case "left":
          fromVars.x = 50;
          toVars.x = 0;
          break;
        case "right":
          fromVars.x = -50;
          toVars.x = 0;
          break;
      }
    }

    // Add scale animation
    if (animation === "scale") {
      fromVars.scale = 0.8;
      toVars.scale = 1;
    }

    // Add flip animation
    if (animation === "flip") {
      fromVars.rotationX = direction === "up" || direction === "down" ? -90 : 0;
      fromVars.rotationY = direction === "left" || direction === "right" ? -90 : 0;
      toVars.rotationX = 0;
      toVars.rotationY = 0;
      fromVars.transformPerspective = 600;
    }

    // Create ScrollTrigger animation
    toVars.scrollTrigger = {
      trigger: containerRef.current,
      start: `top ${Math.round(100 - threshold * 100)}%`,
      end: scrub ? "bottom 70%" : undefined,
      scrub: scrub,
      markers: markers,
      toggleActions: "play none none none",
    };

    // Apply animation
    const targets = animation === "stagger" ? elements : childrenRef.current;
    gsap.fromTo(targets, fromVars, toVars);

    return () => {
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animation, direction, duration, delay, threshold, staggerAmount, markers, scrub]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={childrenRef} className="gsap-children">
        {children}
      </div>
    </div>
  );
} 