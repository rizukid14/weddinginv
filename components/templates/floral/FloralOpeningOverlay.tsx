"use client";

import React from "react";
import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";

interface Props {
  data: WeddingData;
  guestName: string | null;
  onOpen: () => void;
}

export default function OpeningOverlay({ data, guestName, onOpen }: Props) {
  const formattedDate = new Date(data.resepsiDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: "easeOut" } }}
      className="fixed inset-0 z-50 bg-floral-ivory flex flex-col items-center justify-between py-16 px-6 text-center overflow-hidden"
    >
      {/* Corner Ornaments */}
      <div className="absolute top-0 left-0 w-24 h-24 text-floral-gold opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q30,10 50,0 Q20,40 0,50 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q15,40 0,80" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q40,15 80,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 text-floral-gold opacity-30 pointer-events-none rotate-90">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q30,10 50,0 Q20,40 0,50 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q15,40 0,80" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q40,15 80,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 text-floral-gold opacity-30 pointer-events-none -rotate-90">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q30,10 50,0 Q20,40 0,50 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q15,40 0,80" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q40,15 80,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 text-floral-gold opacity-30 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q30,10 50,0 Q20,40 0,50 Z" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0,0 Q15,40 0,80" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,0 Q40,15 80,0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Floating Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className={`absolute float-${num} text-floral-rose opacity-45`}
            style={{
              top: `${num * 14}%`,
              left: `${(num * 19) % 80 + 10}%`,
              transform: `scale(${0.6 + (num % 3) * 0.2})`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2 C15,8 20,10 12,22 C4,10 9,8 12,2 Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* TOP */}
      <div className="z-10 mt-6">
        <p className="font-sans text-xs tracking-widest uppercase text-floral-muted">
          Undangan Pernikahan
        </p>
      </div>

      {/* CENTER */}
      <div className="z-10 flex flex-col items-center justify-center max-w-sm px-4">
        {/* Wreath circle enclosing the couple names */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-4">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="absolute inset-0 w-full h-full text-floral-gold animate-[spin-vinyl_40s_linear_infinite]"
          >
            <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            {/* Elegant wreath leaves around */}
            <path
              d="M100 12 C148 12, 188 52, 188 100 C188 148, 148 188, 100 188 C52 188, 12 148, 12 100 C12 52, 52 12, 100 12"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {/* Custom vector leaves along the curve */}
            <path d="M100 12 Q105 5, 110 12" fill="currentColor" />
            <path d="M148 24 Q155 18, 153 26" fill="currentColor" />
            <path d="M180 56 Q188 54, 182 62" fill="currentColor" />
            <path d="M188 100 Q195 105, 188 110" fill="currentColor" />
            <path d="M164 150 Q169 157, 161 157" fill="currentColor" />
            <path d="M120 182 Q120 190, 113 183" fill="currentColor" />
            <path d="M80 182 Q80 190, 87 183" fill="currentColor" />
            <path d="M36 150 Q31 157, 39 157" fill="currentColor" />
            <path d="M12 100 Q5 105, 12 110" fill="currentColor" />
            <path d="M20 56 Q12 54, 18 62" fill="currentColor" />
          </svg>

          {/* Couple names */}
          <div className="flex flex-col items-center justify-center p-6 select-none">
            <span className="font-display text-4xl text-floral-gold leading-normal">
              {data.brideNickname}
            </span>
            <span className="font-serif italic text-lg text-floral-muted my-1">&</span>
            <span className="font-display text-4xl text-floral-gold leading-normal">
              {data.groomNickname}
            </span>
          </div>
        </div>

        <p className="font-serif italic text-lg text-floral-muted leading-relaxed">
          {formattedDate}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="z-10 flex flex-col items-center w-full max-w-xs mt-6">
        {guestName && (
          <div className="mb-6 w-full animate-fade-in">
            <FloralDivider variant="simple" className="my-2" />
            <p className="font-sans text-[10px] uppercase tracking-widest text-floral-muted mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <h4 className="font-serif text-xl font-medium text-floral-text">
              {guestName}
            </h4>
          </div>
        )}

        {/* Pulsating CTA button */}
        <button
          onClick={onOpen}
          className="pulse-cta flex items-center justify-center gap-2 border border-floral-gold bg-transparent text-floral-gold-deep hover:bg-floral-gold hover:text-white transition-all duration-300 px-10 py-3.5 text-xs tracking-widest uppercase font-medium rounded shadow-sm w-full"
        >
          <MailOpen size={14} />
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
