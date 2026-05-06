"use client";

import React from "react";
import { WeddingData } from "@/types/wedding";
import { ExternalLink, Calendar, MapPin } from "lucide-react";

interface StepProps {
  data: Partial<WeddingData>;
  update: (updates: Partial<WeddingData>) => void;
}

export default function StepAcara({ data, update }: StepProps) {
  const handleChange = (field: keyof WeddingData, value: any) => {
    update({ [field]: value });
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-50">Detail Acara Pernikahan</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Tentukan waktu, tanggal, nama gedung, dan maps lokasi acara Anda.
        </p>
      </div>

      {/* Akad Nikah Section */}
      <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Akad Nikah
            </span>
          </div>
          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => handleChange("akadEnabled", !data.akadEnabled)}
            className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-200 focus:outline-none ${
              data.akadEnabled ? "bg-amber-500" : "bg-zinc-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#110F0F] transition-transform duration-200 ${
                data.akadEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {data.akadEnabled && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Waktu &amp; Tanggal
                </label>
                <input
                  type="datetime-local"
                  value={data.akadDate ? data.akadDate.slice(0, 16) : ""}
                  onChange={(e) => handleChange("akadDate", e.target.value)}
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Nama Tempat / Gedung
                </label>
                <input
                  type="text"
                  value={data.akadVenue || ""}
                  onChange={(e) => handleChange("akadVenue", e.target.value)}
                  placeholder="Masjid Al-Ikhlas"
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Alamat Lengkap
              </label>
              <textarea
                rows={2}
                value={data.akadAddress || ""}
                onChange={(e) => handleChange("akadAddress", e.target.value)}
                placeholder="Jl. Raya Kebayoran Baru No. 12, Jakarta Selatan"
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Google Maps URL Tautan
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={data.akadMapsUrl || ""}
                  onChange={(e) => handleChange("akadMapsUrl", e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg pl-4 pr-10 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
                {data.akadMapsUrl && (
                  <a
                    href={data.akadMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 text-zinc-500 hover:text-amber-500 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resepsi Section */}
      <div className="flex flex-col gap-4 bg-zinc-900/10 border border-zinc-800/40 p-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-amber-500" />
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
              Resepsi Pernikahan
            </span>
          </div>
          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => handleChange("resepsiEnabled", !data.resepsiEnabled)}
            className={`w-11 h-6 rounded-full relative p-1 transition-colors duration-200 focus:outline-none ${
              data.resepsiEnabled ? "bg-amber-500" : "bg-zinc-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#110F0F] transition-transform duration-200 ${
                data.resepsiEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {data.resepsiEnabled && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Waktu &amp; Tanggal
                </label>
                <input
                  type="datetime-local"
                  value={data.resepsiDate ? data.resepsiDate.slice(0, 16) : ""}
                  onChange={(e) => handleChange("resepsiDate", e.target.value)}
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                  Nama Tempat / Gedung
                </label>
                <input
                  type="text"
                  value={data.resepsiVenue || ""}
                  onChange={(e) => handleChange("resepsiVenue", e.target.value)}
                  placeholder="The Grand Ballroom - Hotel Mulia"
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Alamat Lengkap
              </label>
              <textarea
                rows={2}
                value={data.resepsiAddress || ""}
                onChange={(e) => handleChange("resepsiAddress", e.target.value)}
                placeholder="Jl. Asia Afrika, Senayan, Jakarta"
                className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Google Maps URL Tautan
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={data.resepsiMapsUrl || ""}
                  onChange={(e) => handleChange("resepsiMapsUrl", e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg pl-4 pr-10 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
                />
                {data.resepsiMapsUrl && (
                  <a
                    href={data.resepsiMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 text-zinc-500 hover:text-amber-500 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Warning Banner */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex gap-3 select-none">
        <div className="text-amber-500 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <p className="text-xs text-amber-200/70 leading-relaxed font-medium">
          Waktu dan tanggal yang Anda masukkan pada bagian Resepsi otomatis akan menjadi target acuan utama untuk Countdown Timer di halaman depan undangan.
        </p>
      </div>
    </div>
  );
}
