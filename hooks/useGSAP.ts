import { useEffect, useState } from "react";

export function useGSAP() {
  const [gsap, setGsap] = useState<any>(null);
  const [ScrollTrigger, setScrollTrigger] = useState<any>(null);

  useEffect(() => {
    let active = true;

    // Dynamically load GSAP and ScrollTrigger on client only
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])
      .then(([gsapModule, STModule]) => {
        if (!active) return;
        const g = gsapModule.default;
        const ST = STModule.ScrollTrigger;
        g.registerPlugin(ST);
        setGsap(g);
        setScrollTrigger(ST);
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
