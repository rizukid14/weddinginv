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

export default function RetroMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
  return (
    <MusicPlayerBase
      musicUrl={musicUrl}
      musicTitle={musicTitle}
      isPlaying={isPlaying}
      onToggle={onToggle}
    >
      {({ isPlaying: activePlay, toggle, title }) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="fixed bottom-6 right-4 z-40 select-none cursor-pointer"
          onClick={toggle}
        >
          <div
            className={`flex items-center gap-3 px-5 py-3 shadow-lg border border-[var(--retro-ink)]/15 transition-colors duration-300 ${
              activePlay ? "bg-[var(--retro-terra)]" : "bg-[var(--retro-brown)]"
            }`}
            style={{
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              filter: "drop-shadow(2px 3px 0px rgba(31,26,20,0.15))",
            }}
          >
            {/* Gramophone / Spinning Vinyl SVG */}
            <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className={`w-full h-full fill-none stroke-[var(--retro-cream)] stroke-[5px] ${
                  activePlay ? "animate-[spin_5s_linear_infinite]" : ""
                }`}
              >
                {/* Outer vinyl grooves */}
                <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="35" />
                <circle cx="50" cy="50" r="25" />
                {/* Center label */}
                <circle cx="50" cy="50" r="12" fill="var(--retro-mustard)" stroke="none" />
                <circle cx="50" cy="50" r="4" fill="var(--retro-cream)" stroke="none" />
              </svg>

              {/* Tiny stylus arm overlying vinyl grooves */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full fill-none stroke-[var(--retro-cream)] stroke-[6px]"
              >
                <path d="M 15,15 L 42,20 L 45,45" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Track Title */}
            <div className="flex flex-col text-left">
              <span className="font-courier-prime text-[7px] font-black text-[var(--retro-mustard)] uppercase tracking-wider leading-none">
                {activePlay ? "NOW PLAYING //" : "PAUSED //"}
              </span>
              <span className="font-courier-prime text-[9px] font-bold text-[var(--retro-cream)] max-w-[85px] truncate mt-1">
                {title}
              </span>
            </div>

            {/* Action symbol button */}
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[var(--retro-cream)] border border-[var(--retro-cream)]/30 hover:bg-white/10 transition-colors">
              {activePlay ? <Pause size={9} fill="currentColor" /> : <Play size={9} fill="currentColor" className="ml-[1px]" />}
            </div>
          </div>
        </motion.div>
      )}
    </MusicPlayerBase>
  );
}
