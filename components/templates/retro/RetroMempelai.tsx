"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface MempelaiProps {
  data: WeddingData;
}

export default function RetroMempelai({ data }: MempelaiProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-[var(--retro-warm)] relative z-10 text-center overflow-hidden select-none"
    >
      {/* Halftone Dot background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Star Flourishes inside the Section */}
      <div className="absolute top-6 left-6 text-[var(--retro-terra)] opacity-30 text-[9px]">✦</div>
      <div className="absolute top-6 right-6 text-[var(--retro-terra)] opacity-30 text-[9px]">✦</div>

      {/* HEADER SECTION */}
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <RetroDivider variant="banner" text="✦ MEMPELAI ✦" fillColor="var(--retro-terra)" />
        
        {data.openingQuote && (
          <div className="mt-6 max-w-xs mx-auto">
            <p className="font-serif italic text-sm text-[var(--retro-brown)] leading-relaxed font-semibold">
              &ldquo;{data.openingQuote}&rdquo;
            </p>
            {data.openingQuoteSource && (
              <span className="block font-courier-prime text-[9px] font-bold text-[var(--retro-muted)] uppercase tracking-wider mt-2">
                — {data.openingQuoteSource} —
              </span>
            )}
          </div>
        )}

        <RetroDivider variant="ornate" className="mt-6 mb-12" />
      </motion.div>

      {/* THE BRIDE & GROOM PROFILE STACK */}
      <div className="flex flex-col gap-16 mt-8 relative z-10 max-w-sm mx-auto">
        
        {/* MEMPELAI WANITA (BRIDE) */}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          {/* Symmetrical Frame for Prewedding Portrait */}
          <div className="relative w-44 h-52 bg-[var(--retro-cream)]">
            {/* Double outline retro boundaries */}
            <div className="absolute inset-[-6px] border border-[var(--retro-mustard)]" />
            <div className="absolute inset-[-2px] border border-[var(--retro-mustard)]" />

            {/* Micro geometric corner star symbols */}
            <div className="absolute -top-1.5 -left-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -top-1.5 -right-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -bottom-1.5 -left-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -bottom-1.5 -right-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>

            <div className="w-full h-full overflow-hidden shadow">
              <img
                src={data.bridePhoto || "https://placehold.co/400x500/edd9a3/6b3a2a?text=Bride"}
                alt={data.brideNickname}
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{ filter: "sepia(12%) saturate(90%) contrast(105%)" }}
              />
            </div>
          </div>

          {/* Details segment */}
          <div className="mt-8 flex flex-col items-center">
            <RetroDivider variant="banner" text="MEMPELAI WANITA" fillColor="var(--retro-olive)" className="my-1 scale-90" />
            
            <h3 className="font-retro-display text-3xl font-black text-[var(--retro-brown)] uppercase tracking-tight mt-3">
              {data.brideNickname}
            </h3>
            
            <span className="font-serif italic text-xs font-semibold text-[var(--retro-muted)] mt-1 px-4">
              {data.brideName}
            </span>

            <RetroDivider variant="simple" className="my-2" />

            <div className="mt-2 text-center">
              <span className="font-courier-prime text-[8px] font-black tracking-widest text-[var(--retro-muted)] uppercase">
                PUTRI DARI KELUARGA:
              </span>
              <span className="block font-serif text-xs text-[var(--retro-brown)] font-bold mt-1">
                {data.brideFatherName}
              </span>
              <span className="block font-courier-prime text-[8px] text-[var(--retro-muted)] italic font-semibold my-0.5">
                &amp;
              </span>
              <span className="block font-serif text-xs text-[var(--retro-brown)] font-bold">
                {data.brideMotherName}
              </span>
            </div>
          </div>
        </motion.div>

        {/* BRIDE & GROOM CENTRAL CONNECTOR */}
        <motion.div variants={fadeUp} className="relative flex items-center justify-center my-4 h-16 select-none">
          {/* Small radial burst backdrop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 100 100" className="w-20 h-20 fill-[var(--retro-mustard)]">
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={i}
                  d="M50,50 L100,47 L100,53 Z"
                  transform={`rotate(${i * 22.5} 50 50)`}
                />
              ))}
            </svg>
          </div>
          <span className="font-retro-display text-4xl font-black italic text-[var(--retro-terra)] z-10 relative">
            &amp;
          </span>
        </motion.div>

        {/* MEMPELAI PRIA (GROOM) */}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          {/* Symmetrical Portrait Slot */}
          <div className="relative w-44 h-52 bg-[var(--retro-cream)]">
            <div className="absolute inset-[-6px] border border-[var(--retro-mustard)]" />
            <div className="absolute inset-[-2px] border border-[var(--retro-mustard)]" />

            <div className="absolute -top-1.5 -left-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -top-1.5 -right-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -bottom-1.5 -left-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>
            <div className="absolute -bottom-1.5 -right-1.5 text-[var(--retro-mustard)] text-[6px] font-bold">✦</div>

            <div className="w-full h-full overflow-hidden shadow">
              <img
                src={data.groomPhoto || "https://placehold.co/400x500/edd9a3/6b3a2a?text=Groom"}
                alt={data.groomNickname}
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{ filter: "sepia(12%) saturate(90%) contrast(105%)" }}
              />
            </div>
          </div>

          {/* Details segment */}
          <div className="mt-8 flex flex-col items-center">
            <RetroDivider variant="banner" text="MEMPELAI PRIA" fillColor="var(--retro-olive)" className="my-1 scale-90" />
            
            <h3 className="font-retro-display text-3xl font-black text-[var(--retro-brown)] uppercase tracking-tight mt-3">
              {data.groomNickname}
            </h3>
            
            <span className="font-serif italic text-xs font-semibold text-[var(--retro-muted)] mt-1 px-4">
              {data.groomName}
            </span>

            <RetroDivider variant="simple" className="my-2" />

            <div className="mt-2 text-center">
              <span className="font-courier-prime text-[8px] font-black tracking-widest text-[var(--retro-muted)] uppercase">
                PUTRA DARI KELUARGA:
              </span>
              <span className="block font-serif text-xs text-[var(--retro-brown)] font-bold mt-1">
                {data.groomFatherName}
              </span>
              <span className="block font-courier-prime text-[8px] text-[var(--retro-muted)] italic font-semibold my-0.5">
                &amp;
              </span>
              <span className="block font-serif text-xs text-[var(--retro-brown)] font-bold">
                {data.groomMotherName}
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
