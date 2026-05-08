"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface Props {
  correctPassword?: string;
  onSuccess: () => void;
}

export default function PasswordGate({ correctPassword = "rizki2025", onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0); // cooldown in seconds
  const [shake, setShake] = useState(false);

  // Check for existing cooldown on mount
  useEffect(() => {
    const lockUntil = localStorage.getItem("wedding_gate_locked_until");
    if (lockUntil) {
      const remaining = Math.ceil((Number(lockUntil) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem("wedding_gate_locked_until");
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("wedding_gate_locked_until");
          setAttempts(0);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    if (password.trim() === correctPassword) {
      onSuccess();
    } else {
      setError("Kata sandi salah");
      setShake(true);
      setTimeout(() => setShake(false), 500);

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        const lockedUntil = Date.now() + 60 * 1000; // 60s cooldown
        localStorage.setItem("wedding_gate_locked_until", String(lockedUntil));
        setCooldown(60);
        setError("Terlalu banyak percobaan. Silakan coba lagi dalam 60 detik.");
      } else {
        setPassword("");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-40 backdrop-blur-md bg-floral-ivory/80 flex items-center justify-center p-6"
    >
      <motion.div
        animate={shake ? { x: [0, -10, 10, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm border border-floral-blush shadow-2xl text-center relative"
      >
        {/* Decorative Top Ornament */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-floral-gold opacity-40">
          <svg width="40" height="20" viewBox="0 0 100 50" fill="none">
            <path d="M10 25 Q50 5 90 25 Q50 45 10 25 Z" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="mt-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-floral-cream flex items-center justify-center mx-auto text-floral-gold mb-4 shadow-inner">
            <Lock size={28} />
          </div>
          <h3 className="font-serif text-2xl font-medium text-floral-text">
            Undangan Privat
          </h3>
          <p className="font-sans text-xs text-floral-muted mt-1.5 px-4 leading-relaxed">
            Silakan masukkan kata sandi yang telah diberikan untuk melihat detail undangan pernikahan kami.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cooldown > 0}
            className="w-full border-b border-floral-blush bg-transparent py-3 text-sm text-center tracking-widest text-floral-text focus:border-floral-gold focus:outline-none transition-colors placeholder:text-floral-muted/50"
            placeholder={cooldown > 0 ? "Terkunci" : "Kata Sandi"}
            autoFocus
          />

          <button
            type="submit"
            disabled={cooldown > 0}
            className="w-full bg-floral-gold hover:bg-floral-gold-deep disabled:bg-floral-muted/40 text-white font-medium py-3 rounded tracking-widest uppercase text-xs transition-colors shadow-md hover:shadow-lg"
          >
            {cooldown > 0 ? `Terkunci (${cooldown}s)` : "Buka Undangan"}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-sans text-xs mt-4 leading-normal"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
