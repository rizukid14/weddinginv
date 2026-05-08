"use client";

import React, { useRef } from "react";
import { useParticles } from "@/hooks/useParticles";

interface CultureParticlesProps {
  className?: string;
}

export default function CultureParticles({ className = "" }: CultureParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticles(canvasRef, {
    count: 20,
    colors: [
      "#C9973A", // gold
      "#8B6520", // gold deep
      "#5A6B47", // sage
      "#6B3D2E", // sogan brown
      "#C9973A88", // gold transparent
    ],
    minSize: 3,
    maxSize: 9,
    speedRange: [0.25, 0.65],
  });

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
