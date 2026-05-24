import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootLogs = [
  "> INITIALIZING HASWIN_SK KERNEL...",
  "> WARMING UI RENDER PIPELINE (PRODUCTION MODE)...",
  "> LOADING AI MODULES...",
  "> MOUNTING UI SUBSYSTEMS...",
  "> CALIBRATING HOLOGRAPHIC DISPLAY...",
  "> ESTABLISHING SECURE CONNECTION...",
  "> SYNCING AI ASSISTANT PROTOCOLS...",
  "> OPTIMIZING RENDER PIPELINE...",
  "> LOADING AI-FOCUSED PROJECT DATABASE...",
  "> VERIFYING PERFORMANCE & ACCESSIBILITY...",
  "> INITIALIZING COMMAND CENTER...",
  "> SYSTEM READY.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 3 + 1;
      if (current >= 100) {
        current = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          setPhase(2);
          setTimeout(onComplete, 1200);
        }, 600);
      }
      setProgress(Math.floor(current));

      const logIndex = Math.floor((current / 100) * bootLogs.length);
      if (logIndex < bootLogs.length && !logs.includes(bootLogs[logIndex])) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
      }
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setPhase(1);
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-black"
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        {/* Scanline */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-cyan-glow/40"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          {/* Rotating ring */}
          <div className="relative mb-8">
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-neon-blue/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_10px_#00d4ff]" />
            </motion.div>
            <motion.div
              className="absolute inset-2 rounded-full border border-purple-accent/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-cyan-glow/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-neon-blue neon-text font-mono">
                {progress}%
              </span>
            </div>
          </div>

          {/* Title */}
          <motion.h1
            className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white mb-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            INITIALIZING <span className="text-neon-blue">HASWIN_SK</span>
          </motion.h1>

          {/* Status */}
          <motion.div
            className="text-xs md:text-sm text-cyan-glow/60 font-mono mb-6 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {phase === 0 && "SYSTEM BOOT SEQUENCE"}
            {phase === 1 && "LOADING MODULES..."}
            {phase === 2 && "SYSTEM ONLINE"}
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 md:w-80 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-purple-accent rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Terminal logs */}
          <div className="w-72 md:w-96 h-32 overflow-hidden font-mono text-[10px] md:text-xs text-cyan-glow/50 space-y-1">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {log}
              </motion.div>
            ))}
            <motion.span
              className="inline-block w-2 h-3 bg-neon-blue"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-blue/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-blue/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-blue/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-blue/30" />
      </motion.div>
    </AnimatePresence>
  );
}
