"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { useParallax } from "@/hooks/useParallax";
import { CornerOrnament, KawungOrnament, ParangPattern, ParangBorder } from "./CultureBatikSVG";
import CultureParticles from "./CultureParticles";
import CultureDivider from "./CultureDivider";

interface Props {
  data: WeddingData;
}

export default function CultureMempelai({ data }: Props) {
  // Parallax elements for floating effects on couple pictures
  const bridePhotoRef = useParallax<HTMLDivElement>({ speed: 0.22 });
  const groomPhotoRef = useParallax<HTMLDivElement>({ speed: 0.25 });

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#EFE4CC] text-[#1A1208] select-none z-10">
      {/* 1. Background Layers */}
      <ParangPattern size={60} color="#2C3E6B" opacity={0.04} />
      <CultureParticles />

      {/* 2. Header Section with Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-16 relative z-20"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mb-4" />
        <span className="font-culture-number text-xs tracking-[0.25em] text-[#C9973A] block mb-5">
          SERAT MEMPELAI
        </span>

        {/* Dynamic customized wedding quote */}
        <p className="font-culture-subheading italic text-base text-[#6B3D2E]/80 max-w-xs mx-auto leading-relaxed px-4">
          &ldquo;{data.openingQuote || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri."}&rdquo;
        </p>
        {data.openingQuoteSource && (
          <span className="font-culture-body text-[8px] uppercase tracking-widest text-[#8A7055] mt-3 block">
            — {data.openingQuoteSource}
          </span>
        )}
      </motion.div>

      {/* 3. BRIDE (Mempelai Wanita) Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col items-center text-center relative z-20 mb-16"
      >
        {/* Parallax Photo Frame Container */}
        <div ref={bridePhotoRef} className="relative w-52 h-64 mb-8">
          {/* Double Frame borders */}
          <div className="absolute inset-0 border border-[#C9973A]/30 rounded-sm" />
          <div className="absolute inset-2 border border-[#C9973A]/60 rounded-sm p-1.5 bg-[#F9F3E8] shadow-lg">
            {/* Custom corners */}
            <CornerOrnament position="tl" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="tr" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="bl" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="br" size={30} color="#C9973A" animated={true} />

            <img
              src={data.bridePhoto || "https://placehold.co/400x500/efe4cc/6b3d2e?text=Mempelai+Wanita"}
              alt={data.brideName}
              className="w-full h-full object-cover filter saturate-[80%] sepia-[10%] brightness-[95%] rounded-sm"
            />
          </div>
        </div>

        {/* Bride Bio Details */}
        <motion.div variants={revealVariants} className="max-w-xs px-4">
          <span className="font-culture-body text-[8px] uppercase tracking-[0.3em] text-[#8A7055] inline-flex items-center gap-1">
            <span className="opacity-50">✦</span> Mempelai Wanita <span className="opacity-50">✦</span>
          </span>
          <h2 className="font-culture-display italic text-3xl text-[#6B3D2E] leading-tight mt-2.5">
            {data.brideName}
          </h2>
          {data.brideInstagram && (
            <a
              href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-culture-body text-[9px] uppercase tracking-[0.15em] text-[#C9973A] hover:underline mt-1 inline-block"
            >
              @{data.brideInstagram.replace("@", "")}
            </a>
          )}

          <div className="w-16 h-[1px] bg-[#C9973A]/30 mx-auto my-4" />

          <span className="font-culture-body text-[7px] uppercase tracking-widest text-[#8A7055] block mb-1">
            Putri saking pinuji:
          </span>
          <p className="font-culture-body font-bold text-xs text-[#6B3D2E]">
            {data.brideFatherName}
          </p>
          <span className="font-culture-subheading italic text-[10px] text-[#8A7055] my-0.5 block">
            kaliyan
          </span>
          <p className="font-culture-body font-bold text-xs text-[#6B3D2E]">
            {data.brideMotherName}
          </p>
        </motion.div>
      </motion.div>

      {/* 4. CONNECTOR (&) Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="my-14 text-center relative z-20 flex items-center justify-center h-20"
      >
        <KawungOrnament size={95} color="#C9973A" animated={true} className="opacity-25" />
        <span className="absolute font-culture-display italic text-4xl text-[#C9973A] translate-y-[-2px]">
          &
        </span>
      </motion.div>

      {/* 5. GROOM (Mempelai Pria) Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col items-center text-center relative z-20"
      >
        {/* Parallax Photo Frame Container */}
        <div ref={groomPhotoRef} className="relative w-52 h-64 mb-8">
          {/* Double Frame borders */}
          <div className="absolute inset-0 border border-[#C9973A]/30 rounded-sm" />
          <div className="absolute inset-2 border border-[#C9973A]/60 rounded-sm p-1.5 bg-[#F9F3E8] shadow-lg">
            {/* Custom corners */}
            <CornerOrnament position="tl" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="tr" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="bl" size={30} color="#C9973A" animated={true} />
            <CornerOrnament position="br" size={30} color="#C9973A" animated={true} />

            <img
              src={data.groomPhoto || "https://placehold.co/400x500/efe4cc/6b3d2e?text=Mempelai+Pria"}
              alt={data.groomName}
              className="w-full h-full object-cover filter saturate-[80%] sepia-[10%] brightness-[95%] rounded-sm"
            />
          </div>
        </div>

        {/* Groom Bio Details */}
        <motion.div variants={revealVariants} className="max-w-xs px-4">
          <span className="font-culture-body text-[8px] uppercase tracking-[0.3em] text-[#8A7055] inline-flex items-center gap-1">
            <span className="opacity-50">✦</span> Mempelai Pria <span className="opacity-50">✦</span>
          </span>
          <h2 className="font-culture-display italic text-3xl text-[#6B3D2E] leading-tight mt-2.5">
            {data.groomName}
          </h2>
          {data.groomInstagram && (
            <a
              href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-culture-body text-[9px] uppercase tracking-[0.15em] text-[#C9973A] hover:underline mt-1 inline-block"
            >
              @{data.groomInstagram.replace("@", "")}
            </a>
          )}

          <div className="w-16 h-[1px] bg-[#C9973A]/30 mx-auto my-4" />

          <span className="font-culture-body text-[7px] uppercase tracking-widest text-[#8A7055] block mb-1">
            Putra saking pinuji:
          </span>
          <p className="font-culture-body font-bold text-xs text-[#6B3D2E]">
            {data.groomFatherName}
          </p>
          <span className="font-culture-subheading italic text-[10px] text-[#8A7055] my-0.5 block">
            kaliyan
          </span>
          <p className="font-culture-body font-bold text-xs text-[#6B3D2E]">
            {data.groomMotherName}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
