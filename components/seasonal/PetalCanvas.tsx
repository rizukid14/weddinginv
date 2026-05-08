"use client";
import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spinSpeed: number;
  opacity: number;
}

export default function PetalCanvas({ count = 15 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
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

    // Initialize petals
    const initPetals = () => {
      petalsRef.current = Array.from({ length: count }, () => createPetal(canvas));
    };
    initPetals();

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      // Draw a petal shape (teardrop / lens)
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, p.size / 2, p.size / 2, p.size, 0, p.size);
      ctx.bezierCurveTo(-p.size / 2, p.size, -p.size / 2, p.size / 2, 0, 0);
      
      // Petal color (dusty rose / blush tones)
      ctx.fillStyle = "#E8A598";
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      petalsRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spinSpeed;

        // Gentle sway horizontally
        p.x += Math.sin(p.angle) * 0.5;

        // Reset if off screen
        if (p.y > h + p.size || p.x > w + p.size || p.x < -p.size) {
          Object.assign(p, createPetal(canvas, true));
        }

        drawPetal(p);
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
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

function createPetal(canvas: HTMLCanvasElement, fromTop = false): Petal {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  return {
    x: Math.random() * w,
    y: fromTop ? -20 : Math.random() * h,
    size: 6 + Math.random() * 8, // Smaller and lighter
    speedY: 0.5 + Math.random() * 1, // Slow falling
    speedX: -0.5 + Math.random() * 1, // Slight horizontal drift
    angle: Math.random() * Math.PI * 2,
    spinSpeed: (Math.random() - 0.5) * 0.02,
    opacity: 0.4 + Math.random() * 0.4,
  };
}
