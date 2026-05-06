"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "../ui/FloralDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function GallerySection({ data }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = data.galleryPhotos?.length || 0;

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % total);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Touch handlers for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const thresh = 50; // swipe threshold
    if (diff > thresh) {
      handleNext(); // swipe left -> next
    } else if (diff < -thresh) {
      handlePrev(); // swipe right -> prev
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

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
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C2424]/95 backdrop-blur-sm flex flex-col justify-between"
          >
            {/* Lightbox Header */}
            <div className="flex justify-between items-center px-6 py-4 z-10">
              <span className="font-sans text-xs text-white/60 tracking-wider">
                {selectedIndex + 1} / {total}
              </span>
              <button
                onClick={() => setSelectedIndex(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Image Viewport */}
            <div
              className="flex-grow flex items-center justify-center px-4 relative touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-[65vh] max-w-sm"
                >
                  <Image
                    src={data.galleryPhotos[selectedIndex]}
                    alt={`Prewedding ${selectedIndex + 1}`}
                    fill
                    sizes="(max-w-md) 100vw, 430px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Desktop arrows (hidden on touch screens ideally, but styled elegantly) */}
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all shadow"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all shadow"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox responsive pagination dots */}
            <div className="flex gap-1.5 justify-center pb-8 pt-4 z-10">
              {data.galleryPhotos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setSelectedIndex(dotIdx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    selectedIndex === dotIdx ? "bg-white scale-125" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
