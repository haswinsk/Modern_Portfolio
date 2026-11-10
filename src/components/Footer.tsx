import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 px-4 pb-28 pt-10 sm:px-6 sm:pb-24 md:py-16 md:pb-24 lg:px-8">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="text-xl md:text-2xl font-bold tracking-wider text-white mb-4 hover:text-[#E8CEA0] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[#D6B477]">[</span> HASWIN{" "}
            <span className="text-[#D6B477]">SK</span>{" "}
            <span className="text-[#D6B477]">]</span>
          </motion.button>

          <p className="text-xs md:text-sm text-white/30 max-w-md mb-6">
            Building production-grade experiences that blend product thinking, design, and AI — crafted with precision.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {[
              ["Home", "hero"],
              ["About", "about"],
              ["Research", "research"],
              ["Projects", "projects"],
              ["Arsenal", "arsenal"],
              ["Timeline", "timeline"],
              ["Contact", "contact"],
            ].map(([label, target]) => (
              <a
                key={target}
                href={`#${target}`}
                className="text-xs font-mono text-white/30 hover:text-[#E8CEA0] transition-colors tracking-wider"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/20">
            <span>Built with</span>
            <Heart size={12} className="text-[#A6A198]/60" />
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
