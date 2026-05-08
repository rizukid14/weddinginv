"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { GeometricTessellation } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";
import LightboxGallery from "@/components/shared/LightboxGallery";

interface Props {
  data: WeddingData;
}

export default function SpiritualGallery({ data }: Props) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  const photos = data.galleryPhotos && data.galleryPhotos.length > 0
    ? data.galleryPhotos
    : [
        "https://placehold.co/800x533/fdfcfa/1b4332?text=Galeri+1",
        "https://placehold.co/400x500/f0ebe0/b7882a?text=Galeri+2",
        "https://placehold.co/400x500/fdfcfa/1b4332?text=Galeri+3",
        "https://placehold.co/800x533/f0ebe0/b7882a?text=Galeri+4",
        "https://placehold.co/400x500/fdfcfa/1b4332?text=Galeri+5",
        "https://placehold.co/400x500/f0ebe0/b7882a?text=Galeri+6",
      ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const photoVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const getAspectClass = (idx: number) => {
    const i = idx % 6;
    if (i === 0 || i === 3) return "col-span-2 aspect-[4/3]";
    if (i === 1 || i === 4) return "aspect-[4/5]";
    return "aspect-[3/4]";
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#FDFCFA] select-none z-10">
      {/* Background Tessellation Grid */}
      <GeometricTessellation size={60} color="#B7882A" opacity={0.03} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-12 relative z-20"
      >
        <SpiritualDivider variant="ornate" color="#B7882A" className="mb-4" />
        <span className="font-spirit-body text-xs tracking-[0.25em] text-[#B7882A] block mb-2 font-bold">
          DOKUMENTASI MAWADDAH
        </span>
        <span className="font-spirit-serif italic text-xs text-[#7A6E5E] block">
          Potret Kenangan Kebahagiaan Kami
        </span>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 gap-3.5 px-2 relative z-20"
      >
        {photos.map((photoUrl, idx) => (
          <motion.div
            key={`spirit-gal-${idx}`}
            variants={photoVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedPhotoIdx(idx)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer shadow-sm border border-[#B7882A]/20 bg-[#F0EBE0]/20 p-1 ${getAspectClass(
              idx
            )}`}
          >
            <div className="w-full h-full overflow-hidden rounded-xl relative">
              <img
                src={photoUrl}
                alt={`Potret Kenangan ${idx + 1}`}
                className="w-full h-full object-cover filter saturate-[85%] sepia-[5%] hover:saturate-[100%] hover:sepia-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Active Lightbox Overlay */}
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
