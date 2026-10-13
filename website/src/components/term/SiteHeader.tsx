"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

const LINKS = [
  { href: "/projects", label: "projects" },
  { href: "/photography", label: "photography" },
  { href: "/gallery", label: "gallery" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-11 max-w-page items-center justify-between px-5 text-[13px]">
        <Link href="/" className="font-semibold text-term">
          ved
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href ? "text-term" : "text-fg-muted hover:text-fg"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="h-3 w-px bg-border" aria-hidden="true" />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
