import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Terminal, Cpu } from "lucide-react";
import gsap from "gsap";
import type { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function getArchitectureLines(project: Project) {
  return (
    project.architecture ?? [
      "$ system.architecture --view",
      "├── frontend/ React + TypeScript",
      "├── backend/ Node.js + Express",
      "├── database/ MongoDB",
      "└── deployment/ Docker + CI/CD",
    ]
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [booting, setBooting] = useState(true);
  const bootBarRef = useRef<HTMLDivElement>(null);
  const isResearchProject =
    project?.category === "SIH Research Concept" || project?.status.includes("Research");

  useEffect(() => {
    if (!project) return;

    setBooting(true);
    const timeline = gsap.timeline();

    timeline.fromTo(
      bootBarRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.95, ease: "power3.out" }
    );

    const timer = window.setTimeout(() => setBooting(false), 980);

    return () => {
      window.clearTimeout(timer);
      timeline.kill();
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden glass-panel-strong rounded-[2rem] border border-white/10"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header color bar */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: project.color }}
            />

            <div className="max-h-[92vh] overflow-y-auto p-6 md:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="fixed top-6 right-6 z-10 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors border border-white/5 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <AnimatePresence>
                {booting && (
                  <motion.div
                    className="absolute inset-0 z-20 rounded-[2rem] overflow-hidden bg-[linear-gradient(180deg,rgba(5,5,8,0.98),rgba(5,5,8,0.92))] backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.14),transparent_40%)]" />
                    <div className="relative z-10 h-full min-h-[56vh] flex flex-col justify-center items-center text-center px-6">
                      <div className="text-[10px] font-mono tracking-[0.42em] text-neon-blue/60 mb-3">CLASSIFIED DOSSIER</div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Booting secure project archive</h3>
                      <p className="text-sm text-white/40 max-w-md mb-8">
                        Preparing cinematic system layers for {project.title}.
                      </p>
                      <div className="w-full max-w-md h-px bg-white/10 mb-4">
                        <div ref={bootBarRef} className="h-full w-full origin-left bg-gradient-to-r from-neon-blue via-cyan-glow to-purple-accent" />
                      </div>
                      <div className="font-mono text-[11px] tracking-[0.24em] text-white/35 space-y-2">
                        <div>INITIALIZING VISUAL CHANNELS</div>
                        <div>LOADING FEATURE MATRIX</div>
                        <div>SYNCING ARCHIVE PAYLOAD</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title section */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded border"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}40`,
                      backgroundColor: `${project.color}10`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/30">
                    {project.status}
                  </span>
                  {isResearchProject && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-400/20 bg-cyan-400/10 text-cyan-200/80 tracking-[0.18em]">
                      PRIVATE
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-sm font-mono text-white/50">
                  {project.tagline}
                </p>
              </motion.div>

              {/* Description */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.18 }}>
                <h3 className="text-xs font-mono text-neon-blue/60 tracking-wider mb-2 flex items-center gap-2">
                  <Terminal size={12} />
                  OVERVIEW
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.24 }}>
                <h3 className="text-xs font-mono text-neon-blue/60 tracking-wider mb-3 flex items-center gap-2">
                  <Cpu size={12} />
                  FEATURES
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <span
                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-xs md:text-sm text-white/60">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.3 }}>
                <h3 className="text-xs font-mono text-neon-blue/60 tracking-wider mb-3 flex items-center gap-2">
                  <Code size={12} />
                  TECH_STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Architecture placeholder */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.36 }}>
                <h3 className="text-xs font-mono text-neon-blue/60 tracking-wider mb-3 flex items-center gap-2">
                  <Cpu size={12} />
                  ARCHITECTURE
                </h3>
                <div className={`p-4 rounded-xl font-mono text-[10px] md:text-xs space-y-1 ${isResearchProject ? "bg-cyan-500/5 border border-cyan-400/10 text-cyan-100/35" : "bg-black/40 border border-white/5 text-white/30"}`}>
                  {getArchitectureLines(project).map((line, index) => (
                    <div
                      key={line}
                      className={index === 0 ? (isResearchProject ? "text-cyan-300/70" : "text-green-400/60") : ""}
                    >
                      {line}
                    </div>
                  ))}
                  <div className={isResearchProject ? "text-cyan-300/35 mt-2" : "text-neon-blue/40 mt-2"}>$ _</div>
                </div>
              </motion.div>

              {/* Actions */}
              {!isResearchProject && (
                <motion.div className="flex flex-wrap gap-3 pt-4 border-t border-white/5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: booting ? 0 : 1, y: booting ? 12 : 0 }} transition={{ duration: 0.45, delay: 0.42 }}>
                  <motion.button
                    onClick={() => project.demoUrl && window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
                    disabled={!project.demoUrl}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                    whileHover={project.demoUrl ? { scale: 1.05 } : {}}
                    whileTap={project.demoUrl ? { scale: 0.95 } : {}}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </motion.button>
                  <motion.button
                    onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    disabled={!project.githubUrl}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium glass-panel text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={project.githubUrl ? { scale: 1.05 } : {}}
                    whileTap={project.githubUrl ? { scale: 0.95 } : {}}
                  >
                    <Code size={14} />
                    View Source
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
