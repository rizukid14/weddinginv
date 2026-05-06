"use client";

import React from "react";
import { motion as dMotion } from "framer-motion";
import { MapPin, Calendar, Heart } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function AkadResepsiSection({ data }: Props) {
  // Helper to format dates for Indonesian locale
  const formatDateString = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTimeString = (dateStr: string) => {
    const date = new Date(dateStr);
    const hrs = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");
    return `${hrs}.${mins} WIB – selesai`;
  };

  // Helper to generate calendar .ics file and trigger download
  const generateICS = (
    title: string,
    venue: string,
    address: string,
    dateStr: string
  ) => {
    const startDate = new Date(dateStr);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const formatICSDate = (date: Date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EnixDesign//Wedding//ID",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@enixdesign.com`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${title} - ${data.brideNickname} & ${data.groomNickname}`,
      `LOCATION:${venue}, ${address}`,
      `DESCRIPTION:Undangan Pernikahan ${data.brideName} & ${data.groomName}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}-wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <dMotion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-floral-ivory relative z-10"
    >
      {/* Header */}
      <dMotion.div variants={fadeUp} className="text-center">
        <FloralDivider variant="branch" />
        <h2 className="font-serif text-3xl text-floral-text font-medium mt-2">
          Waktu & Tempat
        </h2>
        <p className="font-sans text-xs text-floral-muted italic max-w-xs mx-auto mt-3 leading-relaxed">
          Dengan segala kerendahan hati dan rasa syukur, kami memohon doa restu serta kehadiran Bapak/Ibu/Saudara/i pada hari bahagia kami:
        </p>
      </dMotion.div>

      {/* Cards stack */}
      <div className="flex flex-col gap-6 mt-12 max-w-sm mx-auto">
        {/* AKAD NIKAH CARD */}
        {data.akadEnabled && (
          <dMotion.div
            variants={fadeUp}
            className="bg-white border border-floral-blush rounded-2xl p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
          >
            {/* Mosque SVG decoration */}
            <div className="w-12 h-12 rounded-full bg-floral-cream flex items-center justify-center text-floral-gold mb-4 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
                <path d="M12 2 L4 8 V20 H20 V8 L12 2 Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6 V12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20 V15 C9 13.5, 10.5 12, 12 12 C13.5 12, 15 13.5, 15 15 V20" strokeLinecap="round" />
                <circle cx="12" cy="4" r="1" fill="currentColor" />
              </svg>
            </div>

            <span className="font-sans text-[10px] uppercase tracking-widest text-floral-gold font-semibold">
              Akad Nikah
            </span>
            <div className="w-12 h-[1px] bg-floral-blush my-3" />

            <h4 className="font-serif text-lg font-semibold text-floral-text">
              {formatDateString(data.akadDate)}
            </h4>
            <p className="font-sans text-xs text-floral-muted mt-1">
              {formatTimeString(data.akadDate)}
            </p>

            <h5 className="font-serif italic text-base text-floral-gold-deep font-medium mt-4">
              {data.akadVenue}
            </h5>
            <p className="font-sans text-xs text-floral-muted max-w-xs leading-relaxed mt-1">
              {data.akadAddress}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col gap-3 items-center w-full mt-6">
              <a
                href={data.akadMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-floral-gold hover:bg-floral-gold hover:text-white text-floral-gold-deep transition-all duration-300 py-2.5 text-[10px] tracking-widest uppercase font-semibold rounded flex items-center justify-center gap-1.5"
              >
                <MapPin size={12} />
                Lihat Peta
              </a>
              <button
                onClick={() =>
                  generateICS(
                    "Akad Nikah",
                    data.akadVenue,
                    data.akadAddress,
                    data.akadDate
                  )
                }
                className="text-[10px] font-sans text-floral-muted hover:text-floral-gold uppercase tracking-widest flex items-center gap-1 underline underline-offset-2 hover:no-underline transition-all"
              >
                <Calendar size={11} />
                Simpan ke Kalender
              </button>
            </div>
          </dMotion.div>
        )}

        {/* RESEPSI CARD */}
        {data.resepsiEnabled && (
          <dMotion.div
            variants={fadeUp}
            className="bg-white border border-floral-blush rounded-2xl p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
          >
            {/* Reception Glass/Building SVG */}
            <div className="w-12 h-12 rounded-full bg-floral-cream flex items-center justify-center text-floral-gold mb-4 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
                <path d="M3 21 H21" strokeLinecap="round" />
                <path d="M5 21 V5 C5 3.9, 5.9 3, 7 3 H17 C18.1 3, 19 3.9, 19 5 V21" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 21 V17 H14 V21" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="15" y2="11" />
              </svg>
            </div>

            <span className="font-sans text-[10px] uppercase tracking-widest text-floral-gold font-semibold">
              Resepsi Pernikahan
            </span>
            <div className="w-12 h-[1px] bg-floral-blush my-3" />

            <h4 className="font-serif text-lg font-semibold text-floral-text">
              {formatDateString(data.resepsiDate)}
            </h4>
            <p className="font-sans text-xs text-floral-muted mt-1">
              {formatTimeString(data.resepsiDate)}
            </p>

            <h5 className="font-serif italic text-base text-floral-gold-deep font-medium mt-4">
              {data.resepsiVenue}
            </h5>
            <p className="font-sans text-xs text-floral-muted max-w-xs leading-relaxed mt-1">
              {data.resepsiAddress}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col gap-3 items-center w-full mt-6">
              <a
                href={data.resepsiMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-floral-gold hover:bg-floral-gold hover:text-white text-floral-gold-deep transition-all duration-300 py-2.5 text-[10px] tracking-widest uppercase font-semibold rounded flex items-center justify-center gap-1.5"
              >
                <MapPin size={12} />
                Lihat Peta
              </a>
              <button
                onClick={() =>
                  generateICS(
                    "Resepsi Pernikahan",
                    data.resepsiVenue,
                    data.resepsiAddress,
                    data.resepsiDate
                  )
                }
                className="text-[10px] font-sans text-floral-muted hover:text-floral-gold uppercase tracking-widest flex items-center gap-1 underline underline-offset-2 hover:no-underline transition-all"
              >
                <Calendar size={11} />
                Simpan ke Kalender
              </button>
            </div>
          </dMotion.div>
        )}
      </div>

      {/* Footer */}
      <dMotion.div variants={fadeUp} className="mt-12 text-center">
        <FloralDivider variant="ornate" />
      </dMotion.div>
    </dMotion.section>
  );
}
