"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `text-sm font-medium pb-2 border-b-2 transition-colors ${
      pathname === path
        ? "text-white border-primary"
        : "text-gray-400 border-transparent hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-10 border-b border-[#383838] bg-[#1e1e1f] px-6 pt-3 pb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-6">
          <Link href="/about" className={linkClasses("/about")}>
            About
          </Link>
          <Link href="/projects" className={linkClasses("/projects")}>
            Projects
          </Link>
          <Link href="/photography" className={linkClasses("/photography")}>
            Photography
          </Link>
          <Link href="/gallery" className={linkClasses("/gallery")}>
            Gallery
          </Link>
        </div>
        <a
          href="/Ved_resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/20"
        >
          <Download className="h-4 w-4 text-primary" />
          Resume
        </a>
      </div>
    </nav>
  );
}
