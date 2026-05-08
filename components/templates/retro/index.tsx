"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WeddingData } from "@/types/wedding";

// Internal Retro theme components
import RetroOpeningOverlay from "./RetroOpeningOverlay";
import RetroPasswordGate from "./RetroPasswordGate";
import RetroCover from "./RetroCover";
import RetroMempelai from "./RetroMempelai";
import RetroAkadResepsi from "./RetroAkadResepsi";
import RetroGallery from "./RetroGallery";
import RetroRSVP from "./RetroRSVP";
import RetroGift from "./RetroGift";
import RetroMusicPlayer from "./RetroMusicPlayer";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function RetroTemplate({ data, slug, guestName }: Props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(!data.passwordEnabled);

  const handleOpenInvitation = () => {
    setIsOverlayOpen(false);
    if (data.musicEnabled) {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--retro-cream)] text-[var(--retro-ink)] antialiased relative max-w-[430px] mx-auto shadow-2xl overflow-x-hidden"
      style={{
        // Dynamic Injections of Retro Theme Tokens
        "--retro-cream": "#F5E6C8",
        "--retro-warm": "#EDD9A3",
        "--retro-mustard": "#D4A017",
        "--retro-terra": "#C1440E",
        "--retro-brown": "#6B3A2A",
        "--retro-olive": "#5C6B2E",
        "--retro-teal": "#2A6B6B",
        "--retro-ink": "#1F1A14",
        "--retro-muted": "#8A7355",
      } as React.CSSProperties}
    >
      {/* 1. Dynamic Password Gate (If required) */}
      <AnimatePresence>
        {!passwordVerified && (
          <RetroPasswordGate
            correctPassword={data.password || "2025"}
            onSuccess={() => setPasswordVerified(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Symmetrical Opening Overlay */}
      <AnimatePresence>
        {passwordVerified && isOverlayOpen && (
          <RetroOpeningOverlay
            data={data}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Wedding Scrollable Contents */}
      {passwordVerified && !isOverlayOpen && (
        <main className="w-full flex flex-col relative">
          <RetroCover data={data} />
          <RetroMempelai data={data} />
          <RetroAkadResepsi data={data} />
          <RetroGallery data={data} />
          <RetroRSVP data={data} slug={slug} guestName={guestName} />
          {data.giftEnabled && <RetroGift data={data} />}

          {/* 4. Gramophone Music sound player */}
          {data.musicEnabled && (
            <RetroMusicPlayer
              musicUrl={data.musicUrl}
              musicTitle={data.musicTitle}
              isPlaying={isMusicPlaying}
              onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
            />
          )}
        </main>
      )}
    </div>
  );
}
