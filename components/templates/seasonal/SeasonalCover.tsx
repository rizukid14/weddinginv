"use client";
import React from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";
import { FloralIllustration } from "@/components/seasonal/FloralSidebar";
import SeasonalDivider from "./SeasonalDivider";

export default function SeasonalCover({ data, isCurtainOpen }: { data: WeddingData; isCurtainOpen: boolean }) {
  return (
    <section className="min-h-screen relative overflow-hidden bg-[#FDF6EE] flex flex-col pt-10">
      <WatercolorBackground color="#EAC4B0" opacity={0.08} />

      {/* Mobile Floral (Absolute inside container) */}
      <div className="absolute left-0 top-0 w-[80px] h-[50vh] opacity-60 pointer-events-none lg:hidden z-10 overflow-hidden">
        <FloralIllustration side="left" className="scale-[1.5] -translate-x-6 origin-top-left" />
      </div>
      <div className="absolute right-0 top-0 w-[80px] h-[50vh] opacity-60 pointer-events-none lg:hidden z-10 overflow-hidden">
        <FloralIllustration side="right" className="scale-[1.5] translate-x-6 origin-top-right" />
      </div>

      {/* Cover Photo */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isCurtainOpen ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-[85%] max-w-[340px] mx-auto aspect-[3/4] relative z-0 mt-8 rounded-t-full rounded-b-xl overflow-hidden shadow-2xl shadow-[#C8856A]/20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(44,31,24,0.3)_100%)] z-10 pointer-events-none mix-blend-multiply" />
        <img 
          src={data.coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover saturate-[0.85] sepia-[0.05] contrast-[1.02]"
        />
        <div className="absolute inset-0 border border-[#FDF6EE]/40 rounded-t-full rounded-b-xl z-20 pointer-events-none m-2" />
      </motion.div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-end pb-16 pt-8 relative z-20 w-full">
        {/* Gradient mask at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#FDF6EE] via-[#FDF6EE]/90 to-transparent -z-10" />

        <motion.img
          src="/assets/floral/png/vecteezy_watercolor-flower_25256286.png"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-10 -left-20 w-80 opacity-20 pointer-events-none mix-blend-multiply"
          animate={{ rotate: [-2, 2, -2], scale: [1, 1.02, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-['Great_Vibes'] text-5xl text-[#6B3D2E] leading-none mb-1">
            {data.brideNickname}
          </h2>
          <span className="font-['Playfair_Display'] italic text-2xl text-[#C8856A] my-2 block">
            &amp;
          </span>
          <h2 className="font-['Great_Vibes'] text-5xl text-[#6B3D2E] leading-none mt-1">
            {data.groomNickname}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <SeasonalDivider variant="simple" className="my-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-['Playfair_Display'] text-lg text-[#C8856A] tracking-[0.15em] uppercase">
            {new Date(data.akadDate || data.resepsiDate).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </p>

          {/* Simple Countdown */}
          <div className="flex gap-4 items-center justify-center mb-8">
             <CountdownBox label="Hari" value="00" />
             <span className="text-[#C8856A]/50 mb-4">:</span>
             <CountdownBox label="Jam" value="00" />
             <span className="text-[#C8856A]/50 mb-4">:</span>
             <CountdownBox label="Menit" value="00" />
          </div>

          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 opacity-60 mt-4"
          >
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#9A7B6A]">Scroll</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9A7B6A]">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[50px]">
      <div className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#C8856A]/20 shadow-sm">
        <span className="font-['Playfair_Display'] font-bold text-xl text-[#C8856A]">{value}</span>
      </div>
      <span className="font-sans text-[8px] uppercase tracking-widest text-[#9A7B6A]">{label}</span>
    </div>
  );
}
