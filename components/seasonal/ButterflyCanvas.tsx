"use client";
import { useEffect, useRef } from "react";

interface Butterfly {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  wingPhase: number;       // 0-2π, untuk animasi kepakan sayap
  wingSpeed: number;       // kecepatan kepak
  color: string;
  opacity: number;
  // Bezier control points untuk flight path yang natural
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  progress: number;        // 0-1, progress sepanjang bezier path
  pathSpeed: number;
  startX: number;
  startY: number;
}

const BUTTERFLY_COLORS = [
  "#D4845A",  // terracotta
  "#E8A598",  // dusty rose
  "#C9A96E",  // gold
  "#8B6520",  // amber
  "#F5CBA7",  // peach
];

export default function ButterflyCanvas({
  count = 8,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterfliesRef = useRef<Butterfly[]>([]);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize butterflies
    butterfliesRef.current = Array.from({ length: count }, (_, i) =>
      createButterfly(canvas, i)
    );

    const drawWing = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      wingAngle: number,   // 0 = fully open, π/3 = half closed
      side: "left" | "right",
      color: string
    ) => {
      // Upper wing (larger)
      ctx.beginPath();
      const dir = side === "left" ? -1 : 1;
      const wx = x + dir * Math.cos(wingAngle) * size * 1.2;
      const wy = y - size * 0.4;

      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        x + dir * size * 0.3, y - size * 1.2,
        x + dir * size * 1.5 * Math.cos(wingAngle), y - size * 0.8,
        wx, wy
      );
      ctx.bezierCurveTo(
        x + dir * size * 1.2 * Math.cos(wingAngle), y + size * 0.3,
        x + dir * size * 0.5 * Math.cos(wingAngle), y + size * 0.2,
        x, y
      );

      ctx.fillStyle = color;
      ctx.fill();

      // Lower wing (smaller)
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        x + dir * size * 0.8 * Math.cos(wingAngle), y + size * 0.2,
        x + dir * size * 0.9 * Math.cos(wingAngle), y + size * 0.9,
        x + dir * Math.cos(wingAngle) * size * 0.6, y + size * 0.8
      );
      ctx.bezierCurveTo(
        x + dir * size * 0.3 * Math.cos(wingAngle), y + size * 0.9,
        x + dir * size * 0.1, y + size * 0.6,
        x, y
      );
      ctx.fill();
    };

    const drawButterfly = (b: Butterfly) => {
      // Wing angle oscillates: 0 (open) to π/2.5 (closed)
      const wingAngle = (Math.sin(b.wingPhase) * 0.5 + 0.5) * (Math.PI / 2.5);

      ctx.save();
      ctx.globalAlpha = b.opacity;

      // Body color (darker)
      const bodyColor = b.color + "CC";
      // Wing color (lighter, semi-transparent)
      const wingColor = b.color + "99";

      // Left wing
      drawWing(ctx, b.x, b.y, b.size, wingAngle, "left", wingColor);
      // Right wing
      drawWing(ctx, b.x, b.y, b.size, wingAngle, "right", wingColor);

      // Body (small ellipse)
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.size * 0.08, b.size * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = bodyColor;
      ctx.fill();

      // Antennae
      ctx.beginPath();
      ctx.moveTo(b.x, b.y - b.size * 0.3);
      ctx.quadraticCurveTo(b.x - b.size * 0.3, b.y - b.size * 0.8, b.x - b.size * 0.2, b.y - b.size);
      ctx.moveTo(b.x, b.y - b.size * 0.3);
      ctx.quadraticCurveTo(b.x + b.size * 0.3, b.y - b.size * 0.8, b.x + b.size * 0.2, b.y - b.size);
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    // Cubic bezier point calculator
    const bezierPoint = (
      t: number,
      p0: number, p1: number, p2: number, p3: number
    ) => {
      const u = 1 - t;
      return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      butterfliesRef.current.forEach((b, i) => {
        // Update wing flap
        b.wingPhase += b.wingSpeed;

        // Update position along bezier path
        b.progress += b.pathSpeed;

        if (b.progress >= 1) {
          // Generate new bezier path from current position
          butterfliesRef.current[i] = refreshButterflyPath(b, w, h);
          return;
        }

        // Calculate position on bezier curve
        b.x = bezierPoint(b.progress, b.startX, b.cp1x, b.cp2x, b.targetX);
        b.y = bezierPoint(b.progress, b.startY, b.cp1y, b.cp2y, b.targetY);

        // Fade in/out near edges
        const margin = 60;
        if (b.x < margin) b.opacity = Math.min(0.85, b.x / margin * 0.85);
        else if (b.x > w - margin) b.opacity = Math.min(0.85, (w - b.x) / margin * 0.85);
        else b.opacity = Math.min(0.85, b.opacity + 0.01);

        drawButterfly(b);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 15 }}
      aria-hidden="true"
    />
  );
}

function createButterfly(canvas: HTMLCanvasElement, index: number): Butterfly {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  const startX = Math.random() * w;
  const startY = Math.random() * h;
  const targetX = Math.random() * w;
  const targetY = Math.random() * h;

  return {
    x: startX,
    y: startY,
    startX,
    startY,
    targetX,
    targetY,
    speed: 0.5 + Math.random() * 0.5,
    size: 8 + Math.random() * 10,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.08 + Math.random() * 0.06,  // flap speed
    color: BUTTERFLY_COLORS[index % BUTTERFLY_COLORS.length],
    opacity: 0,
    // Random bezier control points for curved natural flight
    cp1x: Math.random() * w,
    cp1y: Math.random() * h,
    cp2x: Math.random() * w,
    cp2y: Math.random() * h,
    progress: 0,
    pathSpeed: 0.002 + Math.random() * 0.003,
  };
}

function refreshButterflyPath(b: Butterfly, w: number, h: number): Butterfly {
  return {
    ...b,
    startX: b.x,
    startY: b.y,
    targetX: Math.random() * w,
    targetY: Math.random() * h * 0.8,  // Kupu-kupu lebih sering di atas
    cp1x: Math.random() * w,
    cp1y: Math.random() * h,
    cp2x: Math.random() * w,
    cp2y: Math.random() * h,
    progress: 0,
    pathSpeed: 0.002 + Math.random() * 0.003,
  };
}
