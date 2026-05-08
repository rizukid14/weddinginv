"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { CornerOrnament, ParangPattern } from "./CultureBatikSVG";
import CultureDivider from "./CultureDivider";
import LightboxGallery from "@/components/shared/LightboxGallery";

interface Props {
  data: WeddingData;
}

export default function CultureGallery({ data }: Props) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  // Fallback photos if galleryPhotos is empty
  const photos = data.galleryPhotos && data.galleryPhotos.length > 0
    ? data.galleryPhotos
    : [
        "https://placehold.co/800x533/f9f3e8/6b3d2e?text=Galeri+1",
        "https://placehold.co/400x500/efe4cc/c9973a?text=Galeri+2",
        "https://placehold.co/400x500/f9f3e8/2c3e6b?text=Galeri+3",
        "https://placehold.co/800x533/efe4cc/5a6b47?text=Galeri+4",
        "https://placehold.co/400x500/f9f3e8/6b3d2e?text=Galeri+5",
        "https://placehold.co/400x500/efe4cc/c9973a?text=Galeri+6",
      ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Staggered back.out elastic overshoot reveals for gallery photos
  const photoVariants: Variants = {
    hidden: { scale: 0.82, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // Custom elastic overshoot (matches back.out)
      },
    },
  };

  // Helper aspect ratio alternating classes
  const getAspectClass = (idx: number) => {
    const i = idx % 6;
    if (i === 0 || i === 3) return "col-span-2 aspect-[4/3]";
    if (i === 1 || i === 4) return "aspect-[4/5]";
    return "aspect-[3/4]";
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#EFE4CC] select-none z-10">
      {/* 1. Background Patterns */}
      <ParangPattern size={50} color="#6B3D2E" opacity={0.03} />

      {/* 2. Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-12 relative z-20"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mb-4" />
        <span className="font-culture-number text-xs tracking-[0.25em] text-[#C9973A] block mb-2">
          KASANAH DHOMPANG FOTO
        </span>
        <span className="font-culture-subheading italic text-xs text-[#8A7055] uppercase tracking-widest block">
          Galeri Kebahagiaan Kami
        </span>
      </motion.div>

      {/* 3. Photos grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 gap-3.5 px-2 relative z-20"
      >
        {photos.map((photoUrl, idx) => (
          <motion.div
            key={`culture-gal-${idx}`}
            variants={photoVariants}
            whileHover={{ scale: 1.04 }}
            onClick={() => setSelectedPhotoIdx(idx)}
            className={`relative overflow-hidden rounded-sm cursor-pointer shadow-md border-[3px] border-[#C9973A]/20 bg-[#F9F3E8] p-1 ${getAspectClass(
              idx
            )}`}
          >
            {/* Corner ornaments on photo borders */}
            <CornerOrnament position="tl" size={16} color="#C9973A" opacity={0.5} />
            <CornerOrnament position="br" size={16} color="#C9973A" opacity={0.5} />

            <div className="w-full h-full overflow-hidden rounded-[1px] relative">
              <img
                src={photoUrl}
                alt={`Galeri ${idx + 1}`}
                className="w-full h-full object-cover filter saturate-[85%] sepia-[6%] hover:saturate-[100%] hover:sepia-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 4. Active Lightbox Gallery Overlay */}
      {selectedPhotoIdx !== null && (
        <LightboxGallery
          photos={photos}
          selectedIndex={selectedPhotoIdx}
          setSelectedIndex={setSelectedPhotoIdx}
        />
      )}
    </div>
  );
}
