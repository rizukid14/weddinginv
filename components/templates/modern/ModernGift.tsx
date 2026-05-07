"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GiftSection from "@/components/shared/GiftSection";

interface Props {
  data: WeddingData;
}

export default function ModernGift({ data }: Props) {
  if (!data.giftEnabled) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--modern-black)] relative z-10 text-left overflow-hidden flex flex-col items-center"
    >
      {/* Grid lines layout */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-[var(--modern-mid)]/[0.05]" />

      <div className="max-w-sm mx-auto z-10 relative w-full">
        {/* Header */}
        <motion.div variants={fadeUp} className="border-b border-[var(--modern-mid)]/[0.08] pb-4 select-none mb-8">
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="font-modern-display text-2xl text-[var(--modern-white)] font-black uppercase tracking-tight">
              KADO DIGITAL / GIFT
            </h2>
            <Gift size={16} className="text-[var(--modern-accent)]" />
          </div>
          <p className="font-modern-body text-[8px] uppercase tracking-[0.25em] text-[var(--modern-mid)]/50">
            {"// OPTIONAL TRANSMISSION OF WELL-WISHES"}
          </p>
        </motion.div>

        {/* Core Consolidated GiftSection */}
        <div className="w-full relative z-10">
          <GiftSection
            data={data}
            groomNickname={data.groomNickname}
            brideNickname={data.brideNickname}
            sectionClassName="w-full flex flex-col items-center text-white"
            cardClassName="bg-[var(--modern-dark)] p-5 border border-[var(--modern-mid)]/20 relative rounded-none flex items-center justify-between text-left"
            labelClassName="block font-modern-body text-[8px] uppercase tracking-[0.2em] text-[var(--modern-accent)] font-semibold"
            valueClassName="block font-modern-display text-sm font-black text-[var(--modern-white)] mt-0.5 tracking-wider select-all"
            tabClassName="font-modern-body text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--modern-mid)]/60 border-b border-[var(--modern-mid)]/10 pb-2 flex-1 text-center cursor-pointer"
            activeTabClassName="text-[var(--modern-white)] border-[var(--modern-white)] border-b-2"
            buttonClassName="bg-[var(--modern-accent)] hover:opacity-95 text-black text-[10px] font-bold uppercase tracking-[0.15em] py-3.5 px-6 rounded-none transition-all cursor-pointer shadow-sm"
            copyButtonClassName="border border-[var(--modern-mid)]/30 text-[var(--modern-accent)] hover:bg-[var(--modern-accent)]/5 bg-[var(--modern-dark)] rounded-none"
          />
        </div>
      </div>
    </motion.section>
  );
}
