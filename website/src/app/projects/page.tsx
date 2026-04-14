import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { ExternalLink } from "lucide-react";

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
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-10">Projects</h2>

              <div className="space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{project.subtitle}</p>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {project.link.replace("https://", "")}
                        </a>
                      )}
                    </div>

                    <ul className="mt-4 space-y-2">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
                          <span className="text-primary flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-gray-400 bg-[#1e1e1f] border border-[#383838] px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
