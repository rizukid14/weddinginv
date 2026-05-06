"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WeddingData } from "@/types/wedding";

// Internal Brush components
import BrushOpeningOverlay from "./BrushOpeningOverlay";
import BrushCover from "./BrushCover";
import BrushMempelai from "./BrushMempelai";
import BrushAkadResepsi from "./BrushAkadResepsi";
import BrushGallery from "./BrushGallery";
import BrushRSVP from "./BrushRSVP";
import BrushGift from "./BrushGift";
import BrushMusicPlayer from "./BrushMusicPlayer";
import BrushPasswordGate from "./BrushPasswordGate";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function BrushTemplate({ data, slug, guestName }: Props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(!data.passwordEnabled);

  const handleOpenInvitation = () => {
    setIsOverlayOpen(false);
    // Play music directly inside user gesture callback
    if (data.musicEnabled) {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brush-paper)] text-[var(--brush-ink)] font-sans antialiased relative max-w-[430px] mx-auto shadow-2xl">
      {/* 1. Password Gate (If passwordEnabled and not verified yet) */}
      <AnimatePresence>
        {!passwordVerified && (
          <BrushPasswordGate
            correctPassword={data.password || "dimas2025"}
            onSuccess={() => setPasswordVerified(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Opening Overlay Screen */}
      <AnimatePresence>
        {passwordVerified && isOverlayOpen && (
          <BrushOpeningOverlay
            data={data}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Wedding Scrollable Contents */}
      {passwordVerified && !isOverlayOpen && (
        <main className="w-full flex flex-col relative">
          <BrushCover data={data} />
          <BrushMempelai data={data} />
          <BrushAkadResepsi data={data} />
          <BrushGallery data={data} />
          <BrushRSVP data={data} slug={slug} guestName={guestName} />
          {data.giftEnabled && <BrushGift data={data} />}

          {/* 4. Retro Cassette Music Sound Deck */}
          {data.musicEnabled && (
            <BrushMusicPlayer
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
