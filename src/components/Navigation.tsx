"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#383838] px-6 py-4">
      <div className="flex gap-6">
        <Link
          href="/about"
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            pathname === "/about"
              ? "text-white border-primary"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            pathname === "/projects"
              ? "text-white border-primary"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          Projects
        </Link>
        <Link
          href="/photography"
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            pathname === "/photography"
              ? "text-white border-primary"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          Photography
        </Link>
        <Link
          href="/photos"
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            pathname === "/photos"
              ? "text-white border-primary"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          Gallery
        </Link>
      </div>
    </nav>
  );
}
