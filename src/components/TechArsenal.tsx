import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Layers3, Radar } from "lucide-react";
import { skills, skillCategories } from "../data/skills";

const skillNotes: Record<string, string> = {
  React: "Interface architecture, motion systems, and component choreography for immersive product surfaces.",
  "Next.js": "Production-first routing and delivery patterns for fast, polished experiences.",
  JavaScript: "The control layer for dynamic behavior, orchestration, and interactive systems.",
  TypeScript: "Type-safe product logic and maintainable app architecture.",
  "Node.js": "Server-side coordination, APIs, and real-time service layers.",
  "Express.js": "Lightweight service composition and request orchestration.",
  MongoDB: "Flexible persistence for content, profiles, and portfolio data.",
  "Tailwind CSS": "Rapid visual systems with consistent spacing, glow, and glass layers.",
  "UI/UX": "Layout rhythm, motion pacing, and clarity across complex interfaces.",
  "Full Stack": "End-to-end product thinking across UI, APIs, and deployment.",
};

export default function TechArsenal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [burstId, setBurstId] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const orbitalPoints = useMemo(() => {
    return filtered.map((skill, index) => {
      const angle = (index / Math.max(filtered.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const radius = 31 + (index % 3) * 2.5;
      return { skill, angle, radius };
    });
  }, [filtered]);

  useEffect(() => {
    if (!filtered.some((skill) => skill.name === selectedSkill.name) && filtered[0]) {
      setSelectedSkill(filtered[0]);
    }
  }, [filtered, selectedSkill.name]);

  const handleSelect = (skillName: string) => {
    const nextSkill = skills.find((skill) => skill.name === skillName);
    if (nextSkill) {
      setSelectedSkill(nextSkill);
      setBurstId((current) => current + 1);
    }
  };

  return (
    <section
      id="arsenal"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ TECH_ARSENAL ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Neural <span className="text-gradient">Skill Matrix</span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
            An interactive map of the tools, frameworks, and systems that power the portfolio.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                activeCategory === category
                  ? "text-neon-blue border-neon-blue/40 bg-neon-blue/10"
                  : "text-white/40 border-white/10 hover:text-white/60 hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="glass-panel rounded-[2rem] p-4 md:p-6 relative overflow-hidden border border-white/5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.08),transparent_44%)]" />
          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
            <div className="relative min-h-[560px] md:min-h-[600px] lg:min-h-[420px] rounded-[1.75rem] border border-white/5 bg-black/25 overflow-hidden flex items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08),transparent_42%)]" />
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <motion.div
                className="absolute inset-8 sm:inset-10 rounded-full border border-neon-blue/10"
                animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative w-full max-w-[560px] mx-auto hidden md:block aspect-square">
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 lg:w-48 lg:h-48 rounded-full glass-panel-strong border border-neon-blue/25 flex items-center justify-center text-center px-5 shadow-[0_0_50px_rgba(0,212,255,0.1)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12),transparent_60%)]" />
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="text-[9px] lg:text-[10px] font-mono tracking-[0.34em] text-neon-blue/55 mb-2">NEURAL CORE</div>
                    <div className="text-2xl lg:text-4xl font-bold text-white">{selectedSkill.level}%</div>
                    <div className="max-w-[9rem] text-[9px] lg:text-xs font-mono text-white/35 mt-2 tracking-[0.22em] leading-tight truncate">
                      {selectedSkill.name.toUpperCase()}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedSkill.name}-${burstId}`}
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[0, 1, 2, 3].map((index) => (
                        <motion.span
                          key={index}
                          className="absolute left-1/2 top-1/2 block w-2 h-2 rounded-full"
                          style={{ backgroundColor: selectedSkill.color, boxShadow: `0 0 18px ${selectedSkill.color}` }}
                          initial={{ x: 0, y: 0, opacity: 0.9, scale: 0.6 }}
                          animate={{
                            x: Math.cos((index / 4) * Math.PI * 2) * 105,
                            y: Math.sin((index / 4) * Math.PI * 2) * 105,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {orbitalPoints.map(({ skill, angle, radius }, index) => (
                  <motion.button
                    key={skill.name}
                    className={`absolute z-10 w-[6.75rem] lg:w-32 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-left border transition-all backdrop-blur-md ${
                      selectedSkill.name === skill.name
                        ? "bg-neon-blue/12 border-neon-blue/35 text-white"
                        : "bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:border-neon-blue/20"
                    }`}
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                      boxShadow: selectedSkill.name === skill.name ? `0 0 24px ${skill.color}18` : undefined,
                    }}
                    onClick={() => handleSelect(skill.name)}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: [0, index % 2 === 0 ? -5 : 5, 0] } : {}}
                    transition={{ duration: 0.55, delay: 0.12 + index * 0.04, y: { duration: 5 + index * 0.3, repeat: Infinity, ease: "easeInOut" } }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}50` }}
                      />
                      <span className="text-[10px] lg:text-[11px] font-mono tracking-[0.14em] whitespace-nowrap leading-none truncate">
                        {skill.name}
                      </span>
                    </div>
                    <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </motion.button>
                ))}

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute left-1/2 top-0 h-1/2 w-px bg-gradient-to-b from-transparent via-neon-blue/45 to-transparent origin-bottom" />
                </motion.div>
              </div>

              <div className="relative w-full md:hidden flex flex-col items-center justify-center gap-5 py-4">
                <motion.div
                  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full glass-panel-strong border border-neon-blue/25 flex items-center justify-center text-center px-4 shadow-[0_0_50px_rgba(0,212,255,0.1)]"
                  animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-3 rounded-full border border-white/5" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12),transparent_60%)]" />
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="text-[8px] font-mono tracking-[0.28em] text-neon-blue/55 mb-1">NEURAL CORE</div>
                    <div className="text-2xl font-bold text-white leading-none">{selectedSkill.level}%</div>
                    <div className="mt-2 max-w-[6.5rem] text-[9px] font-mono text-white/35 tracking-[0.18em] leading-tight truncate">
                      {selectedSkill.name.toUpperCase()}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedSkill.name}-${burstId}-mobile`}
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[0, 1, 2, 3].map((index) => (
                        <motion.span
                          key={index}
                          className="absolute left-1/2 top-1/2 block w-2 h-2 rounded-full"
                          style={{ backgroundColor: selectedSkill.color, boxShadow: `0 0 18px ${selectedSkill.color}` }}
                          initial={{ x: 0, y: 0, opacity: 0.9, scale: 0.6 }}
                          animate={{
                            x: Math.cos((index / 4) * Math.PI * 2) * 80,
                            y: Math.sin((index / 4) * Math.PI * 2) * 80,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  {filtered.map((skill) => (
                    <motion.button
                      key={skill.name}
                      onClick={() => handleSelect(skill.name)}
                      className={`rounded-2xl border px-3 py-3 text-left backdrop-blur-md transition-all ${
                        selectedSkill.name === skill.name
                          ? "bg-neon-blue/12 border-neon-blue/35 text-white"
                          : "bg-white/[0.03] border-white/10 text-white/70"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}50` }}
                        />
                        <span className="text-[10px] font-mono tracking-[0.12em] truncate leading-none">
                          {skill.name}
                        </span>
                      </div>
                      <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="mt-2 text-[10px] font-mono text-white/35">{skill.level}%</div>
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex flex-col gap-4">
              <div className="glass-panel rounded-[1.5rem] p-5 border border-white/5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.34em] text-neon-blue/55">SKILL MATRIX</div>
                    <h3 className="text-2xl font-bold text-white mt-1">{selectedSkill.name}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-neon-blue/20 bg-neon-blue/8 flex items-center justify-center">
                    <Radar size={18} className="text-neon-blue" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-white/35 mb-4">
                  <Layers3 size={11} /> {selectedSkill.category}
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${selectedSkill.color}, ${selectedSkill.color}80)` }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <p className="text-sm text-white/55 leading-relaxed mb-5">
                  {skillNotes[selectedSkill.name] ?? "A key part of the portfolio's technical lattice."}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3">
                    <div className="text-[10px] font-mono tracking-[0.22em] text-white/35 mb-1">PROFICIENCY</div>
                    <div className="text-xl font-semibold text-white">{selectedSkill.level}%</div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3">
                    <div className="text-[10px] font-mono tracking-[0.22em] text-white/35 mb-1">CATEGORY</div>
                    <div className="text-lg font-semibold text-white">{selectedSkill.category}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {filtered.slice(0, 4).map((skill) => (
                    <button
                      key={skill.name}
                      onClick={() => handleSelect(skill.name)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-[0.16em] transition-colors border ${
                        selectedSkill.name === skill.name
                          ? "bg-neon-blue/10 text-neon-blue border-neon-blue/25"
                          : "bg-white/[0.03] text-white/45 border-white/5 hover:text-white hover:border-neon-blue/15"
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-[1.5rem] p-4 border border-white/5">
                <div className="text-[10px] font-mono tracking-[0.34em] text-neon-blue/55 mb-3">ACCESS CHANNELS</div>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.22em] rounded-full border transition-colors ${
                        activeCategory === category
                          ? "text-neon-blue border-neon-blue/30 bg-neon-blue/10"
                          : "text-white/40 border-white/10 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}