"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import BrushDivider from "./BrushDivider";

interface Props {
  data: WeddingData;
}

export default function BrushAkadResepsi({ data }: Props) {
  // Format dates elegantly for Indonesian locales
  const formatDateIndo = (dateStr: string) => {
    try {
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const dObj = new Date(dateStr);
      return `${days[dObj.getDay()]}, ${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
    } catch {
      return "Minggu, 21 Desember 2025";
    }
  };

  const formatTimeStr = (dateStr: string) => {
    try {
      const dObj = new Date(dateStr);
      const hrs = String(dObj.getHours()).padStart(2, "0");
      const mins = String(dObj.getMinutes()).padStart(2, "0");
      return `${hrs}.${mins}`;
    } catch {
      return "09.00";
    }
  };

  const handleOpenGoogleCalendar = (title: string, dateStr: string, timeStr: string, venue: string) => {
    try {
      const dObj = new Date(dateStr);
      const formattedDate = dObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${formattedDate}/${formattedDate}&details=Menghadiri+acara+pernikahan+kami&location=${encodeURIComponent(
        venue
      )}`;
      window.open(url, "_blank");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--brush-warm)] relative z-10 overflow-hidden text-left"
    >
      {/* Background Grid Pattern simulating old architectural layout paper */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="brushGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="none" stroke="var(--brush-ink)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brushGrid)" />
        </svg>
      </div>

      <div className="max-w-sm mx-auto flex flex-col gap-12 z-10 relative">
        {/* AKAD NIKAH CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-white p-6 border-2 border-[var(--brush-ink)]/15 shadow-md relative"
          style={{ borderRadius: 0 }}
        >
          {/* Top tape decoration */}
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-20 h-4 bg-[var(--brush-paper)]/80 border-l border-r border-dashed border-[var(--brush-ink)]/10" />

          <span className="font-brush-accent text-base text-[var(--brush-stroke)] select-none">
            The Covenant
          </span>
          <h3 className="font-brush-display text-xl text-[var(--brush-ink)] font-normal tracking-tight mt-0.5">
            Akad Nikah
          </h3>

          <BrushDivider variant="stroke" className="my-3" />

          {/* Details */}
          <div className="flex flex-col gap-4 mt-4 text-xs font-brush-body text-[var(--brush-ink-soft)] font-medium">
            <div className="flex items-start gap-3">
              <Calendar size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <span>{formatDateIndo(data.akadDate)}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <span>Pukul {formatTimeStr(data.akadDate)} WIB s.d. Selesai</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-[var(--brush-ink)]">{data.akadVenue}</p>
                <p className="text-[var(--brush-muted)] mt-1 font-normal leading-relaxed">{data.akadAddress}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-6">
            <a
              href={data.akadMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] font-bold py-3 text-center tracking-widest uppercase text-[10px] font-brush-body transition-colors"
              style={{ borderRadius: 0 }}
            >
              Lihat Peta Lokasi
            </a>
            <button
              onClick={() => handleOpenGoogleCalendar("Akad Nikah " + data.brideNickname + " & " + data.groomNickname, data.akadDate, formatTimeStr(data.akadDate), data.akadVenue)}
              className="w-full border border-[var(--brush-ink)]/30 hover:bg-[var(--brush-paper)]/40 text-[var(--brush-ink)] font-bold py-2.5 tracking-widest uppercase text-[9px] font-brush-body transition-colors text-center"
              style={{ borderRadius: 0 }}
            >
              Tambahkan ke Kalender
            </button>
          </div>
        </motion.div>

        {/* RESEPSI CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-white p-6 border-2 border-[var(--brush-ink)]/15 shadow-md relative"
          style={{ borderRadius: 0 }}
        >
          {/* Top tape decoration */}
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-20 h-4 bg-[var(--brush-paper)]/80 border-l border-r border-dashed border-[var(--brush-ink)]/10" />

          <span className="font-brush-accent text-base text-[var(--brush-stroke)] select-none">
            The Celebration
          </span>
          <h3 className="font-brush-display text-xl text-[var(--brush-ink)] font-normal tracking-tight mt-0.5">
            Resepsi Pernikahan
          </h3>

          <BrushDivider variant="stroke" className="my-3" />

          {/* Details */}
          <div className="flex flex-col gap-4 mt-4 text-xs font-brush-body text-[var(--brush-ink-soft)] font-medium">
            <div className="flex items-start gap-3">
              <Calendar size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <span>{formatDateIndo(data.resepsiDate)}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <span>Pukul {formatTimeStr(data.resepsiDate)} WIB s.d. Selesai</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-[var(--brush-stroke)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-[var(--brush-ink)]">{data.resepsiVenue}</p>
                <p className="text-[var(--brush-muted)] mt-1 font-normal leading-relaxed">{data.resepsiAddress}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-6">
            <a
              href={data.resepsiMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--brush-ink)] hover:bg-[var(--brush-ink-soft)] text-[var(--brush-paper)] font-bold py-3 text-center tracking-widest uppercase text-[10px] font-brush-body transition-colors"
              style={{ borderRadius: 0 }}
            >
              Lihat Peta Lokasi
            </a>
            <button
              onClick={() => handleOpenGoogleCalendar("Resepsi " + data.brideNickname + " & " + data.groomNickname, data.resepsiDate, formatTimeStr(data.resepsiDate), data.resepsiVenue)}
              className="w-full border border-[var(--brush-ink)]/30 hover:bg-[var(--brush-paper)]/40 text-[var(--brush-ink)] font-bold py-2.5 tracking-widest uppercase text-[9px] font-brush-body transition-colors text-center"
              style={{ borderRadius: 0 }}
            >
              Tambahkan ke Kalender
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
