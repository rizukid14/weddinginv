"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { EightPointedStar, GeometricTessellation } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";
import RSVPFeed from "@/components/shared/RSVPFeed";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function SpiritualRSVP({ data, slug, guestName }: Props) {
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
      setError("Mohon ketik nama lengkap Anda (minimal 2 karakter)");
      return;
    }
    if (!attendance) {
      setError("Mohon pilih konfirmasi kehadiran Anda");
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
          const response = await fetch(`/${slug}/rsvp`, {
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
      setError(err.message || "Terdapat gangguan jaringan. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#FDFCFA] select-none z-10">
      <GeometricTessellation size={45} color="#B7882A" opacity={0.04} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-12 relative z-20"
      >
        <SpiritualDivider variant="ornate" color="#B7882A" className="mb-4" />
        <span className="font-spirit-body text-xs tracking-[0.25em] text-[#B7882A] block mb-2 font-bold">
          KONFIRMASI KEHADIRAN (RSVP)
        </span>
        <span className="font-spirit-serif italic text-xs text-[#7A6E5E] block">
          Kehadiran Anda Adalah Kebahagiaan Syukur Kami
        </span>
      </motion.div>

      {/* Card Content */}
      <div className="max-w-sm mx-auto relative z-20 mb-16">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="spirit-rsvp-form"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleFormSubmit}
              className="bg-[#F0EBE0]/30 border border-[#B7882A]/25 rounded-2xl p-6 shadow-sm flex flex-col gap-5 text-left"
            >
              {/* Name */}
              <div>
                <label className="block font-spirit-body text-[8px] uppercase tracking-[0.25em] text-[#B7882A] font-bold mb-1.5">
                  Nama Lengkap Anda
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Ali"
                  className="w-full bg-[#FDFCFA] border border-[#B7882A]/25 rounded-xl py-3 px-4 font-sans text-xs text-[#1B4332] placeholder:text-[#7A6E5E]/40 focus:outline-none focus:border-[#B7882A] transition-all"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block font-spirit-body text-[8px] uppercase tracking-[0.25em] text-[#B7882A] font-bold mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "hadir", label: "Insya Allah Hadir" },
                    { key: "mungkin", label: "Mungkin Hadir (Masih Ragu)" },
                    { key: "tidak_hadir", label: "Mohon Maaf, Berhalangan Hadir" },
                  ].map((opt) => {
                    const isSelected = attendance === opt.key;
                    return (
                      <button
                        key={`spirit-rsvp-opt-${opt.key}`}
                        type="button"
                        onClick={() => setAttendance(opt.key as any)}
                        className={`w-full py-3.5 px-4 rounded-xl text-left font-spirit-body font-bold text-[10px] uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1B4332] text-[#FDFCFA] border-[#1B4332] shadow-sm"
                            : "bg-[#FDFCFA] text-[#7A6E5E] border-[#B7882A]/20 hover:bg-[#FDFCFA]/80"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Count (Conditional) */}
              <AnimatePresence>
                {attendance === "hadir" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block font-spirit-body text-[8px] uppercase tracking-[0.25em] text-[#B7882A] font-bold mb-1.5">
                      Jumlah Tamu (Pax)
                    </label>
                    <div className="relative">
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#FDFCFA] border border-[#B7882A]/25 rounded-xl py-3.5 px-4 font-sans text-xs text-[#1B4332] appearance-none focus:outline-none focus:border-[#B7882A] transition-all"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={`spirit-guest-${num}`} value={num}>
                            {num} Orang
                          </option>
                        ))}
                      </select>
                      <Users size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6E5E]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label className="block font-spirit-body text-[8px] uppercase tracking-[0.25em] text-[#B7882A] font-bold mb-1.5">
                  Ucapan Doa &amp; Harapan Tulus
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat, doa berkah dan pesan hangat untuk kedua mempelai..."
                  className="w-full bg-[#FDFCFA] border border-[#B7882A]/25 rounded-xl py-3 px-4 font-sans text-xs text-[#1B4332] placeholder:text-[#7A6E5E]/40 focus:outline-none focus:border-[#B7882A] transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B4332] text-[#FDFCFA] border border-[#B7882A]/40 rounded-xl py-4 mt-2 font-spirit-body font-bold text-[10px] uppercase tracking-[0.2em] shadow-md hover:bg-[#2D6A4F] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={11} className="stroke-[2.5] text-[#B7882A]" />
                {loading ? "Mengirim..." : "Kirim Doa Restu"}
              </button>

              {error && (
                <p className="text-red-600 font-sans text-[10px] text-center font-bold tracking-wider uppercase mt-1">
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="spirit-rsvp-success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#F0EBE0]/30 border border-[#B7882A]/25 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center"
            >
              <EightPointedStar size={65} color="#B7882A" animated={true} className="mb-5" />
              <p className="font-spirit-arabic text-lg text-[#B7882A] mb-1 select-none leading-none" dir="rtl">
                شُكْرًا جَزِيلًا
              </p>
              <h3 className="font-spirit-heading text-2xl text-[#1B4332] mb-2 leading-none">
                Syukron Jaziilan
              </h3>
              <p className="font-sans text-xs text-[#7A6E5E] max-w-xs leading-relaxed mb-6">
                Terima kasih yang sebesar-besarnya. Konfirmasi dan doa restu Anda telah terekam dalam lembaran kabar bahagia kami.
              </p>
              <div className="bg-[#1B4332] text-[#FDFCFA] py-2 px-6 rounded-full font-spirit-body font-bold text-[9px] uppercase tracking-[0.15em] border border-[#B7882A]/30">
                ✦ JAZAKALLAHU KHAIRAN ✦
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live comments feed */}
      <div className="max-w-sm mx-auto">
        <h4 className="font-spirit-serif font-bold text-[10px] uppercase tracking-[0.3em] text-[#B7882A] text-center mb-6 block">
          ◇ UNGKAPAN DOA &amp; RESTU ◇
        </h4>
        <RSVPFeed
          slug={slug}
          cardClassName="bg-[#F0EBE0]/20 border border-[#B7882A]/15 rounded-2xl p-4 shadow-sm flex gap-3.5 items-start text-left relative overflow-hidden"
          avatarClassName="w-10 h-10 rounded-full bg-[#1B4332] text-[#FDFCFA] font-spirit-serif font-bold text-sm flex-shrink-0 flex items-center justify-center border border-[#B7882A]/20"
          nameClassName="font-spirit-serif font-bold text-xs text-[#1B4332]"
          messageClassName="font-spirit-body text-[11px] text-[#7A6E5E] italic mt-1.5 leading-relaxed font-light"
          timeClassName="font-spirit-body text-[8px] text-[#7A6E5E]/60 mt-1.5 block"
          badgeHadirClass="bg-[#1B4332]/10 text-[#1B4332] text-[8px] px-2 py-0.5 rounded-full font-bold font-spirit-body border border-[#1B4332]/25 ml-2"
          badgeMungkinClass="bg-[#B7882A]/10 text-[#B7882A] text-[8px] px-2 py-0.5 rounded-full font-bold font-spirit-body border border-[#B7882A]/25 ml-2"
          badgeAbsenClass="bg-[#7A6E5E]/10 text-[#7A6E5E] text-[8px] px-2 py-0.5 rounded-full font-bold font-spirit-body border border-[#7A6E5E]/25 ml-2"
        />
      </div>
    </div>
  );
}
