// Drives the clock in the terminal footer. Change `currentCity` when I move.
const cities = {
  seattle: "America/Los_Angeles",
  "new york": "America/New_York",
} as const;
const currentCity: keyof typeof cities = "new york";

export const profile = {
  name: "ved dave",
  handle: "ved-dave",
  email: "me@veddave.com",
  location: "seattle ⇔ nyc",
  clock: { city: currentCity, timeZone: cities[currentCity] },
  tagline: "engineer · founder · photographer",
  intro:
    "I'm a software engineer and AI consultant.",
  building: {
    name: "truvai labs",
    href: "https://truvai.com",
    note: "deployed AI & software studio",
  },
  resume: "/Ved_resume.pdf",
  booking: "https://cal.com/veddave",
  instagramPhoto: "https://www.instagram.com/daves.shoots/",
  travelMap: "https://traveltracker.veddave.com/ved",
  about: [
    "I'm a Software Engineer, Founder, and Photographer based between Seattle and New York City.",
    "I run my own engineering consultancy firm where I help early stage startups and small businesses scale out their vision with AI and technology. I was formerly at Microsoft building out agentic QA testing pipelines and core backend infra for the Dynamics 365. I also created a customer-personalized event operations platform for indie event hosts and organizers.",
    "My expertise spans applied AI, full stack development, and solution/forward deployed engineering. Please explore my portfolio to learn more about me and my work :)",
  ],
  socials: [
    { name: "github", href: "https://github.com/ved-dave" },
    { name: "x", href: "https://x.com/veddave18" },
    { name: "linkedin", href: "https://www.linkedin.com/in/veddave/" },
    { name: "instagram", href: "https://www.instagram.com/ved.dave/" },
  ] as const,
  stack: [
    { label: "typescript", color: "blue" },
    { label: "python", color: "yellow" },
    { label: "c#", color: "aqua" },
    { label: "agents", color: "blue" },
    { label: "react", color: "fg" },
    { label: "node", color: "term" },
    { label: "fastapi", color: "aqua" },
    { label: "langchain", color: "purple" },
    { label: "react native", color: "aqua" },
    { label: "supabase", color: "term" },
    { label: "postgres", color: "blue" },
    { label: "firebase", color: "orange" },
    { label: "cloudflare", color: "orange" },
    { label: "stripe", color: "purple" },
    { label: "vercel", color: "fg" },
    { label: "tensorflow", color: "orange" },
    { label: "c++", color: "red" },
  ] as const,
  offHours: [
    { title: "building", text: "Solving the greatest challenges of our time.", href: "/projects" },
    { title: "dining", text: "Trying different kinds of food from around the globe." },
    { title: "photography", text: "Narrating stories and emotions through the lens.", href: "/photography" },
    { title: "travel", text: "Exploring every corner of our beautiful planet.", href: "https://traveltracker.veddave.com/ved" },
  ],
};

export type AccentColor = (typeof profile.stack)[number]["color"];
