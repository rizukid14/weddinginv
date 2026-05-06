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

export default function BrushMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
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
          className="fixed bottom-6 left-4 z-40 select-none pointer-events-auto"
        >
          {/* Cardboard-styled flat casing */}
          <div className="bg-[var(--brush-paper)] border-2 border-[var(--brush-ink)] shadow-lg px-3.5 py-2.5 flex items-center gap-3 relative overflow-hidden">
            {/* Ink splatter watermark in deck bg */}
            <div className="absolute inset-0 opacity-[0.03] bg-[var(--brush-ink)] pointer-events-none" />

            {/* Retro Cassette tape SVG graphic */}
            <div className="relative w-12 h-8 flex-shrink-0 flex items-center justify-center bg-zinc-800 border border-zinc-700 p-0.5 rounded-sm">
              <svg viewBox="0 0 100 60" className="w-full h-full text-zinc-400">
                {/* Outer cassette window border */}
                <rect x="5" y="5" width="90" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Center clear plastic label plate */}
                <rect x="25" y="15" width="50" height="30" fill="#3F3F3F" stroke="currentColor" strokeWidth="1" />
                
                {/* Left Spool */}
                <circle cx="38" cy="30" r="10" fill="#1C1C1C" />
                <circle
                  cx="38"
                  cy="30"
                  r="6"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  className={activePlay ? "vinyl-spinning" : "vinyl-spinning vinyl-paused"}
                  fill="none"
                />

                {/* Right Spool */}
                <circle cx="62" cy="30" r="10" fill="#1C1C1C" />
                <circle
                  cx="62"
                  cy="30"
                  r="6"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  className={activePlay ? "vinyl-spinning" : "vinyl-spinning vinyl-paused"}
                  fill="none"
                />

                {/* Cassette trapezoid shield at bottom */}
                <polygon points="30,48 70,48 65,56 35,56" fill="#2C2C2C" />
              </svg>

              {/* Floating micro music note indicator */}
              {activePlay && (
                <span className="absolute -top-1 -right-1 text-[var(--brush-accent)] animate-pulse">
                  <Music size={9} />
                </span>
              )}
            </div>

            {/* Song details */}
            <div className="flex flex-col min-w-0 pr-1 select-none">
              <span className="font-brush-body text-[7px] uppercase tracking-wider text-[var(--brush-muted)] leading-none font-bold">
                Bgm Tape
              </span>
              <span className="font-brush-body text-[10px] text-[var(--brush-ink)] font-bold truncate max-w-[80px] leading-tight mt-1">
                {title}
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={toggle}
              className="w-7 h-7 rounded-none bg-[var(--brush-ink)] text-[var(--brush-paper)] hover:bg-[var(--brush-ink-soft)] flex items-center justify-center transition-colors shadow-sm focus:outline-none"
            >
              {activePlay ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
            </button>
          </div>
        </motion.div>
      )}
    </MusicPlayerBase>
  );
}
