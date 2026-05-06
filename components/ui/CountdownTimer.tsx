"use client";

import React, { useState, useEffect } from "react";

interface Props {
  targetDate: string; // ISO String format
}

export default function CountdownTimer({ targetDate }: Props) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate);

    const updateTimer = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        return;
      }

      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    };

    updateTimer(); // Initial run
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isPast) {
    return (
      <div className="text-center py-4 px-6 bg-white/10 backdrop-blur-sm rounded border border-white/20">
        <p className="font-serif italic text-lg text-white">
          Pernikahan telah berlangsung 🎉
        </p>
      </div>
    );
  }

  const items = [
    { value: days, label: "Hari" },
    { value: hours, label: "Jam" },
    { value: minutes, label: "Menit" },
    { value: seconds, label: "Detik" },
  ];

  return (
    <div className="flex gap-3 justify-center items-center w-full">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-black/20 backdrop-blur-md border border-white/10 px-3 py-2.5 rounded-lg flex flex-col items-center justify-center min-w-[4.25rem] shadow-lg"
        >
          <span className="font-serif text-2xl font-bold text-white tracking-tight leading-none mb-1">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="font-sans text-[8px] text-white/70 uppercase tracking-widest leading-none">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
