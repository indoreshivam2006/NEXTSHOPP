import { useEffect, useCallback } from 'react';
import { smoothScroll, enableSmoothScroll, scrollToTop } from '@/lib/smoothScroll';

/**
 * Hook that provides smooth scrolling functionality
 * @param enableNative - Whether to enable native smooth scrolling (CSS)
 */
export function useSmoothScroll(enableNative = true) {
  useEffect(() => {
    if (enableNative) {
      enableSmoothScroll();
    }
    
    return () => {
      // Clean up if needed
      if (typeof document !== 'undefined' && enableNative) {
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, [enableNative]);

  const scrollTo = useCallback((target: string | HTMLElement | number, options = {}) => {
    smoothScroll(target, options);
  }, []);

  const scrollTop = useCallback((duration?: number) => {
    scrollToTop(duration);
  }, []);

  return { scrollTo, scrollTop };
} 