"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import RSVPFeed from "@/components/shared/RSVPFeed";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function ModernRSVP({ data, slug, guestName }: Props) {
  const [name, setName] = useState(guestName || "");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "mungkin" | "">("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("PLEASE ENTER YOUR FULL NAME (MIN 2 CHARACTERS)");
      return;
    }
    if (!attendance) {
      setError("PLEASE SELECT AN ATTENDANCE STATUS");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        guestName: name.trim(),
        attendance,
        guestCount: attendance === "hadir" ? guestCount : 0,
        message: message.trim(),
      };

      const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      let isMockedServer = true;
      let newId = `local-${Date.now()}`;

      if (isFirebaseConfigured) {
        try {
          const response = await fetch(`/app/../${slug}/rsvp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Gagal mengirim konfirmasi");
          }

          isMockedServer = !!result.mocked;
          if (result.id) {
            newId = result.id;
          }
        } catch (fetchErr) {
          console.warn("API request failed, falling back to local emulation", fetchErr);
          isMockedServer = true;
        }
      }

      if (isMockedServer) {
        const key = `rsvp_wishes_${slug}`;
        const stored = localStorage.getItem(key);
        let currentList = stored ? JSON.parse(stored) : [];
        const newEntry = {
          id: newId,
          weddingSlug: slug,
          guestName: payload.guestName,
          attendance: payload.attendance,
          guestCount: payload.guestCount,
          message: payload.message,
          createdAt: new Date().toISOString(),
        };

        const updated = [newEntry, ...currentList];
        localStorage.setItem(key, JSON.stringify(updated));
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "CONNECTION LOST. PLEASE RETRY.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-[var(--modern-off)] text-black relative z-10 text-center"
    >
      {/* Grid lines layout */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-black/[0.04]" />

      {/* Header */}
      <motion.div variants={fadeUp} className="text-left border-b border-black/10 pb-4 z-10 relative">
        <div className="flex justify-between items-baseline mb-2 select-none">
          <h2 className="font-modern-display text-2xl text-black font-black uppercase tracking-tight">
            RSVP / CHECK-IN
          </h2>
          <MessageSquare size={16} className="text-[var(--modern-accent)]" />
        </div>
        <p className="font-modern-body text-[8px] uppercase tracking-[0.25em] text-black/40">
          {"// ATTENDANCE SUBMISSION GATE"}
        </p>
      </motion.div>

      {/* RSVP Form container */}
      <div className="max-w-sm mx-auto mt-10 z-10 relative">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="rsvp-form"
              onSubmit={handleFormSubmit}
              className="bg-white border border-black p-6 text-left shadow-none flex flex-col gap-5"
              style={{ borderRadius: 0 }}
            >
              {/* Name field */}
              <div>
                <label className="block font-modern-body text-[9px] uppercase tracking-widest text-black/50 font-bold mb-1.5">
                  FULL NAME //
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik nama lengkap Anda"
                  className="w-full border border-black/20 bg-transparent py-2.5 px-3 text-xs text-black focus:border-[var(--modern-accent)] focus:outline-none transition-colors font-modern-body font-semibold"
                  required
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Attendance field */}
              <div>
                <label className="block font-modern-body text-[9px] uppercase tracking-widest text-black/50 font-bold mb-2">
                  CONFIRM STATUS //
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "hadir", text: "WILL ATTEND GRACEFULLY" },
                    { val: "mungkin", text: "TENTATIVE / MAYBE" },
                    { val: "tidak_hadir", text: "APOLOGIES / UNABLE" },
                  ].map((option) => (
                    <button
                      key={option.val}
                      type="button"
                      onClick={() => setAttendance(option.val as any)}
                      className={`w-full border py-3 px-4 text-xs text-left transition-all duration-300 flex items-center justify-between font-modern-body font-bold ${
                        attendance === option.val
                          ? "bg-black border-black text-white"
                          : "border-black/10 text-black/60 hover:border-black"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <span>{option.text}</span>
                      {attendance === option.val && <span className="w-2 h-2 rounded-full bg-[var(--modern-accent)]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count stepper */}
              <AnimatePresence>
                {attendance === "hadir" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block font-modern-body text-[9px] uppercase tracking-widest text-black/50 font-bold mb-2">
                      GUEST COUNT //
                    </label>
                    <div className="flex items-center gap-4 justify-center bg-[var(--modern-off)] border border-black/10 py-2 max-w-[150px] mx-auto">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 border border-black/20 flex items-center justify-center font-bold text-black hover:border-[var(--modern-accent)] disabled:opacity-30 disabled:hover:border-none bg-white transition-all select-none font-modern-body text-xs"
                        style={{ borderRadius: 0 }}
                      >
                        &minus;
                      </button>
                      <span className="font-modern-display text-sm font-black text-black min-w-[1.5rem] text-center select-none">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                        disabled={guestCount >= 5}
                        className="w-8 h-8 border border-black/20 flex items-center justify-center font-bold text-black hover:border-[var(--modern-accent)] disabled:opacity-30 disabled:hover:border-none bg-white transition-all select-none font-modern-body text-xs"
                        style={{ borderRadius: 0 }}
                      >
                        &#43;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message field */}
              <div>
                <label className="block font-modern-body text-[9px] uppercase tracking-widest text-black/50 font-bold mb-1.5">
                  BLESSINGS & INK //
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kirim ucapan dan doa tulus untuk mempelai..."
                  className="w-full border border-black/20 bg-transparent py-2.5 px-3 text-xs text-black focus:border-[var(--modern-accent)] focus:outline-none transition-colors resize-none font-modern-body"
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--modern-accent)] hover:opacity-90 text-black py-3.5 text-xs font-black tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 mt-2 disabled:bg-black/35 disabled:text-white/60 font-modern-body"
                style={{ borderRadius: 0 }}
              >
                {loading ? "TRANSMITTING..." : "SUBMIT CONFIRMATION"}
              </button>

              {error && (
                <p className="text-[var(--modern-accent)] font-modern-body text-[8px] tracking-wider uppercase mt-2 text-center leading-normal">
                  {"// "}{error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="bg-white border border-black p-8 text-center shadow-none flex flex-col items-center"
              style={{ borderRadius: 0 }}
            >
              <div className="w-12 h-12 bg-black text-[var(--modern-accent)] flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h3 className="font-modern-display text-xl font-black text-black leading-tight uppercase">
                SUBMISSION RECEIVED //
              </h3>
              <p className="font-modern-body text-[10px] text-black/60 leading-relaxed mt-3 px-4 font-semibold uppercase">
                Apologies or attendance logged successfully. Thank you for your consideration, {name}!
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[var(--modern-accent)] hover:opacity-80 text-[8px] font-modern-body tracking-widest uppercase font-black underline mt-6 underline-offset-4"
              >
                LOG ANOTHER RESPONSE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* REAL-TIME WISHES WALL FEED */}
      <div className="max-w-sm mx-auto mt-20 text-left z-10 relative">
        <div className="flex items-center gap-2 border-b border-black/10 pb-3 mb-6 select-none">
          <span className="font-modern-body text-[10px] uppercase tracking-widest text-black/50 font-bold">
            TRANSMITTED WISHES WALL
          </span>
        </div>

        <RSVPFeed
          slug={slug}
          cardClassName="bg-white border border-black p-4 shadow-none flex gap-3.5 items-start relative mb-2"
          avatarClassName="w-10 h-10 bg-black flex-shrink-0 flex items-center justify-center text-white font-bold select-none font-modern-display text-sm"
          nameClassName="font-modern-body text-xs font-black text-black uppercase tracking-wide"
          messageClassName="font-modern-body text-[11px] text-black/70 mt-1.5 leading-relaxed font-semibold lowercase"
          timeClassName="font-modern-body text-[8px] text-black/40 mt-2 block font-bold"
          emptyStateClassName="bg-white border border-black p-6 text-center select-none animate-pulse"
          badgeHadirClass="bg-black text-[var(--modern-accent)] text-[8px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider"
          badgeMungkinClass="border border-black text-black text-[8px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider"
          badgeAbsenClass="bg-black/10 text-black/50 text-[8px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider"
        />
      </div>
    </motion.section>
  );
}
