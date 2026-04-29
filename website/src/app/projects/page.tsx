import PageLayout from "@/components/PageLayout";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    name: "MapLinky",
    subtitle: "Universal Map Link Converter",
    link: "https://maplinky.com",
    github: "https://github.com/ved-dave/MapLinky",
    bullets: [
      "Built maplinky.com to solve a simple but annoying problem — shared map links often break across platforms, so this tool automatically detects and converts links between Google Maps, Apple Maps, and OpenStreetMap.",
      "Backend runs on a Cloudflare Worker with Gemini handling the link parsing; Vanilla JS on the frontend.",
    ],
    tags: ["Cloudflare Workers", "Gemini", "JavaScript"],
  },
    {
    name: "World Map Travel Tracker",
    subtitle: "Shareable and colorable world map",
    link: "https://traveltracker.veddave.com",
    github: "https://github.com/ved-dave/traveltracker",
    bullets: [
      "Colorable world map with custom colors and login feature to save and share your map with others.",
      "Implemented with Next.js on frontend, backend uses Supabase for authentication and for storing the shareable map data",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Postgres"],
  },
  {
    name: "This Portfolio",
    subtitle: "Personal Portfolio Website",
    link: null,
    github: "https://github.com/ved-dave/portfolio",
    bullets: [
      "Designed and built a personal portfolio site to showcase my work experience, photography, and background in a fun and creative way.",
      "Features a dynamic theme picker, Firebase-powered photo gallery with lazy loading, and a responsive layout.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Vercel"],
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
  },
  {
    name: "TensorFlow Model Garden",
    subtitle: "Purdue VIP Research Lab, Google",
    link: null,
    bullets: [
      "Partnered with Google through Purdue's VIP program training YOLO-based object detection models; built a new data pipeline to handle YOLOv3 constraints and integrated it into the TensorFlow Model Garden.",
    ],
    tags: ["Python", "TensorFlow", "YOLOv3"],
  },
  {
    name: "CAM2 Code Review Tool",
    subtitle: "Purdue VIP Research Lab",
    link: null,
    bullets: [
      "Built static analysis tools for an open-source code review project — unused code detection, duplicate code flagging, and runtime profiling to help developers catch bugs before they ship.",
    ],
    tags: ["Python"],
  },
];

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </PageLayout>
  );
}
