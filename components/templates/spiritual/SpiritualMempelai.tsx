"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { EightPointedStar, GeometricTessellation, IslamicArch } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";

interface Props {
  data: WeddingData;
}

export default function SpiritualMempelai({ data }: Props) {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
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
    <div className="py-24 px-6 relative overflow-hidden bg-[#FDFCFA] text-[#1B4332] select-none z-10">
      {/* 1. Background Grid Tessellation */}
      <GeometricTessellation size={60} color="#B7882A" opacity={0.03} />

      {/* 2. Quranic Verse & Translation Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-16 relative z-20 px-2"
      >
        <SpiritualDivider variant="ornate" color="#B7882A" className="mb-4" />
        <span className="font-spirit-body text-xs tracking-[0.25em] text-[#B7882A] block mb-5 font-bold">
          Qur&apos;an An-Nisa / Ar-Rum
        </span>

        {/* Display Quranic verse in Calligraphy format (if enabled) */}
        {data.ayatNikahEnabled !== false && (
          <div className="flex flex-col items-center mb-6">
            <p className="font-spirit-arabic text-xl text-[#B7882A] tracking-wide leading-relaxed text-center max-w-[340px] select-none" dir="rtl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
            </p>
          </div>
        )}

        <p className="font-spirit-serif italic text-xs sm:text-sm text-[#7A6E5E]/90 max-w-sm mx-auto leading-relaxed px-4">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.&rdquo;
        </p>
        <span className="font-spirit-body text-[8px] uppercase tracking-widest text-[#B7882A] mt-3.5 block font-bold">
          — QS. AR-RUM: 21
        </span>
      </motion.div>

      {/* 3. BRIDE (Mempelai Wanita) Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex flex-col items-center text-center relative z-20 mb-16"
      >
        {/* Dome Arch masked picture frame */}
        <div className="w-48 mb-6">
          <IslamicArch className="aspect-[3/4]">
            <img
              src={data.bridePhoto || "https://placehold.co/400x500/fdfcfa/1b4332?text=Mempelai+Wanita"}
              alt={data.brideName}
              className="w-full h-full object-cover filter brightness-[95%]"
            />
          </IslamicArch>
        </div>

        {/* Details card */}
        <motion.div variants={revealVariants} className="max-w-xs px-4">
          <span className="font-spirit-body text-[8px] uppercase tracking-[0.3em] text-[#B7882A] inline-flex items-center gap-1 font-bold">
            ✦ Mempelai Wanita ✦
          </span>
          <h2 className="font-spirit-heading text-3xl text-[#1B4332] mt-2">
            {data.brideName}
          </h2>
          {data.brideInstagram && (
            <a
              href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-spirit-body text-[9px] uppercase tracking-[0.15em] text-[#B7882A] hover:underline mt-1 inline-block font-bold"
            >
              @{data.brideInstagram.replace("@", "")}
            </a>
          )}

          <div className="w-12 h-[1px] bg-[#B7882A]/30 mx-auto my-4" />

          <span className="font-spirit-body text-[7px] uppercase tracking-widest text-[#7A6E5E]/80 block mb-1 font-bold">
            Putri Tercinta dari Pasangan:
          </span>
          <p className="font-spirit-serif font-bold text-sm text-[#1B4332]">
            Bapak {data.brideFatherName}
          </p>
          <span className="font-sans text-[10px] text-[#7A6E5E]/80 my-0.5 block italic">
            &amp;
          </span>
          <p className="font-spirit-serif font-bold text-sm text-[#1B4332]">
            Ibu {data.brideMotherName}
          </p>
        </motion.div>
      </motion.div>

      {/* 4. CONNECTOR (Overlapping Khatam Star Emblem) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="my-12 text-center relative z-20 flex items-center justify-center h-16"
      >
        <EightPointedStar size={65} color="#B7882A" animated={true} className="opacity-25" />
        <span className="absolute font-spirit-serif italic text-2xl text-[#B7882A]">
          &amp;
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
        {/* Dome Arch masked picture frame */}
        <div className="w-48 mb-6">
          <IslamicArch className="aspect-[3/4]">
            <img
              src={data.groomPhoto || "https://placehold.co/400x500/fdfcfa/1b4332?text=Mempelai+Pria"}
              alt={data.groomName}
              className="w-full h-full object-cover filter brightness-[95%]"
            />
          </IslamicArch>
        </div>

        {/* Details card */}
        <motion.div variants={revealVariants} className="max-w-xs px-4">
          <span className="font-spirit-body text-[8px] uppercase tracking-[0.3em] text-[#B7882A] inline-flex items-center gap-1 font-bold">
            ✦ Mempelai Pria ✦
          </span>
          <h2 className="font-spirit-heading text-3xl text-[#1B4332] mt-2">
            {data.groomName}
          </h2>
          {data.groomInstagram && (
            <a
              href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-spirit-body text-[9px] uppercase tracking-[0.15em] text-[#B7882A] hover:underline mt-1 inline-block font-bold"
            >
              @{data.groomInstagram.replace("@", "")}
            </a>
          )}

          <div className="w-12 h-[1px] bg-[#B7882A]/30 mx-auto my-4" />

          <span className="font-spirit-body text-[7px] uppercase tracking-widest text-[#7A6E5E]/80 block mb-1 font-bold">
            Putra Tercinta dari Pasangan:
          </span>
          <p className="font-spirit-serif font-bold text-sm text-[#1B4332]">
            Bapak {data.groomFatherName}
          </p>
          <span className="font-sans text-[10px] text-[#7A6E5E]/80 my-0.5 block italic">
            &amp;
          </span>
          <p className="font-spirit-serif font-bold text-sm text-[#1B4332]">
            Ibu {data.groomMotherName}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
