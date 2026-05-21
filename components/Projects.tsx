"use client";
import { motion } from "framer-motion";

const suite = {
  title: "Restaurant Management Suite",
  description:
    "Designed and built a complete restaurant management system from the ground up. Five interconnected apps sharing a Firebase backend, all launched and actively used in production by real staff daily.",
  tags: ["Next.js", "React Native", "Firebase", "Tailwind CSS", "Serverless"],
  note: "Solo project — I designed the system architecture and made all key technical decisions.",
};

const apps = [
  {
    title: "Point of Sale (POS)",
    description:
      "Admin-side web app for processing orders, managing tables, and handling transactions. Built to handle real restaurant rush conditions.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    title: "Kitchen Display System",
    description:
      "Real-time order display for kitchen staff. Orders appear instantly as they're placed and update live across devices.",
    tags: ["Next.js", "Firebase Realtime DB", "Tailwind CSS"],
  },
  {
    title: "Gift Card System",
    description:
      "Full gift card lifecycle management — issuance, balance tracking, and redemption — with data integrity to prevent double-spending.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    title: "Staff Clock-In",
    description:
      "Staff attendance and shift tracking app. Simple for staff to use, gives management a clear view of hours worked.",
    tags: ["React Native", "Firebase"],
  },
  {
    title: "Customer Website",
    description:
      "Public-facing restaurant website for customers — menu, info, and online presence.",
    tags: ["Next.js", "Tailwind CSS", "Firebase"],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-xs font-medium bg-white/[0.05] text-neutral-400 rounded-md border border-white/[0.07]">
      {label}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Projects</h2>

        {/* Suite overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 p-8 rounded-xl border border-[#3b9eff]/20 bg-[#111111] hover:border-[#3b9eff]/40 hover:shadow-[0_0_40px_rgba(59,158,255,0.07)] transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
            <h3 className="text-xl font-semibold text-white">{suite.title}</h3>
            <span className="shrink-0 text-xs px-3 py-1 rounded-full border border-[#3b9eff]/30 text-[#3b9eff] font-medium">
              Production
            </span>
          </div>
          <p className="text-neutral-400 leading-relaxed mb-5">
            {suite.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {suite.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <p className="text-sm text-neutral-500 italic">{suite.note}</p>
        </motion.div>

        {/* Individual app cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 rounded-xl border border-white/[0.07] bg-[#111111] hover:border-[#3b9eff]/30 hover:shadow-[0_4px_24px_rgba(59,158,255,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-white mb-3">
                {app.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {app.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {app.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
