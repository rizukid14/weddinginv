"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";
import LightboxGallery from "@/components/shared/LightboxGallery";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface GalleryProps {
  data: WeddingData;
}

export default function RetroGallery({ data }: GalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  if (!data.galleryPhotos || data.galleryPhotos.length === 0) return null;

  const getGridSpanClass = (idx: number) => {
    // Alternates wide/portrait slots
    const mod = idx % 6;
    if (mod === 0 || mod === 3) return "col-span-2 aspect-[3/2]";
    return "col-span-1 aspect-[4/5]";
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 bg-[var(--retro-warm)] relative z-10 select-none overflow-hidden"
    >
      {/* Halftone Dot grid background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* HEADER SEGMENT */}
      <motion.div variants={fadeUp} className="text-center px-6 flex flex-col items-center mb-8">
        <RetroDivider variant="ornate" className="mb-4" />
        <RetroDivider variant="banner" text="✦ GALERI KAMI ✦" fillColor="var(--retro-teal)" />
        <span className="block h-[1px] w-12 bg-[var(--retro-mustard)] opacity-50 mt-6" />
      </motion.div>

      {/* VINTAGE CARDBOARD PHOTO ALBUM LAYOUT */}
      <div className="grid grid-cols-2 gap-4 px-4 relative z-10 max-w-sm mx-auto">
        {data.galleryPhotos.map((photo, idx) => {
          return (
            <motion.div
              key={`album-slot-${idx}`}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImageIdx(idx)}
              className={`${getGridSpanClass(idx)} bg-white p-2 pb-6 shadow-md border border-[var(--retro-cream)] flex flex-col justify-between cursor-pointer select-none group`}
              style={{ filter: "drop-shadow(2px 3px 0px rgba(31,26,20,0.1))" }}
            >
              {/* Photo Area with Sepia filters */}
              <div className="w-full flex-grow overflow-hidden relative bg-gray-100">
                <img
                  src={photo}
                  alt={`Prewedding ${idx + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none transition-[filter] duration-500 ease-out"
                  style={{ filter: "sepia(15%) saturate(85%) contrast(105%)" }}
                  // Symmetrical hover trick (removes film filter on hovered cardboard)
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "sepia(0%) saturate(100%) contrast(100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "sepia(15%) saturate(85%) contrast(105%)";
                  }}
                />
              </div>

              {/* Decorative printed label indicator */}
              <div className="text-center h-4 flex items-center justify-center mt-3 select-none">
                <span className="font-courier-prime text-[7px] text-[var(--retro-muted)] font-black tracking-[0.4em] uppercase">
                  ✦ ✦ ✦
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeUp} className="text-center mt-12 px-6 flex flex-col items-center">
        <RetroDivider variant="ornate" className="mt-4" />
      </motion.div>

      {/* FULLSCREEN EXCLUSIVE LIGHTBOX GALLERY OVERLAY */}
      {selectedImageIdx !== null && (
        <LightboxGallery
          photos={data.galleryPhotos}
          selectedIndex={selectedImageIdx}
          setSelectedIndex={setSelectedImageIdx}
          theme="brush"
        />
      )}
    </motion.section>
  );
}
