"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "./useGSAP";

interface ParallaxOptions {
  speed?: number;      // 0.1 = very slow, 0.5 = medium, 1 = normal
  direction?: "y" | "x";
  start?: string;      // GSAP ScrollTrigger start (default: "top bottom")
  end?: string;        // GSAP ScrollTrigger end (default: "bottom top")
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { gsap, ScrollTrigger } = useGSAP();
  const { speed = 0.3, direction = "y", start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !ref.current) return;

    const el = ref.current;
    const distance = direction === "y" ? 80 * speed : 60 * speed;

    const tween = gsap.fromTo(el,
      { [direction]: distance * -1 },
      {
        [direction]: distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 1,         // smooth scrub (number instead of boolean)
        }
      }
    );

    return () => {
      if (tween) {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      }
    };
  }, [gsap, ScrollTrigger, speed, direction, start, end]);

  return ref;
}
