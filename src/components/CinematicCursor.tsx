import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

export default function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);
  const lastParticleTime = useRef(0);
  const rafRef = useRef<number>(0);

  const colors = ["#00d4ff", "#a855f7", "#00ff88", "#f472b6", "#06b6d4"];

  useEffect(() => {
    const touchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;

    setIsFinePointer(!touchCapable && !coarsePointer && window.innerWidth >= 768);

    if (touchCapable || coarsePointer || window.innerWidth < 768) {
      setIsTouch(true);
      return;
    }

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 200);
    };

    const handleUp = () => {
      setIsClicking(false);
    };

    // Check if hovering interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, input, textarea, [role='button'], .project-card, .cursor-interactive"
      );
      setIsHovering(!!interactive);
    };

    const addParticle = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastParticleTime.current < 30) return;
      lastParticleTime.current = now;

      const particle: TrailParticle = {
        id: particleIdRef.current++,
        x,
        y,
        opacity: 0.8,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      particlesRef.current = [...particlesRef.current.slice(-20), particle];
    };

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      const { x, y } = mouseRef.current;

      // Smooth ring follow
      const ringLag = 0.12;
      ringPosRef.current.x += (x - ringPosRef.current.x) * ringLag;
      ringPosRef.current.y += (y - ringPosRef.current.y) * ringLag;

      // Update DOM directly for performance
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      if (ringRef.current) {
        const scale = isHovering ? 1.8 : isClicking ? 0.6 : 1;
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px) scale(${scale})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
        glowRef.current.style.opacity = isHovering ? "0.15" : "0.08";
      }

      // Add trail particles
      if (frameCount % 2 === 0) {
        addParticle(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8);
      }

      // Render particles
      if (particlesContainerRef.current) {
        const particles = particlesRef.current;
        particles.forEach((p) => {
          p.opacity *= 0.96;
          p.y -= 0.3;
        });

        // Remove faded particles
        particlesRef.current = particles.filter((p) => p.opacity > 0.05);

        // Build DOM for particles
        let html = "";
        for (const p of particlesRef.current) {
          html += `<div style="position:absolute;left:${p.x}px;top:${p.y}px;width:${p.size}px;height:${p.size}px;border-radius:50%;background:${p.color};opacity:${p.opacity};box-shadow:0 0 ${p.size * 2}px ${p.color}40;pointer-events:none;"></div>`;
        }
        particlesContainerRef.current.innerHTML = html;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    const updatePointerMode = () => {
      const finePointer = !(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        window.innerWidth < 768
      );
      setIsFinePointer(finePointer);
      setIsTouch(!finePointer);
    };

    window.addEventListener("resize", updatePointerMode, { passive: true });
    window.addEventListener("orientationchange", updatePointerMode, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("resize", updatePointerMode);
      window.removeEventListener("orientationchange", updatePointerMode);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering, isClicking]);

  if (isTouch || !isFinePointer) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: isHovering ? "#00ff88" : "#00d4ff",
          boxShadow: `0 0 8px ${isHovering ? "#00ff88" : "#00d4ff"}80`,
          willChange: "transform",
          transition: "background-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          border: `1px solid ${isHovering ? "rgba(0,255,136,0.4)" : "rgba(0,212,255,0.3)"}`,
          willChange: "transform",
          transition: "border-color 0.3s",
        }}
      />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[120px] h-[120px] rounded-full pointer-events-none z-[3]"
        style={{
          background: `radial-gradient(circle, ${isHovering ? "rgba(0,255,136,0.12)" : "rgba(0,212,255,0.06)"} 0%, transparent 70%)`,
          willChange: "transform, opacity",
        }}
      />

      {/* Trail particles container */}
      <div
        ref={particlesContainerRef}
        className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden"
      />

      {/* Click burst effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9996]"
            style={{
              transform: `translate(${cursorPos.x - 25}px, ${cursorPos.y - 25}px)`,
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-[50px] h-[50px] rounded-full border border-neon-blue/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner crosshairs near cursor */}
      <Crosshairs pos={cursorPos} isHovering={isHovering} />
    </>
  );
}

function Crosshairs({
  pos,
  isHovering,
}: {
  pos: { x: number; y: number };
  isHovering: boolean;
}) {
  const offset = isHovering ? 18 : 14;
  const length = isHovering ? 8 : 5;
  const opacity = isHovering ? 0.5 : 0.2;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9995]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      {/* Top */}
      <div
        className="absolute bg-neon-blue"
        style={{
          width: "1px",
          height: `${length}px`,
          top: `-${offset}px`,
          left: "0px",
          opacity,
        }}
      />
      {/* Bottom */}
      <div
        className="absolute bg-neon-blue"
        style={{
          width: "1px",
          height: `${length}px`,
          top: `${offset - length + 1}px`,
          left: "0px",
          opacity,
        }}
      />
      {/* Left */}
      <div
        className="absolute bg-neon-blue"
        style={{
          width: `${length}px`,
          height: "1px",
          top: "0px",
          left: `-${offset}px`,
          opacity,
        }}
      />
      {/* Right */}
      <div
        className="absolute bg-neon-blue"
        style={{
          width: `${length}px`,
          height: "1px",
          top: "0px",
          left: `${offset - length + 1}px`,
          opacity,
        }}
      />
    </div>
  );
}
