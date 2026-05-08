"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { EightPointedStar, GeometricTessellation } from "./SpiritualGeometric";
import SpiritualDivider from "./SpiritualDivider";

interface Props {
  data: WeddingData;
  tier?: "akad" | "all";
}

export default function SpiritualAkadResepsi({ data, tier = "all" }: Props) {
  const isAkadOnly = tier === "akad";

  // Safe date, day, and time formatters to prevent Next.js hydration mismatches and runtime crashes
  const formatLongDate = (dateStr?: string) => {
    if (!dateStr) return "21 Desember 2025";
    try {
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const dObj = new Date(dateStr);
      if (isNaN(dObj.getTime())) return "21 Desember 2025";
      return `${dObj.getDate()} ${months[dObj.getMonth()]} ${dObj.getFullYear()}`;
    } catch {
      return "21 Desember 2025";
    }
  };

  const formatDayName = (dateStr?: string) => {
    if (!dateStr) return "Minggu";
    try {
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const dObj = new Date(dateStr);
      if (isNaN(dObj.getTime())) return "Minggu";
      return days[dObj.getDay()];
    } catch {
      return "Minggu";
    }
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "09:00";
    try {
      const dObj = new Date(dateStr);
      if (isNaN(dObj.getTime())) return "09:00";
      const hrs = String(dObj.getHours()).padStart(2, "0");
      const mins = String(dObj.getMinutes()).padStart(2, "0");
      return `${hrs}:${mins}`;
    } catch {
      return "09:00";
    }
  };

  const cardAnims: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleAddToCalendar = (title: string, dateStr: string, venue: string, address: string) => {
    try {
      const eventDate = dateStr ? new Date(dateStr) : new Date("2025-12-21");
      if (isNaN(eventDate.getTime())) return;
      const startIso = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const endIso = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
        `Mengharap kehadiran Anda pada acara ${title} kami di ${venue} (${address})`
      )}&location=${encodeURIComponent(venue)}`;
      
      window.open(googleCalendarUrl, "_blank");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#FDFCFA] text-[#1B4332] select-none z-10">
      {/* Background patterns */}
      <GeometricTessellation size={55} color="#B7882A" opacity={0.03} />

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
          RANGKAIAN ACARA
        </span>
        <span className="font-spirit-serif italic text-xs text-[#7A6E5E] block">
          Waktu &amp; Lokasi Pertemuan Syar&apos;i
        </span>
      </motion.div>

      {/* Grid wrapper */}
      <div className="flex flex-col gap-10 max-w-sm mx-auto relative z-20">
        
        {/* EVENT 1: AKAD NIKAH */}
        {data.akadEnabled && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardAnims}
            className="bg-[#F0EBE0]/30 border border-[#B7882A]/25 rounded-2xl p-8 text-center relative overflow-hidden shadow-sm"
          >
            <GeometricTessellation size={32} color="#B7882A" opacity={0.03} />
            
            {/* Top Center Floating Seal */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <EightPointedStar size={24} color="#B7882A" animated={false} />
            </div>

            <div className="relative z-10 flex flex-col items-center mt-4">
              <span className="bg-[#1B4332] text-[#FDFCFA] font-spirit-body font-bold text-[8px] uppercase tracking-[0.25em] px-5 py-1.5 rounded-full border border-[#B7882A]/40 shadow-sm">
                AKAD NIKAH
              </span>

              <SpiritualDivider variant="simple" color="#B7882A" className="my-5" />

              <span className="font-spirit-body text-[9px] uppercase tracking-widest text-[#7A6E5E]/80 block font-bold">
                {formatDayName(data.akadDate)}
              </span>
              <span className="font-spirit-serif font-bold text-2xl text-[#B7882A] block my-1">
                {formatLongDate(data.akadDate)}
              </span>
              <span className="font-spirit-body text-xs text-[#1B4332]/85 font-semibold tracking-wide">
                Pukul {formatTime(data.akadDate)} WIB
              </span>

              <SpiritualDivider variant="simple" color="#B7882A" className="my-5" />

              <span className="font-spirit-serif font-bold text-lg text-[#1B4332] leading-snug block">
                {data.akadVenue}
              </span>
              <p className="font-spirit-body text-[10px] text-[#7A6E5E]/90 mt-2 max-w-xs leading-relaxed">
                {data.akadAddress}
              </p>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 w-full mt-8">
                <a
                  href={data.akadMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1B4332] text-[#FDFCFA] border border-[#B7882A]/40 py-3.5 rounded-xl font-spirit-body font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#2D6A4F] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin size={12} className="stroke-[2.5] text-[#B7882A]" />
                  Petunjuk Lokasi Maps
                </a>
                <button
                  onClick={() =>
                    handleAddToCalendar(
                      `Akad Nikah ${data.brideNickname} & ${data.groomNickname}`,
                      data.akadDate,
                      data.akadVenue,
                      data.akadAddress
                    )
                  }
                  className="bg-transparent border border-[#B7882A]/50 text-[#B7882A] py-3.5 rounded-xl font-spirit-body font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-[#B7882A]/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={12} className="stroke-[2.5]" />
                  Simpan Agenda
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* EVENT 2: RESEPSI PERNIKAHAN */}
        {data.resepsiEnabled && !isAkadOnly && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardAnims}
            className="bg-[#F0EBE0]/30 border border-[#B7882A]/25 rounded-2xl p-8 text-center relative overflow-hidden shadow-sm"
          >
            <GeometricTessellation size={32} color="#B7882A" opacity={0.03} />
            
            {/* Top Center Floating Seal */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <EightPointedStar size={24} color="#B7882A" animated={false} />
            </div>

            <div className="relative z-10 flex flex-col items-center mt-4">
              <span className="bg-[#1B4332] text-[#FDFCFA] font-spirit-body font-bold text-[8px] uppercase tracking-[0.25em] px-5 py-1.5 rounded-full border border-[#B7882A]/40 shadow-sm">
                RESEPSI WALIMAH
              </span>

              <SpiritualDivider variant="simple" color="#B7882A" className="my-5" />

              <span className="font-spirit-body text-[9px] uppercase tracking-widest text-[#7A6E5E]/80 block font-bold">
                {formatDayName(data.resepsiDate)}
              </span>
              <span className="font-spirit-serif font-bold text-2xl text-[#B7882A] block my-1">
                {formatLongDate(data.resepsiDate)}
              </span>
              <span className="font-spirit-body text-xs text-[#1B4332]/85 font-semibold tracking-wide">
                Pukul {formatTime(data.resepsiDate)} WIB
              </span>

              <SpiritualDivider variant="simple" color="#B7882A" className="my-5" />

              <span className="font-spirit-serif font-bold text-lg text-[#1B4332] leading-snug block">
                {data.resepsiVenue}
              </span>
              <p className="font-spirit-body text-[10px] text-[#7A6E5E]/90 mt-2 max-w-xs leading-relaxed">
                {data.resepsiAddress}
              </p>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 w-full mt-8">
                <a
                  href={data.resepsiMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1B4332] text-[#FDFCFA] border border-[#B7882A]/40 py-3.5 rounded-xl font-spirit-body font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#2D6A4F] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin size={12} className="stroke-[2.5] text-[#B7882A]" />
                  Petunjuk Lokasi Maps
                </a>
                <button
                  onClick={() =>
                    handleAddToCalendar(
                      `Resepsi Walimah ${data.brideNickname} & ${data.groomNickname}`,
                      data.resepsiDate,
                      data.resepsiVenue,
                      data.resepsiAddress
                    )
                  }
                  className="bg-transparent border border-[#B7882A]/50 text-[#B7882A] py-3.5 rounded-xl font-spirit-body font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-[#B7882A]/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={12} className="stroke-[2.5]" />
                  Simpan Agenda
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Conditional Split Invitation Notification */}
        {isAkadOnly && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardAnims}
            className="p-5 border border-dashed border-[#B7882A]/40 rounded-2xl bg-[#F0EBE0]/20 text-center"
          >
            <span className="font-spirit-body text-[9px] uppercase tracking-widest text-[#B7882A] block mb-1 font-bold">
              MAKLUMAT WALIMAH KHUSUS
            </span>
            <p className="font-spirit-serif text-xs text-[#1B4332]/80 leading-relaxed max-w-xs mx-auto">
              Panjenengan dipun aturi secara khusus kagem menghadiri prosesi ijab kabul Akad Nikah kemawon, supados saged paring donga berkah &amp; restu dumateng kekalih mempelai secara langsung.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
