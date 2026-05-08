"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";
import MusicPlayerBase from "@/components/shared/MusicPlayerBase";
import { KawungOrnament } from "./CultureBatikSVG";

interface Props {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function CultureMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <MusicPlayerBase
      musicUrl={musicUrl}
      musicTitle={musicTitle}
      isPlaying={isPlaying}
      onToggle={onToggle}
    >
      {({ isPlaying: activePlay, toggle, title }) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-4 z-40 select-none flex items-center gap-2"
        >
          {/* Track title tooltip */}
          <AnimatePresence>
            {(hovered || !activePlay) && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-[#1A1208]/90 border border-[#C9973A]/40 py-2 px-3.5 rounded-xl shadow-lg backdrop-blur-sm flex flex-col text-right select-none pointer-events-none"
              >
                <span className="font-culture-body text-[7px] uppercase tracking-[0.2em] text-[#C9973A] leading-none">
                  {activePlay ? "NILAS GENDING" : "GENDING KENDEL"}
                </span>
                <span className="font-culture-body text-[9px] text-[#F9F3E8] max-w-[100px] truncate mt-1">
                  {title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Symmetrical rotating circle button */}
          <button
            onClick={toggle}
            className="w-12 h-12 rounded-full bg-[#6B3D2E] border border-[#C9973A]/60 flex items-center justify-center relative shadow-lg hover:bg-[#2C3E6B] transition-colors cursor-pointer group"
          >
            {/* Background spinning Kawung pattern */}
            <div
              className={`absolute inset-0 flex items-center justify-center p-0.5 pointer-events-none ${
                activePlay ? "animate-[spin_10s_linear_infinite]" : "opacity-40"
              }`}
            >
              <KawungOrnament size={42} color="#C9973A" animated={false} />
            </div>

            {/* Centered play/pause visual symbol */}
            <div className="relative z-10 text-[#F9F3E8] group-hover:scale-110 transition-transform">
              {activePlay ? (
                <Pause size={12} className="stroke-[2.5]" />
              ) : (
                <Play size={12} className="stroke-[2.5] ml-[1.5px]" />
              )}
            </div>
          </button>
        </motion.div>
      )}
    </MusicPlayerBase>
  );
}
