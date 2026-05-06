"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Standard practice to log the error to an external error reporting service
    console.error("Application Runtime Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5EFE8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      {/* Background elegant circles of safety */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] text-[#C5A880]/5 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
          <circle cx="50" cy="50" r="48" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="40" strokeWidth="0.4" strokeDasharray="1 3" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            <AlertTriangle size={24} className="stroke-[1.2]" />
          </div>
        </div>

        {/* Error Typography */}
        <span className="font-serif text-xs tracking-[0.3em] text-[#C5A880] uppercase font-bold block mb-2 select-none">
          Sistem Gangguan // Error
        </span>
        <h1 className="font-serif italic text-3xl text-[#4A3E3D] font-medium leading-tight">
          Terjadi Kesalahan Teknis
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
          Maaf, terjadi kesalahan tak terduga saat memuat data undangan digital ini. Silakan coba segarkan/muat ulang halaman beberapa saat lagi.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col gap-3 relative z-20">
          <button
            onClick={() => reset()}
            className="w-full bg-[#C5A880] hover:bg-[#B3966E] text-white py-3.5 px-6 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-[1px] select-none"
            style={{ borderRadius: "12px 2px 12px 2px" }}
          >
            <RefreshCw size={14} className="animate-spin-slow" />
            Muat Ulang Halaman
          </button>
          
          <a
            href="/"
            className="w-full border border-[#C5A880]/40 text-[#4A3E3D] hover:bg-[#C5A880]/10 py-3 px-6 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none"
            style={{ borderRadius: "12px 2px 12px 2px" }}
          >
            <Home size={13} />
            Kembali ke Beranda
          </a>
        </div>
      </motion.div>
    </div>
  );
}
