"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";

interface OpeningProps {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function BrushOpeningOverlay({ data, guestName, onOpen }: OpeningProps) {
  // Format wedding date as "DD · MM · YYYY" for Brush aesthetic
  const getFormattedDate = () => {
    try {
      const dateObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const d = String(dateObj.getDate()).padStart(2, "0");
      const m = String(dateObj.getMonth() + 1).padStart(2, "0");
      const y = dateObj.getFullYear();
      return `${d} · ${m} · ${y}`;
    } catch {
      return "21 · 12 · 2025";
    }
  };

  // Format vertical date
  const getVerticalDateStr = () => {
    try {
      const dateObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = [
        "Desember", "Januari", "Februari", "Maret", "April", "Mei",
        "Juni", "Juli", "Agustus", "September", "Oktober", "November"
      ];
      return `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    } catch {
      return "Minggu, 21 Desember 2025";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.7, ease: "easeInOut" } }}
      className="fixed inset-0 bg-[var(--brush-paper)] z-50 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Large background brush stroke SVGs (diagonal, organic) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] opacity-[0.05] fill-[var(--brush-ink)]" viewBox="0 0 100 100">
          <path d="M 10 30 C 30 10, 60 40, 80 20 C 90 40, 40 80, 10 30 Z" />
        </svg>
        <svg className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] opacity-[0.05] fill-[var(--brush-ink)]" viewBox="0 0 100 100">
          <path d="M 20 80 C 40 50, 70 90, 90 60 C 80 90, 50 100, 20 80 Z" />
        </svg>
        {/* Ink splatters */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] fill-[var(--brush-ink)]" viewBox="0 0 400 800">
          <circle cx="120" cy="180" r="2.5" />
          <circle cx="280" cy="140" r="1.5" />
          <circle cx="80" cy="340" r="3" />
          <circle cx="340" cy="420" r="2" />
          <circle cx="150" cy="520" r="1" />
          <circle cx="290" cy="610" r="2.5" />
          <circle cx="100" cy="720" r="1.8" />
          <circle cx="220" cy="380" r="1.2" />
          <circle cx="50" cy="580" r="2" />
          <circle cx="370" cy="240" r="3.2" />
        </svg>
        {/* Subtle physical grain filter */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-0">
          <filter id="brushNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#brushNoise)" />
        </svg>
      </div>

      {/* Decorative vertical date string on the right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 writing-mode-vertical rotate-180 font-brush-body text-[9px] uppercase tracking-[0.3em] text-[var(--brush-muted)]/50 pointer-events-none z-10 select-none">
        {getVerticalDateStr()}
      </div>

      {/* Content wrapper */}
      <div className="flex-1 pt-20 pl-8 pr-12 flex flex-col justify-start z-10 relative">
        {/* Top-Left Tag */}
        <div className="text-left">
          <span className="font-brush-body text-[10px] uppercase tracking-[0.25em] text-[var(--brush-muted)] italic font-medium">
            — Undangan Pernikahan
          </span>
        </div>

        {/* Center-Left Names block */}
        <div className="mt-12 text-left relative">
          {/* Faint brush stroke accent behind the names */}
          <div className="absolute top-1/3 left-[-10px] w-64 h-16 opacity-[0.08] pointer-events-none fill-[var(--brush-stroke)]">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path d="M5 10 C30 5, 70 15, 95 8 C70 12, 30 8, 5 10 Z" />
            </svg>
          </div>

          <h1 className="font-brush-display text-[2.8rem] xs:text-[3.2rem] leading-[1.05] text-[var(--brush-ink)] font-normal tracking-tight">
            {data.brideNickname}
          </h1>
          <div className="font-brush-accent text-3xl text-[var(--brush-stroke)] my-1 pl-4 select-none">
            ×
          </div>
          <h1 className="font-brush-display text-[2.8rem] xs:text-[3.2rem] leading-[1.05] text-[var(--brush-ink)] font-normal tracking-tight">
            {data.groomNickname}
          </h1>

          {/* Simple digital numeric date representation */}
          <p className="font-brush-body text-xs text-[var(--brush-muted)] tracking-[0.3em] mt-6 select-none font-medium">
            {getFormattedDate()}
          </p>
        </div>

        {/* Guest Name Section (Polaroid Scrapbook card) */}
        {guestName && (
          <div className="mt-12 text-left max-w-[260px] relative">
            {/* Rough imperfect border wrap */}
            <div className="border border-[var(--brush-ink)]/15 bg-white/40 p-4 relative shadow-sm rounded-sm">
              {/* Corner marks simulating photo tape adhesive strips */}
              <div className="absolute top-[-4px] left-[-4px] w-4 h-1 bg-[var(--brush-stroke)]/30 rotate-[-15deg]" />
              <div className="absolute bottom-[-4px] right-[-4px] w-4 h-1 bg-[var(--brush-stroke)]/30 rotate-[-15deg]" />

              <span className="font-brush-body italic text-[9px] uppercase tracking-wider text-[var(--brush-muted)] block leading-none mb-1">
                Kpd. Yth. Bapak/Ibu/Saudara/i
              </span>
              <h3 className="font-brush-heading italic text-lg text-[var(--brush-ink-soft)] leading-tight font-bold">
                {guestName}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Button footer wrapper */}
      <div className="pl-8 pb-16 z-10 relative text-left">
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex items-center justify-center py-4 px-8 group cursor-pointer focus:outline-none select-none pulse-cta"
        >
          {/* Custom rough hand-drawn rectangle border SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 180 50" preserveAspectRatio="none">
            <rect
              x="1.5"
              y="1.5"
              width="177"
              height="47"
              fill="transparent"
              stroke="var(--brush-ink)"
              strokeWidth="1.5"
              rx="2"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </svg>

          {/* Text */}
          <span className="font-brush-body text-xs uppercase tracking-[0.2em] font-bold text-[var(--brush-ink)]">
            Buka Undangan ↓
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
