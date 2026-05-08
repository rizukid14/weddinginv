"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";
import GiftSection from "@/components/shared/GiftSection";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function FloralGift({ data }: Props) {
  if (!data.giftEnabled) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-floral-cream relative z-10 text-center overflow-hidden flex flex-col items-center"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center mb-8">
        <FloralDivider variant="ornate" />
        <h2 className="font-serif text-3xl text-floral-text font-medium mt-2">
          Hadiah Digital
        </h2>
        <p className="font-sans text-xs text-floral-muted max-w-xs mx-auto mt-2.5 leading-relaxed">
          Bagi bapak/ibu/saudara/i yang ingin memberikan tanda kasih untuk kedua mempelai, kami menyediakan dompet digital dan transfer perbankan berikut:
        </p>
      </motion.div>

      {/* CORE consolidated GiftSection component */}
      <div className="w-full relative z-10">
        <GiftSection
          data={data}
          groomNickname={data.groomNickname}
          brideNickname={data.brideNickname}
          sectionClassName="w-full flex flex-col items-center"
          cardClassName="bg-white border border-floral-blush rounded-xl p-5 w-full max-w-sm flex items-center justify-between shadow-sm text-left"
          labelClassName="block font-sans text-[10px] uppercase tracking-widest text-floral-muted"
          valueClassName="block font-mono text-sm text-floral-text font-semibold tracking-wider mt-0.5 select-all"
          tabClassName="font-sans text-xs font-semibold tracking-wide text-floral-muted border-b border-floral-blush pb-2 flex-1 text-center cursor-pointer"
          activeTabClassName="text-floral-gold-deep border-floral-gold-deep border-b-2"
          buttonClassName="bg-floral-gold-deep hover:bg-floral-gold text-white text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors cursor-pointer shadow-sm"
          copyButtonClassName="border border-floral-blush text-floral-muted hover:border-floral-gold hover:text-floral-gold-deep bg-white rounded-lg"
        />
      </div>

      <motion.div variants={fadeUp} className="mt-12 text-center">
        <FloralDivider variant="simple" />
      </motion.div>
    </motion.section>
  );
}
