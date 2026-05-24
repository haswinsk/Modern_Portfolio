import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  dense?: boolean;
  reducedMotion?: boolean;
}

export default function ParticleBackground({
  dense = true,
  reducedMotion = false,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobileRef.current = window.innerWidth < 768;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (reducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.12,
        0,
        canvas.width * 0.5,
        canvas.height * 0.12,
        Math.min(canvas.width, canvas.height) * 0.18
      );
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.12)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        canvas.width * 0.5,
        canvas.height * 0.12,
        Math.min(canvas.width, canvas.height) * 0.18,
        0,
        Math.PI * 2
      );
      ctx.fill();

      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const particleCount = (function () {
      if (isMobileRef.current) return dense ? 16 : 8;
      if (navigator.connection && (navigator as any).connection.saveData) return dense ? 28 : 16;
      return dense ? 48 : 28;
    })();

    const connectionDistance = isMobileRef.current ? (dense ? 60 : 40) : dense ? 100 : 60;

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobileRef.current ? 0.22 : 0.4),
      vy: (Math.random() - 0.5) * (isMobileRef.current ? 0.22 : 0.4),
      size: Math.random() * (isMobileRef.current ? 1.2 : 2) + 0.8,
      opacity: Math.random() * 0.45 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    if (!isMobileRef.current) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const animate = () => {
      frameRef.current += 1;
      const skipFrames = isMobileRef.current ? 3 : 1;
      if (frameRef.current % skipFrames !== 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        if (!isMobileRef.current) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            const safeDist = dist || 0.001;
            particle.vx += (dx / safeDist) * force * 0.018;
            particle.vy += (dy / safeDist) * force * 0.018;
          }
        }

        particle.vx *= 0.999;
        particle.vy *= 0.999;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
        ctx.fill();
      }

      const maxConnections = isMobileRef.current ? 3 : 7;
      for (let i = 0; i < particles.length; i++) {
        for (let k = 1; k <= maxConnections && i + k < particles.length; k++) {
          const j = i + k;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          const threshold = connectionDistance * connectionDistance;

          if (dist < threshold) {
            const opacity = (1 - Math.sqrt(dist) / connectionDistance) * (isMobileRef.current ? 0.06 : 0.12);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Pause when page not visible to save CPU
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(() => {
          // keep loop alive but skip heavy draws
          animate();
        });
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dense, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: reducedMotion ? 0.22 : dense ? 0.7 : 0.42 }}
    />
  );
}
