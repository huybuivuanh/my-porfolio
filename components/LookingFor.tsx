import { lookingFor } from "@/lib/content";

export default function LookingFor() {
  return (
    <section id="looking-for" className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Open to Work</h2>

        <p className="text-neutral-400 leading-relaxed text-lg max-w-2xl mb-8">
          {lookingFor.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {lookingFor.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-sm font-medium text-neutral-300 bg-white/[0.04] border border-white/[0.08] rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
