"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send, Check } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { KawungOrnament, KawungPattern, CornerOrnament } from "./CultureBatikSVG";
import CultureDivider from "./CultureDivider";
import RSVPFeed from "@/components/shared/RSVPFeed";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function CultureRSVP({ data, slug, guestName }: Props) {
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
      setError("Mugi kerso nyerat asmo jangkep panjenengan (min. 2 karakter)");
      return;
    }
    if (!attendance) {
      setError("Mugi kerso milih konfirmasi kehadiran panjenengan");
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
      setError(err.message || "Wonten gangguan sambungan. Coba malih.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#F9F3E8] select-none z-10">
      <KawungPattern size={40} color="#C9973A" opacity={0.05} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-12 relative z-20"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mb-4" />
        <span className="font-culture-number text-xs tracking-[0.25em] text-[#C9973A] block mb-2">
          ATUR PAWIYATAN NYERAT
        </span>
        <span className="font-culture-subheading italic text-xs text-[#8A7055] uppercase tracking-widest block">
          Konfirmasi Kehadiran Tamu
        </span>
      </motion.div>

      {/* Form Container */}
      <div className="max-w-sm mx-auto relative z-20 mb-16">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="culture-rsvp-form"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleFormSubmit}
              className="bg-[#EFE4CC] border border-[#C9973A]/30 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col gap-5 text-left"
            >
              <KawungPattern size={24} color="#C9973A" opacity={0.04} />
              <CornerOrnament position="tl" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="tr" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="bl" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="br" size={20} color="#C9973A" animated={false} />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block font-culture-body text-[8px] uppercase tracking-[0.25em] text-[#8A7055] font-bold mb-1.5">
                    Asmo Jangkep (Nama Lengkap)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Gatot Kaca"
                    className="w-full bg-[#F9F3E8] border border-[#C9973A]/30 rounded-xl py-3 px-4 font-sans text-xs text-[#1A1208] placeholder:text-[#8A7055]/40 focus:outline-none focus:border-[#C9973A] transition-all"
                  />
                </div>

                {/* Attendance Buttons */}
                <div>
                  <label className="block font-culture-body text-[8px] uppercase tracking-[0.25em] text-[#8A7055] font-bold mb-2">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { key: "hadir", label: "Kulo Hadir (Insya Allah Hadir)" },
                      { key: "mungkin", label: "Taksih Ragu (Mungkin Hadir)" },
                      { key: "tidak_hadir", label: "Nyandak Udzur (Berhalangan Hadir)" },
                    ].map((opt) => {
                      const isSelected = attendance === opt.key;
                      return (
                        <button
                          key={`culture-rsvp-opt-${opt.key}`}
                          type="button"
                          onClick={() => setAttendance(opt.key as any)}
                          className={`w-full py-3.5 px-4 rounded-xl text-left font-culture-body font-bold text-[10px] uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#6B3D2E] text-[#F9F3E8] border-[#6B3D2E] shadow-sm"
                              : "bg-[#F9F3E8] text-[#8A7055] border-[#C9973A]/25 hover:bg-[#F9F3E8]/80"
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
                      <label className="block font-culture-body text-[8px] uppercase tracking-[0.25em] text-[#8A7055] font-bold mb-1.5">
                        Cacahing Tamu (Jumlah Orang)
                      </label>
                      <div className="relative">
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full bg-[#F9F3E8] border border-[#C9973A]/30 rounded-xl py-3.5 px-4 font-sans text-xs text-[#1A1208] appearance-none focus:outline-none focus:border-[#C9973A] transition-all"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={`guest-count-${num}`} value={num}>
                              {num} Orang
                            </option>
                          ))}
                        </select>
                        <Users size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A7055]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div>
                  <label className="block font-culture-body text-[8px] uppercase tracking-[0.25em] text-[#8A7055] font-bold mb-1.5">
                    Atur Pangajab (Pesan Ucapan)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis ucapan selamat dan doa restu di sini..."
                    className="w-full bg-[#F9F3E8] border border-[#C9973A]/30 rounded-xl py-3 px-4 font-sans text-xs text-[#1A1208] placeholder:text-[#8A7055]/40 focus:outline-none focus:border-[#C9973A] transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6B3D2E] text-[#F9F3E8] border border-[#C9973A]/40 rounded-xl py-3.5 mt-2 font-culture-body font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#2C3E6B] transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={11} className="stroke-[2.5]" />
                  {loading ? "Ngirim..." : "Kirim Konfirmasi"}
                </button>

                {/* Error */}
                {error && (
                  <p className="text-red-600 font-sans text-[10px] text-center font-bold tracking-wider uppercase mt-1">
                    {error}
                  </p>
                )}
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#EFE4CC] border border-[#C9973A]/30 rounded-2xl p-8 text-center shadow-md relative overflow-hidden flex flex-col items-center"
            >
              <KawungPattern size={24} color="#C9973A" opacity={0.04} />
              <CornerOrnament position="tl" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="tr" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="bl" size={20} color="#C9973A" animated={false} />
              <CornerOrnament position="br" size={20} color="#C9973A" animated={false} />

              <div className="relative z-10 flex flex-col items-center">
                <KawungOrnament size={70} color="#C9973A" animated={true} className="mb-5" />
                <h3 className="font-culture-display italic text-2xl text-[#6B3D2E] mb-2 leading-none">
                  Matur Nuwun Sanget
                </h3>
                <p className="font-sans text-xs text-[#8A7055] max-w-xs leading-relaxed mb-6">
                  Konfirmasi kehadiran lan atur doa restu panjenengan sampun kasimpen wonten serat kami.
                </p>
                <div className="bg-[#F9F3E8] border border-[#C9973A]/20 py-2.5 px-6 rounded-full font-culture-body font-bold text-[9px] uppercase tracking-[0.15em] text-[#6B3D2E]">
                  ✦ MATUR NUWUN ✦
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Guest Wishes Feed Scroll */}
      <div className="max-w-sm mx-auto">
        <h4 className="font-culture-number text-[10px] uppercase tracking-[0.3em] text-[#8B6520] text-center mb-6 block">
          ◇ ATUR PANDONGA DHOMPANG ◇
        </h4>
        <RSVPFeed
          slug={slug}
          cardClassName="bg-[#EFE4CC] border border-[#C9973A]/15 rounded-2xl p-4 shadow-sm flex gap-3.5 items-start text-left relative overflow-hidden"
          avatarClassName="w-10 h-10 rounded-full bg-[#6B3D2E] text-[#F9F3E8] font-culture-body font-bold text-xs flex-shrink-0 flex items-center justify-center border border-[#C9973A]/20"
          nameClassName="font-culture-body text-xs font-bold text-[#6B3D2E]"
          messageClassName="font-culture-subheading text-[11px] text-[#1A1208]/85 italic mt-1.5 leading-relaxed"
          timeClassName="font-culture-body text-[8px] text-[#8A7055] mt-1.5 block"
          badgeHadirClass="bg-[#5A6B47]/15 text-[#5A6B47] text-[8px] px-2 py-0.5 rounded-full font-bold font-culture-body border border-[#5A6B47]/25 ml-2"
          badgeMungkinClass="bg-[#C9973A]/15 text-[#8B6520] text-[8px] px-2 py-0.5 rounded-full font-bold font-culture-body border border-[#C9973A]/25 ml-2"
          badgeAbsenClass="bg-[#7A1F2E]/15 text-[#7A1F2E] text-[8px] px-2 py-0.5 rounded-full font-bold font-culture-body border border-[#7A1F2E]/25 ml-2"
        />
      </div>
    </div>
  );
}
