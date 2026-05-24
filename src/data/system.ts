import { navLinks, siteConfig } from "./site";
import { projects } from "./projects";
import { skills } from "./skills";

export const terminalCommands = [
  "help",
  "about",
  "projects",
  "skills",
  "contact",
  "resume",
  "clear",
  "mission",
  "system-status",
  "sudo unlock",
];

export const terminalBootLines = [
  "Booting HASWIN_SK operating layer...",
  "Neural bridge established. Type help to begin.",
];

export const assistantPrompts = [
  "Tell me about HASWIN",
  "Show me the projects",
  "What AI ideas stand out?",
  "How do I contact him?",
];

export const assistantKnowledge = {
  about:
    "HASWIN SK is a full stack developer and creative builder focused on futuristic interfaces, AI-powered interactions, and cinematic web experiences.",
  projects:
    "The portfolio highlights main projects such as J.A.R.V.I.S, QuickPass, and realtime collaboration or security tools. Research prototypes are now grouped separately in the Research section.",
  skills:
    "Core strengths include React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, and interface motion design. The stack is tuned for polished product-grade web systems and AI-ready product concepts.",
  technologies:
    "The build mixes React, Framer Motion, GSAP, Three.js, Vite, and modern CSS patterns to deliver a premium futuristic operating-system style interface.",
  contact:
    `Reach HASWIN SK through ${siteConfig.email} or the contact panel.`,
  mission:
    "Mission mode centers on building immersive, clean, and unforgettable experiences that feel like a cinematic AI operating system.",
};

export const systemStatusLines = [
  { label: "SYSTEM STATUS", value: "ACTIVE" },
  { label: "AI CORE", value: "ONLINE" },
  { label: "NETWORK", value: "STABLE" },
  { label: "UI SYSTEM", value: "RUNNING" },
  { label: "MISSION MODE", value: "READY" },
];

export const siteSections = navLinks.reduce<Record<string, string>>((acc, link) => {
  acc[link.href.replace("#", "")] = link.label;
  return acc;
}, {});

export function getProjectCount() {
  return projects.length;
}

export function getSkillCount() {
  return skills.length;
}
