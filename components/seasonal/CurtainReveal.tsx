"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface CurtainRevealProps {
  isOpen: boolean;          // true = tirai terbuka, foto terlihat
  children: ReactNode;      // konten foto di balik tirai
  curtainColor?: string;    // default: terracotta
  curtainTexture?: boolean; // tampilkan motif di tirai
  height?: string;          // default: "100%"
}

export default function CurtainReveal({
  isOpen,
  children,
  curtainColor = "#C8856A",
  curtainTexture = true,
  height = "100%",
}: CurtainRevealProps) {
  return (
    <div className="relative overflow-hidden w-full" style={{ height }}>
      {/* Konten di balik tirai (foto) */}
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* Tirai KIRI */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="curtain-left"
            className="absolute top-0 left-0 h-full z-10 origin-left"
            style={{ width: "51%", transformOrigin: "left center" }}
            initial={{ scaleX: 1 }}
            exit={{
              scaleX: 0,
              transition: {
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1],  // custom easing — dramatis
                delay: 0.1,
              }
            }}
          >
            <CurtainPanel side="left" color={curtainColor} texture={curtainTexture} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tirai KANAN */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="curtain-right"
            className="absolute top-0 right-0 h-full z-10 origin-right"
            style={{ width: "51%", transformOrigin: "right center" }}
            initial={{ scaleX: 1 }}
            exit={{
              scaleX: 0,
              transition: {
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1,
              }
            }}
          >
            <CurtainPanel side="right" color={curtainColor} texture={curtainTexture} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtain rod di atas */}
      <div
        className="absolute top-0 left-0 right-0 z-20 h-3"
        style={{ backgroundColor: "#8B6520" }}
      >
        {/* Ring-ring tirai */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1 w-2 h-2 rounded-full border border-[#C9A96E]"
            style={{
              left: `${(i + 0.5) * 12.5}%`,
              backgroundColor: "#C9A96E",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Panel tirai dengan folds/lipatan
function CurtainPanel({ side, color, texture }: { side: "left" | "right"; color: string; texture: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: color }}>

      {/* Vertical fold lines — simulasi lipatan kain */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${(i + 1) * 16.67}%`,
            background: `linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)`,
          }}
        />
      ))}

      {/* Shading gradient untuk depth */}
      <div
        className="absolute inset-0"
        style={{
          background: side === "left"
            ? `linear-gradient(to right, rgba(0,0,0,0.15), transparent 60%, rgba(0,0,0,0.05))`
            : `linear-gradient(to left, rgba(0,0,0,0.15), transparent 60%, rgba(0,0,0,0.05))`,
        }}
      />

      {/* Bottom drape — tirai sedikit menggenang di bawah */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))`,
          borderRadius: "0 0 40% 40% / 0 0 20px 20px",
        }}
      />

      {/* Floral texture pada tirai (optional) */}
      {texture && (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`tirai-flower-${side}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="white" />
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={20 + Math.cos((angle * Math.PI) / 180) * 7}
                  cy={20 + Math.sin((angle * Math.PI) / 180) * 7}
                  rx="2.5" ry="4"
                  transform={`rotate(${angle}, ${20 + Math.cos((angle * Math.PI) / 180) * 7}, ${20 + Math.sin((angle * Math.PI) / 180) * 7})`}
                  fill="white"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#tirai-flower-${side})`} />
        </svg>
      )}

      {/* Fringe di bawah tirai */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-[#C9A96E]"
            style={{ height: `${16 + Math.sin(i * 0.8) * 6}px`, opacity: 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}
