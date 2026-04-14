import ExperienceCard from "@/components/ExperienceCard";

interface ExperienceEntry {
  company: string;
  logo?: string | null;
  logoAlt: string;
  role: string;
  team: string;
  start: string;
  end: string;
  bullets: string[];
}

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export default function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-[#383838]" />

      <div className="space-y-10">
        {entries.map((entry, index) => (
          <ExperienceCard key={index} {...entry} />
        ))}
      </div>
    </div>
  );
}
