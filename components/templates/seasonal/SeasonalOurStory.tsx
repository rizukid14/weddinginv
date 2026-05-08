"use client";
import React, { useState } from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";

export default function SeasonalOurStory({ data }: { data: WeddingData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const storyText = data.ourStory || "";
  
  const shouldTruncate = storyText.length > 280;
  const displayText = !isExpanded && shouldTruncate 
    ? storyText.substring(0, 280) + "..." 
    : storyText;

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#C8856A] text-[#FDF6EE] z-0">
      <WatercolorBackground color="#6B3D2E" opacity={0.15} />

      {/* Floral Decorative Assets */}
      <motion.img
        src="/assets/floral/png/vecteezy_watercolor-flower_25256286.png"
        alt=""
        aria-hidden="true"
        animate={{ rotate: [-2, 2, -2], y: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -left-16 w-64 opacity-20 pointer-events-none mix-blend-color-burn"
      />
      <motion.img
        src="/assets/floral/png/vecteezy_ai-generated-watercolor-floral-flower-design-watercolor_36556522.png"
        alt=""
        aria-hidden="true"
        animate={{ rotate: [2, -2, 2], y: [5, -5, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-24 -right-16 w-72 opacity-20 pointer-events-none mix-blend-color-burn"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[320px] mx-auto text-center relative z-10"
      >
        <h2 className="font-['Satisfy'] text-4xl mb-8 text-[#FDF6EE]">
          Our Story
        </h2>

        <motion.div layout className="bg-[#8B4A35]/30 backdrop-blur-sm p-6 rounded-2xl border border-[#FDF6EE]/20 shadow-inner">
          <motion.p layout className="font-sans text-sm leading-relaxed text-[#FDF6EE]/90 mb-4 whitespace-pre-wrap">
            {displayText}
          </motion.p>
          
          {shouldTruncate && (
            <motion.button
              layout
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold uppercase tracking-widest text-[#EAC4B0] hover:text-white transition-colors"
            >
              {isExpanded ? "Tutup" : "Baca Selengkapnya"}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
