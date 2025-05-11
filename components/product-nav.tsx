"use client";

import { useState, useEffect } from "react";
import { ScrollLink } from "@/components/ui/scroll-link";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

interface ProductNavProps {
  items?: NavItem[];
  className?: string;
}

export function ProductNav({
  items = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "Details", href: "#details" },
    { label: "Reviews", href: "#reviews" },
  ],
  className = "",
}: ProductNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);

  // Detect active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if currently navigating via click
        if (isScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections
    items.forEach((item) => {
      const sectionId = item.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [items, isScrolling]);

  // Handle click navigation and temporarily disable intersection observer
  const handleNavClick = () => {
    setIsScrolling(true);
    // Re-enable after animation completes
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <div className={`sticky top-0 z-40 bg-white border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-4">
        <ul className="flex items-center space-x-6 relative h-16">
          {items.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href} className="relative">
                <ScrollLink
                  href={item.href}
                  className={`py-5 inline-block text-sm font-medium transition-colors ${
                    isActive ? "text-black" : "text-gray-500 hover:text-gray-900"
                  }`}
                  duration={0.8}
                  offset={-80}
                  onClick={handleNavClick}
                >
                  {item.label}
                </ScrollLink>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="h-0.5 bg-black absolute bottom-0 left-0 right-0"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 