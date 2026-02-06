"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
  fadeIn?: boolean;
  stagger?: boolean;
  staggerAmount?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className = "",
  parallax = false,
  parallaxSpeed = 0.3,
  fadeIn = true,
  stagger = false,
  staggerAmount = 0.1,
  id,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Setup animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Parallax effect on scroll
    if (parallax) {
      gsap.to(contentRef.current, {
        y: `${-30 * parallaxSpeed}%`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Fade in animation
    if (fadeIn) {
      const childElements = contentRef.current.children;
      const targets = stagger && childElements.length > 1 
        ? childElements 
        : contentRef.current;
      
      tl.fromTo(
        targets,
        { 
          y: 30, 
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: stagger ? staggerAmount : 0,
          clearProps: "transform",
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [parallax, parallaxSpeed, fadeIn, stagger, staggerAmount]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      id={id}
    >
      <div 
        ref={contentRef} 
        className="w-full animated-section-content"
      >
        {children}
      </div>
    </section>
  );
} 