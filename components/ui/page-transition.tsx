"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Transition timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            delay: 0.2 
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Page transition effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (overlayRef.current && contentRef.current) {
        const tl = gsap.timeline();
        
        // Reset the content
        tl.set(contentRef.current, { opacity: 0, y: 20 });
        
        // Fade in the content
        tl.to(contentRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          delay: 0.1 
        });
      }
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div ref={overlayRef} className="page-transition-overlay fixed inset-0 z-50 pointer-events-none"></div>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </>
  );
} 