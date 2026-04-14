interface ExperienceCardProps {
  company: string;
  logo?: string | null;
  logoAlt: string;
  role: string;
  team: string;
  start: string;
  end: string;
  bullets: string[];
}

export default function ExperienceCard({
  company,
  logo,
  logoAlt,
  role,
  team,
  start,
  end,
  bullets,
}: ExperienceCardProps) {
  return (
    <div className="relative flex gap-6">
      {/* Logo / dot on the timeline */}
      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-[#2b2b2c] border border-[#383838] flex items-center justify-center overflow-hidden">
        {logo ? (
          <img src={logo} alt={logoAlt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-semibold text-gray-400 text-center leading-tight px-1">
            {logoAlt.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
          <div>
            <h3 className="text-lg font-semibold text-white">{role}</h3>
            <p className="text-sm font-medium text-primary">{company}</p>
            <p className="text-xs text-gray-500 mt-0.5">{team}</p>
          </div>
          <span className="text-xs text-gray-400 bg-[#1e1e1f] border border-[#383838] px-3 py-1 rounded-lg whitespace-nowrap self-start">
            {start} – {end}
          </span>
        </div>

        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
              <span className="text-primary flex-shrink-0">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
