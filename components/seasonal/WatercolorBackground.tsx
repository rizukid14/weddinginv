"use client";
import React from "react";

export default function WatercolorBackground({
  color = "#EAC4B0", // default blush
  opacity = 0.08,
  className = "",
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  // We use SVG feTurbulence to create a cloudy/painterly texture
  // and colorize it with the provided color via a blending layer.
  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply z-0 ${className}`}
      style={{ opacity, backgroundColor: color }}
      aria-hidden="true"
    >
      <svg className="w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
        <filter id="watercolor">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.8 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#watercolor)" />
      </svg>
    </div>
  );
}
