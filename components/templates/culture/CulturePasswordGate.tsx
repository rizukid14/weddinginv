"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { KawungOrnament, KawungPattern } from "./CultureBatikSVG";

interface Props {
  correctPassword: string;
  onSuccess: () => void;
}

export default function CulturePasswordGate({ correctPassword, onSuccess }: Props) {
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
    <div className="fixed inset-0 z-[100] bg-[#1A1208] text-[#F9F3E8] flex flex-col items-center justify-center p-6 select-none">
      {/* Decorative Javanese background patterns */}
      <KawungPattern size={48} color="#C9973A" opacity={0.08} />

      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-[#6B3D2E]/20 border border-[#C9973A]/30 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm text-center flex flex-col items-center"
      >
        <KawungOrnament size={80} color="#C9973A" animated={true} className="mb-6" />

        <h2 className="font-culture-display italic text-3xl text-[#C9973A] mb-2 tracking-wide leading-tight">
          Sasono Pinining
        </h2>
        <p className="font-sans text-xs text-[#EFE4CC]/60 max-w-xs mb-8 tracking-wider">
          Silakan masukkan kata sandi Anda untuk membuka lembar kabar bahagia ini.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kata Sandi"
              className="w-full bg-[#EFE4CC]/10 border border-[#C9973A]/40 rounded-xl py-3 px-10 text-center font-sans text-sm tracking-widest text-[#F9F3E8] focus:outline-none focus:border-[#C9973A] focus:ring-1 focus:ring-[#C9973A] transition-all placeholder:text-[#EFE4CC]/30"
            />
            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9973A]/60" />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6B3D2E] text-[#F9F3E8] font-culture-body font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-xl border border-[#C9973A]/50 hover:bg-[#2C3E6B] transition-colors duration-300"
          >
            Buka Undangan
          </button>
        </form>

        {error && (
          <p className="text-red-400 font-sans text-[10px] mt-4 font-semibold tracking-wider uppercase">
            Kata sandi tidak tepat. Coba kembali.
          </p>
        )}
      </motion.div>
    </div>
  );
}
