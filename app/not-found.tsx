"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5EFE8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      {/* Premium subtle watermark leaf decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 text-[#C5A880]/10 pointer-events-none rotate-45 select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
          <path d="M0,50 Q25,25 50,50 T100,50" strokeWidth="0.5" />
          <path d="M50,0 Q60,30 50,50 T50,100" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" strokeWidth="0.3" strokeDasharray="2 2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 text-[#C5A880]/10 pointer-events-none -rotate-45 select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
          <path d="M0,50 Q25,25 50,50 T100,50" strokeWidth="0.5" />
          <path d="M50,0 Q60,30 50,50 T50,100" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" strokeWidth="0.3" strokeDasharray="2 2" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full bg-white border border-[#C5A880]/30 p-8 md:p-12 shadow-xl relative z-10 text-center"
        style={{ borderRadius: "24px 4px 24px 4px" }}
      >
        {/* Top Ornate Border Lines */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#C5A880]/10 pointer-events-none" style={{ borderRadius: "20px 2px 20px 2px" }} />

        {/* Botanical Icon/Emblem */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="absolute inset-0 w-full h-full text-[#C5A880]"
          >
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" />
            {/* Elegant stylized leaf branches */}
            <path d="M100 25 Q115 50, 100 75 Q85 50, 100 25 Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <div className="text-[#C5A880] flex items-center justify-center relative">
            <Heart size={24} className="stroke-[1.2] fill-[#C5A880]/5" />
          </div>
        </div>

        {/* 404 Big Elegant Typography */}
        <span className="font-serif text-xs tracking-[0.3em] text-[#C5A880] uppercase font-bold block mb-2 select-none">
          Error 404 // Not Found
        </span>
        <h1 className="font-serif italic text-3xl md:text-4xl text-[#4A3E3D] font-medium leading-tight">
          Halaman Tidak Ditemukan
        </h1>

        {/* Subtle Separator Branch */}
        <div className="flex justify-center my-6 text-[#C5A880]">
          <svg viewBox="0 0 100 10" fill="none" className="w-24 h-4 stroke-current">
            <path d="M10 5 H90" strokeWidth="0.5" />
            <path d="M35 1 Q50 9, 65 1" strokeWidth="0.8" />
            <circle cx="50" cy="5" r="2" fill="currentColor" />
          </svg>
        </div>

        <p className="font-sans text-xs md:text-sm text-[#7A6A68] leading-relaxed mb-8 max-w-xs mx-auto">
          Maaf, halaman undangan digital yang Anda kunjungi tidak aktif, salah mengetik tautan, atau sudah dihapus oleh sistem kami.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col gap-3 relative z-20">
          <Link
            href="/rizki-amira"
            className="w-full bg-[#C5A880] hover:bg-[#B3966E] text-white py-3.5 px-6 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-[1px] select-none"
            style={{ borderRadius: "12px 2px 12px 2px" }}
          >
            <Compass size={14} />
            Kunjungi Contoh Undangan
          </Link>
          
          <Link
            href="/dashboard"
            className="w-full border border-[#C5A880]/40 text-[#4A3E3D] hover:bg-[#C5A880]/10 py-3 px-6 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none"
            style={{ borderRadius: "12px 2px 12px 2px" }}
          >
            <ArrowLeft size={13} />
            Kembali ke Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
