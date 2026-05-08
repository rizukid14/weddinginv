"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { useParallax } from "@/hooks/useParallax";
import { CornerOrnament, KawungOrnament, KawungPattern, MegaMendungPattern } from "./CultureBatikSVG";
import CultureParticles from "./CultureParticles";
import CultureDivider from "./CultureDivider";

interface Props {
  data: WeddingData;
}

export default function CultureCover({ data }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  // Safe date/day formatters to prevent Next.js hydration mismatches and runtime crashes
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

  const formatDayName = (dateStr?: string) => {
    if (!dateStr) return "Minggu";
    try {
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const dObj = new Date(dateStr);
      if (isNaN(dObj.getTime())) return "Minggu";
      return days[dObj.getDay()];
    } catch {
      return "Minggu";
    }
  };

  const bgRef = useParallax<HTMLDivElement>({ speed: 0.15 });
  const photoRef = useParallax<HTMLDivElement>({ speed: 0.25 });
  const cornerRef = useParallax<HTMLDivElement>({ speed: 0.4 });

  useEffect(() => {
    const target = data.akadDate ? new Date(data.akadDate).getTime() : new Date("2025-12-21").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = isNaN(target) ? 0 : target - now;

      if (difference <= 0) {
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
        return;
      }

      const hari = Math.floor(difference / (1000 * 60 * 60 * 24));
      const jam = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const menit = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const detik = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hari, jam, menit, detik });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.akadDate]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F3E8] flex flex-col justify-between py-12 z-10 select-none">
      {/* 1. Background Clouds (Parallax Speed 0.15) */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <MegaMendungPattern color="#C9973A" opacity={0.05} />
      </div>

      {/* 2. Corners Parallax Mount */}
      <div ref={cornerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <CornerOrnament position="tl" size={60} color="#C9973A" animated={true} />
        <CornerOrnament position="tr" size={60} color="#C9973A" animated={true} />
        <CornerOrnament position="bl" size={60} color="#C9973A" animated={true} />
        <CornerOrnament position="br" size={60} color="#C9973A" animated={true} />
      </div>

      {/* 3. Falling gold leaves particle canvas */}
      <CultureParticles />

      {/* 4. Above Photo Header (Framer Motion sequence) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center px-6 z-20"
      >
        <span className="font-culture-body text-[8px] uppercase tracking-[0.35em] text-[#8A7055] block mb-2">
          SERAT UNDANGAN PERNIKAHAN
        </span>
        <div className="w-24 h-[1px] bg-[#C9973A]/40 mx-auto" />
      </motion.div>

      {/* 5. Centerpiece sepia prewedding frame (Parallax Speed 0.25) */}
      <div ref={photoRef} className="w-[82%] mx-auto my-6 relative z-10">
        <div className="p-1 bg-[#F9F3E8] border-[3px] border-[#C9973A] shadow-xl relative rounded-sm overflow-hidden">
          {/* Inner royal gap frame border */}
          <div className="absolute inset-1.5 border border-[#C9973A]/40 pointer-events-none" />
          <img
            src={data.coverPhoto || "https://placehold.co/800x1000/f9f3e8/6b3d2e?text=Prewedding"}
            alt="Mempelai"
            className="w-full aspect-[3/4] object-cover rounded-sm filter saturate-[80%] sepia-[10%] brightness-[95%] transition-all duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* 6. Below Photo Names, Countdown & Scroll Indicator */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="w-full text-center px-6 z-20 flex flex-col items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mb-2"
        >
          <KawungOrnament size={50} color="#C9973A" animated={true} />
        </motion.div>

        {/* Bride & Groom names block */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="font-culture-display italic text-3xl sm:text-4xl text-[#6B3D2E] leading-snug"
        >
          {data.brideNickname} <span className="text-[#C9973A] text-2xl font-sans not-italic">&</span> {data.groomNickname}
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="w-full"
        >
          <CultureDivider variant="simple" color="#C9973A" className="my-5" />
        </motion.div>

        {/* Traditional Gregorian date info */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="font-culture-number text-[#8B6520] text-base tracking-[0.2em]"
        >
          {formatLongDate(data.akadDate)}
        </motion.span>

        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.5 },
          }}
          className="font-culture-body text-[8px] uppercase tracking-wider text-[#8A7055] mt-0.5 mb-5 block"
        >
          {formatDayName(data.akadDate)}
        </motion.span>

        {/* Symmetrical countdown grid block */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
          className="w-full max-w-[280px] border border-[#C9973A]/30 p-3.5 rounded-xl bg-[#EFE4CC]/20 relative overflow-hidden backdrop-blur-[2px] mt-2 mb-8"
        >
          <KawungPattern size={24} color="#C9973A" opacity={0.03} />
          <div className="grid grid-cols-4 gap-2 relative z-10">
            {[
              { label: "Hari", val: timeLeft.hari },
              { label: "Jam", val: timeLeft.jam },
              { label: "Menit", val: timeLeft.menit },
              { label: "Detik", val: timeLeft.detik },
            ].map((item, idx) => (
              <div key={`timer-${idx}`} className="flex flex-col items-center">
                <span className="font-culture-number font-bold text-xl sm:text-2xl text-[#6B3D2E] tracking-tight">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="font-culture-body text-[7px] uppercase tracking-widest text-[#8A7055] mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scrolling helper sign */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.6 },
          }}
          className="flex flex-col items-center gap-1.5 opacity-50 select-none cursor-pointer"
        >
          <KawungOrnament size={16} color="#C9973A" animated={true} />
          <span className="font-culture-body text-[7px] uppercase tracking-[0.2em] text-[#8A7055]">
            Gulir Mendepak Serat
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
