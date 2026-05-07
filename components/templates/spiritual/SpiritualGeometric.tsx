"use client";

import React from "react";
import { motion } from "framer-motion";

interface SVGProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

// 1. EIGHT POINTED STAR (Khatam)
// Symmetrical overlapping squares creating an 8-pointed star
export function EightPointedStar({ size = 32, color = "#B7882A", animated = true, className = "" }: SVGProps) {
  const Component = animated ? motion.div : "div";
  const animProps = animated
    ? {
        animate: { rotate: 360 },
        transition: { duration: 25, repeat: Infinity, ease: "linear" },
      }
    : {};

  return (
    <Component
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      {...animProps}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Square 1 */}
        <rect x="15" y="15" width="70" height="70" fill="none" stroke={color} strokeWidth="3" />
        {/* Square 2 (Rotated 45 degrees) */}
        <rect x="15" y="15" width="70" height="70" fill="none" stroke={color} strokeWidth="3" transform="rotate(45 50 50)" />
        {/* Inner concentric ring */}
        <circle cx="50" cy="50" r="28" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="18" fill="none" stroke={color} strokeWidth="2" />
        {/* Center dot */}
        <circle cx="50" cy="50" r="4" fill={color} />
      </svg>
    </Component>
  );
}

// 2. ARABESQUE BORDER
// Horizontal arabesque line border strip
export function ArabesqueBorder({ color = "#B7882A", opacity = 0.3, className = "" }: { color?: string; opacity?: number; className?: string }) {
  return (
    <div className={`w-full h-8 relative overflow-hidden select-none pointer-events-none ${className}`} style={{ opacity }}>
      <svg viewBox="0 0 400 32" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="arabesque-pattern" x="0" y="0" width="80" height="32" patternUnits="userSpaceOnUse">
            {/* Symmetrical swirling arabesque motif */}
            <path d="M 0,16 C 20,4 25,28 40,16 C 55,4 60,28 80,16" fill="none" stroke={color} strokeWidth="2" />
            <path d="M 0,16 C 20,28 25,4 40,16 C 55,28 60,4 80,16" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            {/* Accent stars */}
            <circle cx="40" cy="16" r="3" fill={color} />
            <circle cx="0" cy="16" r="1.5" fill={color} />
            <circle cx="80" cy="16" r="1.5" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesque-pattern)" />
      </svg>
    </div>
  );
}

// 3. GEOMETRIC TESSELLATION
// Islamic geometric tiled backdrop
export function GeometricTessellation({ size = 60, color = "#B7882A", opacity = 0.04, className = "" }: SVGProps) {
  const patternId = "islamic-tessellation";
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          {/* Overlapping stars in a grid */}
          <path d={`M ${size/2},0 L ${size},${size/2} L ${size/2},${size} L 0,${size/2} Z`} fill="none" stroke={color} strokeWidth="0.75" />
          <rect x={size/4} y={size/4} width={size/2} height={size/2} fill="none" stroke={color} strokeWidth="0.5" transform={`rotate(45, ${size/2}, ${size/2})`} />
          <circle cx={size/2} cy={size/2} r={size/8} fill="none" stroke={color} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// 4. CRESCENT AND STAR (Hilal)
export function CrescentStar({ size = 32, color = "#B7882A", className = "" }: SVGProps) {
  return (
    <div className={`inline-block select-none pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" fill={color}>
        {/* Crescent */}
        <path d="M72,50 C72,62.15 62.15,72 50,72 C37.85,72 28,62.15 28,50 C28,37.85 37.85,28 50,28 C55.3,28 60.15,29.9 64,33 C58.2,34.7 54,40.1 54,46.5 C54,53.9 60.1,60 67.5,60 C69.1,60 70.65,59.7 72,59.2 C70.5,53.8 71.3,51.8 72,50 Z" />
        {/* Symmetrical Star inside the crescent arch */}
        <polygon points="62,40 64,44 68,44 65,47 66,51 62,49 58,51 59,47 56,44 60,44" />
      </svg>
    </div>
  );
}

// 5. ISLAMIC ARCH (Masjid Dome Portal Clip Path Container)
// Masking wrapper that crops images into a perfect Islamic architectural arch frame
export function IslamicArch({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const clipId = "islamic-arch-clip";
  return (
    <div className={`relative ${className}`} style={{ filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.08))" }}>
      {/* Inline Clip Path Definition to bypass browser-specific parsing issues */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Symmetric dome arch curve */}
            <path d="M 0,1 L 0,0.4 C 0,0.18 0.15,0.08 0.5,0 C 0.85,0.08 1,0.18 1,0.4 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Styled Double Border frame surrounding the image */}
      <div
        className="w-full h-full relative"
        style={{
          clipPath: `url(#${clipId})`,
        }}
      >
        <div className="absolute inset-0 border border-[#B7882A]/30 pointer-events-none z-10" />
        <div className="absolute inset-1 border-[3px] border-[#B7882A]/10 pointer-events-none z-10" />
        {children}
      </div>
    </div>
  );
}
