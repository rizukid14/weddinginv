"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RetroDivider from "./RetroDivider";

interface PasswordGateProps {
  correctPassword?: string;
  onSuccess: () => void;
}

export default function RetroPasswordGate({ correctPassword = "2025", onSuccess }: PasswordGateProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPasswordInput("");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-[var(--retro-cream)]/90 z-50 flex items-center justify-center p-6 select-none">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-[var(--retro-cream)] p-8 text-center border-4 border-double border-[var(--retro-terra)] relative shadow-xl"
        style={{ filter: "drop-shadow(4px 6px 0px rgba(31,26,20,0.1))" }}
      >
        {/* Inside Corner Flourishes */}
        <div className="absolute top-2 left-2 text-[var(--retro-mustard)] text-[9px] font-black">✦</div>
        <div className="absolute top-2 right-2 text-[var(--retro-mustard)] text-[9px] font-black">✦</div>
        <div className="absolute bottom-2 left-2 text-[var(--retro-mustard)] text-[9px] font-black">✦</div>
        <div className="absolute bottom-2 right-2 text-[var(--retro-mustard)] text-[9px] font-black">✦</div>

        <span className="block font-courier-prime text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--retro-muted)] mb-2">
          ✦ UNDANGAN PRIVAT ✦
        </span>

        <RetroDivider variant="simple" className="my-2" />

        <h3 className="font-serif italic text-lg text-[var(--retro-brown)] font-bold mb-6">
          Masukkan Kata Sandi
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setError(false);
              setPasswordInput(e.target.value);
            }}
            placeholder="••••"
            className="font-courier-prime text-xl text-[var(--retro-ink)] text-center tracking-[0.4em] border-b-2 border-[var(--retro-mustard)] bg-transparent focus:outline-none py-2 w-full transition-colors focus:border-[var(--retro-terra)]"
          />

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-[var(--retro-terra)] text-[var(--retro-cream)] w-full py-3.5 mt-4 cursor-pointer select-none font-retro-display text-xs font-black tracking-[0.15em] uppercase hover:bg-[var(--retro-brown)] transition-colors shadow"
          >
            MASUK UNDANGAN
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ x: -10 }}
              animate={{ x: [10, -10, 8, -8, 4, -4, 0] }}
              exit={{ opacity: 0 }}
              className="font-courier-prime text-[10px] text-[var(--retro-terra)] font-bold mt-4"
            >
              Kata sandi salah. Silakan coba kembali!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
