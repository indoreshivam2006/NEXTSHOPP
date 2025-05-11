"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface SmoothCursorProps {
  color?: string;
  size?: number;
  trailSize?: number;
  showTrail?: boolean;
  enabled?: boolean;
}

export function SmoothCursor({
  color = "rgba(0, 0, 0, 0.5)",
  size = 20,
  trailSize = 8,
  showTrail = true,
  enabled = true,
}: SmoothCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handlePointerCheck = (e: MouseEvent) => {
      // Check if hovering over clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const isClickable = 
          computedStyle.cursor === 'pointer' || 
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' ||
          element.closest('a') || 
          element.closest('button');
        setIsPointer(!!isClickable);
      }
    };

    // Trail effect using GSAP
    let trailAnimation: gsap.core.Tween;
    if (showTrail && trailRef.current) {
      trailAnimation = gsap.to(trailRef.current, {
        duration: 0.5,
        x: position.x,
        y: position.y,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', handlePointerCheck);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', handlePointerCheck);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (trailAnimation) trailAnimation.kill();
    };
  }, [enabled, position.x, position.y, showTrail]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[999] rounded-full mix-blend-difference"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor trail */}
      {showTrail && (
        <div
          ref={trailRef}
          className="fixed pointer-events-none z-[998] rounded-full mix-blend-difference"
          style={{
            backgroundColor: color,
            width: trailSize,
            height: trailSize,
            opacity: isVisible ? 0.6 : 0,
            transform: `translate(${position.x - trailSize / 2}px, ${position.y - trailSize / 2}px)`,
          }}
        />
      )}
    </>
  );
} 