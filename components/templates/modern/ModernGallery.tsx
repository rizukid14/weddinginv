"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import LightboxGallery from "@/components/shared/LightboxGallery";

interface Props {
  data: WeddingData;
}

export default function ModernGallery({ data }: Props) {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Layout styling variables: we can set asymmetric widths to create a premium magazine collage grid!
  // e.g. some are full width, some are half width
  const getColSpanClass = (index: number) => {
    const layout = ["col-span-2", "col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1"];
    return layout[index % layout.length];
  };

  const getAspectRatioClass = (index: number) => {
    const ratios = ["aspect-[16/10]", "aspect-[1/1.2]", "aspect-[1/1.2]", "aspect-[16/10]", "aspect-[1/1]", "aspect-[1/1]"];
    return ratios[index % ratios.length];
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--modern-black)] relative z-10 overflow-hidden text-center"
    >
      {/* Blueprint background grid */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-[var(--modern-mid)]/[0.05]" />

      {/* Header */}
      <motion.div variants={fadeUp} className="text-left border-b border-[var(--modern-mid)]/[0.08] pb-4 z-10 relative">
        <div className="flex justify-between items-baseline mb-2 select-none">
          <h2 className="font-modern-display text-2xl text-[var(--modern-white)] font-black uppercase tracking-tight">
            GALLERY / SHOTS
          </h2>
          <Camera size={16} className="text-[var(--modern-accent)]" />
        </div>
        <p className="font-modern-body text-[8px] uppercase tracking-[0.25em] text-[var(--modern-mid)]/50">
          {"// SNAPSHOT CHRONOLOGY OF CONVERGENCE"}
        </p>
      </motion.div>

      {/* Editorial Magazine Collage Grid */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mt-12 z-10 relative">
        {data.galleryPhotos && data.galleryPhotos.map((imgUrl, idx) => {
          const span = getColSpanClass(idx);
          const ratio = getAspectRatioClass(idx);
          return (
            <motion.div
              key={idx}
              variants={fadeUp}
              onClick={() => setActivePhotoIdx(idx)}
              className={`relative bg-[var(--modern-dark)] border border-[var(--modern-mid)]/[0.15] cursor-crosshair overflow-hidden group select-none ${span} ${ratio}`}
              style={{ borderRadius: 0 }}
            >
              <Image
                src={imgUrl}
                alt={`Photo frame ${idx + 1}`}
                fill
                className="object-cover filter grayscale contrast-110 group-hover:filter-none group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-w-sm) 100vw, 400px"
              />

              {/* Serial Number on overlay tag */}
              <div className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 text-[7px] text-[var(--modern-white)] font-modern-body tracking-wider">
                FRM_{idx + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Trigger overlay */}
      {activePhotoIdx !== null && data.galleryPhotos && (
        <LightboxGallery
          photos={data.galleryPhotos}
          selectedIndex={activePhotoIdx}
          setSelectedIndex={setActivePhotoIdx}
          theme="modern"
        />
      )}
    </motion.section>
  );
}

