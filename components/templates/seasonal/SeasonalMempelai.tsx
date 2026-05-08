"use client";
import React from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";
import { FloralIllustration } from "@/components/seasonal/FloralSidebar";
import CurtainReveal from "@/components/seasonal/CurtainReveal";
import SeasonalDivider from "./SeasonalDivider";

export default function SeasonalMempelai({ data, isCurtainOpen }: { data: WeddingData; isCurtainOpen: boolean }) {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#F5EAD8] z-0">
      {/* Background Texture */}
      <WatercolorBackground color="#D4906B" opacity={0.05} />

      {/* Massive Floral Wallpaper from unseparated PNG set */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.img
          src="/assets/floral/png/set-flowers-plant-illustrations.png"
          alt=""
          aria-hidden="true"
          className="w-[1000px] max-w-none h-auto object-contain opacity-25 mix-blend-multiply origin-center"
          animate={{ rotate: [0, 2, 0], scale: [1.8, 1.85, 1.8] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Internal Floral Decorations */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-20px] top-[15%] w-[80px] opacity-70 pointer-events-none"
      >
        <FloralIllustration side="left" className="origin-top-left" />
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-20px] bottom-[15%] w-[80px] opacity-70 pointer-events-none"
      >
        <FloralIllustration side="right" className="origin-top-right" />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-16 relative z-10"
      >
        <SeasonalDivider variant="branch" className="mb-4" />
        <h2 className="font-['Playfair_Display'] italic text-sm text-[#C8856A] tracking-[0.2em] uppercase">
          Mempelai
        </h2>
      </motion.div>

      {/* Bride Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center mb-24 relative z-10"
      >
        <div className="w-[85%] max-w-[280px] rounded-t-full rounded-b-xl overflow-hidden shadow-2xl shadow-[#8B4A35]/20 bg-white p-2">
          <div className="w-full rounded-t-full rounded-b-lg overflow-hidden relative">
            <CurtainReveal isOpen={isCurtainOpen} curtainColor="#C8856A" height="340px">
              <img
                src={data.bridePhoto}
                alt="Bride"
                className="w-full h-full object-cover object-center"
              />
            </CurtainReveal>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 -mt-12 w-[90%] max-w-[320px] shadow-lg text-center border border-white/50 relative">
          <h3 className="font-['Great_Vibes'] text-4xl text-[#6B3D2E] mb-2">{data.brideName}</h3>

          {data.brideInstagram && (
            <a
              href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-sans text-[#C8856A] mb-4 hover:underline"
            >
              @{data.brideInstagram.replace("@", "")}
            </a>
          )}

          <div className="flex flex-col gap-1 items-center">
            <span className="font-['Satisfy'] text-sm text-[#9A7B6A]">Putri dari</span>
            <span className="font-sans font-medium text-sm text-[#6B3D2E]">{data.brideFatherName}</span>
            <span className="font-['Playfair_Display'] italic text-xs text-[#C8856A]">&amp;</span>
            <span className="font-sans font-medium text-sm text-[#6B3D2E]">{data.brideMotherName}</span>
          </div>
        </div>
      </motion.div>

      {/* Connector */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-24 relative z-10"
      >
        <span className="font-['Great_Vibes'] text-6xl text-[#C9A96E] drop-shadow-sm relative z-10">&amp;</span>
      </motion.div>

      {/* Groom Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="w-[85%] max-w-[280px] rounded-t-full rounded-b-xl overflow-hidden shadow-2xl shadow-[#8B4A35]/20 bg-white p-2">
          <div className="w-full rounded-t-full rounded-b-lg overflow-hidden relative">
            <CurtainReveal isOpen={isCurtainOpen} curtainColor="#C8856A" height="340px">
              <img
                src={data.groomPhoto}
                alt="Groom"
                className="w-full h-full object-cover object-top"
              />
            </CurtainReveal>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 -mt-12 w-[90%] max-w-[320px] shadow-lg text-center border border-white/50 relative">
          <h3 className="font-['Great_Vibes'] text-4xl text-[#6B3D2E] mb-2">{data.groomName}</h3>

          {data.groomInstagram && (
            <a
              href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-sans text-[#C8856A] mb-4 hover:underline"
            >
              @{data.groomInstagram.replace("@", "")}
            </a>
          )}

          <div className="flex flex-col gap-1 items-center">
            <span className="font-['Satisfy'] text-sm text-[#9A7B6A]">Putra dari</span>
            <span className="font-sans font-medium text-sm text-[#6B3D2E]">{data.groomFatherName}</span>
            <span className="font-['Playfair_Display'] italic text-xs text-[#C8856A]">&amp;</span>
            <span className="font-sans font-medium text-sm text-[#6B3D2E]">{data.groomMotherName}</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
