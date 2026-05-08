"use client";

/**
 * @deprecated GSAP ScrollTrigger is not compatible with Next.js App Router SSR.
 * useParallax now uses a pure native requestAnimationFrame implementation.
 * This file is kept as a no-op stub to prevent import errors in case of residual imports.
 */
export function useGSAP() {
  return { gsap: null, ScrollTrigger: null };
}
