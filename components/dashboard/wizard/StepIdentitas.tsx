"use client";

import React from "react";
import { WeddingData } from "@/types/wedding";

interface StepProps {
  data: Partial<WeddingData>;
  update: (updates: Partial<WeddingData>) => void;
}

export default function StepIdentitas({ data, update }: StepProps) {
  const handleChange = (field: keyof WeddingData, value: any) => {
    update({ [field]: value });
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans">
      {/* Step Title */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-50">Profil Mempelai</h2>
        <p className="text-xs text-zinc-400 mt-1">
          Data ini akan tampil di halaman utama undangan digital Anda.
        </p>
      </div>

      {/* Groom Section */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 mb-2 block">
          ♂ Mempelai Pria
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={data.groomName || ""}
              onChange={(e) => handleChange("groomName", e.target.value)}
              placeholder="Rizki Aditya Pratama"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Panggilan
            </label>
            <input
              type="text"
              value={data.groomNickname || ""}
              onChange={(e) => handleChange("groomNickname", e.target.value)}
              placeholder="Rizki"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Ayah
            </label>
            <input
              type="text"
              value={data.groomFatherName || ""}
              onChange={(e) => handleChange("groomFatherName", e.target.value)}
              placeholder="Bpk. Hendra Pratama"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Ibu
            </label>
            <input
              type="text"
              value={data.groomMotherName || ""}
              onChange={(e) => handleChange("groomMotherName", e.target.value)}
              placeholder="Ibu Sari Wulandari"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Bride Section */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 mb-2 block">
          ♀ Mempelai Wanita
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={data.brideName || ""}
              onChange={(e) => handleChange("brideName", e.target.value)}
              placeholder="Amira Putri Rahayu"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Panggilan
            </label>
            <input
              type="text"
              value={data.brideNickname || ""}
              onChange={(e) => handleChange("brideNickname", e.target.value)}
              placeholder="Amira"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Ayah
            </label>
            <input
              type="text"
              value={data.brideFatherName || ""}
              onChange={(e) => handleChange("brideFatherName", e.target.value)}
              placeholder="Bpk. Rahmat Hidayat"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Nama Ibu
            </label>
            <input
              type="text"
              value={data.brideMotherName || ""}
              onChange={(e) => handleChange("brideMotherName", e.target.value)}
              placeholder="Ibu Dewi Rahayu"
              className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold border-b border-zinc-800/80 pb-1.5 mb-2 block">
          📖 Kutipan / Ayat Pembuka
        </span>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Teks Ayat / Kutipan
          </label>
          <textarea
            rows={3}
            value={data.openingQuote || ""}
            onChange={(e) => handleChange("openingQuote", e.target.value)}
            placeholder="Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
            className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors resize-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
            Sumber Kutipan
          </label>
          <input
            type="text"
            value={data.openingQuoteSource || ""}
            onChange={(e) => handleChange("openingQuoteSource", e.target.value)}
            placeholder="QS. Ar-Rum: 21"
            className="w-full bg-[#221F1F] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 focus:border-amber-500 focus:outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
