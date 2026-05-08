"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { fadeUp, fadeIn } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function ModernCover({ data }: Props) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const target = new Date(data.resepsiDate || "2025-12-21");

    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        return;
      }

      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [data.resepsiDate]);

  // Format date as "21.12.2025"
  const getNumericDateStr = () => {
    try {
      const dObj = new Date(data.resepsiDate || "2025-12-21");
      const d = String(dObj.getDate()).padStart(2, "0");
      const m = String(dObj.getMonth() + 1).padStart(2, "0");
      const y = dObj.getFullYear();
      return `${d}.${m}.${y}`;
    } catch {
      return "21.12.2025";
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-between py-12 bg-[var(--modern-black)] select-none">
      {/* 1. Thin layout boundary lines simulating editorial blueprint layouts */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-[var(--modern-mid)]/[0.05]" />

      {/* 2. Banner cover image (Grayscale, top 48vh) */}
      <div className="w-full h-[48vh] relative overflow-hidden z-10 border-b border-[var(--modern-mid)]/[0.08]">
        <Image
          src={data.coverPhoto}
          alt="Modern Cover"
          fill
          priority
          className="object-cover filter grayscale contrast-[1.05] brightness-75"
          sizes="(max-w-md) 100vw, 430px"
        />
        {/* Editorial vignette/dark fade on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--modern-black)] via-transparent to-black/30" />
      </div>

      {/* 3. Mid Header details */}
      <div className="px-8 mt-6 z-10 text-left">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-between items-end border-b border-[var(--modern-mid)]/[0.08] pb-3"
        >
          <span className="font-modern-body text-[8px] uppercase tracking-[0.4em] text-[var(--modern-accent)]">
            {"// WEDDING CELEBRATION"}
          </span>
          <span className="font-modern-body text-[8px] uppercase tracking-widest text-[var(--modern-mid)]/40 font-bold">
            VOL.01 // NEW-EDITION
          </span>
        </motion.div>

        {/* Massive titles block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-6 flex flex-col gap-1.5"
        >
          <h1 className="font-modern-display text-[2.6rem] xs:text-[3rem] leading-[0.9] text-[var(--modern-white)] font-black tracking-tighter uppercase">
            {data.brideNickname}
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-modern-accent text-xl lowercase italic text-[var(--modern-accent)] font-normal">{"// and"}</span>
            <div className="h-[1px] bg-[var(--modern-accent)] flex-grow opacity-60" />
          </div>
          <h1 className="font-modern-display text-[2.6rem] xs:text-[3rem] leading-[0.9] text-[var(--modern-white)] font-black tracking-tighter uppercase">
            {data.groomNickname}
          </h1>
        </motion.div>
      </div>

      {/* 4. Bottom Section: Date & Neon Countdown */}
      <div className="px-8 mt-8 flex flex-col gap-6 z-10">
        <div className="flex justify-between items-start">
          <div className="text-left">
            <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-mid)]/40 block leading-none">
              DATE TIME OF UNION
            </span>
            <span className="font-modern-body text-xs font-black text-[var(--modern-white)] block mt-1 tracking-wider">
              {getNumericDateStr()}
            </span>
          </div>

          <div className="text-right">
            <span className="font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-mid)]/40 block leading-none">
              LOCATION OF VENUE
            </span>
            <span className="font-modern-body text-[9px] text-[var(--modern-white)] block mt-1 tracking-wider leading-tight uppercase font-bold">
              {data.resepsiVenue.includes("Hotel") ? "Hotel Ballroom, Jkt" : "Luxury Hall, Jkt"}
            </span>
          </div>
        </div>

        {/* Neon Orange countdown indicators */}
        <div className="border-t border-[var(--modern-mid)]/[0.08] pt-4">
          {isPast ? (
            <div className="text-left font-modern-body text-[10px] text-[var(--modern-accent)] uppercase tracking-widest">
              {"// EVENT HAS COMMENCED SUCCESSFULLY"}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-left">
              {[
                { val: days, lbl: "DAYS" },
                { val: hours, lbl: "HOURS" },
                { val: minutes, lbl: "MINS" },
                { val: seconds, lbl: "SECS" },
              ].map((item, idx) => (
                <div key={idx} className="bg-[var(--modern-dark)] border border-[var(--modern-mid)]/[0.08] p-2 flex flex-col">
                  <span className="font-modern-display text-lg font-black text-[var(--modern-accent)] leading-none select-none">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="font-modern-body text-[7px] text-[var(--modern-mid)]/50 tracking-wider block mt-1.5 leading-none">
                    {item.lbl}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
