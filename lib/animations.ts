import { gsap } from 'gsap';

// Common easing options for smooth animations
export const Ease = {
  SMOOTH: 'power2.out',
  SMOOTH_IN_OUT: 'power2.inOut',
  ELASTIC: 'elastic(1, 0.3)',
  BOUNCE: 'bounce.out',
  BACK: 'back.out(1.7)',
  CIRC: 'circ.out',
};

/**
 * Animate an element into view
 */
export const fadeIn = (
  element: HTMLElement | string,
  {
    duration = 0.7,
    delay = 0,
    ease = Ease.SMOOTH,
    y = 20,
    opacity = 0,
    scale = 1,
    stagger = 0,
  } = {}
) => {
  return gsap.fromTo(
    element,
    { opacity, y, scale },
    {
      duration,
      delay,
      opacity: 1,
      y: 0,
      scale: 1,
      ease,
      stagger: typeof stagger === 'object' ? stagger : { amount: stagger },
      clearProps: 'transform',
    }
  );
};

/**
 * Animate an element out of view
 */
export const fadeOut = (
  element: HTMLElement | string,
  {
    duration = 0.7,
    delay = 0,
    ease = Ease.SMOOTH,
    y = -20,
    opacity = 0,
    stagger = 0,
  } = {}
) => {
  return gsap.to(element, {
    duration,
    delay,
    opacity,
    y,
    ease,
    stagger: typeof stagger === 'object' ? stagger : { amount: stagger },
  });
};

/**
 * Creates a staggered animation for a group of elements
 */
export const staggerItems = (
  elements: HTMLElement[] | NodeListOf<Element> | string,
  {
    duration = 0.7,
    stagger = 0.1,
    from = 'start',
    ease = Ease.SMOOTH,
    y = 20,
    delay = 0,
  } = {}
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: {
        amount: stagger,
        from: from as 'start' | 'end' | 'center' | 'edges' | 'random',
      },
      ease,
      delay,
      clearProps: 'transform',
    }
  );
};

/**
 * Animates elements as they enter the viewport
 */
export const createScrollAnimation = (
  elements: string | HTMLElement[] | NodeListOf<Element>,
  {
    y = 40,
    duration = 0.7,
    stagger = 0.1,
    start = 'top 80%',
    toggleActions = 'play none none none',
    markers = false,
  } = {}
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      scrollTrigger: {
        trigger: Array.isArray(elements) || elements instanceof NodeList 
          ? elements[0] 
          : elements,
        start,
        toggleActions,
        markers,
      },
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: Ease.SMOOTH_IN_OUT,
      clearProps: 'transform',
    }
  );
}; 