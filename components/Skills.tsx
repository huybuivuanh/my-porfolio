const groups = [
  {
    label: "Languages & Frameworks",
    skills: [
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React",
      "React Native",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend & Infrastructure",
    skills: [
      "Firebase Auth",
      "Firestore",
      "Firebase Realtime DB",
      "Next.js API Routes",
      "Serverless Architecture",
    ],
  },
  {
    label: "Tools & Workflow",
    skills: ["Git", "GitHub", "Vercel", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Skills</h2>
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 bg-white/[0.04] border border-white/[0.08] rounded-lg hover:border-[#3b9eff]/40 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
