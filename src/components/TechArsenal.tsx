import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Braces,
  Code2,
  Database,
  FolderKanban,
  Layers3,
  Monitor,
  Pencil,
  Radar,
} from "lucide-react";
import { skills, skillCategories, type Skill } from "../data/skills";
import { projects } from "../data/projects";

const skillNotes: Record<string, string> = {
  React: "A JavaScript library for building fast, interactive and scalable user interfaces with a component-based architecture.",
  "Next.js": "Production-first routing and delivery patterns for fast, polished experiences.",
  JavaScript: "Dynamic behavior, orchestration, and interactive application logic.",
  TypeScript: "Type-safe product logic and maintainable application architecture.",
  "Node.js": "Server-side coordination, APIs, and real-time service layers.",
  "Express.js": "Lightweight service composition and request orchestration.",
  MongoDB: "Flexible persistence for content, profiles, and application data.",
  "Tailwind CSS": "Consistent visual systems with efficient spacing and responsive layout.",
  "UI/UX": "Layout rhythm, interaction clarity, and motion pacing across interfaces.",
  "Full Stack": "End-to-end product thinking across UI, APIs, and deployment.",
  "AI Integration": "Connecting intelligent capabilities to practical product workflows.",
  "Prompt Design": "Structured prompts for reliable AI-assisted experiences.",
};

const categoryIcons = {
  All: Layers3,
  Frontend: Monitor,
  Backend: Layers3,
  Language: Braces,
  Database,
  Design: Pencil,
  Architecture: Layers3,
};

function getSkillLabel(level: number) {
  if (level >= 90) return "Core Skill";
  if (level >= 84) return "Familiar";
  return "Currently Learning";
}

function getRelatedProjects(skillName: string) {
  return projects.filter((project) => project.techStack.includes(skillName));
}

function SkillButton({
  skill,
  selected,
  onSelect,
  style,
}: {
  skill: Skill;
  selected: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      style={style}
      className={`rounded-xl border px-2 py-2 text-left transition-[border-color,background-color,box-shadow,color] duration-200 sm:px-3 sm:py-2.5 ${
        selected
          ? "border-[#D6B477] bg-[#D6B477]/15 text-[#F5F1E8] shadow-[0_0_24px_rgba(214,180,119,0.16)]"
          : "border-[#D6B477]/20 bg-[#1B1A18]/95 text-[#AAA49A] hover:border-[#D6B477]/70 hover:bg-[#D6B477]/10 hover:text-[#F5F1E8] hover:shadow-[0_0_18px_rgba(214,180,119,0.12)]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#D6B477] sm:h-2.5 sm:w-2.5" />
        <span className="min-w-0 whitespace-nowrap font-mono text-[9px] leading-3 tracking-[0.02em] sm:text-[11px] sm:leading-4 sm:tracking-[0.03em]">
          {skill.name}
        </span>
      </div>
    </motion.button>
  );
}

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

  const orbitalSkills = useMemo(() => filtered.slice(0, 10), [filtered]);

  useEffect(() => {
    if (!filtered.some((skill) => skill.name === selectedSkill.name) && filtered[0]) {
      setSelectedSkill(filtered[0]);
    }
  }, [filtered, selectedSkill.name]);

  const selectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setBurstId((current) => current + 1);
  };

  return (
    <section
      id="arsenal"
      className="relative overflow-hidden px-4 pb-28 pt-14 sm:px-6 md:py-20 md:pb-32 lg:px-8 lg:py-24"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-9 text-center md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ TECH_ARSENAL ]
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl">
            Technical <span className="text-[#D6B477]">Skills</span>
          </h2>
          <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#AAA49A] md:text-base">
            Technologies, frameworks and tools I use to build scalable
            applications and intelligent products.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`flex min-w-[96px] items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-colors ${
                  activeCategory === category
                    ? "border-[#D6B477] bg-[#D6B477] text-[#11100F]"
                    : "border-[#D6B477]/35 bg-[#1B1A18] text-[#F5F1E8] hover:border-[#D6B477] hover:text-[#E8CEA0]"
                }`}
              >
                <Icon size={16} />
                {category}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          className="grid items-stretch gap-5 lg:grid-cols-[1fr_1fr]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          <div className="relative min-h-0 overflow-hidden rounded-2xl border border-[#D6B477]/35 bg-[#1B1A18] p-2 sm:min-h-[520px] sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,180,119,0.1),transparent_52%)]" />
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D6B477]/25" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D6B477]/25" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D6B477]/15" />
              <div className="tech-radar-sweep pointer-events-none absolute left-[14%] top-[14%] h-[72%] w-[72%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_285deg,rgba(214,180,119,0.16)_330deg,transparent_360deg)]" />
              <div className="tech-radar-needle pointer-events-none absolute bottom-1/2 left-1/2 z-[1] h-[39%] w-px bg-gradient-to-t from-[#D6B477]/80 via-[#E8CEA0] to-transparent shadow-[0_0_8px_rgba(232,206,160,0.7)]">
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#E8CEA0] shadow-[0_0_12px_rgba(232,206,160,0.95)]" />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8CEA0] shadow-[0_0_12px_rgba(232,206,160,0.9)]" />
              {orbitalSkills.map((skill, index) => {
                const angle = (index / orbitalSkills.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <span
                    key={`connection-${skill.name}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px bg-gradient-to-r from-[#D6B477]/45 to-transparent"
                    style={{
                      width: "36%",
                      transformOrigin: "left center",
                      transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                    }}
                  />
                );
              })}
              <motion.div
                key={`${selectedSkill.name}-${burstId}`}
                className="absolute left-1/2 top-1/2 z-[2] flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28%] border border-[#D6B477] bg-[#201F1C] text-center shadow-[0_0_28px_rgba(214,180,119,0.14)] sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Code2 className="mb-1 h-5 w-5 text-[#E8CEA0] sm:mb-2 sm:h-[30px] sm:w-[30px]" />
                <span className="text-[clamp(0.75rem,2.4vw,1.125rem)] font-semibold text-[#F5F1E8]">Tech Stack</span>
                <span className="mt-1 px-1 text-center font-mono text-[8px] leading-3 text-[#D6B477] sm:px-2 sm:text-[9px] sm:leading-4">
                  {getSkillLabel(selectedSkill.level)}
                </span>
              </motion.div>

              {orbitalSkills.map((skill, index) => {
                const angle = (index / orbitalSkills.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <SkillButton
                    key={skill.name}
                    skill={skill}
                    selected={selectedSkill.name === skill.name}
                    onSelect={() => selectSkill(skill)}
                    style={{
                      position: "absolute",
                      left: `${50 + Math.cos(angle) * 33}%`,
                      top: `${50 + Math.sin(angle) * 33}%`,
                      transform: "translate(-50%, -50%)",
                      width: "clamp(78px, 21%, 132px)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col rounded-2xl border border-[#D6B477]/45 bg-[#1B1A18] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-4xl font-semibold text-[#F5F1E8]">
                  {selectedSkill.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#D6B477]/35 bg-[#D6B477]/10 px-3 py-1.5 text-xs text-[#E8CEA0]">
                  <Layers3 size={14} />
                  {selectedSkill.category}
                </span>
              </div>
              <div className="rounded-xl border border-[#D6B477]/35 bg-[#201F1C] p-3 text-[#D6B477]">
                <Radar size={28} />
              </div>
            </div>

            <p className="mt-7 text-base leading-7 text-[#AAA49A]">
              {skillNotes[selectedSkill.name]}
            </p>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm tracking-[0.12em] text-[#F5F1E8]">
                  Skill level
                </span>
                <span className="font-mono text-sm text-[#E8CEA0]">
                  {getSkillLabel(selectedSkill.level)}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#11100F]">
                <motion.div
                  className="h-full rounded-full bg-[#E8CEA0]"
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#D6B477]/30 bg-[#201F1C] p-4">
                <span className="font-mono text-[10px] text-[#D6B477]">CATEGORY</span>
                <div className="mt-2 text-base text-[#F5F1E8]">{selectedSkill.category}</div>
              </div>
              <div className="rounded-xl border border-[#D6B477]/30 bg-[#201F1C] p-4">
                <span className="font-mono text-[10px] text-[#D6B477]">SELECTED STATUS</span>
                <div className="mt-2 text-base text-[#F5F1E8]">
                  {getSkillLabel(selectedSkill.level)}
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#D6B477]/15 pt-6">
              <span className="mb-3 block font-mono text-[10px] tracking-[0.18em] text-[#D6B477]">
                RELATED TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-2">
                {filtered.slice(0, 4).map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => selectSkill(skill)}
                    className="rounded-full border border-[#D6B477]/35 bg-[#201F1C] px-3 py-1.5 text-xs text-[#F5F1E8] transition-colors hover:border-[#D6B477] hover:text-[#E8CEA0]"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-[#D6B477]/15 pt-6">
                <span className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-[#D6B477]">
                  <FolderKanban size={14} />
                  USED IN PROJECTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {getRelatedProjects(selectedSkill.name).length ? (
                    getRelatedProjects(selectedSkill.name).map((project) => (
                      <span
                        key={project.id}
                        className="rounded-md border border-[#D6B477]/20 bg-[#201F1C] px-2.5 py-1.5 text-xs text-[#F5F1E8]/80"
                      >
                        {project.title}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#AAA49A]">
                      No matching project listed in the portfolio data.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
