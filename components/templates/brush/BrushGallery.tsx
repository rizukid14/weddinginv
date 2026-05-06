"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import LightboxGallery from "@/components/shared/LightboxGallery";
import BrushDivider from "./BrushDivider";

interface Props {
  data: WeddingData;
}

export default function BrushGallery({ data }: Props) {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Generate random stable rotation angles based on index to prevent mismatch errors during hydration
  const getRotationAngle = (index: number) => {
    const rotations = [-1.5, 1.2, -0.8, 1.5, -1.2, 0.7, -1.4, 1.1];
    return rotations[index % rotations.length];
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-[var(--brush-paper)] relative z-10 text-center"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center">
        <div className="flex justify-center select-none mb-1">
          <Camera size={18} className="text-[var(--brush-stroke)]" />
        </div>
        <h2 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight">
          Galeri Kebahagiaan
        </h2>
        <p className="font-brush-body italic text-xs text-[var(--brush-muted)] mt-1.5 leading-relaxed max-w-[220px] mx-auto select-none">
          Momen berharga kebersamaan kami yang terekam dalam lensa
        </p>
        <div className="flex justify-center mt-4">
          <BrushDivider variant="stroke" className="mx-auto" />
        </div>
      </motion.div>

      {/* Grid of Polaroid Frames */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-x-4 gap-y-7 mt-12 px-2">
        {data.galleryPhotos && data.galleryPhotos.map((imgUrl, idx) => {
          const rotation = getRotationAngle(idx);
          return (
            <motion.div
              key={idx}
              variants={fadeUp}
              onClick={() => setActivePhotoIdx(idx)}
              className="bg-white p-2.5 pb-7 border border-[var(--brush-ink)]/10 shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all relative flex flex-col group select-none"
              style={{
                transform: `rotate(${rotation}deg)`,
                borderRadius: 0,
              }}
            >
              {/* Photo */}
              <div className="w-full aspect-[1/1] bg-[var(--brush-warm)] relative overflow-hidden">
                <Image
                  src={imgUrl}
                  alt={`Galeri ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-w-sm) 50vw, 200px"
                />
              </div>

              {/* Faint handwriting caption simulations */}
              <div className="mt-2.5 font-brush-accent text-center text-xs text-[var(--brush-muted)] italic select-none">
                moment {idx + 1}
              </div>

              {/* Little scotch tape at random corners */}
              {idx % 3 === 0 && (
                <div className="absolute top-[-5px] left-1/3 w-10 h-3 bg-[var(--brush-warm)]/50 border-l border-r border-dashed border-[var(--brush-ink)]/10 rotate-[-15deg] opacity-70" />
              )}
              {idx % 3 === 1 && (
                <div className="absolute top-[-5px] right-1/4 w-8 h-3.5 bg-[var(--brush-sage)]/30 border-l border-r border-dashed border-[var(--brush-ink)]/10 rotate-[12deg] opacity-70" />
              )}
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
          theme="brush"
        />
      )}
    </motion.section>
  );
}

