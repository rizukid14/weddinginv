"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { EightPointedStar, GeometricTessellation } from "./SpiritualGeometric";

interface Props {
  correctPassword: string;
  onSuccess: () => void;
}

export default function SpiritualPasswordGate({ correctPassword, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#1B4332] text-[#FDFCFA] flex flex-col items-center justify-center p-6 select-none">
      {/* Tessellation Background Grid */}
      <GeometricTessellation size={55} color="#B7882A" opacity={0.06} />

      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-[#1B4332]/50 border border-[#B7882A]/30 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm text-center flex flex-col items-center"
      >
        <EightPointedStar size={64} color="#B7882A" animated={true} className="mb-6" />

        {/* Bismillah Arabic Text in Amiri font */}
        <p className="font-spirit-arabic text-xl text-[#B7882A] mb-2 tracking-wide leading-none select-none" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <h2 className="font-spirit-serif font-bold text-2xl text-[#FDFCFA] mb-2 tracking-wide">
          Baitul Makmur
        </h2>
        <p className="font-sans text-xs text-[#F0EBE0]/60 max-w-xs mb-8 tracking-wider">
          Silakan masukkan kata sandi untuk melihat kabar bahagia dari kami.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="bismillah"
              className="w-full bg-[#F0EBE0]/10 border border-[#B7882A]/30 rounded-xl py-3 px-10 text-center font-sans text-sm tracking-widest text-[#FDFCFA] focus:outline-none focus:border-[#B7882A] focus:ring-1 focus:ring-[#B7882A] transition-all placeholder:text-[#F0EBE0]/30"
            />
            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B7882A]/60" />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B7882A] text-[#1B4332] font-spirit-body font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-xl border border-[#D4A843]/50 hover:bg-[#D4A843] transition-colors duration-300"
          >
            Buka Undangan
          </button>
        </form>

        {error && (
          <p className="text-red-400 font-sans text-[10px] mt-4 font-semibold tracking-wider uppercase">
            Kata sandi salah. Coba kembali.
          </p>
        )}
      </motion.div>
    </div>
  );
}
