export const person = {
  name: "Vu Anh Huy Bui",
  email: "huy.buivu12345@gmail.com",
  github: "https://github.com/huybuivuanh",
  linkedin: "https://www.linkedin.com/in/vu-anh-huy-bui-1467a8277/",
};

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

export const hero = {
  role: "Software Developer",
  headline:
    "CS grad who designed and shipped a full-stack restaurant management suite used in production daily.",
  description:
    "I build real software for real problems. Over the past year I designed the architecture and shipped five production apps now actively used at a restaurant — POS, kitchen display, gift card system, staff clock-in, and a customer-facing website.",
};

export const about = {
  bio: "I graduated from the University of Saskatchewan in 2025 with a degree in Computer Science. My family needed me at the restaurant, so I went to work there full-time as a cook — and while I was at it, I built the software it needed from scratch. I designed and shipped five apps now used by real staff every day: a POS system, kitchen display, gift card system, staff clock-in, and a customer-facing website. Now I'm looking for a junior dev role where I can keep building real things as a team.",
};

export const suite = {
  title: "Restaurant Management Suite",
  description:
    "Designed and built a complete restaurant management system for a real restaurant. Four apps are actively used in production daily — each paired with a dedicated admin panel for data management. POS and KDS share one Firebase backend; Gift Card, Staff Clock-In, and Customer Website each run on their own.",
  tags: ["Expo", "Next.js", "React Native", "Firebase", "TypeScript"],
  note: "Solo project — I designed the system architecture and made all key technical decisions.",
  badge: "4 of 5 in Production",
};

export const apps = [
  {
    slug: "pos",
    title: "Point of Sale (POS)",
    description:
      "The staff-facing app for running the restaurant floor. Handles dine-in table orders, take-out, and item customization. Paired with a Next.js admin panel for menu management, order history, and staff accounts. Available on the App Store as unlisted App: https://apps.apple.com/us/app/asianlepos/id6754255041",
    architecture:
      "Chose Expo so the same codebase runs on both iOS and Android without maintaining two native projects. Firebase Realtime DB handles order state so table updates appear instantly on every device without any polling. Order printing is handled by a local Node.js/Express print server that listens to a Firestore queue and routes tickets to a thermal printer via USB — runs as a Windows background service using NSSM so it starts on boot and restarts automatically if it crashes.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "kds",
    title: "Kitchen Display System (KDS)",
    description:
      "The kitchen-facing companion to the POS. Orders appear the moment they are placed and update live across all tablets — no refresh, no polling. Staff depend on this during every shift.",
    architecture:
      "Shares the same Firebase Realtime DB as the POS — a deliberate choice to keep order state consistent across devices without a separate API layer or any sync logic between systems.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "gift-card",
    title: "Gift Card System",
    description:
      "Full gift card lifecycle in one system: issuance, balance tracking, and QR-based redemption. Built to be bulletproof — Firestore transactions ensure a card scanned twice simultaneously never produces a double-spend. Paired with a Next.js admin panel for issuing cards and reviewing balances.",
    architecture:
      "Runs on its own Firebase project to keep gift card balances isolated from POS data — a clean boundary that simplifies access control and limits blast radius if either system has issues.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "staff-clock-in",
    title: "Staff Clock-In",
    description:
      "Shift and attendance tracking for staff, with a Next.js admin panel for reviewing hours and managing records. Core flows are live; currently paused while the four production apps take priority.",
    architecture:
      "Kept on its own Firebase project so staff records stay completely isolated from customer-facing systems — a deliberate boundary that makes access control simpler and limits blast radius if either side has issues.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "customer-website",
    title: "Customer Website",
    description:
      "The public face of the restaurant. Menu, info, and online presence — with a Next.js admin panel so content updates never require a code deploy. Live at asianle.ca.",
    architecture:
      "Built with Next.js for fast page loads and SEO, since a public restaurant site needs to be discoverable. Content updates go through the admin panel so menu changes never require a code deploy.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
];

export const lookingFor = {
  description:
    "I'm actively looking for a junior developer role where I can contribute to a real product and keep growing as an engineer. My schedule is clear — I can start immediately.",
  tags: ["Available immediately", "Remote-friendly", "Open to relocation"],
};

export const skillGroups = [
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
    skills: ["Git", "GitHub", "Vercel", "VS Code", "Firebase App Hosting"],
  },
];
