"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import BrushDivider from "./BrushDivider";
import GiftSection from "@/components/shared/GiftSection";

interface Props {
  data: WeddingData;
}

export default function BrushGift({ data }: Props) {
  if (!data.giftEnabled) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--brush-paper)] relative z-10 text-left flex flex-col items-center"
    >
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-8">
          <div className="flex justify-center select-none mb-1">
            <Gift size={18} className="text-[var(--brush-stroke)]" />
          </div>
          <h2 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight">
            Kirim Kado Digital
          </h2>
          <p className="font-brush-body italic text-xs text-[var(--brush-muted)] mt-1.5 leading-relaxed px-4 mx-auto select-none">
            Bagi keluarga dan kerabat yang ingin mengirimkan kado atau ucapan kasih secara digital
          </p>
          <div className="flex justify-center mt-4">
            <BrushDivider variant="stroke" className="mx-auto" />
          </div>
        </motion.div>

        {/* Core Consolidated GiftSection */}
        <div className="w-full relative z-10">
          <GiftSection
            data={data}
            groomNickname={data.groomNickname}
            brideNickname={data.brideNickname}
            sectionClassName="w-full flex flex-col items-center"
            cardClassName="bg-white p-5 border-2 border-[var(--brush-ink)]/15 relative rounded-none flex items-center justify-between text-left"
            labelClassName="block font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold"
            valueClassName="block font-brush-heading text-sm font-bold text-[var(--brush-ink)] mt-0.5 tracking-wider select-all"
            tabClassName="font-brush-body text-[11px] font-bold uppercase tracking-widest text-[var(--brush-muted)] border-b border-[var(--brush-ink)]/10 pb-2 flex-1 text-center cursor-pointer"
            activeTabClassName="text-[var(--brush-ink)] border-[var(--brush-ink)] border-b-2"
            buttonClassName="bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-none transition-colors cursor-pointer shadow-sm"
            copyButtonClassName="border-2 border-[var(--brush-ink)]/15 text-[var(--brush-ink)] hover:border-[var(--brush-stroke)] bg-white rounded-none"
          />
        </div>
      </div>
    </motion.section>
  );
}
