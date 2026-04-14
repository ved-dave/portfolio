import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

const workExperience = [
  {
    company: "Microsoft",
    logo: "/logos/microsoft.png",
    logoAlt: "Microsoft",
    role: "Software Engineer",
    team: "Dynamics 365 CRM, Omnichannel Messaging",
    start: "Aug 2022",
    end: "Mar 2026",
    bullets: [
      "Piloted org-wide agentic QA automation initiative using LLM-driven workflows, achieving 100% backend API E2E test coverage (400+ test cases) across team and sister teams — reduced QA costs by 70% and improved service reliability from 4 to 5 nines.",
      "Led implementation of attachment/file sharing service and public Messaging APIs as part of large-scale CRM SaaS infrastructure migration to BAP Core Services.",
    ],
  },
  {
    company: "Microsoft",
    logo: "/logos/microsoft.png",
    logoAlt: "Microsoft",
    role: "Software Engineering Intern",
    team: "Dynamics 365 CRM, Omnichannel Messaging",
    start: "May 2021",
    end: "Aug 2021",
    bullets: [
      "Built APIs bridging Dynamics Omnichannel and Bot Framework to enable end-to-end messaging through Microsoft Teams agents.",
      "Designed and implemented a Teams application interfacing with the Omnichannel APIs; demonstrated proof of concept at MS internal expo.",
    ],
  },
  {
    company: "Stealth Startup",
    logo: null, // Replace with: "/logos/stealth.png"
    logoAlt: "Stealth Startup",
    role: "Software Engineering Intern",
    team: "Enterprise Catering Delivery",
    start: "Jun 2020",
    end: "Aug 2020",
    bullets: [
      "Built a React Native app for an enterprise catering delivery startup, including responsive UI, authentication pipeline, and user data queries via SQL over Google Firestore.",
    ],
  },
  {
    company: "Purdue University",
    logo: "/logos/purdue.png",
    logoAlt: "Purdue University",
    role: "Physics Teaching Assistant",
    team: "Department of Physics & Astronomy",
    start: "Dec 2018",
    end: "May 2019",
    bullets: [
      "Proctored introductory mechanics lab sessions, assisted students with Python simulations, and graded lab reports with constructive feedback.",
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-10">Work Experience</h2>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-[#383838]" />

                <div className="space-y-10">
                  {workExperience.map((job, index) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Logo / dot on the timeline */}
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-[#2b2b2c] border border-[#383838] flex items-center justify-center overflow-hidden">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={job.logoAlt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-gray-400 text-center leading-tight px-1">
                            {job.logoAlt.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                            <p className="text-sm font-medium text-primary">{job.company}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{job.team}</p>
                          </div>
                          <span className="text-xs text-gray-400 bg-[#1e1e1f] border border-[#383838] px-3 py-1 rounded-lg whitespace-nowrap self-start">
                            {job.start} – {job.end}
                          </span>
                        </div>

                        <ul className="mt-4 space-y-2">
                          {job.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
                              <span className="text-primary flex-shrink-0">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
