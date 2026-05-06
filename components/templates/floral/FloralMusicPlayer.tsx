"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";
import MusicPlayerBase from "@/components/shared/MusicPlayerBase";

interface Props {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function FloralMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
  return (
    <MusicPlayerBase
      musicUrl={musicUrl}
      musicTitle={musicTitle}
      isPlaying={isPlaying}
      onToggle={onToggle}
    >
      {({ isPlaying: activePlay, toggle, title }) => (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-4 z-40 select-none pointer-events-auto"
        >
          <div className="bg-floral-ivory border border-floral-blush shadow-lg shadow-floral-blush/30 rounded-full px-4 py-2.5 flex items-center gap-3">
            {/* Spinning Vinyl Disc */}
            <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className={`w-full h-full text-[#2C2424] ${
                  activePlay ? "vinyl-spinning" : "vinyl-spinning vinyl-paused"
                }`}
              >
                {/* Outer vinyl ring */}
                <circle cx="50" cy="50" r="48" fill="currentColor" />
                <circle cx="50" cy="50" r="44" stroke="#FFF" strokeWidth="0.5" strokeDasharray="1 3" />
                {/* Concentric sound grooves */}
                <circle cx="50" cy="50" r="38" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />
                <circle cx="50" cy="50" r="28" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />
                {/* Label in gold center */}
                <circle cx="50" cy="50" r="18" fill="var(--floral-gold)" />
                {/* Center hole */}
                <circle cx="50" cy="50" r="4" fill="var(--floral-ivory)" />
              </svg>
              {/* Small music note floating overlay */}
              {activePlay && (
                <span className="absolute -top-1.5 -right-1.5 text-floral-rose animate-pulse">
                  <Music size={10} />
                </span>
              )}
            </div>

            {/* Truncated Song Title */}
            <div className="flex flex-col min-w-0 pr-1 select-none">
              <span className="font-sans text-[8px] uppercase tracking-widest text-floral-muted leading-none">
                Music
              </span>
              <span className="font-sans text-[10px] text-floral-text font-semibold truncate max-w-[90px] leading-tight mt-0.5">
                {title}
              </span>
            </div>

            {/* Play / Pause Action Button */}
            <button
              onClick={toggle}
              className="w-7 h-7 rounded-full bg-floral-gold/15 hover:bg-floral-gold/25 text-floral-gold-deep flex items-center justify-center transition-colors shadow-sm focus:outline-none"
            >
              {activePlay ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
            </button>
          </div>
        </motion.div>
      )}
    </MusicPlayerBase>
  );
}

