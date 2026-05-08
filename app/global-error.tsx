"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical Root Exception captured by GlobalError:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="font-sans antialiased bg-[#F5EFE8] m-0 p-0">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
          {/* Subtle background graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-[#C5A880]/5 pointer-events-none select-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
              <circle cx="50" cy="50" r="45" strokeWidth="0.2" />
              <path d="M50 0 L50 100 M0 50 L100 50" strokeWidth="0.1" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-md w-full bg-white border border-[#C5A880]/30 p-8 md:p-12 shadow-xl relative z-10 text-center"
            style={{ borderRadius: "24px 4px 24px 4px" }}
          >
            {/* Inner Border Frame */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#C5A880]/10 pointer-events-none" style={{ borderRadius: "20px 2px 20px 2px" }} />

            {/* Warning Icon Emblem */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="absolute inset-0 w-full h-full text-[#C5A880]"
              >
                <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" />
              </svg>
              <div className="text-[#C5A880] flex items-center justify-center relative">
                <AlertOctagon size={24} className="stroke-[1.2]" />
              </div>
            </div>

            {/* Error Typography */}
            <span className="font-serif text-xs tracking-[0.3em] text-[#C5A880] uppercase font-bold block mb-2 select-none">
              Fatal Error // Global
            </span>
            <h1 className="font-serif italic text-3xl text-[#4A3E3D] font-medium leading-tight">
              Kesalahan Sistem Utama
            </h1>

            {/* Divider */}
            <div className="flex justify-center my-6 text-[#C5A880]">
              <svg viewBox="0 0 100 10" fill="none" className="w-24 h-4 stroke-current">
                <path d="M10 5 H90" strokeWidth="0.5" />
                <path d="M35 1 Q50 9, 65 1" strokeWidth="0.8" />
                <circle cx="50" cy="5" r="2" fill="currentColor" />
              </svg>
            </div>

            <p className="font-sans text-xs md:text-sm text-[#7A6A68] leading-relaxed mb-8 max-w-xs mx-auto">
              Sistem mendeteksi kegagalan kritis saat memproses aplikasi dasar. Silakan muat ulang atau segarkan peramban Anda untuk memulihkan sesi.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col gap-3 relative z-20">
              <button
                onClick={() => reset()}
                className="w-full bg-[#C5A880] hover:bg-[#B3966E] text-white py-3.5 px-6 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-[1px] select-none"
                style={{ borderRadius: "12px 2px 12px 2px" }}
              >
                <RefreshCw size={14} />
                Segarkan Aplikasi
              </button>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
