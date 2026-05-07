"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import RSVPFeed from "@/components/shared/RSVPFeed";
import RetroDivider from "./RetroDivider";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function RetroRSVP({ data, slug, guestName }: Props) {
  const [name, setName] = useState(guestName || "");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "mungkin" | "">("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      className="py-20 px-6 bg-[var(--retro-cream)] relative z-10 text-center overflow-hidden"
    >
      {/* Halftone Dot background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* HEADER SECTION */}
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <RetroDivider variant="ornate" className="mb-4" />
        <RetroDivider variant="banner" text="✦ KONFIRMASI KEHADIRAN ✦" fillColor="var(--retro-terra)" />
        <p className="font-serif italic text-sm text-[var(--retro-muted)] max-w-xs mx-auto mt-4 leading-relaxed font-semibold">
          Kehadiran dan doa restu Anda adalah kehormatan besar bagi kami. Silakan konfirmasikan kehadiran Anda pada form berikut:
        </p>
        <RetroDivider variant="simple" className="mt-4 mb-10" />
      </motion.div>

      {/* FORM CARD */}
      <div className="max-w-sm mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="retro-rsvp-form"
              onSubmit={handleFormSubmit}
              className="bg-[var(--retro-warm)] p-8 text-left relative border-4 border-double border-[var(--retro-terra)] flex flex-col gap-6"
              style={{ filter: "drop-shadow(3px 4px 0px rgba(31,26,20,0.1))" }}
            >
              {/* Corner Star symbols */}
              <div className="absolute top-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
              <div className="absolute top-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
              <div className="absolute bottom-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
              <div className="absolute bottom-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>

              {/* Name field */}
              <div>
                <label className="block font-courier-prime text-[8px] font-black uppercase tracking-[0.25em] text-[var(--retro-muted)] mb-2">
                  NAMA LENGKAP TAMU
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik nama lengkap Anda"
                  className="w-full bg-[var(--retro-cream)] border border-[var(--retro-mustard)]/50 px-4 py-3 text-xs text-[var(--retro-ink)] focus:border-[var(--retro-terra)] focus:outline-none transition-colors font-courier-prime font-bold"
                  required
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Attendance selection */}
              <div>
                <label className="block font-courier-prime text-[8px] font-black uppercase tracking-[0.25em] text-[var(--retro-muted)] mb-2.5">
                  KONFIRMASI KEHADIRAN
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: "hadir", text: "✦ DENGAN SENANG HATI" },
                    { val: "mungkin", text: "MUNGKIN HADIR" },
                    { val: "tidak_hadir", text: "MOHON MAAF, BERHALANGAN" },
                  ].map((option) => (
                    <button
                      key={option.val}
                      type="button"
                      onClick={() => setAttendance(option.val as any)}
                      className={`w-full border py-3 px-4 text-[10px] text-left transition-all duration-300 flex items-center justify-between font-courier-prime font-bold tracking-wider cursor-pointer ${
                        attendance === option.val
                          ? "bg-[var(--retro-terra)] border-[var(--retro-terra)] text-[var(--retro-cream)]"
                          : "bg-[var(--retro-cream)] border-[var(--retro-mustard)]/40 text-[var(--retro-muted)] hover:border-[var(--retro-terra)]"
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <span>{option.text}</span>
                      {attendance === option.val && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stepper for attending guests */}
              <AnimatePresence>
                {attendance === "hadir" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block font-courier-prime text-[8px] font-black uppercase tracking-[0.25em] text-[var(--retro-muted)] mb-2">
                      JUMLAH TAMU YANG HADIR
                    </label>
                    <div className="flex items-center gap-4 justify-center bg-[var(--retro-cream)] border border-[var(--retro-mustard)]/30 py-2.5 max-w-[150px] mx-auto">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 border border-[var(--retro-mustard)]/40 flex items-center justify-center font-bold text-[var(--retro-ink)] hover:border-[var(--retro-terra)] disabled:opacity-30 disabled:hover:border-none bg-white transition-colors select-none font-courier-prime text-sm cursor-pointer"
                        style={{ borderRadius: 0 }}
                      >
                        &minus;
                      </button>
                      <span className="font-retro-accent text-xl font-bold text-[var(--retro-terra)] min-w-[1.5rem] text-center select-none">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                        disabled={guestCount >= 5}
                        className="w-8 h-8 border border-[var(--retro-mustard)]/40 flex items-center justify-center font-bold text-[var(--retro-ink)] hover:border-[var(--retro-terra)] disabled:opacity-30 disabled:hover:border-none bg-white transition-colors select-none font-courier-prime text-sm cursor-pointer"
                        style={{ borderRadius: 0 }}
                      >
                        &#43;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message block */}
              <div>
                <label className="block font-courier-prime text-[8px] font-black uppercase tracking-[0.25em] text-[var(--retro-muted)] mb-2">
                  UCAPAN &amp; DOA RESTU (OPSIONAL)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis ucapan selamat Anda disini..."
                  className="w-full bg-[var(--retro-cream)] border border-[var(--retro-mustard)]/50 px-4 py-3 text-xs text-[var(--retro-ink)] focus:border-[var(--retro-terra)] focus:outline-none transition-colors resize-none font-courier-prime font-bold"
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Submit CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--retro-terra)] hover:bg-[var(--retro-brown)] text-[var(--retro-cream)] py-3.5 text-xs font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mt-2 disabled:bg-[var(--retro-muted)]/40 font-retro-display cursor-pointer shadow-sm"
                style={{ borderRadius: 0 }}
              >
                {loading ? "MENGIRIM..." : (
                  <>
                    <Send size={11} />
                    KIRIM KONFIRMASI KEHADIRAN
                  </>
                )}
              </motion.button>

              {error && (
                <p className="text-[var(--retro-terra)] font-courier-prime font-bold text-[10px] mt-2 text-center">
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="retro-rsvp-success"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="bg-[var(--retro-warm)] p-8 text-center relative border-4 border-double border-[var(--retro-terra)] flex flex-col items-center"
              style={{ borderRadius: 0, filter: "drop-shadow(3px 4px 0px rgba(31,26,20,0.1))" }}
            >
              <div className="absolute top-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
              <div className="absolute top-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>

              {/* Decorative Sunburst inside Success */}
              <div className="w-16 h-16 opacity-20 text-[var(--retro-mustard)] flex items-center justify-center mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <path
                      key={i}
                      d="M50,50 L100,45 L100,55 Z"
                      transform={`rotate(${i * 30} 50 50)`}
                    />
                  ))}
                </svg>
              </div>

              <h3 className="font-retro-display text-2xl text-[var(--retro-brown)] font-black uppercase leading-tight">
                TERIMA KASIH, {name}!
              </h3>
              <p className="font-courier-prime text-[10px] text-[var(--retro-muted)] font-bold tracking-wide leading-relaxed mt-4 px-4 uppercase">
                KONFIRMASI ANDA TELAH BERHASIL DICATAT. KAMI SANGAT MENANTIKAN KEHADIRAN ANDA DI HARI BAHAGIA KAMI! 💌
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="text-[var(--retro-terra)] hover:opacity-80 text-[9px] font-courier-prime tracking-widest uppercase font-black underline mt-8 underline-offset-4 cursor-pointer"
              >
                KIRIM KONFIRMASI BARU
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* REAL-TIME FEED WALL */}
      <div className="max-w-sm mx-auto mt-16 text-left relative z-10">
        <div className="flex items-center gap-2 border-b border-[var(--retro-mustard)]/30 pb-3 mb-6 select-none">
          <MessageSquare size={13} className="text-[var(--retro-terra)]" />
          <span className="font-courier-prime text-[9px] font-bold uppercase tracking-widest text-[var(--retro-terra)]">
            WISHES &amp; PRAYERS FEED WALL
          </span>
        </div>

        <RSVPFeed
          slug={slug}
          cardClassName="bg-[var(--retro-warm)] border border-[var(--retro-mustard)]/30 p-4 flex gap-4 items-start relative mb-3"
          avatarClassName="w-10 h-10 bg-[var(--retro-cream)] border border-[var(--retro-mustard)]/40 flex-shrink-0 flex items-center justify-center text-[var(--retro-terra)] font-black select-none font-retro-display text-lg shadow-sm"
          nameClassName="font-serif text-xs font-bold text-[var(--retro-brown)] uppercase"
          messageClassName="font-courier-prime text-[10px] text-[var(--retro-ink)] italic leading-relaxed mt-1.5"
          timeClassName="font-courier-prime text-[7px] text-[var(--retro-muted)] mt-1.5 block font-bold"
          emptyStateClassName="bg-[var(--retro-warm)] border border-[var(--retro-mustard)]/30 p-6 text-center select-none animate-pulse text-xs text-[var(--retro-muted)] font-semibold"
          badgeHadirClass="bg-[#E2F0D9] text-[#385723] text-[8px] px-2 py-0.5 rounded font-black font-courier-prime uppercase tracking-wider leading-none"
          badgeMungkinClass="bg-[#FFF2CC] text-[#7F6000] text-[8px] px-2 py-0.5 rounded font-black font-courier-prime uppercase tracking-wider leading-none"
          badgeAbsenClass="bg-[#FCE4D6] text-[#C65911] text-[8px] px-2 py-0.5 rounded font-black font-courier-prime uppercase tracking-wider leading-none"
        />
      </div>

      <div className="mt-12 text-center">
        <RetroDivider variant="ornate" className="mt-4" />
      </div>
    </motion.section>
  );
}
