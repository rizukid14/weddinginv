"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { EightPointedStar, ArabesqueBorder } from "./SpiritualGeometric";

interface SpiritualDividerProps {
  variant?: "simple" | "ornate" | "border";
  animated?: boolean;
  color?: string;
  className?: string;
}

export default function SpiritualDivider({
  variant = "simple",
  animated = true,
  color = "#B7882A",
  className = "my-8",
}: SpiritualDividerProps) {
  if (variant === "border") {
    return <ArabesqueBorder color={color} opacity={0.3} className={className} />;
  }

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  if (variant === "ornate") {
    return (
      <div className={`flex items-center justify-center gap-4 w-full select-none ${className}`}>
        <motion.div
          className="h-[1.5px] flex-grow max-w-[80px]"
          style={{ backgroundColor: color, originX: 1 }}
          initial={animated ? "hidden" : "visible"}
          whileInView={animated ? "visible" : undefined}
          viewport={{ once: true }}
          variants={lineVariants}
        />
        <div className="flex items-center gap-1.5">
          <EightPointedStar size={24} color={color} animated={animated} />
        </div>
        <motion.div
          className="h-[1.5px] flex-grow max-w-[80px]"
          style={{ backgroundColor: color, originX: 0 }}
          initial={animated ? "hidden" : "visible"}
          whileInView={animated ? "visible" : undefined}
          viewport={{ once: true }}
          variants={lineVariants}
        />
      </div>
    );
  }

  // Simple variant
  return (
    <div className={`flex items-center justify-center gap-3 w-full select-none ${className}`}>
      <motion.div
        className="h-[1px] flex-grow max-w-[60px]"
        style={{ backgroundColor: color, opacity: 0.4, originX: 1 }}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true }}
        variants={lineVariants}
      />
      <EightPointedStar size={16} color={color} animated={animated} />
      <motion.div
        className="h-[1px] flex-grow max-w-[60px]"
        style={{ backgroundColor: color, opacity: 0.4, originX: 0 }}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true }}
        variants={lineVariants}
      />
    </div>
  );
}
