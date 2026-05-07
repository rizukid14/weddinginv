"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { WeddingData } from "@/types/wedding";

import SpiritualOpeningOverlay from "./SpiritualOpeningOverlay";
import SpiritualPasswordGate from "./SpiritualPasswordGate";
import SpiritualCover from "./SpiritualCover";
import SpiritualMempelai from "./SpiritualMempelai";
import SpiritualAkadResepsi from "./SpiritualAkadResepsi";
import SpiritualGallery from "./SpiritualGallery";
import SpiritualRSVP from "./SpiritualRSVP";
import SpiritualGift from "./SpiritualGift";
import SpiritualMusicPlayer from "./SpiritualMusicPlayer";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
  tier?: "akad" | "all";
}

export default function SpiritualTemplate({ data, slug, guestName, tier = "all" }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // By default, if password protection is disabled, bypass password gate
  useEffect(() => {
    if (!data.passwordEnabled) {
      setUnlocked(true);
    }
  }, [data.passwordEnabled]);

  // Lock scrolling while invitation is unopened or locked
  useEffect(() => {
    if (!unlocked || !opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [unlocked, opened]);

  const handleOpenInvitation = () => {
    setOpened(true);
    setIsPlaying(true); // Autoplay background sholawat upon clicking open
  };

  return (
    <div
      className="min-h-screen bg-[#FDFCFA] text-[#1B4332] flex flex-col max-w-[430px] mx-auto shadow-2xl relative overflow-hidden"
      style={
        {
          "--spirit-white": "#FDFCFA",
          "--spirit-pearl": "#F0EBE0",
          "--spirit-green": "#1B4332",
          "--spirit-green-lg": "#2D6A4F",
          "--spirit-gold": "#B7882A",
          "--spirit-gold-lg": "#D4A843",
          "--spirit-navy": "#1A2744",
          "--spirit-ink": "#1C1C1C",
          "--spirit-muted": "#7A6E5E",
        } as React.CSSProperties
      }
    >
      <AnimatePresence mode="wait">
        {/* 1. Secure Access Gate */}
        {!unlocked && (
          <SpiritualPasswordGate
            correctPassword={data.password || "bismillah"}
            onSuccess={() => setUnlocked(true)}
          />
        )}

        {/* 2. Invitation Opener Overlay */}
        {unlocked && !opened && (
          <SpiritualOpeningOverlay
            data={data}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Scrollable Content */}
      {unlocked && opened && (
        <>
          <SpiritualCover data={data} />
          <SpiritualMempelai data={data} />
          <SpiritualAkadResepsi data={data} tier={tier} />
          <SpiritualGallery data={data} />
          <SpiritualRSVP data={data} slug={slug} guestName={guestName} />
          <SpiritualGift data={data} />

          {/* Floating background audio widget */}
          {data.musicUrl && (
            <SpiritualMusicPlayer
              musicUrl={data.musicUrl}
              musicTitle={data.musicTitle || "Sholawat Thola'al Badru"}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying(!isPlaying)}
            />
          )}
        </>
      )}
    </div>
  );
}
