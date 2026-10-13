import Link from "next/link";
import Shell from "@/components/term/Shell";
import Prompt from "@/components/term/Prompt";
import { profile } from "@/data/profile";

export default function PhotographyPage() {
  return (
    <Shell>
      <p className="text-xs text-fg-muted">
        <span className="text-term">~</span> photography
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-fg">through the lens</h1>

      <section className="mt-12">
        <Prompt command="cat meet-me.md" />
        <div className="space-y-4 text-[13.5px] leading-relaxed text-fg">
          <p>
            I have over 10 years of experience taking photos, and have a deep passion to capture stories and emotions through the lens. Through a keen eye for detail and creative approach, I focus on the real, the raw, and the beautiful, creating visuals that feel as genuine as the people and places in them.
          </p>
          <p>
            With a portfolio that reflects my passion for love, laughter, and adventure, I&apos;m dedicated to delivering stunning, timeless photographs that you&apos;ll treasure for a lifetime. Check out my{" "}
            <Link href="/gallery" className="text-term hover:underline">
              gallery
            </Link>{" "}
            to see some of my work.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <Prompt command="cat book.md" />
        <div className="border border-border bg-card/40 p-5 text-[13.5px] leading-relaxed text-fg-muted sm:p-6">
          I&apos;m always looking for new opportunities to work with people and create stunning, timeless memories. If you&apos;re interested in working with me, please reach out to me on instagram at{" "}
          <a href={profile.instagramPhoto} target="_blank" rel="noopener noreferrer" className="text-yellow hover:underline">
            @daves.shoots
          </a>
          .
        </div>
      </section>
    </Shell>
  );
}
