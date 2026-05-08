"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface Props {
  correctPassword?: string;
  onSuccess: () => void;
}

export default function BrushPasswordGate({ correctPassword = "dimas2025", onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [shake, setShake] = useState(false);

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
        const lockedUntil = Date.now() + 60 * 1000;
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
      className="fixed inset-0 z-40 backdrop-blur-md bg-[var(--brush-paper)]/85 flex items-center justify-center p-6"
    >
      <motion.div
        animate={shake ? { x: [0, -10, 10, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 w-full max-w-sm border-2 border-[var(--brush-ink)]/70 shadow-2xl text-center relative"
        style={{ borderRadius: 0 }}
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-[var(--brush-warm)] border border-[var(--brush-ink)]/20 flex items-center justify-center mx-auto text-[var(--brush-stroke)] mb-4 rounded-full">
            <Lock size={26} />
          </div>
          <h3 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal">
            Akses Terbatas
          </h3>
          <p className="font-brush-body text-xs text-[var(--brush-muted)] mt-2 px-4 leading-relaxed">
            Kata sandi diperlukan untuk melihat dokumen undangan ini. Silakan hubungi kedua pengantin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cooldown > 0}
            className="w-full border-b border-[var(--brush-ink)]/30 bg-transparent py-3 text-sm text-center tracking-widest text-[var(--brush-ink)] focus:border-[var(--brush-stroke)] focus:outline-none transition-colors placeholder:text-[var(--brush-muted)]/50 font-brush-body"
            placeholder={cooldown > 0 ? "Terkunci" : "Kata Sandi"}
            autoFocus
            style={{ borderRadius: 0 }}
          />

          <button
            type="submit"
            disabled={cooldown > 0}
            className="w-full bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] disabled:bg-[var(--brush-muted)]/40 text-[var(--brush-paper)] font-bold py-3.5 tracking-widest uppercase text-xs transition-colors font-brush-body"
            style={{ borderRadius: 0 }}
          >
            {cooldown > 0 ? `Terkunci (${cooldown}s)` : "Masuk Undangan"}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[var(--brush-accent)] font-brush-body text-xs mt-4 leading-normal"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
