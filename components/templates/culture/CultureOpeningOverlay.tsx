"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { KawungOrnament, KawungPattern, CornerOrnament } from "./CultureBatikSVG";
import CultureParticles from "./CultureParticles";

interface Props {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function CultureOpeningOverlay({ data, guestName, onOpen }: Props) {
  const [particlesActive, setParticlesActive] = useState(false);

  // Safe date formatter to avoid Next.js hydration mismatches and runtime crash
  const formatLongDate = (dateStr?: string) => {
    if (!dateStr) return "21 Desember 2025";
    try {
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const dObj = new Date(dateStr);
      if (isNaN(dObj.getTime())) return "21 Desember 2025";
      return `${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
    } catch {
      return "21 Desember 2025";
    }
  };

  // Activate particles 2 seconds after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setParticlesActive(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 bg-[#F9F3E8] text-[#1A1208] flex flex-col items-center justify-center overflow-hidden max-w-[430px] mx-auto shadow-2xl select-none"
    >
      {/* 1. Background Layers */}
      <KawungPattern size={40} color="#C9973A" opacity={0.06} />
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />

      {/* 2. Particles Mount at T+2.0s */}
      {particlesActive && <CultureParticles />}

      {/* 3. Corner Ornaments (T+0.3s) */}
      <CornerOrnament position="tl" size={70} color="#C9973A" animated={true} />
      <CornerOrnament position="tr" size={70} color="#C9973A" animated={true} />
      <CornerOrnament position="bl" size={70} color="#C9973A" animated={true} />
      <CornerOrnament position="br" size={70} color="#C9973A" animated={true} />

      {/* 4. Orchestrated Contents Panel */}
      <div className="relative z-20 flex flex-col items-center text-center px-8 w-full max-w-sm">
        {/* Bismillah Header (T+0.8s) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-culture-subheading italic text-[#6B3D2E] text-xs tracking-wider mb-2"
        >
          Miwiti kanti nyebut asmo-Nipun Allah
        </motion.p>

        {/* Golden Horizontal Center Line (T+0.6s) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          className="w-32 h-[1px] bg-[#C9973A] mb-8 origin-center"
        />

        {/* Bride Name (T+1.0s) */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="font-culture-display italic text-4xl text-[#6B3D2E] leading-tight"
        >
          {data.brideNickname}
        </motion.h2>

        {/* Middle breathing Kawung Ornament (T+1.2s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "backOut" }}
          className="my-3"
        >
          <KawungOrnament size={65} color="#C9973A" animated={true} />
        </motion.div>

        {/* Groom Name (T+1.3s) */}
        <motion.h2
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
          className="font-culture-display italic text-4xl text-[#6B3D2E] leading-tight"
        >
          {data.groomNickname}
        </motion.h2>

        {/* Golden Horizontal Center Line (T+1.4s) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: "easeInOut" }}
          className="w-32 h-[1px] bg-[#C9973A] mt-8 mb-6 origin-center"
        />

        {/* Invitation Date (T+1.5s) */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-culture-number text-lg text-[#8B6520] tracking-[0.2em] uppercase block mb-1"
        >
          {formatLongDate(data.akadDate)}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="font-culture-body text-[9px] uppercase tracking-[0.3em] text-[#8A7055] block mb-8"
        >
          SASMITO REJO TRADISIONAL
        </motion.span>

        {/* Personalized Guest Label Block (T+1.5s - T+1.8s) */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="w-full flex flex-col items-center mb-10"
          >
            <span className="font-culture-body text-[8px] uppercase tracking-[0.25em] text-[#8A7055] block mb-2">
              Katur dumateng Yth:
            </span>
            <span className="font-culture-subheading italic text-xl text-[#6B3D2E] font-medium block">
              {guestName}
            </span>
          </motion.div>
        )}

        {/* Floating pulse CTA Open Button (T+1.8s) */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={onOpen}
          className="relative bg-[#6B3D2E] text-[#F9F3E8] border border-[#C9973A]/50 rounded-xl px-10 py-3.5 hover:bg-[#2C3E6B] transition-colors duration-300 font-culture-body font-bold text-xs uppercase tracking-[0.2em] shadow-xl"
        >
          Buka Serat Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}
