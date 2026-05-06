"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import CountdownTimer from "../ui/CountdownTimer";
import { fadeUp, fadeIn } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function CoverSection({ data }: Props) {
  const formattedDate = new Date(data.resepsiDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-between py-16 px-6 z-10 bg-[#2C2424]">
      {/* Background Cover Photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.coverPhoto}
          alt={`Pernikahan ${data.brideNickname} & ${data.groomNickname}`}
          fill
          priority
          sizes="(max-w-md) 100vw, 430px"
          className="object-cover brightness-75 select-none"
        />
        {/* Editorial Vignette and Dark Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2424]/95 via-[#2C2424]/40 to-black/30 z-10" />
      </div>

      {/* Corner Ornaments in white/40 for dark contrast */}
      <div className="absolute top-0 left-0 w-20 h-20 text-white/40 opacity-50 pointer-events-none z-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q20,8 40,0 Q15,30 0,40 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q10,30 0,60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q30,10 60,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 text-white/40 opacity-50 pointer-events-none rotate-90 z-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q20,8 40,0 Q15,30 0,40 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q10,30 0,60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q30,10 60,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20 text-white/40 opacity-50 pointer-events-none -rotate-90 z-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q20,8 40,0 Q15,30 0,40 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q10,30 0,60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q30,10 60,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 text-white/40 opacity-50 pointer-events-none rotate-180 z-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q20,8 40,0 Q15,30 0,40 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q10,30 0,60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q30,10 60,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content layout stacked vertically */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="z-20 text-center mt-4"
      >
        <span className="border border-white/40 text-white/80 text-[10px] tracking-widest uppercase px-4 py-1.5 font-sans font-medium inline-block rounded-sm backdrop-blur-sm bg-black/5">
          Undangan Pernikahan
        </span>
      </motion.div>

      {/* Middle Spacer */}
      <div className="flex-grow z-10" />

      {/* Bottom Information */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="z-20 text-center w-full flex flex-col items-center pb-8"
      >
        <p className="font-serif italic text-white/60 text-xs mb-3 font-light select-none">
          Bismillahirrahmanirrahim
        </p>

        {/* Couple names with great vibes */}
        <div className="flex flex-col items-center justify-center my-2 select-none">
          <h1 className="font-display text-5xl md:text-6xl text-white drop-shadow-md leading-normal tracking-wide">
            {data.brideNickname}
          </h1>
          {/* & Ornament */}
          <div className="w-10 h-10 flex items-center justify-center text-floral-gold-deep my-0.5">
            <svg viewBox="0 0 40 40" className="w-6 h-6 text-floral-blush stroke-current" fill="none">
              <path d="M10 20 C20 15, 20 25, 30 20" strokeWidth="1" />
              <circle cx="20" cy="20" r="3" strokeWidth="0.8" />
            </svg>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white drop-shadow-md leading-normal tracking-wide">
            {data.groomNickname}
          </h1>
        </div>

        {/* Elegant thin line with diamond */}
        <svg viewBox="0 0 100 10" fill="none" className="w-32 h-4 my-2 text-white/40">
          <line x1="0" y1="5" x2="40" y2="5" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="50,2 53,5 50,8 47,5" stroke="currentColor" strokeWidth="0.5" />
          <line x1="60" y1="5" x2="100" y2="5" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        <p className="font-serif text-base text-white/95 tracking-wide leading-relaxed mt-1">
          {formattedDate}
        </p>
        <p className="font-sans text-[10px] uppercase tracking-widest text-white/70 mt-1">
          {data.resepsiVenue.includes("Hotel") ? "Jakarta, Indonesia" : "Jakarta Selatan, Indonesia"}
        </p>

        {/* Real-time Countdown Timer */}
        <div className="mt-8 w-full">
          <CountdownTimer targetDate={data.resepsiDate} />
        </div>

        {/* Scroll down indicator */}
        <div className="mt-10 flex flex-col items-center gap-1 opacity-60">
          <span className="font-sans text-[9px] uppercase tracking-widest text-white/50">
            Gulir ke bawah
          </span>
          <ChevronDown size={16} className="text-white/60 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
