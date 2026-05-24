import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-red-400/50 z-0"
        variants={{
          hover: {
            x: [0, -3, 3, -2, 0],
            opacity: [0, 1, 0, 1, 0],
            transition: { duration: 0.3 },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-cyan-400/50 z-0"
        variants={{
          hover: {
            x: [0, 3, -3, 2, 0],
            opacity: [0, 1, 0, 1, 0],
            transition: { duration: 0.3, delay: 0.05 },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
