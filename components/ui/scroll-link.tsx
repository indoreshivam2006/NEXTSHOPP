"use client";

import React from "react";
import Link from "next/link";
import { useSmoothScrollContext } from "@/context/smooth-scroll-context";

interface ScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
  withReveal?: boolean;
  onClick?: () => void;
}

export function ScrollLink({
  href,
  children,
  className = "",
  duration = 1,
  offset = 0,
  withReveal = false,
  onClick,
}: ScrollLinkProps) {
  const { scrollTo, scrollTop } = useSmoothScrollContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }
    // Only prevent default if it's a hash link
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        scrollTo(targetElement, { 
          duration: duration,
          offset: offset,
        });
      }
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}