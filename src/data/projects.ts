export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  architecture?: string[];
  category: string;
  status: string;
  demoUrl?: string;
  githubUrl?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "jarvis",
    title: "J.A.R.V.I.S",
    tagline: "AI-powered PC control assistant",
    description:
      "A prototype AI voice assistant inspired by Iron Man's JARVIS that takes full control of your PC. Capable of executing commands, managing files, controlling applications, and performing system-level operations through natural language processing and voice commands.",
    features: [
      "Voice-activated PC control",
      "Natural language command processing",
      "Application automation & launch",
      "File system management via voice",
      "System monitoring & diagnostics",
      "Custom workflow automation",
      "Screen control & navigation",
    ],
    techStack: ["Python", "TensorFlow", "SpeechRecognition", "PyAutoGUI", "OpenAI API", "Flask"],
    architecture: [
      "$ architecture.voice-agent --view",
      "├── voice-capture/ Mic input + speech recognition",
      "├── intent-engine/ NLP command parsing",
      "├── automation-layer/ PC control + workflows",
      "├── system-tools/ Files, apps, diagnostics",
      "└── api-core/ Python + Flask orchestration",
    ],
    category: "AI Assistant Prototype",
    status: "Active Prototype",
    color: "#00ff88",
  },
  {
    id: "realtime-chat-music",
    title: "VibeChat",
    tagline: "Next Gen Realtime Messaging with Music",
    description:
      "A realtime social messaging platform featuring synchronized music playback, voice messaging, image sharing, persistent global audio playback, and Socket.IO-powered realtime communication. Users can chat, listen to music together, and share experiences in perfect sync.",
    features: [
      "Real-time synchronized music playback",
      "Voice messaging with high fidelity",
      "Image sharing in chat",
      "Persistent global audio playback",
      "Room-based listening sessions",
      "Live chat with typing indicators",
      "Cross-device sync engine",
      "Custom playlist collaboration",
    ],
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Cloudinary", "Express"],
    architecture: [
      "$ architecture.realtime --view",
      "├── client/ React room UI + playback",
      "├── websocket-gateway/ Socket.io sync layer",
      "├── collaboration-engine/ Chat + room state",
      "├── media-sync/ Music timing + session sync",
      "├── voice-engine/ Voice message recording + playback",
      "└── data-store/ MongoDB + Express APIs",
    ],
    category: "Real-time Application",
    status: "Live",
    demoUrl: "https://vibe-chat-lake.vercel.app/",
    githubUrl: "https://github.com/haswinsk/VibeChat.git",
    color: "#00d4ff",
  },
  {
    id: "quickpass",
    title: "QuickPass",
    tagline: "Secure credential management system",
    description:
      "A fast and secure password and credential manager with end-to-end encryption, biometric authentication, and seamless cross-platform synchronization.",
    features: [
      "End-to-end encryption",
      "Biometric authentication",
      "Cross-platform sync",
      "Password strength analyzer",
      "Breach monitoring alerts",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    architecture: [
      "$ architecture.security --view",
      "├── web-app/ Next.js credential dashboard",
      "├── auth-layer/ Biometric + secure session checks",
      "├── vault-engine/ Encrypted password storage",
      "├── threat-monitor/ Breach + strength analysis",
      "└── db-layer/ Prisma + PostgreSQL persistence",
    ],
    category: "Security Tool",
    status: "Prototype",
    demoUrl: "https://quick-pass-nu.vercel.app/",
    githubUrl: "https://github.com/haswinsk/QuickPass.git",
    color: "#a855f7",
  },
  {
    id: "hyperlocal-services",
    title: "Hyperlocal Services",
    tagline: "Connecting customers with nearby service providers",
    description:
      "A hyperlocal marketplace that connects customers with the right nearby service providers for quick, reliable service discovery, booking, and communication.",
    features: [
      "Nearby provider discovery",
      "Customer-to-provider matching",
      "Service request booking flow",
      "In-app messaging and updates",
      "Ratings and service history",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    architecture: [
      "$ architecture.marketplace --view",
      "├── customer-app/ Search, booking, chat",
      "├── provider-app/ Service availability, order updates",
      "├── matching-engine/ Location + category matching",
      "├── booking-service/ Requests, scheduling, status tracking",
      "├── maps-service/ Geo lookup + nearby discovery",
      "└── data-store/ Users, providers, services, bookings",
    ],
    category: "Marketplace Platform",
    status: "Concept Prototype",
    color: "#06b6d4",
  },
];
