"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { GeometricTessellation } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";
import GiftSection from "@/components/shared/GiftSection";

interface Props {
  data: WeddingData;
}

export default function SpiritualGift({ data }: Props) {
  if (!data.giftEnabled) return null;

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#F0EBE0]/25 select-none z-10 text-center flex flex-col items-center">
      {/* Background patterns */}
      <GeometricTessellation size={55} color="#B7882A" opacity={0.04} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-10 relative z-20"
      >
        <SpiritualDivider variant="ornate" color="#B7882A" className="mb-4" />
        <span className="font-spirit-body text-xs tracking-[0.25em] text-[#B7882A] block mb-3 font-bold">
          KOTAK HADIAH DIGITAL
        </span>
        <p className="font-spirit-serif text-xs text-[#7A6E5E] max-w-xs leading-relaxed px-4">
          Bagi Bapak/Ibu/Saudara/i yang berhalangan hadir namun berkenan memberikan tanda kasih syukuran pernikahan kami, tersedia saluran transfer digital berikut:
        </p>
      </motion.div>

      {/* Core Gift Card */}
      <div className="w-full relative z-20 max-w-sm">
        <GiftSection
          data={data}
          groomNickname={data.groomNickname}
          brideNickname={data.brideNickname}
          sectionClassName="w-full flex flex-col items-center"
          cardClassName="bg-[#FDFCFA] border border-[#B7882A]/25 p-5 relative rounded-2xl flex items-center justify-between shadow-sm overflow-hidden"
          labelClassName="block font-spirit-body text-[8px] uppercase tracking-[0.2em] text-[#7A6E5E]"
          valueClassName="block font-spirit-serif font-bold text-sm text-[#1B4332] mt-0.5 tracking-wide select-all"
          tabClassName="font-spirit-body text-[9px] font-bold uppercase tracking-widest text-[#7A6E5E] border-b border-[#B7882A]/20 pb-2.5 flex-1 text-center cursor-pointer transition-colors"
          activeTabClassName="text-[#1B4332] border-[#1B4332] border-b-2"
          buttonClassName="bg-[#1B4332] text-[#FDFCFA] font-spirit-body font-bold text-[10px] uppercase tracking-[0.15em] py-3 px-5 rounded-xl hover:bg-[#2D6A4F] transition-colors cursor-pointer shadow-sm border border-[#B7882A]/30"
          copyButtonClassName="border border-[#B7882A]/25 text-[#B7882A] hover:bg-[#B7882A]/10 rounded-xl bg-[#FDFCFA] shadow-sm font-spirit-body font-bold text-[9px] uppercase tracking-wide"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 w-full max-w-xs"
      >
        <SpiritualDivider variant="ornate" color="#B7882A" className="mt-4" />
      </motion.div>
    </div>
  );
}
