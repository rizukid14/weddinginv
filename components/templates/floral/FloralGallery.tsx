"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";
import LightboxGallery from "@/components/shared/LightboxGallery";

interface Props {
  data: WeddingData;
}

export default function FloralGallery({ data }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const total = data.galleryPhotos?.length || 0;

  if (total === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-floral-cream relative z-10"
    >
      {/* Editorial Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none z-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Header */}
      <motion.div variants={fadeUp} className="text-center z-10 relative">
        <FloralDivider variant="branch" />
        <h2 className="font-serif text-3xl text-floral-text font-medium mt-2">
          Galeri Kebahagiaan
        </h2>
        <p className="font-sans text-xs text-floral-muted max-w-xs mx-auto mt-2">
          Momen-momen indah perjalanan cinta kami yang abadi.
        </p>
      </motion.div>

      {/* Masonry Editorial Grid */}
      <div className="columns-2 gap-3 mt-10 z-10 relative">
        {data.galleryPhotos.map((photo, index) => {
          // Editorial alternating aspect ratios
          let aspectClass = "aspect-[3/4]";
          if (index % 3 === 1) aspectClass = "aspect-square";
          if (index % 3 === 2) aspectClass = "aspect-[4/5]";

          return (
            <motion.div
              key={index}
              variants={fadeUp}
              onClick={() => setSelectedIndex(index)}
              className={`break-inside-avoid mb-3 rounded-xl overflow-hidden relative group cursor-pointer shadow-sm border border-floral-blush/30 bg-white`}
            >
              <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                <Image
                  src={photo}
                  alt={`Prewedding ${index + 1}`}
                  fill
                  sizes="(max-w-md) 50vw, 200px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Visual click overlay indicator */}
                <div className="absolute inset-0 bg-[#2C2424]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <Maximize2 size={20} className="text-white drop-shadow-sm" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeUp} className="mt-8 text-center z-10 relative">
        <FloralDivider variant="simple" />
      </motion.div>

      {/* Touch-swipe premium Lightbox */}
      {selectedIndex !== null && (
        <LightboxGallery
          photos={data.galleryPhotos}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          theme="floral"
        />
      )}
    </motion.section>
  );
}

