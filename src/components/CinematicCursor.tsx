import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Point = { x: number; y: number };
type HoverMode = "default" | "interactive" | "project" | "input";

function supportsFinePointer() {
  return (
    window.innerWidth >= 768 &&
    !("ontouchstart" in window) &&
    navigator.maxTouchPoints === 0 &&
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

export default function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const secondaryRingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointerRef = useRef<Point>({ x: -100, y: -100 });
  const ringPositionRef = useRef<Point>({ x: -100, y: -100 });
  const secondaryPositionRef = useRef<Point>({ x: -100, y: -100 });
  const trailRef = useRef<Point[]>(
    Array.from({ length: 7 }, () => ({ x: -100, y: -100 }))
  );
  const previousPointerRef = useRef<Point>({ x: -100, y: -100 });
  const speedRef = useRef(0);
  const hoverModeRef = useRef<HoverMode>("default");
  const reducedMotionRef = useRef(false);
  const clickingRef = useRef(false);
  const frameRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);
  const [hoverMode, setHoverMode] = useState<HoverMode>("default");
  const [clickPoint, setClickPoint] = useState<Point | null>(null);
  const [clickId, setClickId] = useState(0);

  useEffect(() => {
    const updatePointerMode = () => setEnabled(supportsFinePointer());
    updatePointerMode();
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mediaQueries = [
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(hover: hover)"),
    ];
    mediaQueries.forEach((query) =>
      query.addEventListener("change", updatePointerMode)
    );
    window.addEventListener("resize", updatePointerMode, { passive: true });

    const handleMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      const target = event.target as HTMLElement;
      const nextMode: HoverMode = target.closest(
        "input, textarea, select, [contenteditable='true']"
      )
        ? "input"
        : target.closest(".project-card, [data-cursor='view']")
          ? "project"
          : target.closest(
                "button, a, [role='button'], .cursor-interactive"
              )
            ? "interactive"
            : "default";

      if (hoverModeRef.current !== nextMode) {
        hoverModeRef.current = nextMode;
        setHoverMode(nextMode);
      }
    };

    const handleDown = (event: MouseEvent) => {
      clickingRef.current = true;
      setClickPoint({ x: event.clientX, y: event.clientY });
      setClickId((value) => value + 1);
    };

    const handleUp = () => {
      clickingRef.current = false;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });

    const animate = () => {
      const pointer = pointerRef.current;
      const ring = ringPositionRef.current;
      const secondary = secondaryPositionRef.current;
      const reducedMotion = reducedMotionRef.current;
      ring.x += (pointer.x - ring.x) * (reducedMotion ? 1 : 0.3);
      ring.y += (pointer.y - ring.y) * (reducedMotion ? 1 : 0.3);
      secondary.x += (pointer.x - secondary.x) * (reducedMotion ? 1 : 0.075);
      secondary.y += (pointer.y - secondary.y) * (reducedMotion ? 1 : 0.075);

      const previousPointer = previousPointerRef.current;
      const movement = Math.hypot(pointer.x - previousPointer.x, pointer.y - previousPointer.y);
      speedRef.current += (Math.min(movement, 32) - speedRef.current) * 0.2;
      previousPointerRef.current = pointer;

      trailRef.current.forEach((particle, index, particles) => {
        const target = index === 0 ? pointer : particles[index - 1];
        const factor = reducedMotion ? 1 : Math.max(0.16, 0.34 - index * 0.025);
        particle.x += (target.x - particle.x) * factor;
        particle.y += (target.y - particle.y) * factor;
      });

      const mode = hoverModeRef.current;
      const ringScale = mode === "project" ? 2.2 : mode === "interactive" ? 1.65 : mode === "input" ? 0.72 : 1;
      const clickScale = clickingRef.current ? 0.72 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x - 3}px, ${pointer.y - 3}px, 0) scale(${clickScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0) scale(${ringScale})`;
      }
      if (secondaryRingRef.current) {
        secondaryRingRef.current.style.transform = `translate3d(${secondary.x - 27}px, ${secondary.y - 27}px, 0) scale(${mode === "project" ? 1.35 : 1})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pointer.x - 56}px, ${pointer.y - 56}px, 0)`;
        glowRef.current.style.opacity = mode === "project" ? "0.42" : mode === "interactive" ? "0.32" : "0.2";
      }
      particleRefs.current.forEach((particle, index) => {
        const position = trailRef.current[index];
        if (particle && position) {
          particle.style.transform = `translate3d(${position.x - 2}px, ${position.y - 2}px, 0)`;
          const movementBoost = Math.min(speedRef.current / 24, 1);
          particle.style.opacity = reducedMotion
            ? "0"
            : `${0.22 + movementBoost * 0.3 - index * 0.024}`;
        }
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      mediaQueries.forEach((query) =>
        query.removeEventListener("change", updatePointerMode)
      );
      window.removeEventListener("resize", updatePointerMode);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-enabled");
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) return null;

  const isProject = hoverMode === "project";

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="cursor-breathe pointer-events-none fixed left-0 top-0 z-[9995] h-28 w-28 rounded-full opacity-0 transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(circle, rgba(229,193,126,0.45) 0%, rgba(214,173,104,0.2) 32%, rgba(214,173,104,0.06) 52%, transparent 74%)",
          filter: "blur(4px)",
          animation: "cursor-breathe 2.8s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {Array.from({ length: 7 }, (_, index) => (
        <span
          key={index}
          ref={(element) => {
            particleRefs.current[index] = element;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[9996] h-1 w-1 rounded-full bg-[#E8CEA0] opacity-0"
          style={{
            width: `${Math.max(2, 4 - index * 0.35)}px`,
            height: `${Math.max(2, 4 - index * 0.35)}px`,
            boxShadow: "0 0 10px rgba(229,193,126,0.75), 0 0 18px rgba(214,173,104,0.3)",
            willChange: "transform, opacity",
          }}
        />
      ))}
      <div
        ref={secondaryRingRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-[54px] w-[54px] rounded-full border border-[#D6B477]/25"
        style={{
          boxShadow: "0 0 18px rgba(229,193,126,0.16), inset 0 0 12px rgba(214,173,104,0.08)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-10 w-10 items-center justify-center rounded-full border border-[#D6B477]/60 text-[8px] font-mono tracking-[0.12em] text-[#E8CEA0] transition-[border-color,box-shadow] duration-200"
        style={{
          borderColor: isProject
            ? "rgba(244,224,170,0.98)"
            : "rgba(229,193,126,0.72)",
          boxShadow: isProject
            ? "0 0 28px rgba(229,193,126,0.55), 0 0 8px rgba(229,193,126,0.8)"
            : "0 0 16px rgba(229,193,126,0.3), 0 0 4px rgba(229,193,126,0.55)",
          willChange: "transform",
        }}
      >
        {isProject && <span>VIEW</span>}
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#E8CEA0]"
        style={{
          boxShadow: "0 0 12px rgba(229,193,126,1), 0 0 24px rgba(214,173,104,0.55)",
          willChange: "transform",
        }}
      />
      <AnimatePresence>
        {clickPoint && !reducedMotionRef.current && (
          <div
            key={clickId}
            aria-hidden="true"
            className="pointer-events-none fixed z-[10000] h-8 w-8"
            style={{
              left: clickPoint.x - 16,
              top: clickPoint.y - 16,
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border border-[#E8CEA0]/80"
              initial={{ scale: 0.5, opacity: 0.95 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              onAnimationComplete={() => setClickPoint(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
