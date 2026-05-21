"use client";
import { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]"
          : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-white tracking-tight text-sm">
          Vu Anh Huy Bui
        </span>

        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="hidden md:block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hidden md:block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Skills
          </a>
          <a
            href="#about"
            className="hidden md:block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="https://github.com/huybuivuanh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/vu-anh-huy-bui-1467a8277/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
