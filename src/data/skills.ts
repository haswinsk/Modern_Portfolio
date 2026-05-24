export interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

export const skills: Skill[] = [
  { name: "React", level: 95, category: "Frontend", color: "#00d4ff" },
  { name: "Next.js", level: 90, category: "Frontend", color: "#e2e8f0" },
  { name: "JavaScript", level: 95, category: "Language", color: "#f59e0b" },
  { name: "TypeScript", level: 88, category: "Language", color: "#3b82f6" },
  { name: "Node.js", level: 85, category: "Backend", color: "#22c55e" },
  { name: "Express.js", level: 82, category: "Backend", color: "#94a3b8" },
  { name: "MongoDB", level: 80, category: "Database", color: "#22c55e" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", color: "#00d4ff" },
  { name: "UI/UX", level: 85, category: "Design", color: "#a855f7" },
  { name: "Full Stack", level: 88, category: "Architecture", color: "#f472b6" },
  { name: "AI Integration", level: 84, category: "Architecture", color: "#f59e0b" },
  { name: "Prompt Design", level: 80, category: "Design", color: "#22d3ee" },
];

export const skillCategories = [
  "All",
  "Frontend",
  "Backend",
  "Language",
  "Database",
  "Design",
  "Architecture",
];
