"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScrollContext } from "@/context/smooth-scroll-context";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  showAtPosition?: number;
  className?: string;
}

export function ScrollToTop({
  showAtPosition = 300,
  className = "",
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const { scrollTop } = useSmoothScrollContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAtPosition) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAtPosition]);

  const handleClick = () => {
    scrollTop(0.8);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
} 