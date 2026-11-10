import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChartNetwork,
  Droplets,
  HeartPulse,
  ShieldAlert,
  Sprout,
} from "lucide-react";
import { research } from "../data/research";
import ProjectModal from "./ProjectModal";
import { Project } from "../data/projects";

const projectIcons = {
  "rakshas-x": ShieldAlert,
  "padma-prana": HeartPulse,
  "falcon-fiber": ChartNetwork,
  "aqua-guardian": Droplets,
  rhizomatureguard: Sprout,
} as const;

function ResearchCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? ChartNetwork;

  return (
    <motion.button
      type="button"
      className="group flex h-full min-h-[350px] flex-col overflow-hidden rounded-2xl border border-[#D6B477]/20 bg-[#1B1A18] text-left transition-colors hover:border-[#D6B477]/55"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="flex h-28 items-center justify-between border-b border-[#D6B477]/15 bg-[#201F1C] px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D6B477]/25 bg-[#11100F] text-[#D6B477] transition-colors group-hover:border-[#D6B477]/60 group-hover:text-[#E8CEA0]">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[9px] tracking-[0.18em] text-[#D6B477]/70">
          PRIVATE PROTOTYPE
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded border border-[#D6B477]/25 bg-[#D6B477]/10 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-[#E8CEA0]">
            CONCEPT PROTOTYPE
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#AAA49A]">
            {project.category.replace("SIH ", "")}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-xl font-semibold text-[#F5F1E8]">
          {project.title}
        </h3>
        <p className="mb-3 text-xs font-medium leading-5 text-[#E8CEA0]/80">
          {project.tagline}
        </p>
        <p className="line-clamp-3 text-sm leading-6 text-[#AAA49A]">
          {project.description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-[#D6B477]/15 pt-4 font-mono text-[9px] tracking-[0.12em] text-[#AAA49A]/75">
          <span>PRIVATE RESEARCH</span>
          <span>NO PUBLIC DEMO</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function ResearchSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="research"
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ RESEARCH &amp; INNOVATION ]
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl">
            Selected Research <span className="text-[#D6B477]">Prototypes</span>
          </h2>
          <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#AAA49A] md:text-base">
            Exploring ideas, experimenting with emerging technologies and
            developing solutions to real-world challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {research.map((project, index) => (
            <ResearchCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
