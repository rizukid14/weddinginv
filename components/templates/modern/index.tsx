"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WeddingData } from "@/types/wedding";

// Internal Modern components
import ModernOpeningOverlay from "./ModernOpeningOverlay";
import ModernCover from "./ModernCover";
import ModernMempelai from "./ModernMempelai";
import ModernAkadResepsi from "./ModernAkadResepsi";
import ModernGallery from "./ModernGallery";
import ModernRSVP from "./ModernRSVP";
import ModernGift from "./ModernGift";
import ModernMusicPlayer from "./ModernMusicPlayer";
import ModernPasswordGate from "./ModernPasswordGate";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function ModernTemplate({ data, slug, guestName }: Props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(!data.passwordEnabled);

  const handleOpenInvitation = () => {
    setIsOverlayOpen(false);
    // Play music inside user gesture callback
    if (data.musicEnabled) {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--modern-black)] text-[var(--modern-white)] font-sans antialiased relative max-w-[430px] mx-auto shadow-2xl">
      {/* 1. Password Gate (If passwordEnabled and not verified yet) */}
      <AnimatePresence>
        {!passwordVerified && (
          <ModernPasswordGate
            correctPassword={data.password || "farhan2025"}
            onSuccess={() => setPasswordVerified(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Opening Overlay Screen */}
      <AnimatePresence>
        {passwordVerified && isOverlayOpen && (
          <ModernOpeningOverlay
            data={data}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Wedding Scrollable Contents */}
      {passwordVerified && !isOverlayOpen && (
        <main className="w-full flex flex-col relative bg-[var(--modern-black)]">
          <ModernCover data={data} />
          <ModernMempelai data={data} />
          <ModernAkadResepsi data={data} />
          <ModernGallery data={data} />
          <ModernRSVP data={data} slug={slug} guestName={guestName} />
          {data.giftEnabled && <ModernGift data={data} />}

          {/* 4. Sleek Wireframe Music Sound Deck */}
          {data.musicEnabled && (
            <ModernMusicPlayer
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
