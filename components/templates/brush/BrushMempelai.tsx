"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";
import BrushDivider from "./BrushDivider";

interface Props {
  data: WeddingData;
}

export default function BrushMempelai({ data }: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--brush-paper)] relative z-10 overflow-hidden text-left"
    >
      {/* Background Ink Drops */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] fill-[var(--brush-ink)]">
        <svg className="absolute top-[10%] right-[5%] w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="10" />
          <circle cx="30" cy="30" r="4" />
          <circle cx="70" cy="40" r="3" />
        </svg>
        <svg className="absolute bottom-[20%] left-[5%] w-32 h-32" viewBox="0 0 100 100">
          <circle cx="40" cy="50" r="8" />
          <circle cx="65" cy="30" r="5" />
          <circle cx="20" cy="70" r="3" />
        </svg>
      </div>

      {/* Opening Quote / Quran Verse */}
      <motion.div variants={fadeUp} className="max-w-sm mx-auto mb-16 text-center z-10 relative">
        <p className="font-brush-heading italic text-xs leading-relaxed text-[var(--brush-ink-soft)] px-2">
          &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <span className="font-brush-body text-[8px] uppercase tracking-widest text-[var(--brush-muted)] block mt-3 font-bold">
          — Ar-Rum: 21
        </span>
        <div className="flex justify-center mt-6">
          <BrushDivider variant="dots" />
        </div>
      </motion.div>

      {/* Mempelai Profiles list */}
      <div className="max-w-md mx-auto flex flex-col gap-20 z-10 relative">
        {/* GROOM SECTION */}
        <div className="flex flex-col items-start">
          {/* Polaroid wrap */}
          <motion.div
            variants={fadeUp}
            className="relative self-start mb-6 bg-white p-3 pb-8 border border-[var(--brush-ink)]/10 shadow-lg rotate-[-1.5deg] w-[70%] max-w-[210px]"
          >
            <div className="w-full aspect-[1/1] bg-[var(--brush-warm)] relative overflow-hidden">
              <Image
                src={data.groomPhoto}
                alt={data.groomName}
                fill
                className="object-cover"
                sizes="210px"
              />
            </div>
            {/* Washi tape on top left corner */}
            <div className="absolute top-[-6px] left-[-6px] w-12 h-3.5 bg-[var(--brush-sage)]/50 border-l border-r border-dashed border-[var(--brush-ink)]/10 rotate-[-45deg] opacity-75" />
          </motion.div>

          {/* Bio block */}
          <motion.div variants={fadeUp} className="pl-2">
            <span className="font-brush-accent text-lg text-[var(--brush-stroke)] select-none">
              The Groom
            </span>
            <h3 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight mt-1">
              {data.groomName}
            </h3>
            <p className="font-brush-body text-[11px] text-[var(--brush-muted)] italic leading-relaxed mt-1 select-none">
              Putra kedua dari pasangan
            </p>
            <p className="font-brush-heading text-xs text-[var(--brush-ink-soft)] font-bold mt-1.5 leading-tight">
              {data.groomFatherName} &amp; {data.groomMotherName}
            </p>

            {/* Instagram */}
            {data.groomInstagram && (
              <a
                href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-[var(--brush-stroke)] font-bold uppercase tracking-wider mt-4 hover:opacity-80 transition-opacity font-brush-body border-b border-dashed border-[var(--brush-stroke)] pb-0.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brush-stroke)]" width="10" height="10">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@{data.groomInstagram.replace("@", "")}</span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Separator Cross */}
        <div className="flex justify-center my-2 select-none">
          <BrushDivider variant="cross" className="mx-auto" />
        </div>

        {/* BRIDE SECTION */}
        <div className="flex flex-col items-end text-right">
          {/* Polaroid wrap */}
          <motion.div
            variants={fadeUp}
            className="relative self-end mb-6 bg-white p-3 pb-8 border border-[var(--brush-ink)]/10 shadow-lg rotate-[1.2deg] w-[70%] max-w-[210px]"
          >
            <div className="w-full aspect-[1/1] bg-[var(--brush-warm)] relative overflow-hidden">
              <Image
                src={data.bridePhoto}
                alt={data.brideName}
                fill
                className="object-cover"
                sizes="210px"
              />
            </div>
            {/* Washi tape on top right corner */}
            <div className="absolute top-[-6px] right-[-6px] w-12 h-3.5 bg-[var(--brush-accent)]/30 border-l border-r border-dashed border-[var(--brush-ink)]/10 rotate-[45deg] opacity-75" />
          </motion.div>

          {/* Bio block */}
          <motion.div variants={fadeUp} className="pr-2">
            <span className="font-brush-accent text-lg text-[var(--brush-stroke)] select-none">
              The Bride
            </span>
            <h3 className="font-brush-display text-2xl text-[var(--brush-ink)] font-normal tracking-tight mt-1">
              {data.brideName}
            </h3>
            <p className="font-brush-body text-[11px] text-[var(--brush-muted)] italic leading-relaxed mt-1 select-none">
              Putri pertama dari pasangan
            </p>
            <p className="font-brush-heading text-xs text-[var(--brush-ink-soft)] font-bold mt-1.5 leading-tight">
              {data.brideFatherName} &amp; {data.brideMotherName}
            </p>

            {/* Instagram */}
            {data.brideInstagram && (
              <a
                href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-[var(--brush-stroke)] font-bold uppercase tracking-wider mt-4 hover:opacity-80 transition-opacity font-brush-body border-b border-dashed border-[var(--brush-stroke)] pb-0.5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brush-stroke)]" width="10" height="10">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@{data.brideInstagram.replace("@", "")}</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
