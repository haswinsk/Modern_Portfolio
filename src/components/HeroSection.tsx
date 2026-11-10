import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Code,
  Download,
  Globe,
  Mail,
  Rocket,
  SquarePlay,
} from "lucide-react";
import { siteConfig } from "../data/site";

const taglines = [
  "Exploring AI-powered ideas...",
  "Building products that matter...",
  "Turning ideas into reality...",
];

export default function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[taglineIndex];
    const delay = isDeleting ? 45 : 75;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else if (!isDeleting) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setTaglineIndex((index) => (index + 1) % taglines.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#11100F] px-5 pb-8 pt-28 sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(214,180,119,0.12),transparent_30%),linear-gradient(180deg,rgba(17,16,15,0.2),#11100F_90%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          <motion.div
            className="contents lg:block lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="order-1 mb-7 justify-self-center inline-flex items-center gap-2 rounded-full border border-[#D6B477]/40 bg-[#191919]/70 px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-[#E8CEA0] lg:justify-self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6B477]" />
              SYSTEM ONLINE — PRODUCTION READY
            </div>

            <div className="order-3 text-center lg:order-none lg:text-left">
              <h1 className="mb-7 text-5xl font-semibold leading-[0.92] tracking-[-0.045em] text-[#F5F1E8] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                HASWIN{" "}
                <span className="text-[#D6B477]">SK</span>
              </h1>

              <div className="mb-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-[#A6A198] lg:justify-start">
                <span>Full Stack Developer</span>
                <span className="hidden text-[#D6B477] sm:inline">|</span>
                <span>AI Explorer</span>
                <span className="hidden text-[#D6B477] sm:inline">|</span>
                <span>Product Engineer</span>
              </div>

              <p className="mx-auto mb-8 max-w-xl text-base leading-8 text-[#A6A198] sm:text-lg lg:mx-0">
                Building scalable web applications, intelligent AI systems, and
                real-world products that create impact.
              </p>

              <div className="mb-10 h-7 font-mono text-sm text-[#E8CEA0]">
                {displayText}
                <span className="ml-1 inline-block h-4 w-px animate-blink bg-[#D6B477] align-middle" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <motion.button
                  onClick={() => scrollTo("#projects")}
                  className="inline-flex items-center gap-2 rounded-md bg-[#D6B477] px-5 py-3 text-sm font-semibold text-[#11100F] transition-colors hover:bg-[#E8CEA0]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Rocket size={16} />
                  Launch Projects
                </motion.button>
                <motion.a
                  href={siteConfig.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-[#D6B477]/40 bg-[#191919] px-5 py-3 text-sm font-medium text-[#F5F1E8] transition-colors hover:border-[#D6B477] hover:text-[#E8CEA0]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} />
                  View Resume
                </motion.a>
                <motion.button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 rounded-md border border-[#D6B477]/40 bg-transparent px-5 py-3 text-sm font-medium text-[#F5F1E8] transition-colors hover:bg-[#D6B477]/10 hover:text-[#E8CEA0]"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={16} />
                  Contact Me
                </motion.button>
              </div>

              <div className="mt-9 flex justify-center gap-3 lg:justify-start">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-md border border-[#D6B477]/20 bg-[#191919] p-2.5 text-[#A6A198] transition-colors hover:border-[#D6B477]/60 hover:text-[#E8CEA0]"
              >
                <Code size={17} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-md border border-[#D6B477]/20 bg-[#191919] p-2.5 text-[#A6A198] transition-colors hover:border-[#D6B477]/60 hover:text-[#E8CEA0]"
              >
                <Globe size={17} />
              </a>
              <span
                aria-label="X link unavailable"
                title="X link not configured"
                className="cursor-not-allowed rounded-md border border-[#D6B477]/10 bg-[#191919]/70 p-2.5 text-[#A6A198]/45"
              >
                <span className="text-sm font-semibold leading-[17px]">X</span>
              </span>
              <span
                aria-label="YouTube link unavailable"
                title="YouTube link not configured"
                className="cursor-not-allowed rounded-md border border-[#D6B477]/10 bg-[#191919]/70 p-2.5 text-[#A6A198]/45"
              >
                <SquarePlay size={17} />
              </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-2 relative mx-auto h-[275px] w-full max-w-[30rem] lg:order-none lg:h-auto lg:-translate-y-16 lg:self-stretch"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,180,119,0.2)_0%,rgba(214,180,119,0.08)_42%,transparent_72%)] blur-2xl lg:top-[43%] lg:w-[82%]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[198px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D6B477]/35 shadow-[0_0_48px_rgba(214,180,119,0.12)] lg:top-[43%] lg:w-[77%]" />
            <div className="relative mx-auto mt-0 h-[265px] w-[min(220px,70vw)] overflow-hidden rounded-t-[48%] rounded-b-[12%] bg-transparent lg:mt-4 lg:h-[540px] lg:w-[92%]">
              <img
                src="/images/Confident%20Young%20Man%20in%20Black%20Shirt%20(1).png"
                alt="HASWIN SK"
                className="absolute inset-0 h-full w-full object-cover object-[center_8%] brightness-[0.88] contrast-[1.08] saturate-[0.9]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#11100F]/95 via-[#11100F]/45 to-transparent lg:h-12 lg:from-[#11100F] lg:via-[#11100F]/70" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[#11100F]/25 blur-md lg:hidden" />
            </div>
          </motion.div>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-12 w-full opacity-35"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 34 C180 12 300 52 500 28 S820 14 1200 34"
          fill="none"
          stroke="#D6B477"
          strokeOpacity="0.28"
          strokeWidth="1"
          className="hero-wave"
        />
        <path
          d="M0 37 C180 15 300 55 500 31 S820 17 1200 37"
          fill="none"
          stroke="url(#goldWave)"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeDasharray="1 16"
          strokeLinecap="round"
          className="hero-wave hero-wave-dots"
        />
        <path
          d="M0 43 C200 22 350 58 560 36 S900 20 1200 43"
          fill="none"
          stroke="#E8CEA0"
          strokeOpacity="0.16"
          strokeWidth="1"
          className="hero-wave hero-wave-delayed"
        />
        <defs>
          <linearGradient id="goldWave" x1="0" x2="1">
            <stop offset="0" stopColor="#D6B477" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#E8CEA0" />
            <stop offset="1" stopColor="#D6B477" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <button
        onClick={() => scrollTo("#about")}
        aria-label="Scroll to About section"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#A6A198] transition-colors hover:text-[#E8CEA0]"
      >
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
