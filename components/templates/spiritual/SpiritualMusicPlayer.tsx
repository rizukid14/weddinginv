"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import MusicPlayerBase from "@/components/shared/MusicPlayerBase";
import { CrescentStar } from "./SpiritualGeometric";

interface Props {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function SpiritualMusicPlayer({ musicUrl, musicTitle, isPlaying, onToggle }: Props) {
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
          {/* Audio Tooltip Info */}
          <AnimatePresence>
            {(hovered || !activePlay) && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-[#1B4332]/95 border border-[#B7882A]/30 py-2 px-3.5 rounded-xl shadow-lg backdrop-blur-sm flex flex-col text-right select-none pointer-events-none"
              >
                <span className="font-spirit-body text-[7px] uppercase tracking-[0.2em] text-[#B7882A] leading-none font-bold">
                  {activePlay ? "MENDENGAR SHOLAWAT" : "SHOLAWAT BERHENTI"}
                </span>
                <span className="font-spirit-body text-[9px] text-[#FDFCFA] max-w-[100px] truncate mt-1">
                  {title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Symmetrical Button */}
          <button
            onClick={toggle}
            className="w-12 h-12 rounded-full bg-[#1B4332] border border-[#B7882A]/50 flex items-center justify-center relative shadow-lg hover:bg-[#2D6A4F] transition-colors cursor-pointer group"
          >
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                activePlay ? "animate-[spin_12s_linear_infinite]" : "opacity-45"
              }`}
            >
              <CrescentStar size={38} color="#B7882A" />
            </div>

            {/* Play action icon overlay */}
            <div className="relative z-10 text-[#FDFCFA] group-hover:scale-110 transition-transform">
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
