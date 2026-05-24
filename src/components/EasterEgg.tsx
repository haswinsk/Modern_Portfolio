import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSeq = [...sequence, e.key];
      if (newSeq.length > KONAMI.length) newSeq.shift();
      setSequence(newSeq);

      if (newSeq.join(",") === KONAMI.join(",")) {
        setShow(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const handleUnlock = () => setShow(true);
    window.addEventListener("unlock-classified", handleUnlock as EventListener);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("unlock-classified", handleUnlock as EventListener);
    };
  }, [sequence]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShow(false)}
          />
          <motion.div
            className="relative glass-panel-strong rounded-2xl p-8 max-w-md w-full text-center border border-neon-blue/20"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/30 hover:text-white/60"
            >
              <X size={16} />
            </button>

            <Terminal size={32} className="mx-auto text-neon-blue mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              CLASSIFIED OVERRIDE
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Hidden mode activated from the terminal.
            </p>
            <div className="font-mono text-xs text-neon-blue/60 space-y-1 bg-black/30 rounded-lg p-4">
              <div>{`> Access level: ADMIN`}</div>
              <div>{`> Easter egg found: 1/1`}</div>
              <div>{`> Status: LEGENDARY`}</div>
              <div className="text-green-400/60 mt-2">{`> Welcome to the inner circle.`}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
