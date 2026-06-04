export const person = {
  name: "Vu Anh Huy Bui",
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
      "Cross-platform Expo app for staff to handle dine-in table orders, take-out, and item customization. Paired with a Next.js admin panel for menu management, order history, and staff accounts. App currently available on the App Store as unlisted app and can be downloaded at https://apps.apple.com/us/app/asianlepos/id6754255041",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "kds",
    title: "Kitchen Display System (KDS)",
    description:
      "Real-time tablet app for kitchen staff. Orders appear instantly as they're placed and update live across devices. Shares the same Firebase backend as the POS.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "gift-card",
    title: "Gift Card System",
    description:
      "Full gift card lifecycle — issuance, balance tracking, and redemption — QR based with data integrity to prevent double-spending. Includes a separate admin panel for managing cards.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "staff-clock-in",
    title: "Staff Clock-In",
    description:
      "Staff attendance and shift tracking app with a dedicated admin panel. Around 80% complete — development paused to focus on improving the four production apps.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "customer-website",
    title: "Customer Website",
    description:
      "Public-facing restaurant website for customers — menu, info, and online presence. Backed by its own Firebase project with a separate admin panel for content updates. Website is currently live at https://www.asianle.ca/",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
];

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
