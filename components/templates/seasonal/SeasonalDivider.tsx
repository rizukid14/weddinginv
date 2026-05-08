"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  variant?: "simple" | "ornate" | "branch";
  className?: string;
}

export default function SeasonalDivider({ variant = "simple", className = "" }: Props) {
  if (variant === "ornate") {
    return (
      <div className={`flex items-center justify-center gap-4 my-8 w-full max-w-xs mx-auto ${className}`}>
        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A96E]">
            <path d="M12 21C12 21 17 16 17 10C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10C7 16 12 21 12 21Z" fill="#C9A96E" fillOpacity="0.2"/>
          </svg>
        </motion.div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent"></div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A96E]">
            <path d="M12 4V20M4 12H20M6.34315 6.34315L17.6569 17.6569M6.34315 17.6569L17.6569 6.34315" />
            <circle cx="12" cy="12" r="3" fill="#C9A96E" />
          </svg>
        </motion.div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent"></div>
        <motion.div animate={{ rotate: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A96E]">
            <path d="M12 21C12 21 7 16 7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10C17 16 12 21 12 21Z" fill="#C9A96E" fillOpacity="0.2"/>
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "branch") {
    return (
      <div className={`my-8 w-full max-w-sm mx-auto flex justify-center opacity-80 ${className}`}>
        <svg width="100%" height="30" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15 Q 50 0 100 15 T 190 15" stroke="#C9A96E" strokeWidth="1" fill="none" />
          <circle cx="50" cy="8" r="2" fill="#E8A598" />
          <circle cx="100" cy="15" r="3" fill="#D4845A" />
          <circle cx="150" cy="22" r="2" fill="#E8A598" />
        </svg>
      </div>
    );
  }

  // default simple
  return (
    <div className={`flex items-center justify-center gap-4 my-8 w-full max-w-[200px] mx-auto opacity-70 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
          <path d="M12 4V20M4 12H20M6.34315 6.34315L17.6569 17.6569M6.34315 17.6569L17.6569 6.34315" />
          <circle cx="12" cy="12" r="2" fill="#C9A96E" />
        </svg>
      </motion.div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"></div>
    </div>
  );
}
