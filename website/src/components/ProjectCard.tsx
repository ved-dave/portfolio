import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  name: string;
  subtitle: string;
  bullets: string[];
  link?: string | null;
  tags?: string[];
}

export default function ProjectCard({ name, subtitle, bullets, link, tags }: ProjectCardProps) {
  return (
    <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {link.replace("https://", "")}
          </a>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
            <span className="text-primary flex-shrink-0">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
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
  );
}
