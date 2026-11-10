export interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

export const skills: Skill[] = [
  { name: "React", level: 95, category: "Frontend", color: "#d6b477" },
  { name: "Next.js", level: 90, category: "Frontend", color: "#f5f1e8" },
  { name: "JavaScript", level: 95, category: "Language", color: "#f2d69a" },
  { name: "TypeScript", level: 88, category: "Language", color: "#c5a66f" },
  { name: "Node.js", level: 85, category: "Backend", color: "#b99a62" },
  { name: "Express.js", level: 82, category: "Backend", color: "#aaa49a" },
  { name: "MongoDB", level: 80, category: "Database", color: "#b99a62" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", color: "#d6b477" },
  { name: "UI/UX", level: 85, category: "Design", color: "#c5a66f" },
  { name: "Full Stack", level: 88, category: "Architecture", color: "#f2d69a" },
  { name: "AI Integration", level: 84, category: "Architecture", color: "#d6b477" },
  { name: "Prompt Design", level: 80, category: "Design", color: "#b99a62" },
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
