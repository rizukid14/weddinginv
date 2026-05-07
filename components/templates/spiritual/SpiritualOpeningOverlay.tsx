"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { EightPointedStar, GeometricTessellation } from "./SpiritualGeometric";

interface Props {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function SpiritualOpeningOverlay({ data, guestName, onOpen }: Props) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 bg-[#1B4332] text-[#FDFCFA] flex flex-col items-center justify-center overflow-hidden max-w-[430px] mx-auto shadow-2xl select-none"
    >
      {/* Background patterns */}
      <GeometricTessellation size={60} color="#B7882A" opacity={0.06} />
      <div className="absolute inset-0 bg-radial-vignette opacity-25 pointer-events-none" />

      {/* Main Contents */}
      <div className="relative z-20 flex flex-col items-center text-center px-8 w-full max-w-sm">
        
        {/* Animated Khatam Star Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <EightPointedStar size={72} color="#B7882A" animated={true} />
        </motion.div>

        {/* Bismillah Arabic Header (Amiri font, rtl) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          dir="rtl"
          className="font-spirit-arabic text-2xl text-[#B7882A] mb-3 select-none leading-none"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* Introductory text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-spirit-body text-[10px] uppercase tracking-[0.25em] text-[#F0EBE0] mb-8"
        >
          Kabar Bahagia Pernikahan
        </motion.p>

        {/* Names */}
        <div className="flex flex-col gap-2 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-spirit-heading text-4xl text-[#FDFCFA]"
          >
            {data.brideNickname}
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-spirit-serif italic text-lg text-[#B7882A]"
          >
            walimah
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-spirit-heading text-4xl text-[#FDFCFA]"
          >
            {data.groomNickname}
          </motion.h2>
        </div>

        {/* Guest Label block */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="w-full flex flex-col items-center mb-10"
          >
            <span className="font-spirit-body text-[9px] uppercase tracking-[0.2em] text-[#F0EBE0]/50 block mb-2">
              Katur dumateng Yth:
            </span>
            <span className="font-spirit-serif font-bold text-xl text-[#B7882A] block">
              {guestName}
            </span>
          </motion.div>
        )}

        {/* Open Button with float effect loop */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={onOpen}
          className="bg-[#B7882A] text-[#1B4332] font-spirit-body font-bold text-xs uppercase tracking-[0.2em] py-4 px-10 rounded-xl border border-[#D4A843]/60 shadow-xl hover:bg-[#D4A843] transition-colors cursor-pointer"
        >
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}
