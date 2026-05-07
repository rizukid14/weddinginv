"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { WeddingData } from "@/types/wedding";
import { CornerOrnament, KawungPattern, MegaMendungPattern } from "./CultureBatikSVG";
import CultureDivider from "./CultureDivider";

interface Props {
  data: WeddingData;
  tier?: "akad" | "all";
}

export default function CultureAkadResepsi({ data, tier = "all" }: Props) {
  const isAkadOnly = tier === "akad";

  const cardAnims = {
    hidden: { scale: 0.88, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const handleAddToCalendar = (title: string, dateStr: string, venue: string, address: string) => {
    const eventDate = new Date(dateStr);
    const startIso = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endIso = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      `Mengharap kehadiran Anda pada acara ${title} kami di ${venue} (${address})`
    )}&location=${encodeURIComponent(address)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-[#F9F3E8] select-none z-10">
      {/* 1. Background Layers */}
      <MegaMendungPattern color="#C9973A" opacity={0.04} />

      {/* 2. Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center mb-12 relative z-20"
      >
        <CultureDivider variant="ornate" color="#C9973A" className="mb-4" />
        <span className="font-culture-number text-xs tracking-[0.25em] text-[#C9973A] block mb-2">
          SASMITO RECORO ACARA
        </span>
        <span className="font-culture-subheading italic text-xs text-[#8A7055] uppercase tracking-widest block">
          Waktu & Lokasi Acara
        </span>
      </motion.div>

      {/* 3. Event Cards Grid */}
      <div className="flex flex-col gap-10 max-w-sm mx-auto relative z-20">
        
        {/* EVENT 1: AKAD NIKAH */}
        {data.akadEnabled && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardAnims}
            className="bg-[#EFE4CC] border border-[#C9973A]/30 rounded-2xl p-8 text-center relative overflow-hidden shadow-md"
          >
            {/* Corner elements and background tiles inside card */}
            <KawungPattern size={32} color="#C9973A" opacity={0.04} />
            <CornerOrnament position="tl" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="tr" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="bl" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="br" size={24} color="#C9973A" animated={false} />

            <div className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <span className="bg-[#6B3D2E] text-[#F9F3E8] font-culture-body font-bold text-[8px] uppercase tracking-[0.25em] px-5 py-1.5 rounded-full border border-[#C9973A]/40 shadow-sm">
                AKAD NIKAH
              </span>

              <CultureDivider variant="simple" color="#C9973A" className="my-5" />

              {/* Day, Date, Time */}
              <span className="font-culture-body text-[9px] uppercase tracking-widest text-[#8A7055] block">
                {new Date(data.akadDate).toLocaleDateString("id-ID", { weekday: "long" })}
              </span>
              <span className="font-culture-number text-2xl font-bold text-[#8B6520] block my-1">
                {new Date(data.akadDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="font-culture-body text-xs text-[#6B3D2E]/80 font-medium tracking-wide">
                Pukul {new Date(data.akadDate).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} WIB
              </span>

              <CultureDivider variant="simple" color="#C9973A" className="my-5" />

              {/* Venue details */}
              <span className="font-culture-subheading italic text-lg text-[#6B3D2E] leading-snug font-semibold block">
                {data.akadVenue}
              </span>
              <p className="font-culture-body text-[10px] text-[#8A7055] mt-2.5 max-w-xs leading-relaxed">
                {data.akadAddress}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 w-full mt-8">
                <a
                  href={data.akadMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6B3D2E] text-[#F9F3E8] border border-[#C9973A]/50 py-3 rounded-xl font-culture-body font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#2C3E6B] transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin size={12} className="stroke-[2.5]" />
                  Mirsani Peta Lokasi
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
                  className="bg-transparent border border-[#C9973A] text-[#8B6520] py-3 rounded-xl font-culture-body font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-[#C9973A]/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={12} className="stroke-[2.5]" />
                  Simpan Kalender
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
            className="bg-[#EFE4CC] border border-[#C9973A]/30 rounded-2xl p-8 text-center relative overflow-hidden shadow-md"
          >
            {/* Corner elements and background tiles inside card */}
            <KawungPattern size={32} color="#C9973A" opacity={0.04} />
            <CornerOrnament position="tl" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="tr" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="bl" size={24} color="#C9973A" animated={false} />
            <CornerOrnament position="br" size={24} color="#C9973A" animated={false} />

            <div className="relative z-10 flex flex-col items-center">
              {/* Badge */}
              <span className="bg-[#6B3D2E] text-[#F9F3E8] font-culture-body font-bold text-[8px] uppercase tracking-[0.25em] px-5 py-1.5 rounded-full border border-[#C9973A]/40 shadow-sm">
                RESEPSI PERNIKAHAN
              </span>

              <CultureDivider variant="simple" color="#C9973A" className="my-5" />

              {/* Day, Date, Time */}
              <span className="font-culture-body text-[9px] uppercase tracking-widest text-[#8A7055] block">
                {new Date(data.resepsiDate).toLocaleDateString("id-ID", { weekday: "long" })}
              </span>
              <span className="font-culture-number text-2xl font-bold text-[#8B6520] block my-1">
                {new Date(data.resepsiDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="font-culture-body text-xs text-[#6B3D2E]/80 font-medium tracking-wide">
                Pukul {new Date(data.resepsiDate).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} WIB
              </span>

              <CultureDivider variant="simple" color="#C9973A" className="my-5" />

              {/* Venue details */}
              <span className="font-culture-subheading italic text-lg text-[#6B3D2E] leading-snug font-semibold block">
                {data.resepsiVenue}
              </span>
              <p className="font-culture-body text-[10px] text-[#8A7055] mt-2.5 max-w-xs leading-relaxed">
                {data.resepsiAddress}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 w-full mt-8">
                <a
                  href={data.resepsiMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6B3D2E] text-[#F9F3E8] border border-[#C9973A]/50 py-3 rounded-xl font-culture-body font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#2C3E6B] transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin size={12} className="stroke-[2.5]" />
                  Mirsani Peta Lokasi
                </a>
                <button
                  onClick={() =>
                    handleAddToCalendar(
                      `Resepsi Pernikahan ${data.brideNickname} & ${data.groomNickname}`,
                      data.resepsiDate,
                      data.resepsiVenue,
                      data.resepsiAddress
                    )
                  }
                  className="bg-transparent border border-[#C9973A] text-[#8B6520] py-3 rounded-xl font-culture-body font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-[#C9973A]/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={12} className="stroke-[2.5]" />
                  Simpan Kalender
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dynamic Split Invitation notification text */}
        {isAkadOnly && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardAnims}
            className="p-5 border border-dashed border-[#C9973A]/40 rounded-xl bg-[#EFE4CC]/30 text-center relative overflow-hidden"
          >
            <span className="font-culture-body text-[9px] uppercase tracking-widest text-[#8B6520] block mb-1">
              SERAT PRATELAN KHUSUS
            </span>
            <p className="font-culture-subheading italic text-xs text-[#6B3D2E]/80 leading-relaxed max-w-xs mx-auto">
              Panjenengan dipun aturi kanthi mirunggan kagem menghadiri prosesi Akad Nikah lan paring donga pangestu dumateng mempelai kekalih.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
