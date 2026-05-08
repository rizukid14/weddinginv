"use client";
import React from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";
import SeasonalDivider from "./SeasonalDivider";

export default function SeasonalAkadResepsi({ data, tier }: { data: WeddingData; tier?: "akad" | "all" }) {
  return (
    <section className="py-20 px-6 relative bg-white z-0 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SeasonalDivider variant="ornate" />
        <h2 className="font-['Playfair_Display'] italic text-sm text-[#C8856A] tracking-[0.2em] uppercase mb-12">
          Rangkaian Acara
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12 max-w-[320px] mx-auto">
        {data.akadEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center bg-[#FDF6EE] p-8 rounded-t-full rounded-b-xl border border-[#C8856A]/20 shadow-md relative"
          >
            <div className="absolute top-4 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#C8856A]/30">
              <span className="font-['Satisfy'] text-lg text-[#8B4A35]">Akad</span>
            </div>
            
            <h3 className="font-['Great_Vibes'] text-4xl text-[#6B3D2E] mt-8 mb-4">Akad Nikah</h3>
            
            <div className="font-sans text-sm text-[#6B3D2E] flex flex-col gap-1 mb-6">
              <span className="font-semibold uppercase tracking-widest text-xs text-[#C8856A]">
                {new Date(data.akadDate!).toLocaleDateString("id-ID", { weekday: "long" })}
              </span>
              <span className="text-lg font-['Playfair_Display']">
                {new Date(data.akadDate!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span>
                Pukul {new Date(data.akadDate!).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
              </span>
            </div>

            <div className="font-sans text-sm text-[#6B3D2E] flex flex-col gap-2 mb-6">
              <span className="font-semibold">{data.akadVenue}</span>
              <span className="text-xs text-[#9A7B6A] leading-relaxed px-4">{data.akadAddress}</span>
            </div>

            {data.akadMapsUrl && (
              <a
                href={data.akadMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 bg-[#C8856A] hover:bg-[#8B4A35] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors"
              >
                Buka Peta Lokasi
              </a>
            )}
          </motion.div>
        )}

        {data.resepsiEnabled && (tier === "all") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center bg-[#FDF6EE] p-8 rounded-b-full rounded-t-xl border border-[#C8856A]/20 shadow-md relative"
          >
            <h3 className="font-['Great_Vibes'] text-4xl text-[#6B3D2E] mb-4">Resepsi</h3>
            
            <div className="font-sans text-sm text-[#6B3D2E] flex flex-col gap-1 mb-6">
              <span className="font-semibold uppercase tracking-widest text-xs text-[#C8856A]">
                {new Date(data.resepsiDate!).toLocaleDateString("id-ID", { weekday: "long" })}
              </span>
              <span className="text-lg font-['Playfair_Display']">
                {new Date(data.resepsiDate!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span>
                Pukul {new Date(data.resepsiDate!).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
              </span>
            </div>

            <div className="font-sans text-sm text-[#6B3D2E] flex flex-col gap-2 mb-6">
              <span className="font-semibold">{data.resepsiVenue}</span>
              <span className="text-xs text-[#9A7B6A] leading-relaxed px-4">{data.resepsiAddress}</span>
            </div>

            {data.resepsiMapsUrl && (
              <a
                href={data.resepsiMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-8 bg-[#C8856A] hover:bg-[#8B4A35] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors"
              >
                Buka Peta Lokasi
              </a>
            )}

            <div className="absolute bottom-4 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#C8856A]/30">
              <span className="text-lg">🥂</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
