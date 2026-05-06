"use client";

import React, { useEffect, useRef } from "react";

interface MusicPlayerBaseProps {
  musicUrl: string;
  musicTitle: string;
  isPlaying: boolean;
  onToggle: () => void;
  children: (props: {
    isPlaying: boolean;
    toggle: () => void;
    title: string;
  }) => React.ReactNode;
}

export default function MusicPlayerBase({
  musicUrl,
  musicTitle,
  isPlaying,
  onToggle,
  children,
}: MusicPlayerBaseProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and initialize HTML5 Audio object on mount
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      // Cleanup: pause and release resources on unmount
      audio.pause();
      audio.src = "";
    };
  }, [musicUrl]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(
            "Autoplay was blocked or play was interrupted by browser policy: ",
            error
          );
          // If playback was blocked, toggle state back to false in parent
          if (isPlaying) {
            onToggle();
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, onToggle]);

  return <>{children({ isPlaying, toggle: onToggle, title: musicTitle })}</>;
}
