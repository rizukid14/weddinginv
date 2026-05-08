import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: number;       // 0 = kelopak, 1 = daun kecil, 2 = dot
}

interface ParticleOptions {
  count?: number;           // default: 20
  colors?: string[];        // default: gold/brown palette
  minSize?: number;         // default: 4
  maxSize?: number;         // default: 10
  speedRange?: [number, number]; // default: [0.3, 0.8]
}

export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: ParticleOptions = {}
) {
  const animRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      count = 20,
      colors = ["#C9973A", "#8B6F47", "#D4A017", "#6B3A2A", "#5C6B2E"],
      minSize = 4,
      maxSize = 10,
      speedRange = [0.3, 0.8],
    } = options;

    // Resize canvas to match parent
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas, colors, minSize, maxSize, speedRange, true)
    );

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = colors[i % colors.length];

        if (p.type === 0) {
          // Kelopak bunga (ellipse)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 1) {
          // Daun kecil (teardrop)
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.7, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.7, 0, 0, -p.size);
          ctx.fill();
        } else {
          // Dot kecil
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Update position
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5; // gentle sway
        p.rotation += p.rotationSpeed;

        // Fade in/out
        if (p.y < 50) p.opacity = Math.min(0.7, (p.y / 50) * 0.7);
        if (p.y > canvas.height - 100) {
          p.opacity = Math.max(0, ((canvas.height - p.y) / 100) * 0.7);
        }

        // Reset if it exits bottom
        if (p.y > canvas.height + 20) {
          particlesRef.current[i] = createParticle(
            canvas, colors, minSize, maxSize, speedRange, false
          );
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [options]);
}

function createParticle(
  canvas: HTMLCanvasElement,
  colors: string[],
  minSize: number,
  maxSize: number,
  speedRange: [number, number],
  randomY: boolean
): Particle {
  return {
    x: Math.random() * canvas.width,
    y: randomY ? Math.random() * canvas.height : -20,
    size: minSize + Math.random() * (maxSize - minSize),
    speedY: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    speedX: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.5,
    opacity: 0,
    type: Math.floor(Math.random() * 3),
  };
}
