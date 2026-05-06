import React from "react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-floral-cream w-full relative flex items-center justify-center">
      {/* Phone container mockup match */}
      <div className="w-full max-w-[430px] bg-floral-ivory min-h-screen border-x border-floral-blush/30 flex flex-col items-center justify-center px-8 text-center shadow-md">
        
        {/* Pulsating Vector Wreath Loading Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center animate-[spin-vinyl_8s_linear_infinite] mb-6">
          <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 text-floral-gold/40">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 text-floral-gold animate-pulse">
            <path d="M50 4 Q50 15, 55 10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M96 50 Q85 50, 90 55" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Elegant typography text */}
        <h3 className="font-serif italic text-xl text-floral-gold-deep">
          Memuat Undangan Elegan...
        </h3>
        <p className="font-sans text-[9px] uppercase tracking-widest text-floral-muted/60 mt-1.5">
          RizuInvitation &copy; 2026
        </p>
      </div>
    </div>
  );
}
