"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  photos: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number | null) => void;
  theme?: "floral" | "brush" | "modern";
}

export default function LightboxGallery({
  photos,
  selectedIndex,
  setSelectedIndex,
  theme = "floral",
}: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = photos.length;

  const handleNext = () => {
    setSelectedIndex((selectedIndex + 1) % total);
  };

  const handlePrev = () => {
    setSelectedIndex((selectedIndex - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Theme overrides
  const getThemeBg = () => {
    switch (theme) {
      case "brush":
        return "bg-[#1A1410]/95";
      case "modern":
        return "bg-[#0A0A09]/98";
      case "floral":
      default:
        return "bg-[#2C2424]/92 backdrop-blur-sm";
    }
  };

  const getNavColor = () => {
    switch (theme) {
      case "brush":
        return "text-[#F7F3EE]/80 hover:text-[#F7F3EE] hover:bg-[#F7F3EE]/10";
      case "modern":
        return "text-[#C8C8C4]/80 hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/10";
      case "floral":
      default:
        return "text-white/80 hover:text-white hover:bg-white/10";
    }
  };

  const getDotsColor = (isCurrent: boolean) => {
    if (isCurrent) {
      switch (theme) {
        case "brush":
          return "bg-[#B8923A] scale-125";
        case "modern":
          return "bg-[#FF4D00] scale-125";
        case "floral":
      default:
          return "bg-white scale-125";
      }
    } else {
      switch (theme) {
        case "brush":
          return "bg-[#F7F3EE]/30";
        case "modern":
          return "bg-[#C8C8C4]/30";
        case "floral":
        default:
          return "bg-white/30";
      }
    }
  };

  const getCounterStyle = () => {
    switch (theme) {
      case "brush":
        return "font-sans text-xs text-[#F7F3EE]/60 tracking-wider";
      case "modern":
        return "font-mono text-xs text-[#C8C8C4]/60 tracking-widest";
      case "floral":
      default:
        return "font-sans text-xs text-white/60 tracking-wider";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${getThemeBg()} flex flex-col justify-between`}
      >
        {/* Lightbox Header */}
        <div className="flex justify-between items-center px-6 py-4 z-10">
          <span className={getCounterStyle()}>
            {selectedIndex + 1} / {total}
          </span>
          <button
            onClick={() => setSelectedIndex(null)}
            className={`p-1 rounded-full transition-colors ${getNavColor()}`}
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
                src={photos[selectedIndex]}
                alt={`Photo ${selectedIndex + 1}`}
                fill
                sizes="(max-w-md) 100vw, 430px"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Desktop arrows (hidden on touch screens, styled elegantly) */}
          <button
            onClick={handlePrev}
            className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all shadow bg-black/25 ${getNavColor()}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center transition-all shadow bg-black/25 ${getNavColor()}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Lightbox responsive pagination dots */}
        <div className="flex gap-1.5 justify-center pb-8 pt-4 z-10">
          {photos.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setSelectedIndex(dotIdx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${getDotsColor(
                selectedIndex === dotIdx
              )}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
