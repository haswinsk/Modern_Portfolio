import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-10 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="text-xl md:text-2xl font-bold tracking-wider text-white mb-4 hover:text-neon-blue transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-neon-blue">[</span> HASWIN{" "}
            <span className="text-purple-accent">SK</span>{" "}
            <span className="text-neon-blue">]</span>
          </motion.button>

          <p className="text-xs md:text-sm text-white/30 max-w-md mb-6">
            Building production-grade experiences that blend product thinking, design, and AI — crafted with precision.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {["Home", "About", "Research", "Projects", "Timeline", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs font-mono text-white/30 hover:text-neon-blue transition-colors tracking-wider"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/20">
            <span>Built with</span>
            <Heart size={12} className="text-red-400/60" />
            <span>by HASWIN SK</span>
          </div>
          <div className="text-[10px] font-mono text-white/10 mt-2">
            &copy; {new Date().getFullYear()} HASWIN_SK SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
