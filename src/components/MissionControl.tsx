import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Code2,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";
import { skills } from "../data/skills";

const metrics = [
  { label: "Projects Built", value: "15+", icon: Layers3 },
  { label: "Technologies Used", value: `${skills.length}`, icon: Code2 },
  { label: "GitHub Contributions", value: "Not tracked", icon: Code2 },
  { label: "Hackathons Participated", value: "Not tracked", icon: Sparkles },
];

const proficiencyGroups = [
  {
    label: "Frontend Development",
    category: "Frontend",
    icon: Code2,
  },
  {
    label: "Backend Development",
    category: "Backend",
    icon: Layers3,
  },
  {
    label: "Database Management",
    category: "Database",
    icon: Database,
  },
  {
    label: "AI Integration",
    category: "Architecture",
    skill: "AI Integration",
    icon: Sparkles,
  },
  {
    label: "UI/UX Development",
    category: "Design",
    skill: "UI/UX",
    icon: BookOpen,
  },
];

function getGroupLevel(group: (typeof proficiencyGroups)[number]) {
  const matches = group.skill
    ? skills.filter((skill) => skill.name === group.skill)
    : skills.filter((skill) => skill.category === group.category);

  if (!matches.length) return null;
  return Math.round(matches.reduce((total, skill) => total + skill.level, 0) / matches.length);
}

export default function MissionControl() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="mission"
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-9 text-center md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ MISSION_CONTROL ]
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl">
            Technical <span className="text-[#D6B477]">Overview</span>
          </h2>
          <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#AAA49A] md:text-base">
            A snapshot of my technical capabilities, development experience and
            areas of focus.
          </p>
        </motion.div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="group rounded-xl border border-[#D6B477]/20 bg-[#201F1C]/75 p-4 transition-colors hover:border-[#D6B477]/50 sm:p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <metric.icon className="mb-5 text-[#D6B477] transition-colors group-hover:text-[#E8CEA0]" size={21} />
              <div className="mb-1 text-xl font-semibold text-[#F5F1E8] sm:text-2xl">
                {metric.value}
              </div>
              <div className="font-mono text-[9px] tracking-[0.12em] text-[#AAA49A] sm:text-[10px]">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-xl border border-[#D6B477]/20 bg-[#201F1C]/60 p-5 sm:p-7"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#D6B477]">
                TECHNICAL_PROFICIENCY
              </span>
              <p className="mt-2 text-sm text-[#AAA49A]">
                Skill levels based on the current portfolio skill data.
              </p>
            </div>
            <span className="hidden rounded-full border border-[#D6B477]/20 px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-[#AAA49A] sm:block">
              PORTFOLIO DATA
            </span>
          </div>

          <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
            {proficiencyGroups.map((group, index) => {
              const level = getGroupLevel(group);
              return (
                <div key={group.label}>
                  <div className="mb-2 flex items-center gap-2">
                    <group.icon size={16} className="text-[#D6B477]" />
                    <span className="text-sm text-[#F5F1E8]/85">{group.label}</span>
                    <span className="ml-auto font-mono text-[10px] text-[#E8CEA0]">
                      {level === null ? "Not rated" : `${level}%`}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#11100F]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#D6B477] to-[#E8CEA0]"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${level ?? 0}%` } : {}}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
