"use client";
import React from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import GiftSection from "@/components/shared/GiftSection";

export default function SeasonalGift({ data }: { data: WeddingData }) {
  if (!data.giftEnabled) return null;

  return (
    <section className="py-20 px-6 relative bg-[#F5EAD8] z-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 max-w-[320px] mx-auto"
      >
        <h2 className="font-['Playfair_Display'] italic text-sm text-[#C8856A] tracking-[0.2em] uppercase mb-4">
          Wedding Gift
        </h2>
        <p className="font-sans text-xs text-[#9A7B6A] leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
        </p>
      </motion.div>

      <div className="max-w-[320px] mx-auto">
        {/* We use the shared GiftSection but the seasonal design uses terracotta buttons */}
        <GiftSection 
          data={data}
          groomNickname={data.groomNickname}
          brideNickname={data.brideNickname}
        />
      </div>
    </section>
  );
}
