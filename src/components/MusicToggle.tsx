import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [noFile, setNoFile] = useState(false);
  // Refs to hold WebAudio nodes so we only create/resume them on user gesture
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const triedLoadRef = useRef(false);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {}
        try { sourceRef.current.disconnect(); } catch {}
        sourceRef.current = null;
      }
      if (audioElemRef.current) {
        try {
          audioElemRef.current.pause();
        } catch {}
        audioElemRef.current.src = "";
        audioElemRef.current = null;
      }
      if (gainRef.current) {
        try { gainRef.current.disconnect(); } catch {}
        gainRef.current = null;
      }
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch {}
        ctxRef.current = null;
      }
    };
  }, []);

  // Hide music toggle on small screens when chatbot is open
  useEffect(() => {
    const onChatVis = (e: any) => {
      setChatOpen(Boolean(e?.detail?.isOpen));
    };
    window.addEventListener("chatbot-visibility", onChatVis as EventListener);
    return () => window.removeEventListener("chatbot-visibility", onChatVis as EventListener);
  }, []);

  // Toggle handler: create/resume AudioContext only on user click (gesture)
  const togglePlaying = async () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      setPlaying((p) => !p);
      return;
    }

    if (!ctxRef.current) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      // create gain node immediately; we'll use it for buffer playback
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.connect(ctx.destination);

      gainRef.current = gainNode;
    } else if (ctxRef.current.state === "suspended") {
      // Resume if previously suspended
      try {
        await ctxRef.current.resume();
      } catch {}
    }

    // Restore playing state from localStorage (on first user gesture)
    try {
      const saved = localStorage.getItem("haswin_playing");
      if (saved !== null && JSON.parse(saved) === true && !playing) {
        // we want to start playing automatically after user gesture
      }
    } catch {}

    // If an audio file is available, prefer buffer playback
    const playUsingBuffer = async () => {
      if (!ctxRef.current) return;
      // If buffer not loaded, try to fetch once
      if (!bufferRef.current && !triedLoadRef.current) {
        triedLoadRef.current = true;
        try {
          console.log("MusicToggle: fetching /audio/ambient.mp3");
          const res = await fetch("/audio/ambient.mp3", { cache: "no-cache" });
          console.log("MusicToggle: fetch status", res.status, res.ok);
          if (res.ok) {
            const arr = await res.arrayBuffer();
            try {
              const decoded = await ctxRef.current.decodeAudioData(arr);
              bufferRef.current = decoded;
              console.log("MusicToggle: decoded audio buffer");
            } catch (decErr) {
              console.error("MusicToggle: decodeAudioData failed:", decErr);
            }
          }
        } catch (e) {
          console.error("MusicToggle: fetch failed:", e);
        }
      }

      if (bufferRef.current) {
        if (!playing) {
          // start buffer source
          const src = ctxRef.current.createBufferSource();
          src.buffer = bufferRef.current;
          src.loop = true;
          // ensure audible level
          try {
            // increase buffer playback volume (make louder)
            gainRef.current!.gain.setValueAtTime(0.8, ctxRef.current.currentTime);
          } catch {}
          src.connect(gainRef.current!);
          src.start();
          sourceRef.current = src;
          console.log("MusicToggle: started buffer playback");
        } else {
          // stop buffer source
          if (sourceRef.current) {
            try {
              sourceRef.current.stop();
            } catch {}
            sourceRef.current.disconnect();
            sourceRef.current = null;
          }
          try { gainRef.current!.gain.setValueAtTime(0, ctxRef.current.currentTime); } catch {}
          console.log("MusicToggle: stopped buffer playback");
        }
        setPlaying((p) => !p);
        localStorage.setItem("haswin_playing", JSON.stringify(!playing));
        return true;
      }
      return false;
    };

    const usedBuffer = await playUsingBuffer();
    if (usedBuffer) return;

    // If buffer not used, try HTMLAudioElement fallback (simpler playback)
    console.log("MusicToggle: buffer not available, trying HTMLAudioElement fallback");
    try {
      if (!audioElemRef.current) {
        audioElemRef.current = new Audio("/audio/ambient.mp3");
        audioElemRef.current.loop = true;
        audioElemRef.current.volume = 0.8;
      }

      if (!playing) {
        try {
          await audioElemRef.current.play();
          console.log("MusicToggle: started HTMLAudioElement playback");
          setPlaying(true);
          localStorage.setItem("haswin_playing", JSON.stringify(true));
          return;
        } catch (playErr) {
          console.error("MusicToggle: HTMLAudioElement.play() failed:", playErr);
          setNoFile(true);
          setPlaying(false);
          return;
        }
      } else {
        audioElemRef.current.pause();
        audioElemRef.current.currentTime = 0;
        console.log("MusicToggle: stopped HTMLAudioElement playback");
        setPlaying(false);
        localStorage.setItem("haswin_playing", JSON.stringify(false));
        return;
      }
    } catch (e) {
      console.error("MusicToggle: HTMLAudioElement fallback failed:", e);
      setNoFile(true);
      setPlaying(false);
      return;
    }
  };

  return (
    <motion.button
      className={
        `fixed bottom-6 left-6 md:bottom-6 md:left-auto md:right-56 lg:right-64 z-[65] w-11 h-11 rounded-full glass-panel-strong flex items-center justify-center text-white/45 hover:text-neon-blue border border-white/10 transition-colors shadow-[0_0_20px_rgba(0,212,255,0.08)] ` +
        (chatOpen ? "hidden md:inline-flex" : "inline-flex")
      }
      onClick={togglePlaying}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      title={playing ? "Pause ambient audio" : "Play ambient audio"}
    >
      {/* hint removed per user request */}
      {playing ? (
        <Volume2 size={17} className="text-neon-blue" />
      ) : (
        <VolumeX size={17} />
      )}
    </motion.button>
  );
}
