import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-neutral-500">Vu Anh Huy Bui</span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/huybuivuanh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            <GithubIcon size={15} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vu-anh-huy-bui-1467a8277/"
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
