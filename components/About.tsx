import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">About</h2>
        <p className="text-neutral-400 leading-relaxed text-lg max-w-2xl">
          {about.bio}
        </p>
      </div>
    </section>
  );
}
