"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  foreground?: string;
  background?: string;
  className?: string;
}

export default function QRCodeDisplay({
  value,
  size = 192,
  foreground = "#000000",
  background = "#FFFFFF",
  className = "",
}: QRCodeDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    if (!value) {
      setLoading(false);
      return;
    }

    QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: size,
      color: {
        dark: foreground,
        light: background,
      },
    })
      .then((url) => {
        if (active) {
          setQrDataUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Gagal men-generate QR Code: ", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [value, size, foreground, background]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-white p-3 rounded-xl shadow-sm border border-gray-100 ${className}`}
        style={{ width: size + 24, height: size + 24 }}
      >
        <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
      </div>
    );
  }

  if (error || !qrDataUrl) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-red-100 text-red-500 text-xs ${className}`}
        style={{ width: size + 24, height: size + 24 }}
      >
        <span>Gagal memuat QR Code</span>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white p-3 rounded-xl inline-block shadow-sm border border-gray-100 ${className}`}
      style={{ width: size + 24 }}
    >
      <img
        src={qrDataUrl}
        alt="QR Code"
        width={size}
        height={size}
        className="mx-auto rounded select-none pointer-events-none"
      />
    </div>
  );
}
