import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const onChatVis = (event: Event) => {
      const detail = (event as CustomEvent<{ isOpen?: boolean }>).detail;
      setChatOpen(Boolean(detail?.isOpen));
    };

    window.addEventListener("chatbot-visibility", onChatVis);
    return () => window.removeEventListener("chatbot-visibility", onChatVis);
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlaying = async () => {
    const audio = audioRef.current ?? new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;
    setAudioError(false);

    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setAudioError(true);
    }
  };

  return (
    <motion.button
      className={
        `fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-[65] flex h-11 w-11 items-center justify-center rounded-full glass-panel-strong border border-white/10 text-white/45 shadow-[0_0_20px_rgba(214,180,119,0.08)] transition-colors hover:text-neon-blue sm:left-6 md:bottom-6 md:left-auto md:right-56 lg:right-64 ` +
        (chatOpen ? "hidden md:inline-flex" : "inline-flex")
      }
      onClick={togglePlaying}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      aria-label={audioError ? "Audio unavailable" : playing ? "Pause ambient audio" : "Play ambient audio"}
      title={audioError ? "Ambient audio unavailable" : playing ? "Pause ambient audio" : "Play ambient audio"}
    >
      {playing ? <Volume2 size={17} className="text-neon-blue" /> : <VolumeX size={17} />}
    </motion.button>
  );
}
