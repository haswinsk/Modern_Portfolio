export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "started-coding",
    year: "2020",
    title: "SYSTEM BOOT",
    description:
      "Started learning programming and wrote the first lines of code that kicked off the journey.",
    category: "Origin",
    icon: "terminal",
  },
  {
    id: "learned-frontend",
    year: "2021",
    title: "FRONTEND DISCOVERY",
    description:
      "Learned HTML, CSS, and JavaScript, then built the first interactive interfaces and discovered how design shapes experience.",
    category: "Learning",
    icon: "code",
  },
  {
    id: "react-apps",
    year: "2022",
    title: "REACT ENGINE ONLINE",
    description:
      "Moved deep into React, building reusable components, single-page apps, and cleaner UI architecture.",
    category: "Development",
    icon: "cpu",
  },
  {
    id: "mern-stack",
    year: "2023",
    title: "FULL-STACK EXPANSION",
    description:
      "Expanded into backend development with Node.js, Express, and MongoDB to ship full MERN applications with APIs and authentication.",
    category: "Development",
    icon: "database",
  },
  {
    id: "realtime-apps",
    year: "2024",
    title: "REAL-TIME SYSTEMS",
    description:
      "Explored WebSockets, WebRTC, and real-time synchronization to create collaborative, live-update experiences.",
    category: "Development",
    icon: "zap",
  },
  {
    id: "futuristic-concepts",
    year: "2025",
    title: "AI IDEA LAB",
    description:
      "Focused on AI integrations, futuristic UI concepts, and product ideas that blend intelligence with immersive design.",
    category: "Innovation",
    icon: "sparkles",
  },
  {
    id: "ai-vision",
    year: "2026",
    title: "AI-FIRST VISION",
    description:
      "Shaping ideas for AI-powered assistants, smarter workflows, and creative tools that feel intuitive and human.",
    category: "Vision",
    icon: "sparkles",
  },
];
