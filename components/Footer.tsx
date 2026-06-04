import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { person } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-neutral-500">{person.name}</span>
        <div className="flex items-center gap-6">
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            <GithubIcon size={15} />
            GitHub
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            <LinkedinIcon size={15} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
