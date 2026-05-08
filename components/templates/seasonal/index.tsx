"use client";
import React, { useState, useEffect } from "react";
import { WeddingData } from "@/types/wedding";
import { motion } from "framer-motion";

// Shared Canvas & Decor
import ButterflyCanvas from "@/components/seasonal/ButterflyCanvas";
import PetalCanvas from "@/components/seasonal/PetalCanvas";
import FloralSidebar from "@/components/seasonal/FloralSidebar";

// Sections
import SeasonalOpeningOverlay from "./SeasonalOpeningOverlay";
import SeasonalCover from "./SeasonalCover";
import SeasonalMempelai from "./SeasonalMempelai";
import SeasonalOurStory from "./SeasonalOurStory";
import SeasonalAkadResepsi from "./SeasonalAkadResepsi";
import SeasonalGallery from "./SeasonalGallery";
import SeasonalRSVP from "./SeasonalRSVP";
import SeasonalGift from "./SeasonalGift";
import SeasonalThankYou from "./SeasonalThankYou";
import SeasonalMusicPlayer from "./SeasonalMusicPlayer";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
  tier?: "akad" | "all";
}

export default function SeasonalTemplate({ data, slug, guestName, tier = "all" }: Props) {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true); // true = overlay is showing, not clicked yet

  // Initialize state based on sessionStorage (so it doesn't replay on reload)
  useEffect(() => {
    const saved = sessionStorage.getItem(`curtain-${slug}`);
    if (saved === "open") {
      setIsCurtainOpen(true);
      setIsOverlayOpen(false); // skip overlay
      window.dispatchEvent(new Event("play-music")); // attempt auto-play
    }
  }, [slug]);

  const handleOpenInvitation = () => {
    setIsOverlayOpen(false);
    // Slight delay before opening curtain to let overlay fade out
    setTimeout(() => {
      setIsCurtainOpen(true);
      sessionStorage.setItem(`curtain-${slug}`, "open");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EE] font-sans selection:bg-[#E8A598] selection:text-white overflow-hidden relative">

      {/* 
        GLOBAL DECORATIONS 
        These span the entire page but are visually restricted by their CSS
      */}
      {/* Floral Sidebar (Only visible on lg screens) */}
      <FloralSidebar side="left" variant="lily" />
      <FloralSidebar side="right" variant="rose" />

      {/* Global Canvas Particles - They continue seamlessly from cover to bottom */}
      {!isOverlayOpen && (
        <>
          <div className="fixed inset-0 pointer-events-none z-15">
            <ButterflyCanvas count={8} />
          </div>
          <div className="fixed inset-0 pointer-events-none z-10">
            <PetalCanvas count={15} />
          </div>
        </>
      )}

      {/* Music Player */}
      {data.musicEnabled && data.musicUrl && (
        <SeasonalMusicPlayer musicUrl={data.musicUrl} musicTitle={data.musicTitle} />
      )}

      {/* Opening Overlay */}
      <SeasonalOpeningOverlay
        isOpen={!isOverlayOpen}
        onOpen={handleOpenInvitation}
        data={data}
        guestName={guestName}
      />

      {/* 
        MAIN CONTENT
        Restricted to max-w-[430px] to match mobile layout on all devices
      */}
      <main className="w-full max-w-[430px] mx-auto min-h-screen bg-white relative z-0 shadow-2xl">
        <SeasonalCover data={data} isCurtainOpen={isCurtainOpen} />
        <SeasonalMempelai data={data} isCurtainOpen={isCurtainOpen} />

        {data.ourStoryEnabled && (
          <SeasonalOurStory data={data} />
        )}

        <SeasonalAkadResepsi data={data} tier={tier} />
        <SeasonalGallery data={data} />
        <SeasonalRSVP data={data} guestName={guestName} />

        {data.giftEnabled && (
          <SeasonalGift data={data} />
        )}

        {data.thankYouEnabled && (
          <SeasonalThankYou data={data} />
        )}
      </main>
    </div>
  );
}
