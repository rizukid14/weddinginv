"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";

interface OpeningProps {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function RetroOpeningOverlay({ data, guestName, onOpen }: OpeningProps) {
  // Translate ISO Date to readable Indonesian e.g. "21 DESEMBER 2025"
  const getRetroDateStr = () => {
    try {
      const dObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const months = [
        "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
        "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
      ];
      return `${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
    } catch {
      return "21 DESEMBER 2025";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 bg-[var(--retro-cream)] z-50 overflow-hidden flex flex-col justify-between p-8 select-none"
    >
      {/* 1. Halftone Dot Grid background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 2. Concentric Sunburst Center Artwork */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.06]">
        <svg viewBox="0 0 500 500" className="w-[180%] h-auto animate-[spin_120s_linear_infinite]">
          <g fill="var(--retro-brown)">
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={i}
                d="M250,250 L500,210 L500,290 Z"
                transform={`rotate(${i * 15} 250 250)`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 3. Double-Line Framed Border rect */}
      <div className="absolute inset-4 pointer-events-none z-10 border border-[var(--retro-terra)]/20 p-1">
        <div className="w-full h-full border border-[var(--retro-terra)]/40" />
      </div>

      {/* Top Header Section */}
      <div className="w-full flex justify-center pt-8 z-20">
        <RetroDivider variant="banner" text="✦ UNDANGAN PERNIKAHAN ✦" fillColor="var(--retro-terra)" />
      </div>

      {/* Middle Names Layout */}
      <div className="flex-grow flex flex-col justify-center items-center text-center z-20 my-6">
        {/* Tiny Sunburst icon above */}
        <div className="w-12 h-12 mb-4 opacity-40 text-[var(--retro-mustard)] flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d="M50,50 L100,45 L100,55 Z"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>

        <h1 className="font-retro-display text-4xl xs:text-5xl font-black text-[var(--retro-brown)] tracking-normal leading-none uppercase">
          {data.brideNickname}
        </h1>

        <RetroDivider variant="simple" className="my-3" />

        <h1 className="font-retro-display text-4xl xs:text-5xl font-black text-[var(--retro-brown)] tracking-normal leading-none uppercase">
          {data.groomNickname}
        </h1>

        <div className="mt-6">
          <span className="font-courier-prime text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--retro-muted)]">
            BERSAMA KELUARGA BESAR
          </span>
          <span className="block font-retro-accent text-2xl text-[var(--retro-terra)] tracking-widest uppercase mt-2 font-normal">
            {getRetroDateStr()}
          </span>
        </div>
      </div>

      {/* Bottom Guest card and CTA Button */}
      <div className="w-full flex flex-col items-center gap-6 pb-8 z-20">
        {guestName && (
          <div className="relative bg-[var(--retro-warm)] p-4 max-w-[280px] w-full text-center border border-[var(--retro-mustard)]/40">
            {/* Tiny retro corners within the guest label card */}
            <div className="absolute top-1 left-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>
            <div className="absolute top-1 right-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>
            <div className="absolute bottom-1 left-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>
            <div className="absolute bottom-1 right-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>

            <span className="block font-courier-prime text-[8px] font-bold uppercase tracking-widest text-[var(--retro-muted)] mb-1">
              KEPADA YTH. BAPAK/IBU/SAUDARA/I
            </span>
            <span className="block font-serif text-base italic text-[var(--retro-brown)] font-semibold truncate px-2">
              {guestName}
            </span>
          </div>
        )}

        {/* Enter Invitation button styled like a stamp/ribbon */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex items-center justify-center cursor-pointer select-none group"
        >
          {/* Custom ribbon graphic for CTA */}
          <svg
            viewBox="0 0 320 54"
            className="w-64 h-auto transition-colors duration-300"
            style={{ filter: "drop-shadow(3px 4px 0px rgba(31,26,20,0.2))" }}
          >
            <path
              d="M 20,12 L 300,12 L 290,42 L 30,42 Z"
              className="fill-[var(--retro-terra)] group-hover:fill-[var(--retro-brown)] transition-colors"
              stroke="var(--retro-ink)"
              strokeWidth="1.5"
            />
            <path
              d="M 30,42 L 40,50 L 40,42 Z"
              fill="var(--retro-brown)"
              stroke="var(--retro-ink)"
              strokeWidth="1"
            />
            <path
              d="M 40,50 L 10,32 L 30,12 L 40,42 Z"
              className="fill-[var(--retro-terra)] group-hover:fill-[var(--retro-brown)] transition-colors"
              stroke="var(--retro-ink)"
              strokeWidth="1.5"
            />
            <path
              d="M 290,42 L 280,50 L 280,42 Z"
              fill="var(--retro-brown)"
              stroke="var(--retro-ink)"
              strokeWidth="1"
            />
            <path
              d="M 280,50 L 310,32 L 290,12 L 280,42 Z"
              className="fill-[var(--retro-terra)] group-hover:fill-[var(--retro-brown)] transition-colors"
              stroke="var(--retro-ink)"
              strokeWidth="1.5"
            />
          </svg>
          <span className="absolute font-retro-display text-xs font-black uppercase tracking-[0.2em] text-[var(--retro-cream)] mt-[-2px]">
            ✦ BUKA UNDANGAN ✦
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
