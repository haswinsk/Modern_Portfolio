import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code, Layers } from "lucide-react";
import { projects, type Project } from "../data/projects";
import ProjectModal from "./ProjectModal";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 10);
    setRotateY(x * 10);
    setMouseX(((e.clientX - rect.left) / rect.width) * 100);
    setMouseY(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card glass-panel rounded-2xl overflow-hidden cursor-pointer group relative border border-white/5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.99 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out, box-shadow 0.25s ease",
      }}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: project.color }}
      />

      <div className="p-5 md:p-6">
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-3">
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
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs md:text-sm text-white/50 mb-4 font-mono">
          {project.tagline}
        </p>

        {/* Description preview */}
        <p className="text-xs md:text-sm text-white/40 mb-5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/30">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          {project.demoUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-neon-blue transition-colors cursor-pointer pointer-events-auto bg-transparent border-none"
            >
              <ExternalLink size={12} />
              DEMO
            </button>
          )}
          {project.githubUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-purple-accent transition-colors cursor-pointer pointer-events-auto bg-transparent border-none"
            >
              <Code size={12} />
              SOURCE
            </button>
          )}
          <div className="ml-auto">
            <Layers size={14} className="text-white/20 group-hover:text-neon-blue/40 transition-colors" />
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouseX}% ${mouseY}%, ${project.color}10, transparent 55%), radial-gradient(circle at 50% 0%, ${project.color}06, transparent 70%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.02) 18%, transparent 34%, transparent 100%)`,
            transform: `translateX(${mouseX - 50}%) translateY(${mouseY - 50}%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-20" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.05),transparent_55%)]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ PROJECT_DATABASE ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
            Production-quality builds and ambitious research prototypes — honestly presented, focused on impact and engineering rigor.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
