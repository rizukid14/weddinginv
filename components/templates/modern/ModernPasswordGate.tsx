"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface Props {
  correctPassword?: string;
  onSuccess: () => void;
}

export default function ModernPasswordGate({ correctPassword = "farhan2025", onSuccess }: Props) {
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
      setError("PASSWORD INCORRECT");
      setShake(true);
      setTimeout(() => setShake(false), 500);

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        const lockedUntil = Date.now() + 60 * 1000;
        localStorage.setItem("wedding_gate_locked_until", String(lockedUntil));
        setCooldown(60);
        setError("LOCKOUT ACTIVE. RETRY IN 60s.");
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
      className="fixed inset-0 z-40 bg-[var(--modern-black)] flex items-center justify-center p-6"
    >
      <motion.div
        animate={shake ? { x: [0, -8, 8, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="bg-[var(--modern-dark)] p-8 w-full max-w-xs border border-[var(--modern-mid)]/25 text-left relative"
        style={{ borderRadius: 0 }}
      >
        {/* Accent dot */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--modern-accent)]" />

        <div className="mb-8">
          <span className="font-modern-body text-[9px] uppercase tracking-[0.2em] text-[var(--modern-accent)] block mb-1">
            SECURE ACCESS REQUIRED
          </span>
          <h3 className="font-modern-display text-2xl text-[var(--modern-white)] font-extrabold uppercase tracking-tight">
            PRIVATE GATE
          </h3>
          <p className="font-modern-body text-[10px] text-[var(--modern-mid)] mt-4 leading-relaxed tracking-wide">
            Please type the invitation password given by the couple to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cooldown > 0}
            className="w-full bg-[var(--modern-black)] border border-[var(--modern-mid)]/25 py-3 px-4 text-xs text-left tracking-widest text-[var(--modern-white)] focus:border-[var(--modern-accent)] focus:outline-none transition-colors placeholder:text-[var(--modern-mid)]/40 font-modern-body"
            placeholder={cooldown > 0 ? "COOLDOWN LOCK" : "ENTER PASSWORD"}
            autoFocus
            style={{ borderRadius: 0 }}
          />

          <button
            type="submit"
            disabled={cooldown > 0}
            className="w-full bg-[var(--modern-accent)] hover:opacity-90 disabled:bg-[var(--modern-mid)]/30 text-[var(--modern-white)] font-bold py-3.5 tracking-[0.15em] uppercase text-[10px] transition-colors font-modern-body"
            style={{ borderRadius: 0 }}
          >
            {cooldown > 0 ? `COOLDOWN (${cooldown}s)` : "PROCEED GATE"}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[var(--modern-accent)] font-modern-body text-[9px] uppercase tracking-wider mt-4"
            >
              {"// "}{error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
