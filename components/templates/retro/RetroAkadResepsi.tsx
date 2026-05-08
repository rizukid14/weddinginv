"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import RetroDivider from "./RetroDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface EventProps {
  data: WeddingData;
}

export default function RetroAkadResepsi({ data }: EventProps) {
  const formatRetroDate = (dateStr: string) => {
    try {
      const dObj = new Date(dateStr);
      const days = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
      const months = [
        "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
        "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
      ];
      return {
        dayName: days[dObj.getDay()],
        dateNum: String(dObj.getDate()).padStart(2, "0"),
        monthName: months[dObj.getMonth()],
        yearNum: dObj.getFullYear(),
        timeStr: dObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }) + " WIB"
      };
    } catch {
      return {
        dayName: "SABTU",
        dateNum: "04",
        monthName: "OKTOBER",
        yearNum: 2025,
        timeStr: "08:00 WIB"
      };
    }
  };

  const saveToCalendar = (title: string, dateStr: string, venue: string, address: string) => {
    try {
      const start = new Date(dateStr);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
      
      const formatISOStr = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
      
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatISOStr(start)}/${formatISOStr(end)}&details=${encodeURIComponent(`Pernikahan ${data.brideNickname} & ${data.groomNickname}`)}&location=${encodeURIComponent(`${venue}, ${address}`)}`;
      window.open(url, "_blank");
    } catch (err) {
      console.error("Gagal membuka kalender: ", err);
    }
  };

  const akad = formatRetroDate(data.akadDate);
  const resepsi = formatRetroDate(data.resepsiDate);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-[var(--retro-cream)] relative z-10 text-center overflow-hidden select-none"
    >
      {/* Halftone Dot background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] bg-[radial-gradient(var(--retro-brown)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* HEADER SECTION */}
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <RetroDivider variant="ornate" className="mb-4" />
        <RetroDivider variant="banner" text="✦ ACARA PERNIKAHAN ✦" fillColor="var(--retro-terra)" />
        <p className="font-serif italic text-sm text-[var(--retro-muted)] max-w-xs mx-auto mt-4 leading-relaxed font-semibold">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri perayaan pernikahan kami pada:
        </p>
        <RetroDivider variant="simple" className="mt-4 mb-12" />
      </motion.div>

      {/* CARDS CONTAINER */}
      <div className="flex flex-col gap-12 max-w-sm mx-auto relative z-10">

        {/* AKAD NIKAH CARD */}
        {data.akadEnabled && (
          <motion.div
            variants={fadeUp}
            className="bg-[var(--retro-warm)] p-8 text-center relative border-4 border-double border-[var(--retro-terra)]"
            style={{ filter: "drop-shadow(3px 4px 0px rgba(31,26,20,0.1))" }}
          >
            {/* Corner Stars */}
            <div className="absolute top-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute top-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute bottom-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute bottom-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>

            <RetroDivider variant="banner" text="AKAD NIKAH" fillColor="var(--retro-olive)" className="scale-90 my-1" />

            <RetroDivider variant="simple" className="my-2" />

            <span className="block font-courier-prime text-[9px] font-bold text-[var(--retro-muted)] tracking-[0.3em] uppercase mt-2">
              HARI {akad.dayName}
            </span>
            <span className="block font-retro-accent text-3xl text-[var(--retro-terra)] font-black tracking-widest mt-1">
              {akad.dateNum} {akad.monthName} {akad.yearNum}
            </span>
            <span className="block font-courier-prime text-xs font-bold text-[var(--retro-muted)] tracking-wider mt-1 uppercase">
              PUKUL {akad.timeStr}
            </span>

            <RetroDivider variant="simple" className="my-2" />

            <h4 className="font-serif text-lg font-bold text-[var(--retro-brown)] mt-4 leading-tight">
              {data.akadVenue}
            </h4>
            <p className="font-courier-prime text-[10px] text-[var(--retro-muted)] leading-relaxed mt-2 max-w-[240px] mx-auto uppercase">
              {data.akadAddress}
            </p>

            {/* BUTTONS SEGMENT */}
            <div className="flex flex-col gap-2.5 mt-8">
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={data.akadMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--retro-terra)] text-[var(--retro-cream)] w-full py-3 text-center cursor-pointer select-none font-retro-display text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[var(--retro-brown)] transition-colors shadow-sm"
              >
                ✦ LIHAT PETA VENUE ✦
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => saveToCalendar(`Akad Nikah ${data.brideNickname} & ${data.groomNickname}`, data.akadDate, data.akadVenue, data.akadAddress)}
                className="border border-[var(--retro-terra)] text-[var(--retro-terra)] w-full py-2.5 text-center cursor-pointer select-none font-courier-prime text-[9px] font-bold tracking-[0.15em] uppercase hover:bg-[var(--retro-terra)]/5 transition-all"
              >
                SIMPAN KE KALENDER
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* RESEPSI PERNIKAHAN CARD */}
        {data.resepsiEnabled && (
          <motion.div
            variants={fadeUp}
            className="bg-[var(--retro-warm)] p-8 text-center relative border-4 border-double border-[var(--retro-terra)]"
            style={{ filter: "drop-shadow(3px 4px 0px rgba(31,26,20,0.1))" }}
          >
            {/* Corner Stars */}
            <div className="absolute top-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute top-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute bottom-2 left-2 text-[var(--retro-mustard)] text-[8px]">✦</div>
            <div className="absolute bottom-2 right-2 text-[var(--retro-mustard)] text-[8px]">✦</div>

            <RetroDivider variant="banner" text="RESEPSI NIKAH" fillColor="var(--retro-terra)" className="scale-90 my-1" />

            <RetroDivider variant="simple" className="my-2" />

            <span className="block font-courier-prime text-[9px] font-bold text-[var(--retro-muted)] tracking-[0.3em] uppercase mt-2">
              HARI {resepsi.dayName}
            </span>
            <span className="block font-retro-accent text-3xl text-[var(--retro-terra)] font-black tracking-widest mt-1">
              {resepsi.dateNum} {resepsi.monthName} {resepsi.yearNum}
            </span>
            <span className="block font-courier-prime text-xs font-bold text-[var(--retro-muted)] tracking-wider mt-1 uppercase">
              PUKUL {resepsi.timeStr}
            </span>

            <RetroDivider variant="simple" className="my-2" />

            <h4 className="font-serif text-lg font-bold text-[var(--retro-brown)] mt-4 leading-tight">
              {data.resepsiVenue}
            </h4>
            <p className="font-courier-prime text-[10px] text-[var(--retro-muted)] leading-relaxed mt-2 max-w-[240px] mx-auto uppercase">
              {data.resepsiAddress}
            </p>

            {/* BUTTONS SEGMENT */}
            <div className="flex flex-col gap-2.5 mt-8">
              <motion.a
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={data.resepsiMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--retro-terra)] text-[var(--retro-cream)] w-full py-3 text-center cursor-pointer select-none font-retro-display text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[var(--retro-brown)] transition-colors shadow-sm"
              >
                ✦ LIHAT PETA VENUE ✦
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => saveToCalendar(`Resepsi Pernikahan ${data.brideNickname} & ${data.groomNickname}`, data.resepsiDate, data.resepsiVenue, data.resepsiAddress)}
                className="border border-[var(--retro-terra)] text-[var(--retro-terra)] w-full py-2.5 text-center cursor-pointer select-none font-courier-prime text-[9px] font-bold tracking-[0.15em] uppercase hover:bg-[var(--retro-terra)]/5 transition-all"
              >
                SIMPAN KE KALENDER
              </motion.button>
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}
