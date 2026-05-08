"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloralSidebarProps {
  side: "left" | "right";
  variant?: "lily" | "rose" | "mixed";
  className?: string;
}

export default function FloralSidebar({ side, variant = "mixed", className = "" }: FloralSidebarProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax: bergerak lebih lambat dari scroll
  const y = useTransform(scrollYProgress, [0, 1], side === "left" ? [0, -120] : [0, -80]);
  // Gentle sway: kiri dan kanan bergerak sedikit berlawanan
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], side === "left" ? [-2, 1, -2] : [2, -1, 2]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className={`
        fixed top-0 ${side === "left" ? "left-0" : "right-0"}
        h-full w-[180px] pointer-events-none z-20
        hidden lg:block
        ${className}
      `}
    >
      <FloralIllustration side={side} variant={variant} />
      <FloatingLeaf side={side} delay={0} top="15%" />
      <FloatingLeaf side={side} delay={0.5} top="45%" />
      <FloatingLeaf side={side} delay={1.2} top="72%" />
    </motion.div>
  );
}

export function FloralIllustration({ side, variant, className = "" }: { side: "left" | "right"; variant?: string; className?: string }) {
  const flip = side === "right" ? "scale(-1,1)" : "";

  return (
    <svg
      viewBox="0 0 180 800"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      style={{ transform: flip }}
    >
      {/* Batang utama */}
      <path
        d="M 90 800 C 85 700 70 600 80 500 C 90 400 75 300 85 200 C 95 100 88 50 90 0"
        stroke="#8B6B47" strokeWidth="2" fill="none" opacity="0.6"
      />

      {/* LILY bunga besar */}
      <g transform="translate(60, 200) rotate(-15)">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 25}
            cy={Math.sin((angle * Math.PI) / 180) * 25}
            rx="8" ry="22"
            transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 25}, ${Math.sin((angle * Math.PI) / 180) * 25})`}
            fill="#E8A598" opacity="0.85"
          />
        ))}
        <circle cx="0" cy="0" r="8" fill="#D4845A" opacity="0.9" />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <line
            key={i}
            x1="0" y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 18}
            y2={Math.sin((angle * Math.PI) / 180) * 18}
            stroke="#8B6520" strokeWidth="0.8" opacity="0.7"
          />
        ))}
      </g>

      {/* Rose bud */}
      <g transform="translate(75, 380)">
        <ellipse cx="0" cy="-15" rx="12" ry="18" fill="#C9806A" opacity="0.8" />
        <ellipse cx="-10" cy="-8" rx="10" ry="16" fill="#D4906B" opacity="0.75" transform="rotate(-30)" />
        <ellipse cx="10" cy="-8" rx="10" ry="16" fill="#D4906B" opacity="0.75" transform="rotate(30)" />
        <ellipse cx="0" cy="-5" rx="8" ry="10" fill="#E8A080" opacity="0.9" />
        <path d="M -8 5 Q 0 15 8 5 Q 0 20 -8 5" fill="#5A6B47" opacity="0.8" />
      </g>

      {/* Daun-daun besar */}
      <path d="M 85 300 Q 130 280 140 320 Q 110 340 85 300" fill="#6B8B47" opacity="0.7" />
      <path d="M 80 450 Q 30 430 25 470 Q 55 490 80 450" fill="#5A7A3A" opacity="0.65" />
      <path d="M 88 550 Q 145 535 150 570 Q 120 590 88 550" fill="#6B8B47" opacity="0.6" />

      {/* Bunga kecil accent */}
      <g transform="translate(50, 500)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 10}
            cy={Math.sin((angle * Math.PI) / 180) * 10}
            rx="5" ry="8"
            transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 10}, ${Math.sin((angle * Math.PI) / 180) * 10})`}
            fill="#F5CBA7" opacity="0.8"
          />
        ))}
        <circle cx="0" cy="0" r="5" fill="#D4845A" />
      </g>

      {/* Bunga kecil di atas */}
      <g transform="translate(100, 120)">
        {[0, 90, 180, 270].map((angle, i) => (
          <ellipse
            key={i}
            cx={Math.cos((angle * Math.PI) / 180) * 8}
            cy={Math.sin((angle * Math.PI) / 180) * 8}
            rx="4" ry="7"
            transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 8}, ${Math.sin((angle * Math.PI) / 180) * 8})`}
            fill="#E8C4B0" opacity="0.85"
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#C9806A" />
      </g>

      {/* Scattered dots */}
      {[[40, 600], [120, 650], [60, 700], [100, 740]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#E8A598" opacity="0.5" />
      ))}
    </svg>
  );
}

function FloatingLeaf({ side, delay, top }: { side: "left" | "right"; delay: number; top: string }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, [side]: "20px" }}
      animate={{
        y: [0, -12, 0],
        rotate: side === "left" ? [-5, 5, -5] : [5, -5, 5],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg width="30" height="50" viewBox="0 0 30 50">
        <path d="M 15 0 Q 30 15 20 35 Q 15 45 10 35 Q 0 15 15 0" fill="#6B8B47" opacity="0.6" />
        <line x1="15" y1="5" x2="15" y2="40" stroke="#4A6B30" strokeWidth="0.8" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
