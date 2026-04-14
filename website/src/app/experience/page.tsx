import PageLayout from "@/components/PageLayout";
import ExperienceTimeline from "@/components/ExperienceTimeline";

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

export default function ExperiencePage() {
  return (
    <PageLayout title="Work Experience">
      <ExperienceTimeline entries={workExperience} />
    </PageLayout>
  );
}
