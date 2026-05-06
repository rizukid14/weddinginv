import React from "react";

interface Props {
  variant?: "branch" | "simple" | "ornate";
  className?: string;
}

export default function FloralDivider({ variant = "branch", className = "" }: Props) {
  if (variant === "simple") {
    return (
      <svg
        viewBox="0 0 100 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-40 h-8 mx-auto my-6 ${className}`}
      >
        <line x1="0" y1="10" x2="40" y2="10" stroke="#C9A96E" strokeWidth="0.8" />
        <polygon points="50,4 56,10 50,16 44,10" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="10" r="2" fill="#C9A96E" />
        <line x1="60" y1="10" x2="100" y2="10" stroke="#C9A96E" strokeWidth="0.8" />
      </svg>
    );
  }

  if (variant === "branch") {
    return (
      <svg
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-56 h-12 mx-auto my-8 ${className}`}
      >
        {/* Left branch */}
        <path
          d="M10 20 C40 20, 60 15, 90 18"
          stroke="#C9A96E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path d="M40 19 C42 12, 48 10, 52 14" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M65 18 C68 25, 75 27, 78 22" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M30 20 C28 25, 22 26, 20 22" stroke="#C9A96E" strokeWidth="0.8" />

        {/* Center Rose / Flower */}
        <circle cx="100" cy="20" r="5" stroke="#C9A96E" strokeWidth="1" />
        <path
          d="M97 18 C98 15, 102 15, 103 18 C105 18, 105 22, 103 22 C102 25, 98 25, 97 22 C95 22, 95 18, 97 18 Z"
          stroke="#C9A96E"
          strokeWidth="0.8"
        />
        <circle cx="100" cy="20" r="2" fill="#C9A96E" />

        {/* Right branch */}
        <path
          d="M190 20 C160 20, 140 15, 110 18"
          stroke="#C9A96E"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path d="M160 19 C158 12, 152 10, 148 14" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M135 18 C132 25, 125 27, 122 22" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M170 20 C172 25, 178 26, 180 22" stroke="#C9A96E" strokeWidth="0.8" />
      </svg>
    );
  }

  // ornate
  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-72 h-16 mx-auto my-8 ${className}`}
    >
      {/* Left scroll scrollwork */}
      <path
        d="M20 30 C50 30, 80 15, 120 25 C130 28, 135 34, 140 30"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M50 25 C60 10, 75 12, 80 20"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M90 22 C95 35, 110 38, 115 30"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Ornate Wreath and Center Flower */}
      <g transform="translate(150, 30)">
        <circle cx="0" cy="0" r="12" stroke="#C9A96E" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="0" cy="0" r="7" stroke="#C9A96E" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="#C9A96E" />
        {/* Petals */}
        <path d="M-6 -6 L-2 -2" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M6 6 L2 2" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M-6 6 L-2 2" stroke="#C9A96E" strokeWidth="0.8" />
        <path d="M6 -6 L2 -2" stroke="#C9A96E" strokeWidth="0.8" />
      </g>

      {/* Right scroll scrollwork */}
      <path
        d="M280 30 C250 30, 220 15, 180 25 C170 28, 165 34, 160 30"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M250 25 C240 10, 225 12, 220 20"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M210 22 C205 35, 190 38, 185 30"
        stroke="#C9A96E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
