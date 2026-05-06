"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import RSVPFeed from "@/components/shared/RSVPFeed";
import BrushDivider from "./BrushDivider";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function BrushRSVP({ data, slug, guestName }: Props) {
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
      setError("Silakan masukkan nama lengkap Anda (minimal 2 karakter)");
      return;
    }
    if (!attendance) {
      setError("Silakan pilih konfirmasi kehadiran Anda");
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
      setError(err.message || "Terjadi kesalahan koneksi. Silakan coba lagi.");
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
      className="py-20 px-6 bg-[var(--brush-warm)] relative z-10 text-center"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center">
        <h2 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight">
          Konfirmasi Kehadiran
        </h2>
        <p className="font-brush-body italic text-xs text-[var(--brush-muted)] mt-1.5 leading-relaxed max-w-[220px] mx-auto select-none">
          Kehadiran dan doa restu Anda sangat berarti bagi kami
        </p>
        <div className="flex justify-center mt-4">
          <BrushDivider variant="stroke" className="mx-auto" />
        </div>
      </motion.div>

      {/* RSVP Content Card */}
      <div className="max-w-sm mx-auto mt-10">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="rsvp-form"
              onSubmit={handleFormSubmit}
              className="bg-white border-2 border-[var(--brush-ink)]/15 p-6 text-left shadow-md flex flex-col gap-5 relative"
              style={{ borderRadius: 0 }}
            >
              {/* Corner tape decorations */}
              <div className="absolute top-[-5px] left-1/4 w-12 h-3 bg-[var(--brush-paper)] border-l border-r border-dashed border-[var(--brush-ink)]/15 rotate-[-12deg]" />

              {/* Name field */}
              <div>
                <label className="block font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik nama lengkap Anda"
                  className="w-full border-b border-[var(--brush-ink)]/20 bg-transparent py-2 text-xs text-[var(--brush-ink)] focus:border-[var(--brush-stroke)] focus:outline-none transition-colors font-brush-body"
                  required
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Attendance field */}
              <div>
                <label className="block font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "hadir", text: "Hadir dengan Senang Hati" },
                    { val: "mungkin", text: "Mungkin Hadir" },
                    { val: "tidak_hadir", text: "Mohon Maaf, Berhalangan" },
                  ].map((option) => (
                    <button
                      key={option.val}
                      type="button"
                      onClick={() => setAttendance(option.val as any)}
                      className={`w-full border-2 py-3 px-4 text-xs text-left transition-all duration-300 flex items-center justify-between font-brush-body font-bold ${
                        attendance === option.val
                          ? "bg-[var(--brush-ink)] border-[var(--brush-ink)] text-[var(--brush-paper)]"
                          : "border-[var(--brush-ink)]/15 text-[var(--brush-muted)] hover:border-[var(--brush-stroke)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <span>{option.text}</span>
                      {attendance === option.val && <Check size={14} />}
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
                    <label className="block font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold mb-2">
                      Jumlah Tamu
                    </label>
                    <div className="flex items-center gap-4 justify-center bg-[var(--brush-paper)] border border-[var(--brush-ink)]/10 py-2 max-w-[150px] mx-auto">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 border border-[var(--brush-ink)]/20 flex items-center justify-center font-bold text-[var(--brush-ink)] hover:border-[var(--brush-stroke)] disabled:opacity-30 disabled:hover:border-none bg-white transition-colors select-none font-brush-body text-sm"
                        style={{ borderRadius: 0 }}
                      >
                        &minus;
                      </button>
                      <span className="font-brush-display text-lg font-bold text-[var(--brush-ink)] min-w-[1.5rem] text-center select-none">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                        disabled={guestCount >= 5}
                        className="w-8 h-8 border border-[var(--brush-ink)]/20 flex items-center justify-center font-bold text-[var(--brush-ink)] hover:border-[var(--brush-stroke)] disabled:opacity-30 disabled:hover:border-none bg-white transition-colors select-none font-brush-body text-sm"
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
                <label className="block font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold mb-1.5">
                  Ucapan & Doa (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis ucapan tulus Anda disini..."
                  className="w-full border-b border-[var(--brush-ink)]/20 bg-transparent py-2 text-xs text-[var(--brush-ink)] focus:border-[var(--brush-stroke)] focus:outline-none transition-colors resize-none font-brush-body"
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] py-3.5 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mt-2 disabled:bg-[var(--brush-muted)]/40 font-brush-body"
                style={{ borderRadius: 0 }}
              >
                {loading ? "Mengirim..." : (
                  <>
                    <Send size={12} />
                    Kirim Konfirmasi
                  </>
                )}
              </button>

              {error && (
                <p className="text-[var(--brush-accent)] font-brush-body text-xs mt-2 text-center leading-normal">
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="bg-white border-2 border-[var(--brush-ink)]/15 p-8 text-center shadow-md flex flex-col items-center relative"
              style={{ borderRadius: 0 }}
            >
              <div className="w-14 h-14 bg-[var(--brush-paper)] border border-[var(--brush-ink)]/10 text-[var(--brush-sage)] flex items-center justify-center mb-4 rounded-full">
                <Check size={28} />
              </div>
              <h3 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal leading-tight">
                Terima Kasih, {name}!
              </h3>
              <p className="font-brush-body text-xs text-[var(--brush-muted)] leading-relaxed mt-2.5 px-4">
                Konfirmasi Anda berhasil dikirim. Sampai jumpa di hari bahagia pernikahan kami! 💌
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[var(--brush-stroke)] hover:opacity-80 text-[10px] font-brush-body tracking-widest uppercase font-bold underline mt-6 underline-offset-4"
              >
                Kirim Konfirmasi Baru
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* REAL-TIME WISHES WALL FEED */}
      <div className="max-w-sm mx-auto mt-16 text-left">
        <div className="flex items-center gap-2 border-b border-[var(--brush-ink)]/10 pb-3 mb-6 select-none">
          <MessageSquare size={14} className="text-[var(--brush-stroke)]" />
          <span className="font-brush-body text-[10px] uppercase tracking-widest text-[var(--brush-stroke)] font-bold">
            Wishes & Prayers Wall
          </span>
        </div>

        <RSVPFeed
          slug={slug}
          cardClassName="bg-white border border-[var(--brush-ink)]/10 p-4 shadow-sm flex gap-3.5 items-start relative mb-2"
          avatarClassName="w-10 h-10 bg-[var(--brush-warm)] border border-[var(--brush-ink)]/10 flex-shrink-0 flex items-center justify-center text-[var(--brush-stroke)] font-semibold select-none font-brush-display text-lg"
          nameClassName="font-brush-heading text-xs font-bold text-[var(--brush-ink)]"
          messageClassName="font-brush-body text-[11px] text-[var(--brush-ink-soft)] italic leading-relaxed mt-1.5"
          timeClassName="font-brush-body text-[8px] text-[var(--brush-muted)]/60 mt-1 block font-medium"
          emptyStateClassName="bg-white border border-[var(--brush-ink)]/10 p-6 text-center shadow-sm select-none animate-pulse"
          badgeHadirClass="bg-[#E2F0D9] text-[#385723] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none font-brush-body"
          badgeMungkinClass="bg-[#FFF2CC] text-[#7F6000] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none font-brush-body"
          badgeAbsenClass="bg-[#FCE4D6] text-[#C65911] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none font-brush-body"
        />
      </div>

      <div className="mt-12 text-center">
        <BrushDivider variant="cross" className="mx-auto" />
      </div>
    </motion.section>
  );
}
