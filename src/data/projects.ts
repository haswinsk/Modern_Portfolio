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
    title: "Campus QuickPass",
    tagline: "Smart campus service management platform",
    description:
      "Campus QuickPass is a smart campus service management platform designed to reduce crowd and waiting time in college canteens, xerox centers, and stationery shops. Students can place canteen orders, upload PDFs for xerox/printing, buy stationery items, receive digital tokens, and track order status in real time, while vendors manage everything from dedicated admin dashboards.",
    features: [
      "Place canteen orders",
      "PDF upload for xerox and printing",
      "Stationery purchase workflow",
      "Digital token generation",
      "Real-time order status tracking",
      "Vendor admin dashboards",
      "Menu and item management",
      "Dynamic pricing control",
      "Mark orders as ready",
      "Google Authentication",
      "Multi-organization support",
      "Responsive web application",
    ],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "MERN Stack"],
    architecture: [
      "$ architecture.campus-services --view",
      "├── student-app/ Orders, uploads, token tracking",
      "├── vendor-console/ Canteen, xerox, stationery admin",
      "├── auth-layer/ Google login + role-based access",
      "├── token-engine/ Queue and slot management",
      "├── realtime-updates/ Live order state sync",
      "└── data-store/ MongoDB + Express APIs",
    ],
    category: "Campus Service Platform",
    status: "Live",
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
