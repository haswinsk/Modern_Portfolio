import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Code2,
  ExternalLink,
  GraduationCap,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { projects, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

const projectIcons = {
  jarvis: Bot,
  "realtime-chat-music": MessageCircle,
  quickpass: GraduationCap,
  "hyperlocal-services": ShoppingBag,
} as const;

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? Code2;

  return (
    <motion.article
      className="group flex h-full min-h-[530px] flex-col overflow-hidden rounded-2xl border border-[#D6B477]/20 bg-[#1B1A18] transition-colors hover:border-[#D6B477]/55"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b border-[#D6B477]/15 bg-[#201F1C] text-left"
        aria-label={`View ${project.title} details`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(214,180,119,0.12),transparent_58%)]" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#D6B477]/30 bg-[#11100F] text-[#D6B477] shadow-[0_0_30px_rgba(214,180,119,0.08)] transition-colors group-hover:border-[#D6B477]/65 group-hover:text-[#E8CEA0]">
          <Icon size={38} strokeWidth={1.4} />
        </div>
        <span className="absolute bottom-4 left-5 font-mono text-[9px] tracking-[0.18em] text-[#AAA49A]">
          PROJECT PREVIEW
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded border border-[#D6B477]/25 bg-[#D6B477]/10 px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-[#E8CEA0]">
            {project.category}
          </span>
          <span className="text-right font-mono text-[9px] uppercase tracking-[0.12em] text-[#AAA49A]">
            {project.status}
          </span>
        </div>

        <button type="button" onClick={onClick} className="text-left">
          <h3 className="mb-2 font-serif text-2xl font-semibold text-[#F5F1E8] transition-colors group-hover:text-[#E8CEA0]">
            {project.title}
          </h3>
          <p className="mb-4 text-xs font-medium leading-5 text-[#E8CEA0]/80">
            {project.tagline}
          </p>
          <p className="text-sm leading-6 text-[#AAA49A]">{project.description}</p>
        </button>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-[#D6B477]/15 bg-[#11100F] px-2 py-1 font-mono text-[10px] text-[#AAA49A]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 border-t border-[#D6B477]/15 pt-5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-md bg-[#D6B477] px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.08em] text-[#11100F] transition-colors hover:bg-[#E8CEA0]"
            >
              <ExternalLink size={13} />
              LIVE DEMO
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-md border border-[#D6B477]/35 bg-[#11100F] px-3 py-2 font-mono text-[10px] tracking-[0.08em] text-[#F5F1E8] transition-colors hover:border-[#D6B477] hover:text-[#E8CEA0]"
            >
              <Code2 size={13} />
              SOURCE
            </a>
          )}
          {!project.demoUrl && !project.githubUrl && (
            <span className="font-mono text-[10px] tracking-[0.12em] text-[#AAA49A]">
              PRIVATE PROTOTYPE
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ PROJECT_DATABASE ]
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl">
            Featured <span className="text-[#D6B477]">Projects</span>
          </h2>
          <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#AAA49A] md:text-base">
            Building practical products, intelligent applications and solutions
            to real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
