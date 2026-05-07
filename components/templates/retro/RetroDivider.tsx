"use client";

import React from "react";

interface RetroDividerProps {
  variant?: "simple" | "ornate" | "banner";
  text?: string;
  className?: string;
  textClassName?: string;
  fillColor?: string; // For banner ribbon
}

export default function RetroDivider({
  variant = "simple",
  text = "",
  className = "my-6",
  textClassName = "",
  fillColor = "var(--retro-terra)",
}: RetroDividerProps) {
  if (variant === "banner") {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {/* Wavy Banner Ribbon SVG */}
        <svg
          viewBox="0 0 320 54"
          className="w-72 h-auto"
          style={{ filter: "drop-shadow(2px 3px 0px rgba(31,26,20,0.15))" }}
        >
          {/* Main banner block */}
          <path
            d="M 20,12 L 300,12 L 290,42 L 30,42 Z"
            fill={fillColor}
            stroke="var(--retro-ink)"
            strokeWidth="1.5"
          />
          {/* Left fold fold shadow */}
          <path
            d="M 30,42 L 40,50 L 40,42 Z"
            fill="var(--retro-brown)"
            stroke="var(--retro-ink)"
            strokeWidth="1"
          />
          {/* Left split tag */}
          <path
            d="M 40,50 L 10,32 L 30,12 L 40,42 Z"
            fill={fillColor}
            stroke="var(--retro-ink)"
            strokeWidth="1.5"
          />
          {/* Right fold fold shadow */}
          <path
            d="M 290,42 L 280,50 L 280,42 Z"
            fill="var(--retro-brown)"
            stroke="var(--retro-ink)"
            strokeWidth="1"
          />
          {/* Right split tag */}
          <path
            d="M 280,50 L 310,32 L 290,12 L 280,42 Z"
            fill={fillColor}
            stroke="var(--retro-ink)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Text centered atop the Ribbon */}
        <span
          className={`absolute font-courier-prime text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--retro-cream)] pointer-events-none mt-[-2px] ${textClassName}`}
        >
          {text}
        </span>
      </div>
    );
  }

  if (variant === "ornate") {
    return (
      <div className={`flex items-center justify-center gap-4 select-none ${className}`}>
        <svg viewBox="0 0 100 10" className="w-24 h-2">
          <line x1="0" y1="5" x2="80" y2="5" stroke="var(--retro-mustard)" strokeWidth="1.5" />
          <line x1="0" y1="2" x2="80" y2="2" stroke="var(--retro-mustard)" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="90,5 100,5 95,1" fill="var(--retro-mustard)" />
          <polygon points="90,5 100,5 95,9" fill="var(--retro-mustard)" />
        </svg>

        <span className="text-[var(--retro-mustard)] text-xs font-black">✦ ◆ ✦</span>

        <svg viewBox="0 0 100 10" className="w-24 h-2 rotate-180">
          <line x1="0" y1="5" x2="80" y2="5" stroke="var(--retro-mustard)" strokeWidth="1.5" />
          <line x1="0" y1="2" x2="80" y2="2" stroke="var(--retro-mustard)" strokeWidth="1" strokeDasharray="3 3" />
          <polygon points="90,5 100,5 95,1" fill="var(--retro-mustard)" />
          <polygon points="90,5 100,5 95,9" fill="var(--retro-mustard)" />
        </svg>
      </div>
    );
  }

  // Simple divider
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      <div className="h-[1px] w-20 bg-[var(--retro-mustard)] opacity-60" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[var(--retro-mustard)]" />
      <div className="h-[1px] w-20 bg-[var(--retro-mustard)] opacity-60" />
    </div>
  );
}
