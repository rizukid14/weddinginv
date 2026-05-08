"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { KawungOrnament, ParangBorder } from "./CultureBatikSVG";

interface CultureDividerProps {
  variant?: "simple" | "ornate" | "border";
  animated?: boolean;
  color?: string;
  className?: string;
}

export default function CultureDivider({
  variant = "simple",
  animated = true,
  color = "#C9973A",
  className = "my-8",
}: CultureDividerProps) {
  if (variant === "border") {
    return <ParangBorder color={color} opacity={0.3} className={className} />;
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
        {/* Ornate decorative line left */}
        <motion.div
          className="h-[1.5px] flex-grow max-w-[80px]"
          style={{ backgroundColor: color, originX: 1 }}
          initial={animated ? "hidden" : "visible"}
          whileInView={animated ? "visible" : undefined}
          viewport={{ once: true }}
          variants={lineVariants}
        />
        {/* Floating parang wings + kawung center */}
        <div className="flex items-center gap-1">
          <span style={{ color }} className="text-xs opacity-75">≋</span>
          <KawungOrnament size={28} color={color} animated={animated} />
          <span style={{ color }} className="text-xs opacity-75">≋</span>
        </div>
        {/* Ornate decorative line right */}
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

  // Simple variant by default
  return (
    <div className={`flex items-center justify-center gap-4 w-full select-none ${className}`}>
      <motion.div
        className="h-[1px] flex-grow max-w-[60px]"
        style={{ backgroundColor: color, opacity: 0.5, originX: 1 }}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true }}
        variants={lineVariants}
      />
      <KawungOrnament size={20} color={color} animated={animated} />
      <motion.div
        className="h-[1px] flex-grow max-w-[60px]"
        style={{ backgroundColor: color, opacity: 0.5, originX: 0 }}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true }}
        variants={lineVariants}
      />
    </div>
  );
}
