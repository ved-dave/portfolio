import Link from "next/link";
import Shell from "@/components/term/Shell";
import Hero from "@/components/term/Hero";
import Prompt from "@/components/term/Prompt";
import ContributionGraph from "@/components/term/ContributionGraph";
import ExperienceLog from "@/components/term/ExperienceLog";
import ProjectList from "@/components/term/ProjectList";
import HireForm from "@/components/term/HireForm";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <Shell>
      <Hero />

      <div className="mt-16">
        <ContributionGraph />
      </div>

      <section className="mt-16">
        <Prompt command="cat experience.log" id="experience" />
        <ExperienceLog />
      </section>

      <section className="mt-16">
        <Prompt
          command="ls ~/projects"
          id="projects"
          right={
            <Link href="/projects" className="text-[12px] text-fg-muted hover:text-term">
              view all →
            </Link>
          }
        />
        <ProjectList />
      </section>

      <section className="mt-16">
        <Prompt command="cat about-me.md" id="about" />
        <div className="space-y-3 border border-border bg-card/40 p-5 text-[13.5px] leading-relaxed text-fg-muted sm:p-6">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Prompt
          command="cat photography.md"
          right={
            <Link href="/gallery" className="text-[12px] text-fg-muted hover:text-term">
              open gallery →
            </Link>
          }
        />
        <p className="text-[13.5px] leading-relaxed text-fg">
          10+ years behind the lens — the real, the raw, and the beautiful. Book a shoot via{" "}
          <a href={profile.instagramPhoto} target="_blank" rel="noopener noreferrer" className="text-yellow hover:underline">
            @daves.shoots
          </a>
          , or see{" "}
          <Link href="/photography" className="text-term hover:underline">
            more about my photography
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <Prompt command="cat hire.me" id="hire" />
        <HireForm />
      </section>
    </Shell>
  );
}
