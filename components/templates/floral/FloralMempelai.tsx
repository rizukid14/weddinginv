"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import FloralDivider from "@/components/ui/FloralDivider";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface Props {
  data: WeddingData;
}

export default function MempelaiSection({ data }: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="py-20 px-6 text-center bg-floral-cream relative overflow-hidden z-10"
    >
      {/* Botanical watermark in background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center z-0">
        <svg viewBox="0 0 400 400" className="w-96 h-96 text-floral-gold-deep stroke-current" fill="none">
          <path d="M200 40 C110 40, 40 110, 40 200 C40 290, 110 360, 200 360 C290 360, 360 290, 360 200" strokeWidth="1" />
          <path d="M200 40 Q250 150, 200 200 T200 360" strokeWidth="0.8" />
          <path d="M200 200 Q100 150, 40 200" strokeWidth="0.8" />
          <path d="M200 200 Q300 250, 360 200" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Header element */}
      <motion.div variants={fadeUp} className="z-10 relative">
        <FloralDivider variant="ornate" />
        <span className="font-sans text-xs tracking-widest uppercase text-floral-gold font-semibold mt-2 block">
          Mempelai
        </span>
        <blockquote className="font-serif italic text-base text-floral-text/80 max-w-xs mx-auto leading-relaxed mt-5">
          &ldquo;{data.openingQuote}&rdquo;
        </blockquote>
        <cite className="font-sans text-[11px] not-italic text-floral-muted mt-2 block">
          {data.openingQuoteSource}
        </cite>
        <FloralDivider variant="simple" className="mt-8" />
      </motion.div>

      {/* Mempelai Profiles Stack */}
      <div className="flex flex-col gap-16 mt-12 z-10 relative">
        {/* BRIDE (First) */}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          {/* Circular Frame + Wreath */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              className="absolute inset-0 w-full h-full text-floral-gold"
            >
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" />
              {/* Little leaf decorations */}
              <path d="M100 8 Q103 2, 106 8" fill="currentColor" />
              <path d="M192 100 Q198 103, 192 106" fill="currentColor" />
              <path d="M100 192 Q97 198, 94 192" fill="currentColor" />
              <path d="M8 100 Q2 97, 8 94" fill="currentColor" />
            </svg>

            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-floral-blush ring-offset-4 ring-offset-floral-cream shadow-md">
              <Image
                src={data.bridePhoto}
                alt={data.brideName}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-4.5xl text-floral-gold leading-none">
              {data.brideNickname}
            </h3>
            <h4 className="font-serif italic text-base text-floral-text font-medium mt-2">
              {data.brideName}
            </h4>
            {/* Divider line */}
            <div className="w-10 h-[1px] bg-floral-gold mx-auto my-3" />
            <p className="font-sans text-[9px] uppercase tracking-widest text-floral-muted">
              Putri tercinta dari:
            </p>
            <p className="font-sans text-sm text-floral-text font-medium mt-1">
              {data.brideFatherName}
            </p>
            <p className="font-sans text-xs text-floral-muted my-0.5">dan</p>
            <p className="font-sans text-sm text-floral-text font-medium">
              {data.brideMotherName}
            </p>
          </div>
        </motion.div>

        {/* Separator '&' with leaves */}
        <motion.div variants={fadeUp} className="flex justify-center items-center text-floral-gold">
          <svg viewBox="0 0 100 30" fill="none" className="w-24 h-8 text-floral-gold stroke-current">
            <path d="M10 15 H90" strokeWidth="0.5" />
            <path d="M40 10 Q50 20, 60 10" strokeWidth="0.8" />
            <circle cx="50" cy="15" r="4" fill="#F5EFE8" strokeWidth="0.8" />
            <path d="M48 13 L52 17" strokeWidth="0.8" />
            <path d="M52 13 L48 17" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* GROOM (Second) */}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          {/* Circular Frame + Wreath */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              className="absolute inset-0 w-full h-full text-floral-gold"
            >
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" />
              <path d="M100 8 Q103 2, 106 8" fill="currentColor" />
              <path d="M192 100 Q198 103, 192 106" fill="currentColor" />
              <path d="M100 192 Q97 198, 94 192" fill="currentColor" />
              <path d="M8 100 Q2 97, 8 94" fill="currentColor" />
            </svg>

            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-floral-blush ring-offset-4 ring-offset-floral-cream shadow-md">
              <Image
                src={data.groomPhoto}
                alt={data.groomName}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-4.5xl text-floral-gold leading-none">
              {data.groomNickname}
            </h3>
            <h4 className="font-serif italic text-base text-floral-text font-medium mt-2">
              {data.groomName}
            </h4>
            <div className="w-10 h-[1px] bg-floral-gold mx-auto my-3" />
            <p className="font-sans text-[9px] uppercase tracking-widest text-floral-muted">
              Putra tercinta dari:
            </p>
            <p className="font-sans text-sm text-floral-text font-medium mt-1">
              {data.groomFatherName}
            </p>
            <p className="font-sans text-xs text-floral-muted my-0.5">dan</p>
            <p className="font-sans text-sm text-floral-text font-medium">
              {data.groomMotherName}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer element */}
      <motion.div variants={fadeUp} className="mt-12 z-10 relative">
        <FloralDivider variant="branch" />
      </motion.div>
    </motion.section>
  );
}
