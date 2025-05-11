import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

interface ScrollOptions {
  offset?: number;
  duration?: number;
  ease?: string;
}

/**
 * Smoothly scrolls to an element or position on the page
 * @param target - The element or selector to scroll to, or a y-position
 * @param options - Configuration options for the scroll animation
 */
export const smoothScroll = (
  target: string | HTMLElement | number,
  options: ScrollOptions = {}
) => {
  const { offset = 0, duration = 1, ease = 'power2.inOut' } = options;

  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: offset,
    },
    ease,
  });
};

/**
 * Smoothly scrolls to the top of the page
 * @param duration - Duration of the animation in seconds
 */
export const scrollToTop = (duration = 1) => {
  gsap.to(window, {
    duration,
    scrollTo: { y: 0 },
    ease: 'power2.inOut',
  });
};

/**
 * Enables native smooth scrolling for the entire page
 */
export const enableSmoothScroll = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}; 