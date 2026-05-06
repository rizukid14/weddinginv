"use client";

import React from "react";

interface IframePreviewProps {
  slug: string;
  refreshTrigger?: number;
}

export default function IframePreview({ slug, refreshTrigger = 0 }: IframePreviewProps) {
  const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "";
  const previewUrl = slug ? `${baseUrl}/${slug}?preview=true&t=${refreshTrigger}` : "";

  return (
    <div className="w-[280px] h-[560px] bg-[#110F0F] rounded-[44px] border-[10px] border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col select-none border-t-[12px] border-b-[12px]">
      {/* Dynamic Island Notch */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex justify-center items-center">
        {/* Small camera dot */}
        <div className="absolute right-3 w-1.5 h-1.5 bg-zinc-900 rounded-full" />
      </div>

      {/* Screen view wrapper with strict relative-absolute layout and rounded corners to prevent overflow bleed */}
      <div className="flex-1 w-full relative bg-zinc-950 overflow-hidden rounded-[32px]">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            className="absolute inset-0 w-full h-full border-none rounded-[32px] overflow-hidden"
            title="Pratinjau Undangan"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-zinc-600 animate-pulse mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            <p className="text-xs">Menunggu data slug undangan...</p>
          </div>
        )}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-zinc-700/60 rounded-full z-40" />
    </div>
  );
}
