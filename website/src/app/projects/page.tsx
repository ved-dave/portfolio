import PageLayout from "@/components/PageLayout";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    name: "MapLinky",
    subtitle: "Universal Map Link Converter",
    link: "https://maplinky.com",
    bullets: [
      "Built maplinky.com to solve a simple but annoying problem — shared map links often break across platforms, so this tool automatically detects and converts links between Google Maps, Apple Maps, and OpenStreetMap.",
      "Backend runs on a Cloudflare Worker with Gemini handling the link parsing; vanilla JS on the frontend.",
    ],
    tags: ["Cloudflare Workers", "Gemini", "JavaScript"],
  },
  {
    name: "This Portfolio",
    subtitle: "Personal Portfolio Website",
    link: null,
    bullets: [
      "Designed and built a personal portfolio site to showcase my work, photography, and background.",
      "Features a dynamic theme picker, Firebase-powered photo gallery with lazy loading, and a responsive layout.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Netlify"],
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
    subtitle: "VIP Research Lab, Google Partnership",
    link: null,
    bullets: [
      "Worked with Google through Purdue's VIP program training YOLO-based object detection models; built a new data pipeline to handle YOLOv3 constraints and integrated it into the TensorFlow Model Garden.",
    ],
    tags: ["Python", "TensorFlow", "YOLOv3"],
  },
  {
    name: "CAM2 Code Review Tool",
    subtitle: "Open Source, VIP Research Lab",
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
