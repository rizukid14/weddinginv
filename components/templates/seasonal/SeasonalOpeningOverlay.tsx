"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";
import { FloralIllustration } from "@/components/seasonal/FloralSidebar";
import ButterflyCanvas from "@/components/seasonal/ButterflyCanvas";
import PetalCanvas from "@/components/seasonal/PetalCanvas";
import { WeddingData } from "@/types/wedding";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  data: WeddingData;
  guestName: string | null;
}

export default function SeasonalOpeningOverlay({ isOpen, onOpen, data, guestName }: Props) {
  const handleOpen = () => {
    onOpen();
    // Dispatch custom event to start music globally
    if (data.musicEnabled && data.musicUrl) {
      window.dispatchEvent(new Event("play-music"));
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF6EE] overflow-hidden"
        >
          {/* Background Textures */}
          <WatercolorBackground color="#EAC4B0" opacity={0.06} />
          
          {/* Floral Decoration Left (Absolute) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-0 top-0 w-[120px] h-full pointer-events-none opacity-80"
          >
            <FloralIllustration side="left" />
          </motion.div>
          
          {/* Floral Decoration Right (Absolute) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute right-0 top-0 w-[120px] h-full pointer-events-none opacity-80"
          >
            <FloralIllustration side="right" />
          </motion.div>

          {/* Particles (Start here and continue later) */}
          <ButterflyCanvas count={10} />
          <PetalCanvas count={15} />

          {/* Content */}
          <div className="relative z-30 flex flex-col items-center text-center px-8 w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center mb-8"
            >
              <span className="font-['Playfair_Display'] italic text-sm text-[#C8856A] tracking-[0.2em] uppercase">
                Wedding Invitation
              </span>
              <svg width="40" height="20" viewBox="0 0 40 20" className="mt-3 text-[#C9A96E] opacity-70">
                <path d="M5 10 Q 20 0 35 10" stroke="currentColor" fill="none" strokeWidth="1" />
                <circle cx="20" cy="5" r="2" fill="currentColor" />
              </svg>
            </motion.div>

            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-8 flex flex-col gap-1"
              >
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#9A7B6A]">Kepada Yth.</span>
                <span className="font-['Playfair_Display'] italic text-lg text-[#6B3D2E]">{guestName}</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 mb-6"
            >
              <h1 className="font-['Great_Vibes'] text-6xl text-[#6B3D2E] leading-none drop-shadow-sm">
                {data.brideNickname}
              </h1>
              <span className="font-['Playfair_Display'] italic text-3xl text-[#C8856A]">&amp;</span>
              <h1 className="font-['Great_Vibes'] text-6xl text-[#6B3D2E] leading-none drop-shadow-sm">
                {data.groomNickname}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <p className="font-['Satisfy'] italic text-lg text-[#9A7B6A] mb-4">
                Our Wedding Day
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="font-['Playfair_Display'] text-sm text-[#C8856A] tracking-[0.15em] uppercase mb-12"
            >
              {new Date(data.akadDate || data.resepsiDate).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative bg-[#C8856A] hover:bg-[#8B4A35] transition-colors text-[#FDF6EE] px-10 py-3.5 rounded-md shadow-xl flex items-center gap-2 overflow-hidden"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <span className="font-['Playfair_Display'] italic text-base relative z-10">
                  Buka Undangan
                </span>
                <span className="relative z-10">🌸</span>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.button>
          </div>

          {/* Curtain Hint Stripes (Left/Right Edges) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#C8856A] shadow-[2px_0_10px_rgba(0,0,0,0.1)]" />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#C8856A] shadow-[-2px_0_10px_rgba(0,0,0,0.1)]" />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
