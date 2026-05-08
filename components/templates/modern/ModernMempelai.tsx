"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function ModernMempelai({ data }: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-8 bg-[var(--modern-black)] relative z-10 text-left overflow-hidden"
    >
      {/* Background Layout blueprints */}
      <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none z-0 border-l border-r border-[var(--modern-mid)]/[0.05]" />

      {/* High-fashion Quote */}
      <motion.div variants={fadeUp} className="max-w-sm mx-auto mb-20 text-center z-10 relative">
        <p className="font-modern-accent text-sm leading-relaxed text-[var(--modern-mid)] px-4">
          &ldquo;And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
        </p>
        <span className="font-modern-body text-[8px] uppercase tracking-[0.3em] text-[var(--modern-accent)] block mt-4 font-bold">
          [ ROMANS. 30:21 ]
        </span>
      </motion.div>

      {/* Profiles */}
      <div className="max-w-sm mx-auto flex flex-col gap-24 z-10 relative">
        {/* GROOM */}
        <div className="flex flex-col items-start w-full">
          {/* Grayscale zero-radius frame */}
          <motion.div
            variants={fadeUp}
            className="w-[85%] aspect-[1/1] relative overflow-hidden bg-[var(--modern-dark)] border border-[var(--modern-mid)]/[0.15] mb-6 group cursor-crosshair"
          >
            <Image
              src={data.groomPhoto}
              alt={data.groomName}
              fill
              className="object-cover filter grayscale contrast-115 group-hover:filter-none transition-all duration-700"
              sizes="300px"
            />
            {/* Top-right serial text */}
            <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 text-[7px] text-[var(--modern-white)] font-modern-body tracking-widest select-none">
              GRM // 01
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="pl-1">
            <span className="font-modern-body text-[8px] uppercase tracking-[0.3em] text-[var(--modern-accent)]">
              MEMBER.01 // GROOM
            </span>
            <h3 className="font-modern-display text-2xl font-black text-[var(--modern-white)] uppercase tracking-tight mt-1.5">
              {data.groomName}
            </h3>
            <div className="mt-3 font-modern-body text-[10px] text-[var(--modern-mid)]/60 leading-normal flex flex-col gap-0.5">
              <span>SON OF //</span>
              <span className="text-[var(--modern-white)] font-bold text-[10px] uppercase tracking-wide mt-0.5 leading-tight">
                {data.groomFatherName} &amp; {data.groomMotherName}
              </span>
            </div>

            {/* Instagram Link */}
            {data.groomInstagram && (
              <a
                href={`https://instagram.com/${data.groomInstagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--modern-dark)] border border-[var(--modern-mid)]/20 px-3 py-1.5 text-[8px] font-modern-body font-bold text-[var(--modern-white)] uppercase tracking-widest mt-5 hover:border-[var(--modern-accent)] transition-colors"
                style={{ borderRadius: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--modern-accent)]" width="10" height="10">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>IG: @{data.groomInstagram.replace("@", "")}</span>
              </a>
            )}
          </motion.div>
        </div>

        {/* BRIDE */}
        <div className="flex flex-col items-end w-full text-right">
          {/* Grayscale zero-radius frame */}
          <motion.div
            variants={fadeUp}
            className="w-[85%] aspect-[1/1] relative overflow-hidden bg-[var(--modern-dark)] border border-[var(--modern-mid)]/[0.15] mb-6 group cursor-crosshair"
          >
            <Image
              src={data.bridePhoto}
              alt={data.brideName}
              fill
              className="object-cover filter grayscale contrast-115 group-hover:filter-none transition-all duration-700"
              sizes="300px"
            />
            {/* Top-left serial text */}
            <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 text-[7px] text-[var(--modern-white)] font-modern-body tracking-widest select-none">
              BRD // 02
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="pr-1 flex flex-col items-end">
            <span className="font-modern-body text-[8px] uppercase tracking-[0.3em] text-[var(--modern-accent)]">
              MEMBER.02 // BRIDE
            </span>
            <h3 className="font-modern-display text-2xl font-black text-[var(--modern-white)] uppercase tracking-tight mt-1.5">
              {data.brideName}
            </h3>
            <div className="mt-3 font-modern-body text-[10px] text-[var(--modern-mid)]/60 leading-normal flex flex-col gap-0.5 items-end">
              <span>DAUGHTER OF //</span>
              <span className="text-[var(--modern-white)] font-bold text-[10px] uppercase tracking-wide mt-0.5 leading-tight text-right">
                {data.brideFatherName} &amp; {data.brideMotherName}
              </span>
            </div>

            {/* Instagram Link */}
            {data.brideInstagram && (
              <a
                href={`https://instagram.com/${data.brideInstagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--modern-dark)] border border-[var(--modern-mid)]/20 px-3 py-1.5 text-[8px] font-modern-body font-bold text-[var(--modern-white)] uppercase tracking-widest mt-5 hover:border-[var(--modern-accent)] transition-colors"
                style={{ borderRadius: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--modern-accent)]" width="10" height="10">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>IG: @{data.brideInstagram.replace("@", "")}</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
