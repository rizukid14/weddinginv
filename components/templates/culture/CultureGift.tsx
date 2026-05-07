"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { KawungPattern, MegaMendungPattern } from "./CultureBatikSVG";
import CultureDivider from "./CultureDivider";
import GiftSection from "@/components/shared/GiftSection";

interface Props {
  data: WeddingData;
}

export default function CultureGift({ data }: Props) {
  if (!data.giftEnabled) return null;

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#EFE4CC] select-none z-10 text-center flex flex-col items-center">
      {/* Background patterns */}
      <MegaMendungPattern color="#C9973A" opacity={0.04} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-10 relative z-20"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mb-4" />
        <span className="font-culture-number text-xs tracking-[0.25em] text-[#C9973A] block mb-3">
          KASANAH TANDA KASIH
        </span>
        <p className="font-culture-subheading italic text-xs text-[#8A7055] max-w-xs leading-relaxed px-4">
          Bagi Bapak/Ibu/Saudara/i yang berkenan memberikan tanda kasih untuk kami, tersedia saluran dompet elektronik &amp; rekening perbankan berikut:
        </p>
      </motion.div>

      {/* Gift Section wrapper */}
      <div className="w-full relative z-20 max-w-sm">
        <GiftSection
          data={data}
          groomNickname={data.groomNickname}
          brideNickname={data.brideNickname}
          sectionClassName="w-full flex flex-col items-center"
          cardClassName="bg-[#F9F3E8] border border-[#C9973A]/30 p-5 relative rounded-2xl flex items-center justify-between shadow-md overflow-hidden"
          labelClassName="block font-culture-body text-[8px] uppercase tracking-[0.2em] text-[#8A7055]"
          valueClassName="block font-culture-number text-sm font-bold text-[#6B3D2E] mt-0.5 tracking-wide select-all"
          tabClassName="font-culture-body text-[9px] font-bold uppercase tracking-widest text-[#8A7055] border-b border-[#C9973A]/25 pb-2.5 flex-1 text-center cursor-pointer transition-colors"
          activeTabClassName="text-[#6B3D2E] border-[#6B3D2E] border-b-2"
          buttonClassName="bg-[#6B3D2E] text-[#F9F3E8] font-culture-body font-bold text-[10px] uppercase tracking-[0.15em] py-3 px-5 rounded-xl hover:bg-[#2C3E6B] transition-colors cursor-pointer shadow-sm border border-[#C9973A]/40"
          copyButtonClassName="border border-[#C9973A]/35 text-[#8B6520] hover:bg-[#C9973A]/10 rounded-xl bg-[#F9F3E8] shadow-sm font-culture-body font-bold text-[9px] uppercase tracking-wide"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 w-full max-w-xs"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mt-4" />
      </motion.div>
    </div>
  );
}
