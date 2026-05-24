import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { research } from "../data/research";
import ProjectModal from "./ProjectModal";
import { Project } from "../data/projects";

function ResearchCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="project-card glass-panel rounded-2xl overflow-hidden relative border border-cyan-400/10 bg-white/[0.02]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
    >
      <div className="h-1 w-full opacity-70" style={{ backgroundColor: project.color }} />
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-400/20 bg-cyan-400/10 text-cyan-200/80 tracking-[0.16em]">
            PRIVATE RESEARCH
          </span>
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">{project.status}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-xs md:text-sm text-white/50 mb-4 font-mono">{project.tagline}</p>
        <p className="text-xs md:text-sm text-white/40 mb-5 line-clamp-3 leading-relaxed">{project.description}</p>
        <div className="flex items-center justify-between text-[10px] font-mono text-white/25 border-t border-white/5 pt-3">
          <span>NO PUBLIC DEMO</span>
          <span>NO SOURCE LINK</span>
        </div>

      </div>
    </motion.div>
  );
}

export default function ResearchSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">[ RESEARCH ]</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Selected Research Prototypes</h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">Concept work and hackathon prototypes — documented here for context. No public demos or source available for these entries.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {research.map((r, i) => (
            <ResearchCard key={r.id} project={r} index={i} onClick={() => setSelected(r)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
