"use client";

import { useEffect, useRef } from "react";

interface ParallaxOptions {
  speed?: number; // 0.1 = very subtle, 0.5 = medium, 1 = strong
  direction?: "y" | "x";
}

/**
 * Pure native scroll parallax — no GSAP, no external deps.
 * Fully SSR-safe for Next.js App Router.
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.3, direction = "y" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let rafId: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // How far the element's center is from the viewport center
      const viewportMid = window.innerHeight / 2;
      const elMid = rect.top + rect.height / 2;
      const offset = (elMid - viewportMid) * speed * -0.25;

      if (direction === "y") {
        el.style.transform = `translateY(${offset}px)`;
      } else {
        el.style.transform = `translateX(${offset}px)`;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Run once on mount to set initial position
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      // Reset transform on unmount
      if (el) el.style.transform = "";
    };
  }, [speed, direction]);

  return ref;
}
