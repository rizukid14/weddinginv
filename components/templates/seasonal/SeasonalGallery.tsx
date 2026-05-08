"use client";
import React, { useState } from "react";
import { WeddingData } from "@/types/wedding";
import { motion, AnimatePresence } from "framer-motion";
import WatercolorBackground from "@/components/seasonal/WatercolorBackground";

export default function SeasonalGallery({ data }: { data: WeddingData }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!data.galleryPhotos || data.galleryPhotos.length === 0) return null;

  return (
    <section className="py-20 px-6 relative bg-[#F5EAD8] z-0">
      <WatercolorBackground color="#EAC4B0" opacity={0.1} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="font-['Satisfy'] text-4xl text-[#6B3D2E]">
          Momen Bahagia
        </h2>
      </motion.div>

      <div className="columns-2 gap-3 space-y-3 relative z-10">
        {data.galleryPhotos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="break-inside-avoid"
            onClick={() => setSelectedImg(photo)}
          >
            <img 
              src={photo} 
              alt={`Gallery ${i + 1}`} 
              className="w-full rounded-lg shadow-md border-2 border-white/50 cursor-pointer hover:opacity-90 transition-opacity saturate-[0.9] sepia-[0.1]"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Zoomed"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
