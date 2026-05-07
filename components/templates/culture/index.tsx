"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { WeddingData } from "@/types/wedding";

import CultureOpeningOverlay from "./CultureOpeningOverlay";
import CulturePasswordGate from "./CulturePasswordGate";
import CultureCover from "./CultureCover";
import CultureMempelai from "./CultureMempelai";
import CultureAkadResepsi from "./CultureAkadResepsi";
import CultureGallery from "./CultureGallery";
import CultureRSVP from "./CultureRSVP";
import CultureGift from "./CultureGift";
import CultureMusicPlayer from "./CultureMusicPlayer";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
  tier?: "akad" | "all";
}

export default function CultureTemplate({ data, slug, guestName, tier = "all" }: Props) {
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
    setIsPlaying(true); // Autoplay background music upon clicking open
  };

  return (
    <div
      className="min-h-screen bg-[#F9F3E8] text-[#1A1208] flex flex-col max-w-[430px] mx-auto shadow-2xl relative overflow-hidden"
      style={
        {
          "--culture-cream": "#F9F3E8",
          "--culture-warm": "#EFE4CC",
          "--culture-sogan": "#6B3D2E",
          "--culture-indigo": "#2C3E6B",
          "--culture-gold": "#C9973A",
          "--culture-gold-deep": "#8B6520",
          "--culture-sage": "#5A6B47",
          "--culture-maroon": "#7A1F2E",
          "--culture-ink": "#1A1208",
          "--culture-muted": "#8A7055",
        } as React.CSSProperties
      }
    >
      <AnimatePresence mode="wait">
        {/* 1. Secure Access Gate */}
        {!unlocked && (
          <CulturePasswordGate
            correctPassword={data.password || "sasono"}
            onSuccess={() => setUnlocked(true)}
          />
        )}

        {/* 2. Invitation Opener Overlay */}
        {unlocked && !opened && (
          <CultureOpeningOverlay
            data={data}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Scrollable Content */}
      {unlocked && opened && (
        <>
          <CultureCover data={data} />
          <CultureMempelai data={data} />
          <CultureAkadResepsi data={data} tier={tier} />
          <CultureGallery data={data} />
          <CultureRSVP data={data} slug={slug} guestName={guestName} />
          <CultureGift data={data} />

          {/* Floating background audio widget */}
          {data.musicUrl && (
            <CultureMusicPlayer
              musicUrl={data.musicUrl}
              musicTitle={data.musicTitle || "Gamelan Sido Mukti"}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying(!isPlaying)}
            />
          )}
        </>
      )}
    </div>
  );
}
