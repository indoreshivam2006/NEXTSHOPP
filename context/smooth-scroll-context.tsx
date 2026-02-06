"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { enableSmoothScroll } from '@/lib/smoothScroll';

// Define the context type
type SmoothScrollContextType = {
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
  scrollTop: (duration?: number) => void;
};

// Create context with default values
const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

// Provider component
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Use our scroll hook
  const { scrollTo, scrollTop } = useSmoothScroll(true);
  
  // Enable smooth scrolling globally
  useEffect(() => {
    enableSmoothScroll();
    
    // Add GSAP ScrollToPlugin script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollToPlugin.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Reset scroll behavior on unmount if needed
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <SmoothScrollContext.Provider value={{ scrollTo, scrollTop }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// Hook to use the context
export function useSmoothScrollContext() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScrollContext must be used within a SmoothScrollProvider');
  }
  return context;
} 