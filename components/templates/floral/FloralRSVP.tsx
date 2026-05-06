"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Users, MessageSquare } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import RSVPFeed from "@/components/shared/RSVPFeed";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function FloralRSVP({ data, slug, guestName }: Props) {
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

    // Client-side validations
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
          // Post to real server API Endpoint
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

      // If server is in Mock fallback mode or request failed, update local list immediately
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
      className="py-20 px-6 bg-floral-ivory relative z-10 text-center"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center">
        <FloralDivider variant="ornate" />
        <h2 className="font-serif text-3xl text-floral-text font-medium mt-2">
          Konfirmasi Kehadiran
        </h2>
        <p className="font-serif italic text-base text-floral-muted mt-2">
          Kehadiran Anda adalah kebahagiaan kami
        </p>
      </motion.div>

      {/* RSVP Content Card */}
      <div className="max-w-sm mx-auto mt-10">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="rsvp-form"
              onSubmit={handleFormSubmit}
              className="bg-white border border-floral-blush rounded-2xl p-6 text-left shadow-sm flex flex-col gap-5"
            >
              {/* Name field */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketikkan nama lengkap Anda"
                  className="w-full border-b border-floral-blush bg-transparent py-2 text-sm text-floral-text focus:border-floral-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Attendance field */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-2">
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
                      className={`w-full border rounded px-4 py-3 text-xs text-left transition-all duration-300 flex items-center justify-between ${
                        attendance === option.val
                          ? "bg-floral-gold border-floral-gold text-white font-semibold shadow-sm"
                          : "border-floral-blush text-floral-muted hover:border-floral-gold/50"
                      }`}
                    >
                      <span>{option.text}</span>
                      {attendance === option.val && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count stepper (Only shown if 'hadir' is selected) */}
              <AnimatePresence>
                {attendance === "hadir" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-2">
                      Jumlah Tamu
                    </label>
                    <div className="flex items-center gap-4 justify-center bg-floral-cream/40 border border-floral-blush rounded-lg py-2 max-w-[150px] mx-auto">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 rounded-full border border-floral-blush flex items-center justify-center font-bold text-floral-text hover:border-floral-gold disabled:opacity-30 disabled:hover:border-floral-blush bg-white transition-colors select-none"
                      >
                        &minus;
                      </button>
                      <span className="font-serif text-lg font-bold text-floral-text min-w-[1.5rem] text-center select-none">
                        {guestCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                        disabled={guestCount >= 5}
                        className="w-8 h-8 rounded-full border border-floral-blush flex items-center justify-center font-bold text-floral-text hover:border-floral-gold disabled:opacity-30 disabled:hover:border-floral-blush bg-white transition-colors select-none"
                      >
                        &#43;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message field */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold mb-1.5">
                  Ucapan & Doa (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kirimkan ucapan dan doa tulus untuk mempelai..."
                  className="w-full border-b border-floral-blush bg-transparent py-2 text-sm text-floral-text focus:border-floral-gold focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-floral-gold hover:bg-floral-gold-deep text-white py-3 text-xs font-semibold tracking-widest uppercase rounded shadow-sm hover:shadow transition-colors flex items-center justify-center gap-2 mt-2 disabled:bg-floral-muted/50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    Kirim Konfirmasi
                  </>
                )}
              </button>

              {error && (
                <p className="text-red-500 font-sans text-xs mt-2 text-center leading-normal">
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
              className="bg-white border border-floral-blush rounded-2xl p-8 text-center shadow-md flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-floral-sage/20 text-floral-sage-dark flex items-center justify-center mb-4">
                <Check size={28} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-floral-gold leading-tight">
                Terima Kasih, {name}!
              </h3>
              <p className="font-sans text-xs text-floral-muted leading-relaxed mt-2.5 px-4">
                Konfirmasi kehadiran Anda telah sukses kami simpan. Sampai jumpa di hari bahagia pernikahan kami! 💌
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-floral-gold-deep hover:text-floral-gold text-[10px] font-sans tracking-widest uppercase font-semibold underline mt-6 underline-offset-4"
              >
                Kirim Konfirmasi Baru
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* REAL-TIME WISHES WALL FEED */}
      <div className="max-w-sm mx-auto mt-16 text-left">
        <div className="flex items-center gap-2 border-b border-floral-blush/40 pb-3 mb-6 select-none">
          <MessageSquare size={14} className="text-floral-gold" />
          <span className="font-sans text-[10px] uppercase tracking-widest text-floral-gold font-bold">
            Wishes & Prayers Wall
          </span>
        </div>

        <RSVPFeed
          slug={slug}
          cardClassName="bg-white border border-floral-blush/30 rounded-xl p-4 shadow-sm flex gap-3.5 items-start"
          avatarClassName="w-10 h-10 rounded-full bg-floral-gold/15 flex-shrink-0 flex items-center justify-center text-floral-gold-deep font-semibold select-none font-display text-lg"
          nameClassName="font-sans text-xs font-semibold text-floral-text"
          messageClassName="font-sans text-[11px] text-floral-text italic leading-relaxed mt-1.5"
          timeClassName="font-sans text-[8px] text-floral-muted/60 mt-1 block"
          emptyStateClassName="bg-white border border-floral-blush/30 rounded-xl p-6 text-center shadow-sm select-none animate-pulse"
          badgeHadirClass="bg-[#E2F0D9] text-[#385723] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none"
          badgeMungkinClass="bg-[#FFF2CC] text-[#7F6000] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none"
          badgeAbsenClass="bg-[#FCE4D6] text-[#C65911] text-[9px] px-2 py-0.5 rounded-full font-medium leading-none"
        />
      </div>

      <div className="mt-12 text-center">
        <FloralDivider variant="branch" />
      </div>
    </motion.section>
  );
}

