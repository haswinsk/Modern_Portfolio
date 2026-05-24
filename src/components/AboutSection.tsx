import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Lightbulb, Rocket, BookOpen } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "15+", icon: Code },
  { label: "Technologies", value: "20+", icon: Lightbulb },
  { label: "UI Experiments", value: "50+", icon: Rocket },
  { label: "Current Focus", value: "AI & Web3", icon: BookOpen },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-50" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ IDENTITY_PANEL ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden glass-panel p-1">
              <div className="w-full h-full rounded-xl bg-deep-navy relative overflow-hidden">
                {/* Actual casual photo */}
                <img
                  src="/images/about-casual.jpg"
                  alt="HASWIN SK - Casual"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />

                {/* Dark gradient overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-cyber-black/30" />

                {/* Holographic color overlays */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-neon-blue/8 via-transparent to-purple-accent/10 mix-blend-overlay"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), transparent)" }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Second scan line reverse */}
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)" }}
                  animate={{ top: ["100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Scanline texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.4) 2px, rgba(0,212,255,0.4) 3px)",
                }} />

                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-neon-blue/50" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-neon-blue/50" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-neon-blue/50" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-neon-blue/50" />

                {/* Floating UI panels */}
                <motion.div
                  className="absolute bottom-5 left-4 px-2.5 py-1.5 glass-panel rounded text-[10px] font-mono text-neon-blue/80 z-10"
                  animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
                  STATUS: ACTIVE
                </motion.div>
                <motion.div
                  className="absolute top-5 right-4 px-2.5 py-1.5 glass-panel rounded text-[10px] font-mono text-purple-accent/80 z-10"
                  animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  LEVEL: ADVANCED
                </motion.div>
                <motion.div
                  className="absolute bottom-5 right-4 px-2.5 py-1.5 glass-panel rounded text-[10px] font-mono text-cyan-glow/60 z-10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  AI_ENHANCED
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-neon-blue/10 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-purple-accent/10 rounded-lg" />
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                I am a passionate{" "}
                <span className="text-neon-blue font-medium">
                  Full Stack Developer
                </span>{" "}
                who loves building products that push the boundaries of what is
                possible on the web.
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                My fascination with futuristic systems drives me to explore
                AI-powered interfaces, immersive experiences, and next-generation
                web technologies. I also have ideas in AI — especially around
                intelligent assistants, automation, and creative tools. I believe
                in continuous learning and staying at the forefront of innovation.
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                With a startup mindset, I approach every project as an opportunity
                to create something meaningful. From real-time applications to
                experimental UI concepts, I am always building, always learning.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-panel rounded-xl p-4 text-center group hover:border-neon-blue/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <stat.icon
                    size={20}
                    className="mx-auto mb-2 text-neon-blue/60 group-hover:text-neon-blue transition-colors"
                  />
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-white/40 tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
