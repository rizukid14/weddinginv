"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";
import GiftSection from "@/components/shared/GiftSection";
import { fadeUp } from "@/lib/animations";

interface GiftProps {
  data: WeddingData;
}

export default function RetroGift({ data }: GiftProps) {
  if (!data.giftEnabled) return null;

  return (
    <section className="bg-[var(--retro-warm)] py-20 px-6 relative overflow-hidden select-none text-center flex flex-col items-center z-10">
      {/* Halftone Dot background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* HEADER SECTION */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="flex flex-col items-center relative z-10 mb-10 text-center"
      >
        <RetroDivider variant="ornate" className="mb-4" />
        <RetroDivider variant="banner" text="✦ HADIAH DIGITAL ✦" fillColor="var(--retro-teal)" />
        <p className="font-serif italic text-sm text-[var(--retro-brown)] max-w-xs mx-auto mt-4 leading-relaxed font-semibold">
          Bagi Bapak/Ibu/Saudara/i yang berkenan memberikan tanda kasih untuk kami, tersedia saluran dompet elektronik &amp; rekening perbankan berikut:
        </p>
        <RetroDivider variant="simple" className="mt-4" />
      </motion.div>

      {/* CORE GIFT LOGIC ENCAPSULATED IN SHARED COMPONENT */}
      <div className="w-full relative z-10">
        <GiftSection
          data={data}
          groomNickname={data.groomNickname}
          brideNickname={data.brideNickname}
          sectionClassName="w-full flex flex-col items-center"
          cardClassName="bg-[var(--retro-cream)] border-2 border-double border-[var(--retro-mustard)]/60 p-5 relative rounded-none flex items-center justify-between"
          labelClassName="block font-courier-prime text-[8px] font-black uppercase tracking-[0.25em] text-[var(--retro-muted)]"
          valueClassName="block font-courier-prime text-sm font-black text-[var(--retro-ink)] mt-0.5 tracking-wide select-all"
          tabClassName="font-courier-prime text-[10px] font-black uppercase tracking-widest text-[var(--retro-muted)] border-b border-[var(--retro-mustard)]/30 pb-2 flex-1 text-center cursor-pointer"
          activeTabClassName="text-[var(--retro-terra)] border-[var(--retro-terra)] border-b-2 font-black"
          buttonClassName="bg-[var(--retro-terra)] text-[var(--retro-cream)] font-retro-display text-[9px] font-black uppercase tracking-[0.2em] py-3.5 px-6 hover:bg-[var(--retro-brown)] transition-colors cursor-pointer shadow-sm rounded-none"
          copyButtonClassName="border border-[var(--retro-mustard)]/60 text-[var(--retro-terra)] hover:bg-[var(--retro-mustard)]/10 rounded-none bg-[var(--retro-cream)] shadow-sm"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center mt-12 relative z-10"
      >
        <RetroDivider variant="ornate" className="mt-4" />
      </motion.div>
    </section>
  );
}
