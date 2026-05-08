"use client";

import { useEffect, useState } from "react";

export function useGSAP() {
  const [gsap, setGsap] = useState(null as any);
  const [ScrollTrigger, setScrollTrigger] = useState(null as any);

  useEffect(() => {
    let active = true;

    // Dynamically load GSAP and ScrollTrigger on client only
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])
      .then(([gsapModule, STModule]) => {
        if (!active) return;
        
        // Safely extract GSAP and ScrollTrigger from Next.js dynamic ES Module imports
        const g = gsapModule.gsap || gsapModule.default || gsapModule;
        const ST = STModule.ScrollTrigger || STModule.default || STModule;
        
        if (g && ST) {
          g.registerPlugin(ST);
          setGsap(g);
          setScrollTrigger(ST);
        } else {
          console.error("Failed to extract GSAP or ScrollTrigger from dynamic import", { g, ST });
        }
      })
      .catch((err) => {
        console.error("Failed to dynamically import GSAP/ScrollTrigger:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return { gsap, ScrollTrigger };
}
