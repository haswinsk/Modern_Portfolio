import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Terminal, Mail, Download, ChevronDown } from "lucide-react";
import GlitchText from "./GlitchText";

const subtitles = [
  "Building immersive AI experiences",
  "Creating futuristic interfaces",
  "Exploring AI-powered ideas",
  "Developing intelligent modern applications",
];

export default function HeroSection() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const current = subtitles[subtitleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, subtitleIndex]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Floating holographic symbols */}
      <motion.div
        className="absolute top-20 left-10 text-neon-blue/10 text-6xl font-mono select-none hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {"{ }"}
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-purple-accent/10 text-5xl font-mono select-none hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-cyan-glow/10 text-4xl font-mono select-none hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {"#"}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-glow/70 tracking-wider">
                SYSTEM ONLINE — PRODUCTION READY
              </span>
            </motion.div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <GlitchText text="HASWIN" className="text-white" />
              <span className="text-gradient mx-4">SK</span>
            </h1>

            {/* Roles */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              {["Full Stack Developer", "AI Explorer", "Product Engineer"].map(
                (role, i) => (
                  <motion.span
                    key={role}
                    className="px-3 py-1 text-xs sm:text-sm font-mono text-neon-blue/80 border border-neon-blue/20 rounded-md bg-neon-blue/5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {role}
                  </motion.span>
                )
              )}
            </div>

            {/* Typewriter subtitle (5s-first-impression) */}
            <div className="h-8 mb-8">
              <span
                ref={subtitleRef}
                className="text-sm sm:text-base md:text-lg text-white/60 font-mono"
              >
                {displayText}
                <span className="inline-block w-0.5 h-5 bg-neon-blue ml-0.5 animate-blink align-middle" />
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="group flex items-center gap-2 px-5 py-2.5 bg-neon-blue/10 border border-neon-blue/40 rounded-lg text-neon-blue text-sm font-medium hover:bg-neon-blue/20 transition-all neon-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket size={16} />
                Launch Projects
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#arsenal")}
                className="group flex items-center gap-2 px-5 py-2.5 bg-purple-accent/10 border border-purple-accent/40 rounded-lg text-purple-accent text-sm font-medium hover:bg-purple-accent/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal size={16} />
                Mission Control
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center gap-2 px-5 py-2.5 glass-panel rounded-lg text-white/80 text-sm font-medium hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} />
                Contact Me
              </motion.button>
              <motion.a
                href="#"
                className="group flex items-center gap-2 px-5 py-2.5 glass-panel rounded-lg text-white/80 text-sm font-medium hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Holographic Profile */}
          <motion.div
            className="relative flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]"
              onMouseEnter={() => setIsScanning(true)}
              onMouseLeave={() => setIsScanning(false)}
            >
              {/* Outer rotating HUD ring */}
              <div className="absolute inset-0 animate-rotate-hud">
                <svg viewBox="0 0 440 440" className="w-full h-full">
                  <circle cx="220" cy="220" r="215" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="12 6" />
                  <circle cx="220" cy="220" r="210" fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" />
                  {/* HUD tick marks */}
                  {[...Array(36)].map((_, i) => {
                    const angle = (i * 10 * Math.PI) / 180;
                    const x1 = 220 + 205 * Math.cos(angle);
                    const y1 = 220 + 205 * Math.sin(angle);
                    const x2 = 220 + (i % 3 === 0 ? 195 : 200) * Math.cos(angle);
                    const y2 = 220 + (i % 3 === 0 ? 195 : 200) * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.2)" strokeWidth={i % 3 === 0 ? "1.5" : "0.5"} />;
                  })}
                  {/* Dot at top */}
                  <circle cx="220" cy="5" r="3" fill="#00d4ff" opacity="0.6" />
                </svg>
              </div>

              {/* Second ring (counter-rotate) */}
              <motion.div
                className="absolute inset-3"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
                  <circle cx="200" cy="12" r="2" fill="#a855f7" opacity="0.5" />
                </svg>
              </motion.div>

              {/* Third ring */}
              <motion.div
                className="absolute inset-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" strokeDasharray="2 12" />
                </svg>
              </motion.div>

              {/* Inner energy ring */}
              <div className="absolute inset-8 rounded-full border border-neon-blue/20 animate-energy-ring" />

              {/* Ambient glow behind photo */}
              <motion.div className="absolute inset-10 rounded-full" animate={{ opacity: isScanning ? 1 : 0.75, scale: isScanning ? 1.03 : 1 }} transition={{ duration: 0.35 }} style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
              }} />

              {/* Profile photo container */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-neon-blue/30 animate-hologram shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                {/* Actual profile photo */}
                <img
                  src="/images/hero-profile.jpg"
                  alt="HASWIN SK"
                  className="absolute inset-0 w-full h-full object-cover object-top scale-110"
                />

                {/* Holographic color overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/10 via-transparent to-purple-accent/15 mix-blend-overlay" />

                {/* Subtle blue tint overlay */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(180deg, rgba(0,212,255,0.05) 0%, transparent 30%, transparent 70%, rgba(168,85,247,0.1) 100%)",
                }} />

                {/* Scan line overlay */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)" }}
                  animate={{ top: ["-2%", "102%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Secondary scan line (slower) */}
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.25), transparent)" }}
                  animate={{ top: ["102%", "-2%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="absolute inset-0 border border-transparent"
                  animate={{ opacity: isScanning ? [0.2, 0.9, 0.2] : 0.25 }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  style={{
                    boxShadow: isScanning ? "inset 0 0 30px rgba(0,212,255,0.22)" : "inset 0 0 18px rgba(0,212,255,0.08)",
                  }}
                />

                {/* Corner brackets */}
                <motion.div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-neon-blue/60" animate={{ opacity: isScanning ? 1 : 0.65 }} />
                <motion.div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-neon-blue/60" animate={{ opacity: isScanning ? 1 : 0.65 }} />
                <motion.div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-neon-blue/60" animate={{ opacity: isScanning ? 1 : 0.65 }} />
                <motion.div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-neon-blue/60" animate={{ opacity: isScanning ? 1 : 0.65 }} />

                {/* AI Targeting crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-px w-px h-3 bg-neon-blue/20" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-px w-px h-3 bg-neon-blue/20" />
                  <div className="absolute left-0 top-1/2 -translate-y-px w-3 h-px bg-neon-blue/20" />
                  <div className="absolute right-0 top-1/2 -translate-y-px w-3 h-px bg-neon-blue/20" />
                </div>

                {/* Cyber dots on face area */}
                {[
                  { top: "22%", left: "35%", size: 3 },
                  { top: "22%", left: "62%", size: 3 },
                  { top: "32%", left: "48%", size: 2 },
                  { top: "42%", left: "38%", size: 2 },
                  { top: "42%", left: "58%", size: 2 },
                  { top: "55%", left: "48%", size: 2.5 },
                  { top: "28%", left: "28%", size: 1.5 },
                  { top: "28%", left: "70%", size: 1.5 },
                  { top: "65%", left: "40%", size: 1.5 },
                  { top: "65%", left: "56%", size: 1.5 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: pos.size,
                      height: pos.size,
                      backgroundColor: i < 2 ? "rgba(0,255,136,0.5)" : "rgba(0,212,255,0.45)",
                      boxShadow: `0 0 ${pos.size * 3}px ${i < 2 ? "rgba(0,255,136,0.3)" : "rgba(0,212,255,0.25)"}`,
                    }}
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isScanning ? 0.9 : 0.55 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, transparent 45%, rgba(0,212,255,0.03) 100%)",
                  }}
                />

                {/* Scanline texture overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 3px)",
                }} />
              </div>

              {/* Floating HUD labels */}
              <motion.div
                className="absolute -right-2 top-1/4 px-2 py-1 glass-panel rounded text-[9px] font-mono text-neon-blue/70 tracking-wider hidden sm:block"
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ID: VERIFIED
              </motion.div>
              <motion.div
                className="absolute -left-2 top-2/3 px-2 py-1 glass-panel rounded text-[9px] font-mono text-purple-accent/70 tracking-wider hidden sm:block"
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                THREAT: NONE
              </motion.div>
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -bottom-2 px-2 py-1 glass-panel rounded text-[9px] font-mono text-cyan-glow/60 tracking-wider hidden sm:block"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                BIOMETRIC_SCAN: COMPLETE
              </motion.div>

              {/* Floating particles around */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${15 + Math.random() * 70}%`,
                    left: `${5 + Math.random() * 90}%`,
                    backgroundColor: i % 2 === 0 ? "rgba(0,212,255,0.5)" : "rgba(168,85,247,0.4)",
                    boxShadow: i % 2 === 0 ? "0 0 6px rgba(0,212,255,0.3)" : "0 0 6px rgba(168,85,247,0.2)",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, (Math.random() - 0.5) * 10, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono text-white/30 tracking-widest">
          SCROLL
        </span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  );
}
