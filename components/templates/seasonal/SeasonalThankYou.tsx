"use client";
import React from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";

export default function SeasonalThankYou({ data }: { data: WeddingData }) {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#6B3D2E] text-[#FDF6EE] z-0 text-center min-h-[70vh] flex flex-col justify-center">
      <WatercolorBackground color="#3A1F16" opacity={0.4} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[320px] mx-auto relative z-10"
      >
        <h2 className="font-['Satisfy'] text-4xl mb-6 text-[#EAC4B0]">
          Thank You
        </h2>

        {data.thankYouPhoto && (
          <div className="w-[180px] h-[180px] mx-auto rounded-full overflow-hidden border-4 border-[#C8856A] shadow-2xl mb-8 relative">
            <div className="absolute inset-0 bg-[#6B3D2E]/20 mix-blend-color z-10 pointer-events-none" />
            <img 
              src={data.thankYouPhoto} 
              alt="Thank You" 
              className="w-full h-full object-cover saturate-[0.8] sepia-[0.2]"
            />
          </div>
        )}

        <p className="font-sans text-sm leading-relaxed text-[#FDF6EE]/80 mb-10 whitespace-pre-wrap">
          {data.thankYouMessage}
        </p>

        <h3 className="font-['Great_Vibes'] text-5xl text-[#C9A96E]">
          {data.brideNickname} &amp; {data.groomNickname}
        </h3>
      </motion.div>
    </section>
  );
}
