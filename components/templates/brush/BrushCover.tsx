"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { fadeUp, fadeIn } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function BrushCover({ data }: Props) {
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

  // Extract date variables for ink stamp stamp layout
  const getStampData = () => {
    try {
      const dObj = new Date(data.akadDate || data.resepsiDate || "2025-12-21");
      const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGT", "SEP", "OKT", "NOP", "DES"];
      return {
        day: String(dObj.getDate()).padStart(2, "0"),
        month: months[dObj.getMonth()],
        year: dObj.getFullYear(),
      };
    } catch {
      return { day: "21", month: "DES", year: "2025" };
    }
  };

  const stamp = getStampData();

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-between py-12 px-8 z-10 bg-[var(--brush-paper)] select-none">
      {/* Background Subtle Brush Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-[20%] left-[-15%] w-[70%] h-[70%] opacity-[0.04] fill-[var(--brush-ink)]" viewBox="0 0 100 100">
          <path d="M 5 50 Q 30 10, 80 40 T 95 90" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Vertical Side Tagged Title */}
      <div className="absolute left-6 top-1/3 -translate-y-1/2 writing-mode-vertical rotate-180 font-brush-body text-[8px] uppercase tracking-[0.4em] text-[var(--brush-muted)]/60 z-10 select-none">
        W E D D I N G &nbsp; I N V I T A T I O N
      </div>

      {/* Top Tag */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="z-10 text-left"
      >
        <span className="font-brush-body text-[9px] uppercase tracking-[0.3em] text-[var(--brush-muted)] font-bold">
          The Wedding Celebration of
        </span>
      </motion.div>

      {/* Polaroid Section (Asymmetric weight, right side shifted) */}
      <div className="relative w-full flex justify-end mt-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="bg-white p-3.5 pb-10 border border-[var(--brush-ink)]/10 shadow-xl w-[72%] max-w-[250px] relative flex flex-col"
        >
          {/* Polaroid photo */}
          <div className="w-full aspect-[3/4] bg-[var(--brush-warm)] relative overflow-hidden">
            <Image
              src={data.coverPhoto}
              alt="Cover Photo"
              fill
              priority
              className="object-cover brightness-[0.97]"
              sizes="250px"
            />
          </div>

          {/* Imperfect Washi tape pieces holding the polaroid */}
          <div className="absolute top-[-8px] left-1/4 -translate-x-1/2 w-14 h-4 bg-[var(--brush-warm)]/60 border-l border-r border-dashed border-[var(--brush-ink)]/20 rotate-[-12deg] opacity-80 backdrop-blur-[1px]" />
          <div className="absolute top-[-4px] right-1/4 translate-x-1/2 w-12 h-3.5 bg-[var(--brush-warm)]/50 border-l border-r border-dashed border-[var(--brush-ink)]/20 rotate-[18deg] opacity-80 backdrop-blur-[1px]" />
        </motion.div>
      </div>

      {/* Couple Name and Typography details */}
      <div className="mt-4 text-left z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative inline-block"
        >
          {/* Couple names */}
          <h2 className="font-brush-display text-4xl leading-none text-[var(--brush-ink)] select-none tracking-tight">
            {data.brideNickname}
          </h2>
          <div className="font-brush-accent text-2xl text-[var(--brush-stroke)] py-1 pl-3 select-none">
            &amp;
          </div>
          <h2 className="font-brush-display text-4xl leading-none text-[var(--brush-ink)] select-none tracking-tight">
            {data.groomNickname}
          </h2>

          {/* Underline stroke */}
          <div className="absolute bottom-[-14px] left-0 w-36 h-4 opacity-[0.14] pointer-events-none fill-[var(--brush-stroke)]">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path d="M 5 10 Q 50 15, 95 10 T 100 20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Footer Area: Ink Stamp and Countdown */}
      <div className="mt-14 flex items-end justify-between gap-4 z-10">
        {/* Ink Stamp Circle representation (lingkaran tak rata) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          whileInView={{ opacity: 0.8, scale: 1, rotate: -5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center select-none"
        >
          {/* Stamp SVG Ring */}
          <svg className="absolute inset-0 w-full h-full text-[var(--brush-stroke)]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3 5 2" className="opacity-80" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.2" className="opacity-70" />
          </svg>
          {/* Stamp Info */}
          <div className="text-center text-[var(--brush-stroke)] flex flex-col justify-center items-center font-bold">
            <span className="font-brush-display text-lg leading-none">{stamp.day}</span>
            <span className="font-brush-body text-[8px] uppercase tracking-widest leading-none my-0.5">{stamp.month}</span>
            <span className="font-brush-body text-[8px] leading-none opacity-80">{stamp.year}</span>
          </div>
        </motion.div>

        {/* Countdown Area */}
        <div className="flex-grow flex justify-end">
          {isPast ? (
            <div className="border-l-2 border-[var(--brush-stroke)] pl-3 text-left">
              <p className="font-brush-body italic text-xs text-[var(--brush-ink-soft)]">
                Pernikahan telah berlangsung 🎉
              </p>
            </div>
          ) : (
            <div className="flex gap-4 select-none">
              {[
                { val: days, lbl: "Hari" },
                { val: hours, lbl: "Jam" },
                { val: minutes, lbl: "Mnt" },
                { val: seconds, lbl: "Det" },
              ].map((item, idx) => (
                <div key={idx} className="border-l border-[var(--brush-stroke)] pl-2 text-left min-w-[2.2rem]">
                  <span className="font-brush-display text-xl text-[var(--brush-ink)] block leading-none">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="font-brush-body text-[8px] uppercase tracking-widest text-[var(--brush-muted)] block mt-1 leading-none font-bold">
                    {item.lbl}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center opacity-30 select-none z-10 flex flex-col items-center gap-0.5">
        <span className="font-brush-body text-[8px] uppercase tracking-[0.2em] text-[var(--brush-muted)]">
          scroll down
        </span>
        <svg className="w-4 h-4 text-[var(--brush-muted)] animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
