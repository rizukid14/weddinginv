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

// 1. KAWUNG PATTERN
// Tiled 4-ellipse flower grid
export function KawungPattern({ size = 40, color = "#C9973A", opacity = 0.06, className = "" }: SVGProps) {
  const patternId = "pattern-kawung";
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          {/* Symmetrical 4 ellipses forming a Javanese Kawung fruit/flower petal */}
          <ellipse cx={size / 4} cy={size / 2} rx={size / 6} ry={size / 10} fill={color} />
          <ellipse cx={(size * 3) / 4} cy={size / 2} rx={size / 6} ry={size / 10} fill={color} />
          <ellipse cx={size / 2} cy={size / 4} rx={size / 10} ry={size / 6} fill={color} />
          <ellipse cx={size / 2} cy={(size * 3) / 4} rx={size / 10} ry={size / 6} fill={color} />
          {/* Small center diamonds */}
          <rect x={size / 2 - 2} y={size / 2 - 2} width="4" height="4" fill={color} transform={`rotate(45, ${size / 2}, ${size / 2})`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// 2. PARANG PATTERN
// Interlocking diagonal lines representing waves & strength
export function ParangPattern({ size = 50, color = "#2C3E6B", opacity = 0.05, className = "" }: SVGProps) {
  const patternId = "pattern-parang";
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          {/* Diagonal thick parang line blade */}
          <path d={`M0,${size / 2} C${size / 4},${size / 3} ${size / 2},${size / 4} ${size},${size / 2} L${size},${(size * 3) / 4} C${size / 2},${(size * 2) / 3} ${size / 4},${(size * 3) / 4} 0,${size / 2} Z`} fill={color} />
          {/* Minor interlocking dots and dashes */}
          <circle cx={size / 2} cy={size / 6} r="2" fill={color} />
          <circle cx={size / 4} cy={(size * 5) / 6} r="2.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

// 3. MEGA MENDUNG ORNAMENT
// Traditional cloud patterns
export function MegaMendungPattern({ color = "#C9973A", opacity = 0.07, className = "" }: SVGProps) {
  return (
    <svg viewBox="0 0 400 200" className={`absolute inset-0 w-full h-full pointer-events-none object-cover ${className}`} style={{ opacity }} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Repeating tiered cloud ripples */}
        <path d="M50,150 C80,120 120,120 150,150 C180,120 220,120 250,150 C280,120 320,120 350,150" />
        <path d="M70,140 C95,115 130,115 150,140 C170,115 205,115 230,140 C255,115 290,115 310,140" opacity="0.7" />
        <path d="M90,130 C110,110 140,110 150,130 C160,110 190,110 210,130 C230,110 260,110 280,130" opacity="0.4" />
        {/* Subtle decorative inner spirals */}
        <path d="M150,150 C150,160 140,165 135,160 C130,155 135,145 145,145" />
        <path d="M250,150 C250,160 240,165 235,160 C230,155 235,145 245,145" />
      </g>
    </svg>
  );
}

// 4. STANDALONE KAWUNG ORNAMENT
// Symmetrical round batik medallion
export function KawungOrnament({ size = 100, color = "#C9973A", animated = false, className = "" }: SVGProps) {
  const Component = animated ? motion.div : "div";
  const animProps = animated
    ? {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <Component
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      {...animProps}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Symmetrical royal medallion */}
        <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1.5" />
        {/* 4 Petals interlocking */}
        <path d="M50,10 C62,25 62,40 50,50 C38,40 38,25 50,10 Z" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M50,90 C62,75 62,60 50,50 C38,60 38,75 50,90 Z" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M10,50 C25,38 40,38 50,50 C40,62 25,62 10,50 Z" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M90,50 C75,38 60,38 50,50 C60,62 75,62 90,50 Z" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Central golden star */}
        <polygon points="50,45 52,48 55,50 52,52 50,55 48,52 45,50 48,48" fill={color} />
        {/* Auxiliary side elements */}
        <circle cx="30" cy="30" r="2.5" fill={color} />
        <circle cx="70" cy="30" r="2.5" fill={color} />
        <circle cx="30" cy="70" r="2.5" fill={color} />
        <circle cx="70" cy="70" r="2.5" fill={color} />
      </svg>
    </Component>
  );
}

// 5. PARANG BORDER
// Horizontal repeating strip motif
export function ParangBorder({ color = "#C9973A", opacity = 0.3, className = "" }: { color?: string; opacity?: number; className?: string }) {
  return (
    <div className={`w-full h-6 relative overflow-hidden select-none pointer-events-none ${className}`} style={{ opacity }}>
      <svg viewBox="0 0 200 24" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="parang-border-pat" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
            <path d="M0,12 C10,4 20,4 30,12 L30,18 C20,10 10,18 0,12 Z" fill={color} />
            <circle cx="15" cy="6" r="1.5" fill={color} />
            <circle cx="25" cy="18" r="1.5" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#parang-border-pat)" />
      </svg>
    </div>
  );
}

// 6. CORNER ORNAMENT
// Intricate geometric Javanese corner frame accents
export function CornerOrnament({ position = "tl", size = 60, color = "#C9973A", animated = false, className = "" }: SVGProps & { position?: "tl" | "tr" | "bl" | "br" }) {
  const Component = animated ? motion.div : "div";
  const getRotationAngle = () => {
    if (position === "tr") return 90;
    if (position === "br") return 180;
    if (position === "bl") return 270;
    return 0; // tl
  };

  const animProps = animated
    ? {
        animate: { rotate: [getRotationAngle() - 2, getRotationAngle() + 2, getRotationAngle() - 2] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <Component
      className={`absolute select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        top: position.startsWith("t") ? "8px" : "auto",
        bottom: position.startsWith("b") ? "8px" : "auto",
        left: position.endsWith("l") ? "8px" : "auto",
        right: position.endsWith("r") ? "8px" : "auto",
        transform: `rotate(${getRotationAngle()}deg)`,
        transformOrigin: "center center",
      }}
      {...animProps}
    >
      <svg viewBox="0 0 60 60" width="100%" height="100%">
        {/* Double border frame lines */}
        <path d="M2,58 L2,2 L58,2" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M6,58 L6,6 L58,6" fill="none" stroke={color} strokeWidth="0.75" strokeDasharray="2,2" opacity="0.8" />
        {/* Elegant diamond seal */}
        <rect x="12" y="12" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45, 17, 17)" />
        <rect x="15" y="15" width="4" height="4" fill={color} transform="rotate(45, 17, 17)" />
        {/* Royal spear accent loops */}
        <path d="M2,2 L20,20" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="20" cy="20" r="2.5" fill={color} />
        {/* Double background dots */}
        <circle cx="32" cy="12" r="1.5" fill={color} />
        <circle cx="12" cy="32" r="1.5" fill={color} />
      </svg>
    </Component>
  );
}
