"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";
import { fadeUp } from "@/lib/animations";

interface CoverProps {
  data: WeddingData;
}

export default function RetroCover({ data }: CoverProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(data.akadDate || data.resepsiDate || "2025-12-21").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.akadDate, data.resepsiDate]);

  const getDayName = () => {
    try {
      const dObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const days = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
      return days[dObj.getDay()];
    } catch {
      return "MINGGU";
    }
  };

  const getYearName = () => {
    try {
      return new Date(data.akadDate || data.resepsiDate || "2025").getFullYear();
    } catch {
      return "2025";
    }
  };

  const getBebasDate = () => {
    try {
      const dObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const day = String(dObj.getDate()).padStart(2, "0");
      const month = String(dObj.getMonth() + 1).padStart(2, "0");
      return `${day} . ${month} . ${getYearName()}`;
    } catch {
      return "21 . 12 . 2025";
    }
  };

  return (
    <section className="min-h-screen relative bg-[var(--retro-cream)] overflow-hidden flex flex-col items-center justify-between py-12 select-none">
      {/* 1. Halftone Dot grid background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 2. Star Corner Flourishes */}
      <div className="absolute top-4 left-4 text-[var(--retro-terra)] opacity-50 text-[10px] font-black">✦</div>
      <div className="absolute top-4 right-4 text-[var(--retro-terra)] opacity-50 text-[10px] font-black">✦</div>

      {/* 3. Centered Sunburst */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.07]">
        <svg viewBox="0 0 500 500" className="w-[180%] h-auto">
          <g fill="var(--retro-mustard)">
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={i}
                d="M250,250 L500,230 L500,270 Z"
                transform={`rotate(${i * 15} 250 250)`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* HEADER CONTENTS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center z-10 pt-4"
      >
        <span className="text-[var(--retro-mustard)] text-sm block mb-1">✦</span>
        <span className="font-courier-prime text-[8px] font-bold uppercase tracking-[0.35em] text-[var(--retro-muted)]">
          DENGAN PENUH KEBAHAGIAAN
        </span>
      </motion.div>

      {/* PREWEDDING PHOTO SECTION */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-[85%] max-w-[340px] mx-auto relative z-10 my-6"
      >
        {/* Photo frame with double line custom borders */}
        <div className="absolute inset-[-6px] border border-[var(--retro-mustard)]" />
        <div className="absolute inset-[-2px] border border-[var(--retro-mustard)]" />

        <div className="relative bg-[var(--retro-warm)] aspect-[4/5] overflow-hidden shadow-md">
          <img
            src={data.coverPhoto || "https://placehold.co/800x1000/f5e6c8/6b3a2a?text=Prewedding"}
            alt="Cover Photograph"
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ filter: "sepia(15%) saturate(90%) contrast(105%)" }}
          />

          {/* Anno Domini label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[var(--retro-cream)] border border-[var(--retro-mustard)] px-4 py-0.5 shadow-sm">
            <span className="font-courier-prime text-[7px] text-[var(--retro-muted)] font-black uppercase italic select-none">
              — ANNO DOMINI —
            </span>
          </div>
        </div>
      </motion.div>

      {/* MID LABELS CONTENT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-full text-center z-10 px-6 flex flex-col items-center"
      >
        <RetroDivider variant="ornate" className="my-2" />

        <h2 className="font-retro-display text-4xl font-black text-[var(--retro-brown)] tracking-tight uppercase leading-none mt-2">
          {data.brideNickname}
        </h2>

        {/* Dynamic & connected connector symbol */}
        <div className="my-2 flex items-center justify-center gap-4 text-[var(--retro-terra)]">
          <div className="h-[1px] w-8 bg-[var(--retro-mustard)] opacity-50" />
          <span className="font-retro-display text-2xl font-black italic">&</span>
          <div className="h-[1px] w-8 bg-[var(--retro-mustard)] opacity-50" />
        </div>

        <h2 className="font-retro-display text-4xl font-black text-[var(--retro-brown)] tracking-tight uppercase leading-none mb-2">
          {data.groomNickname}
        </h2>

        <RetroDivider variant="simple" className="my-2" />

        {/* Date Display */}
        <div className="mt-4 flex flex-col items-center">
          <span className="font-retro-accent text-3xl text-[var(--retro-terra)] tracking-widest font-black leading-none">
            {getBebasDate()}
          </span>
          <span className="font-courier-prime text-[9px] font-bold text-[var(--retro-muted)] tracking-[0.3em] uppercase mt-2">
            HARI {getDayName()}
          </span>
        </div>

        {/* COUNTDOWN BOARD */}
        <div className="mt-8 w-full max-w-[320px] bg-[var(--retro-warm)] p-4 border border-[var(--retro-mustard)] relative">
          {/* Inner alignment star decoration */}
          <div className="absolute top-1 left-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>
          <div className="absolute top-1 right-1 text-[var(--retro-mustard)] text-[6px] font-bold select-none">✦</div>

          {isExpired ? (
            <span className="block font-serif text-xs italic text-[var(--retro-brown)] font-black uppercase tracking-widest select-none">
              ✦ PERNIKAHAN TELAH BERLANGSUNG ✦
            </span>
          ) : (
            <div className="grid grid-cols-4 divide-x divide-[var(--retro-mustard)]/40 text-center">
              <div className="flex flex-col items-center">
                <span className="font-retro-accent text-2xl text-[var(--retro-terra)] leading-none">
                  {timeLeft.days}
                </span>
                <span className="font-courier-prime text-[8px] text-[var(--retro-muted)] font-black tracking-widest uppercase mt-1">
                  HARI
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-retro-accent text-2xl text-[var(--retro-terra)] leading-none">
                  {timeLeft.hours}
                </span>
                <span className="font-courier-prime text-[8px] text-[var(--retro-muted)] font-black tracking-widest uppercase mt-1">
                  JAM
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-retro-accent text-2xl text-[var(--retro-terra)] leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="font-courier-prime text-[8px] text-[var(--retro-muted)] font-black tracking-widest uppercase mt-1">
                  MENIT
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-retro-accent text-2xl text-[var(--retro-terra)] leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="font-courier-prime text-[8px] text-[var(--retro-muted)] font-black tracking-widest uppercase mt-1">
                  DETIK
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll board bounce animation */}
        <div className="mt-10 flex flex-col items-center animate-bounce opacity-60">
          <span className="font-courier-prime text-[8px] font-black text-[var(--retro-muted)] tracking-[0.4rem] uppercase">
            ↓ GULIR ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}
