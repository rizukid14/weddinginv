"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { EightPointedStar, GeometricTessellation, IslamicArch } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";

interface Props {
  data: WeddingData;
}

export default function SpiritualCover({ data }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  useEffect(() => {
    const target = new Date(data.akadDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

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
    <div className="min-h-screen relative overflow-hidden bg-[#1B4332] text-[#FDFCFA] flex flex-col justify-between py-12 select-none z-10">
      {/* 1. Background Layers */}
      <GeometricTessellation size={55} color="#B7882A" opacity={0.05} />

      {/* 2. Top Header Seal */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <EightPointedStar size={45} color="#B7882A" animated={true} />
      </div>

      {/* 3. Upper Text Intro */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-center px-6 z-20 mt-10"
      >
        <span className="font-spirit-body text-[8px] uppercase tracking-[0.35em] text-[#B7882A] block mb-2 font-semibold">
          Walimatul Ursy
        </span>
        <div className="w-16 h-[1px] bg-[#B7882A]/30 mx-auto" />
      </motion.div>

      {/* 4. Masked Prewedding Picture (Masjid Dome Arch portal) */}
      <div className="w-[68%] mx-auto my-6 relative z-10">
        <IslamicArch className="aspect-[3/4]">
          <img
            src={data.coverPhoto || "https://placehold.co/800x1000/1b4332/b7882a?text=Prewedding"}
            alt="Mempelai"
            className="w-full h-full object-cover rounded-sm filter brightness-[95%]"
          />
        </IslamicArch>
      </div>

      {/* 5. Names and details block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="w-full text-center px-6 z-20 flex flex-col items-center"
      >
        {/* Bismillah Arabic Text in Cover (if enabled) */}
        {data.bismillahEnabled !== false && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            dir="rtl"
            className="font-spirit-arabic text-xl text-[#B7882A] mb-3 select-none leading-none"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.p>
        )}

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="font-spirit-heading text-4xl text-[#FDFCFA]"
        >
          {data.brideNickname} <span className="font-spirit-serif italic text-xl text-[#B7882A] mx-1">&</span> {data.groomNickname}
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="w-full"
        >
          <SpiritualDivider variant="simple" color="#B7882A" className="my-5" />
        </motion.div>

        {/* Date */}
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="font-spirit-serif font-bold text-[#B7882A] text-lg tracking-wide"
        >
          {new Date(data.akadDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </motion.span>

        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.5 },
          }}
          className="font-spirit-body text-[8px] uppercase tracking-widest text-[#F0EBE0] mt-0.5 mb-5 block font-semibold"
        >
          {new Date(data.akadDate).toLocaleDateString("id-ID", { weekday: "long" })}
        </motion.span>

        {/* Emerald/Gold Countdown Grid Block */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
          className="w-full max-w-[280px] border border-[#B7882A]/30 p-3.5 rounded-xl bg-[#2D6A4F]/25 relative overflow-hidden backdrop-blur-[2px] mt-2 mb-8"
        >
          <GeometricTessellation size={24} color="#B7882A" opacity={0.03} />
          <div className="grid grid-cols-4 gap-2 relative z-10">
            {[
              { label: "Hari", val: timeLeft.hari },
              { label: "Jam", val: timeLeft.jam },
              { label: "Menit", val: timeLeft.menit },
              { label: "Detik", val: timeLeft.detik },
            ].map((item, idx) => (
              <div key={`timer-${idx}`} className="flex flex-col items-center">
                <span className="font-spirit-serif font-bold text-xl text-[#B7882A] tracking-tight">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="font-spirit-body text-[7px] uppercase tracking-widest text-[#F0EBE0]/60 mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Helper */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.6 },
          }}
          className="flex flex-col items-center gap-1.5 opacity-50 select-none pointer-events-none"
        >
          <EightPointedStar size={14} color="#B7882A" animated={true} />
          <span className="font-spirit-body text-[7px] uppercase tracking-[0.2em] text-[#F0EBE0]/70">
            Gulir Kebawah
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
