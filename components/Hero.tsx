"use client";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { person, hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,158,255,0.07), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="text-[#3b9eff] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
            {hero.role}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            {person.name}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-300 mb-5 max-w-2xl font-medium leading-snug">
            {hero.headline}
          </p>

          <p className="text-neutral-500 max-w-xl mb-10 leading-relaxed">
            {hero.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#3b9eff] text-white font-medium rounded-lg hover:bg-[#60b0ff] transition-colors text-sm"
            >
              View Projects
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/10 text-neutral-300 font-medium rounded-lg hover:border-[#3b9eff]/40 hover:text-white transition-all flex items-center gap-2 text-sm"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
