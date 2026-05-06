"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function ModernAkadResepsi({ data }: Props) {
  // Format dates strictly as "DD.MM.YYYY" or uppercase letters
  const formatDateStr = (dateStr: string) => {
    try {
      const dObj = new Date(dateStr);
      const months = [
        "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
        "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
      ];
      const days = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
      return `${days[dObj.getDay()]} / ${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
    } catch {
      return "MINGGU / 21 DESEMBER 2025";
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
      className="py-20 px-8 bg-[var(--modern-off)] text-black relative z-10 overflow-hidden text-left"
    >
      {/* Editorial layout grids in black/5 */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-black/[0.04]" />

      <div className="max-w-sm mx-auto flex flex-col gap-16 z-10 relative">
        {/* SECTION HEADER */}
        <motion.div variants={fadeUp} className="border-b border-black/10 pb-4 flex justify-between items-end">
          <span className="font-modern-body text-[8px] uppercase tracking-[0.3em] text-[var(--modern-accent)] font-bold">
            [ SCHEDULE DETAILS ]
          </span>
          <span className="font-modern-body text-[8px] uppercase text-black/40">
            LOC.ID // TIMELINE
          </span>
        </motion.div>

        {/* AKAD NIKAH CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-white p-6 border border-black shadow-none flex flex-col justify-between"
          style={{ borderRadius: 0 }}
        >
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-modern-display text-lg font-black uppercase tracking-tight text-black">
                01 // AKAD NIKAH
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--modern-accent)]" />
            </div>

            {/* Subtle separator */}
            <div className="h-[1px] bg-black/10 my-4" />

            <div className="flex flex-col gap-4 font-modern-body text-[10px] text-black/70 font-semibold tracking-wide">
              <div className="flex items-start gap-3">
                <Calendar size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <span>{formatDateStr(data.akadDate)}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <span>PUKUL {formatTimeStr(data.akadDate)} WIB s.d. SELESAI</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-black uppercase">{data.akadVenue}</p>
                  <p className="text-black/50 mt-1 font-medium tracking-normal leading-relaxed lowercase">{data.akadAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <a
              href={data.akadMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black hover:opacity-90 text-[var(--modern-white)] font-bold py-3 text-center tracking-[0.15em] uppercase text-[9px] font-modern-body transition-all"
              style={{ borderRadius: 0 }}
            >
              LOCATE MAPS
            </a>
            <button
              onClick={() => handleOpenGoogleCalendar("Akad Nikah " + data.brideNickname + " & " + data.groomNickname, data.akadDate, formatTimeStr(data.akadDate), data.akadVenue)}
              className="w-full border border-black hover:bg-black/5 text-black font-bold py-2.5 text-center tracking-[0.15em] uppercase text-[8px] font-modern-body transition-all"
              style={{ borderRadius: 0 }}
            >
              SAVE DATE TO CALENDAR
            </button>
          </div>
        </motion.div>

        {/* RESEPSI CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-white p-6 border border-black shadow-none flex flex-col justify-between"
          style={{ borderRadius: 0 }}
        >
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-modern-display text-lg font-black uppercase tracking-tight text-black">
                02 // RECEPTION
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--modern-accent)]" />
            </div>

            {/* Subtle separator */}
            <div className="h-[1px] bg-black/10 my-4" />

            <div className="flex flex-col gap-4 font-modern-body text-[10px] text-black/70 font-semibold tracking-wide">
              <div className="flex items-start gap-3">
                <Calendar size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <span>{formatDateStr(data.resepsiDate)}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <span>PUKUL {formatTimeStr(data.resepsiDate)} WIB s.d. SELESAI</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={13} className="text-[var(--modern-accent)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-black uppercase">{data.resepsiVenue}</p>
                  <p className="text-black/50 mt-1 font-medium tracking-normal leading-relaxed lowercase">{data.resepsiAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <a
              href={data.resepsiMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--modern-accent)] hover:opacity-90 text-black font-bold py-3 text-center tracking-[0.15em] uppercase text-[9px] font-modern-body transition-all"
              style={{ borderRadius: 0 }}
            >
              LOCATE MAPS
            </a>
            <button
              onClick={() => handleOpenGoogleCalendar("Resepsi " + data.brideNickname + " & " + data.groomNickname, data.resepsiDate, formatTimeStr(data.resepsiDate), data.resepsiVenue)}
              className="w-full border border-black hover:bg-black/5 text-black font-bold py-2.5 text-center tracking-[0.15em] uppercase text-[8px] font-modern-body transition-all"
              style={{ borderRadius: 0 }}
            >
              SAVE DATE TO CALENDAR
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
