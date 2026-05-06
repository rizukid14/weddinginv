"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeddingData } from "@/types/wedding";
import OpeningOverlay from "./OpeningOverlay";
import PasswordGate from "./PasswordGate";
import CoverSection from "./CoverSection";
import MempelaiSection from "./MempelaiSection";
import AkadResepsiSection from "./AkadResepsiSection";
import GallerySection from "./GallerySection";
import RSVPSection from "./RSVPSection";
import GiftSection from "./GiftSection";
import MusicPlayer from "./MusicPlayer";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function WeddingInvitation({ data, slug, guestName }: Props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isPasswordGateOpen, setIsPasswordGateOpen] = useState(data.passwordEnabled);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Check if on client and has preview=true query search params
    const isPreview = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("preview") === "true";
    if (isPreview) {
      setIsOverlayOpen(false);
      setIsPasswordGateOpen(false);
    }
  }, [data.passwordEnabled]);

  const handleOpenInvitation = () => {
    setIsOverlayOpen(false);
    // Play music directly within user gesture handler to bypass browser autoplay blocks
    if (data.musicEnabled) {
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-floral-cream w-full relative">
      {/* Desktop simulated phone frame wrapper */}
      <div className="max-w-[430px] mx-auto bg-floral-ivory min-h-screen relative shadow-[0_0_50px_rgba(44,36,36,0.15)] border-x border-floral-blush/30 flex flex-col overflow-x-hidden">
        
        {/* Step 1: Welcome Splash Overlay */}
        <AnimatePresence mode="wait">
          {isOverlayOpen && (
            <OpeningOverlay
              data={data}
              guestName={guestName}
              onOpen={handleOpenInvitation}
            />
          )}
        </AnimatePresence>

        {/* Step 2: Password Authorization (Locks content behind gate) */}
        <AnimatePresence>
          {!isOverlayOpen && isPasswordGateOpen && data.passwordEnabled && (
            <PasswordGate
              correctPassword={data.password}
              onSuccess={() => setIsPasswordGateOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Step 3: Main Scrollable Wedding Content (Renders below lock screen) */}
        <div className={!isOverlayOpen && (!data.passwordEnabled || !isPasswordGateOpen) ? "block" : "hidden"}>
          <CoverSection data={data} />
          <MempelaiSection data={data} />
          <AkadResepsiSection data={data} />
          <GallerySection data={data} />
          <RSVPSection data={data} slug={slug} guestName={guestName} />
          <GiftSection data={data} />

          {/* Premium custom credits footer */}
          <footer className="py-8 bg-floral-cream text-center border-t border-floral-blush/20 select-none z-10 relative">
            <span className="font-display text-2xl text-floral-gold leading-none block mb-1">
              {data.brideNickname} &amp; {data.groomNickname}
            </span>
            <p className="font-sans text-[9px] uppercase tracking-widest text-floral-muted">
              Terima Kasih Atas Doa Restu Anda
            </p>
            <p className="font-sans text-[8px] text-floral-muted/40 mt-6 tracking-wide">
              Created with love by ENIX DESIGN &copy; 2026
            </p>
          </footer>
        </div>

        {/* Step 4: Floating Music Sound Deck */}
        {!isOverlayOpen && data.musicEnabled && (
          <MusicPlayer
            musicUrl={data.musicUrl}
            musicTitle={data.musicTitle}
            isPlaying={isMusicPlaying}
            onToggle={() => setIsMusicPlaying(!isMusicPlaying)}
          />
        )}
      </div>
    </div>
  );
}
