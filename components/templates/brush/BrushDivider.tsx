"use client";

import React from "react";

interface DividerProps {
  variant?: "stroke" | "dots" | "cross";
  className?: string;
}

export default function BrushDivider({ variant = "stroke", className = "" }: DividerProps) {
  return (
    <div className={`my-6 select-none flex ${className}`}>
      {variant === "stroke" && (
        <svg
          viewBox="0 0 100 12"
          width="80"
          height="10"
          className="opacity-15 fill-[var(--brush-ink)]"
        >
          {/* Hand-drawn organic thick horizontal brush stroke path */}
          <path d="M5 6 C 25 3, 45 8, 65 5 C 80 4, 95 7, 98 6 C 90 8, 50 4, 30 7 C 15 9, 7 5, 5 6 Z" />
        </svg>
      )}

      {variant === "dots" && (
        <div className="flex gap-4 text-[var(--brush-muted)] text-sm font-medium tracking-widest">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      )}

      {variant === "cross" && (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="var(--brush-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-80"
        >
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      )}
    </div>
  );
}
