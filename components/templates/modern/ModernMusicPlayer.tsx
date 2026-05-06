"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import MusicPlayerBase from "@/components/shared/MusicPlayerBase";

interface Props {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function ModernMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
  return (
    <MusicPlayerBase
      musicUrl={musicUrl}
      musicTitle={musicTitle}
      isPlaying={isPlaying}
      onToggle={onToggle}
    >
      {({ isPlaying: activePlay, toggle, title }) => (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-4 z-40 select-none pointer-events-auto"
        >
          {/* Wireframe sleek block design */}
          <div className="bg-[var(--modern-dark)] border border-[var(--modern-mid)]/20 shadow-xl px-4 py-2.5 flex items-center gap-4 relative overflow-hidden">
            {/* Dynamic Waveform sound bars on the side */}
            <div className="flex items-end gap-0.5 w-6 h-5 flex-shrink-0 select-none">
              {[1, 2, 3, 4, 5].map((barId) => (
                <span
                  key={barId}
                  className="w-1 bg-[var(--modern-accent)]"
                  style={{
                    height: "100%",
                    transformOrigin: "bottom",
                    animation: activePlay
                      ? `float-petal ${0.6 + barId * 0.1}s ease-in-out infinite alternate`
                      : "none",
                    transform: activePlay ? "none" : "scaleY(0.15)",
                  }}
                />
              ))}
            </div>

            {/* Song details */}
            <div className="flex flex-col min-w-0 pr-1 select-none">
              <span className="font-modern-body text-[7px] uppercase tracking-[0.2em] text-[var(--modern-accent)] leading-none font-bold">
                AUDIO DECK //
              </span>
              <span className="font-modern-body text-[9px] text-[var(--modern-white)] font-bold truncate max-w-[85px] leading-tight mt-1 uppercase">
                {title}
              </span>
            </div>

            {/* Play/Pause action button */}
            <button
              onClick={toggle}
              className="w-7 h-7 rounded-none bg-[var(--modern-accent)] hover:opacity-90 text-black flex items-center justify-center transition-all focus:outline-none"
            >
              {activePlay ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
            </button>
          </div>
        </motion.div>
      )}
    </MusicPlayerBase>
  );
}
