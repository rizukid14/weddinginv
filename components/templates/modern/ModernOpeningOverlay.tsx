"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";

interface OpeningProps {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function ModernOpeningOverlay({ data, guestName, onOpen }: OpeningProps) {
  // Format numeric date "21.12.2025" for Modern theme
  const getNumericDateStr = () => {
    try {
      const dObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const d = String(dObj.getDate()).padStart(2, "0");
      const m = String(dObj.getMonth() + 1).padStart(2, "0");
      const y = dObj.getFullYear();
      return `${d}.${m}.${y}`;
    } catch {
      return "21.12.2025";
    }
  };

  // Initials watermark (e.g. "F & Z")
  const getInitialsWatermark = () => {
    try {
      const bInit = data.brideNickname.charAt(0);
      const gInit = data.groomNickname.charAt(0);
      return `${bInit}&${gInit}`;
    } catch {
      return "F&Z";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 bg-[var(--modern-black)] z-50 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Dramatic huge letter watermark */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <h2 className="font-modern-display text-[22rem] text-[var(--modern-white)]/[0.015] font-black uppercase select-none tracking-tighter leading-none">
          {getInitialsWatermark()}
        </h2>
      </div>

      {/* 2. Quad-divided thin grid line system */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Horizontal center separator */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--modern-mid)]/[0.07]" />
        {/* Vertical center separator */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[var(--modern-mid)]/[0.07]" />
      </div>

      {/* 3. Foreground grid quadrant contents */}
      <div className="flex-1 w-full grid grid-cols-2 grid-rows-2 z-10 relative">
        {/* Top-Left Quadrant */}
        <div className="p-8 border-r border-b border-[var(--modern-mid)]/[0.07] flex flex-col justify-between items-start">
          <span className="font-modern-body text-[8px] uppercase tracking-[0.4em] text-[var(--modern-accent)] select-none">
            [ WEDDING INVITATION ]
          </span>
          <div className="font-modern-body text-[8px] text-[var(--modern-mid)]/40 tracking-[0.25em] writing-mode-vertical uppercase leading-none select-none">
            MODERN EDITION // VOLUME I
          </div>
        </div>

        {/* Top-Right Quadrant */}
        <div className="p-8 border-b border-[var(--modern-mid)]/[0.07] flex flex-col justify-between items-end text-right">
          <span className="font-modern-body text-[9px] uppercase tracking-[0.3em] text-[var(--modern-white)] font-bold select-none">
            DATE.{getNumericDateStr()}
          </span>
          <span className="font-modern-body text-[8px] uppercase text-[var(--modern-mid)]/50 tracking-widest leading-relaxed">
            JAKARTA<br />INDONESIA
          </span>
        </div>

        {/* Bottom-Left Quadrant */}
        <div className="p-8 border-r border-[var(--modern-mid)]/[0.07] flex flex-col justify-end items-start text-left">
          {/* Guest Name presentation card */}
          {guestName ? (
            <div className="flex flex-col">
              <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-mid)]/60 mb-2">
                INVITEE GUEST //
              </span>
              <h3 className="font-modern-display text-xl font-bold uppercase tracking-tight text-[var(--modern-white)] leading-tight">
                {guestName}
              </h3>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-mid)]/40">
                STATUS // OPEN PRIVATELY
              </span>
            </div>
          )}
        </div>

        {/* Bottom-Right Quadrant */}
        <div className="p-8 flex flex-col justify-end items-end relative">
          {/* Neon electric orange solid action box */}
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.03, backgroundColor: "var(--modern-white)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-[var(--modern-accent)] text-black px-6 py-4 cursor-pointer select-none font-modern-display text-xs font-black tracking-[0.15em] uppercase hover:text-black transition-colors"
            style={{ borderRadius: 0 }}
          >
            ENTER INVITATION
          </motion.button>
        </div>
      </div>

      {/* Spanning names across center point */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none z-20 select-none">
        <h1 className="font-modern-display text-[3rem] xs:text-[3.5rem] leading-[0.95] text-[var(--modern-white)] font-black tracking-tighter uppercase">
          {data.brideNickname}
          <span className="font-modern-accent text-2xl lowercase italic text-[var(--modern-accent)] font-normal mx-3 block xs:inline-block">and</span>
          {data.groomNickname}
        </h1>
      </div>
    </motion.div>
  );
}
