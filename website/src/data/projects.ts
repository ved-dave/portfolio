export interface Project {
  name: string;
  subtitle: string;
  bullets: string[];
  link?: string | null;
  notable?: boolean | false;
  github?: string | null;
  tags: string[];
  image?: string;
  kind: "web" | "research";
}

export const projects: Project[] = [
  {
    name: "Manufacturer Scraper Agents",
    subtitle: "Agentic evaluation experiment",
    link: null,
    notable: true,
    github: "https://github.com/ved-dave/manufacturer-scraper-eval",
    bullets: [
      "Built scrapers based on a set of datasets for a real client problem.",
      "Performed evals on the scraper and built site specific profiles from a small dataset to give agents context to navigate.",
      "Designed prototype system for this - part agentic, part deterministic."
    ],
    tags: ["Python", "Evals", "Agents"],
    kind: "research",
  },
  {
    name: "DJ song queue app",
    subtitle: "Prototype night club DJ song queue",
    link: "",
    github: "https://github.com/truvailabs/dj-request-app",
    notable: true,
    bullets: [
      "Prototype song queue app for a Liventful customer.",
      "Deployed to customer on site (DJ studio) during development and also during the event.",
      "Collected ~$300 in revenue from the service during the Fake Wedding party hosted on Aug 8, 2026 in Seattle.",
      "Stack is a Railway container with Node backend, React frontend on Vercel.",
      "P.S. Don't pay to queue any songs here unless you want to make me a personal donation :P"
    ],
    tags: ["React", "Node", "TypeScript", "Stripe"],
    kind: "web",
  },
  {
    name: "MapLinky",
    subtitle: "Universal Map Link Converter",
    link: "https://maplinky.veddave.com",
    github: "https://github.com/ved-dave/MapLinky",
    notable: true,
    bullets: [
      "Built MapLinky to solve a simple but annoying problem — shared map links often break across platforms, so this tool automatically detects and converts links between Google Maps, Apple Maps, and OpenStreetMap.",
      "Backend runs on a Cloudflare Worker with Gemini handling the link parsing; Vanilla JS on the frontend.",
    ],
    tags: ["Cloudflare Workers", "Gemini", "JavaScript"],
    kind: "web",
    image: "/projects/maplinky.webp",
  },
  {
    name: "World Map Travel Tracker",
    subtitle: "Shareable and colorable world map",
    link: "https://traveltracker.veddave.com",
    github: "https://github.com/ved-dave/traveltracker",
    notable: true,
    bullets: [
      "Colorable world map with custom colors and login feature to save and share your map with others.",
      "Implemented with Next.js on frontend, backend uses Supabase for authentication and for storing the shareable map data",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Postgres"],
    kind: "web",
    image: "/projects/traveltracker.webp",
  },
  {
    name: "This Portfolio",
    subtitle: "Personal Portfolio Website",
    link: "https://veddave.com",
    github: "https://github.com/ved-dave/portfolio",
    bullets: [
      "Designed and built a personal portfolio site to showcase my background, work experience, and photography in a fun and creative way.",
      "Contains two themes, controlled by a SITE_DESIGN environment variable.",
      "Firebase-powered photo gallery with lazy loading, and a responsive layout.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Vercel"],
    kind: "web",
    image: "/projects/portfolio.webp",
  },
  {
    name: "TinyChain",
    subtitle: "Blockchain System for IoT Devices — Purdue Senior Capstone",
    link: null,
    bullets: [
      "Forked the open-source Iroha blockchain and stripped it down to run on resource-constrained IoT hardware.",
      "Ran the whole thing on six Raspberry Pis — used LED triggers to simulate real IoT device behavior and demonstrate the ledger recording live at the Purdue Senior Design Expo.",
    ],
    tags: ["C++", "Iroha Blockchain", "Raspberry Pi"],
    kind: "research",
  },
  {
    name: "TensorFlow Model Garden",
    subtitle: "Purdue VIP Research Lab, Google",
    link: null,
    bullets: [
      "Partnered with Google through Purdue's VIP program training YOLO-based object detection models; built a new data pipeline to handle YOLOv3 constraints and integrated it into the TensorFlow Model Garden.",
    ],
    tags: ["Python", "TensorFlow", "YOLOv3"],
    kind: "research",
  },
  {
    name: "CAM2 Code Review Tool",
    subtitle: "Purdue VIP Research Lab",
    link: null,
    bullets: [
      "Built static analysis tools for an open-source code review project — unused code detection, duplicate code flagging, and runtime profiling to help developers catch bugs before they ship.",
    ],
    tags: ["Python"],
    kind: "research",
  },
];
