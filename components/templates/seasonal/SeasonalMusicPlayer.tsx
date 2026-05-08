"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface Props {
  musicUrl: string;
  musicTitle: string;
}

export default function SeasonalMusicPlayer({ musicUrl, musicTitle }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initial play handler
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Autoplay failed:", err);
        setIsPlaying(false);
      });
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Global event listener for play trigger (from OpeningOverlay)
  useEffect(() => {
    const handlePlayMusic = () => {
      setIsPlaying(true);
    };
    window.addEventListener("play-music", handlePlayMusic);
    return () => window.removeEventListener("play-music", handlePlayMusic);
  }, []);

  if (!musicUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
      className="fixed bottom-6 right-4 z-40"
    >
      <div className="bg-[#C8856A] border border-[#C9A96E]/40 shadow-lg shadow-[#C8856A]/30 rounded-full px-4 py-2.5 flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 flex items-center justify-center bg-black/10 rounded-full hover:bg-black/20 transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause size={14} className="text-[#FDF6EE]" fill="currentColor" />
          ) : (
            <Play size={14} className="text-[#FDF6EE] ml-0.5" fill="currentColor" />
          )}
        </button>

        <span className="font-['Satisfy'] italic text-xs text-[#FDF6EE]/90 max-w-[100px] truncate">
          {musicTitle || "Wedding Song"}
        </span>

        {/* Animated flower icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FDF6EE" strokeWidth="1.5">
            <path d="M12 4V20M4 12H20M6.34315 6.34315L17.6569 17.6569M6.34315 17.6569L17.6569 6.34315" />
            <circle cx="12" cy="12" r="3" fill="#FDF6EE" />
          </svg>
        </motion.div>
      </div>

      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        className="hidden"
      />
    </motion.div>
  );
}
