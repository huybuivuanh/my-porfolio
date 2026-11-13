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
    "I build real software for real problems. I designed the architecture and shipped seven production apps now actively used at a restaurant — POS, kitchen display, online ordering, a customer rewards app, cash register, gift cards, and the customer-facing website.",
};

export const about = {
  bio: "I graduated from the University of Saskatchewan in 2025 with a degree in Computer Science. My family needed me at the restaurant, so I went to work there full-time as a cook — and while I was at it, I built the software it needed from scratch. I designed and shipped seven apps now used by real staff and customers every day: a POS system, kitchen display, online ordering, a rewards app, a cash register, a gift card system, and a customer-facing website. Now I'm looking for a junior dev role where I can keep building real things as a team.",
};

export const suite = {
  title: "Restaurant Management Suite",
  description:
    "Designed and built a complete restaurant management system for a real restaurant. Seven apps are actively used in production daily, most paired with a dedicated admin panel. POS, KDS, Online Orders, Rewards, and the Customer Website share one Firebase project with per-business data, role-based custom claims, and security rules deployed and tested from a single repo. Gift Card and Staff Clock-In run on their own projects.",
  tags: ["Expo", "Next.js", "React Native", "Firebase", "Cloud Functions", "TypeScript"],
  note: "Solo project — I designed the system architecture and made all key technical decisions.",
  badge: "7 of 8 in Production",
};

export const apps = [
  {
    slug: "pos",
    title: "Point of Sale (POS)",
    description:
      "The staff-facing app for running the restaurant floor. Handles dine-in table orders, take-out, item customization, online orders, and rewards points. Paired with a Next.js admin panel for menu management, order history, and staff accounts. Available on the App Store as an unlisted app.",
    appStore: "https://apps.apple.com/us/app/asianlepos/id6754255041",
    architecture:
      "Chose Expo so the same codebase runs on iOS, Android, and web without maintaining separate native projects. Firestore real-time listeners keep order state in sync, so table updates appear instantly on every device without any polling. Order printing is handled by a local Node.js/Express print server that listens to a Firestore queue and routes tickets to a thermal printer via USB — runs as a Windows background service using NSSM so it starts on boot and restarts automatically if it crashes.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "kds",
    title: "Kitchen Display System (KDS)",
    description:
      "The kitchen-facing companion to the POS. Orders appear the moment they are placed and update live across all tablets — no refresh, no polling. Staff depend on this during every shift.",
    architecture:
      "Shares the same Firestore data as the POS — a deliberate choice to keep order state consistent across devices without a separate API layer or any sync logic between systems.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
  },
  {
    slug: "online-orders",
    title: "Online Orders",
    description:
      "Where staff manage takeout orders placed on the website. New orders arrive live with a full-screen alert and sound; staff accept them with a ready time, print, complete, or cancel. Also controls sold-out items, pausing online ordering, and the wait time. Runs on tablets, iOS, and web.",
    appStore: "https://apps.apple.com/ca/app/asian-le-orders/id6806611519",
    architecture:
      "The website writes orders and this app only manages them, so each side has one job. Completing an order calls Cloud Functions to redeem and earn rewards points, and retries never double-count. Printing goes through a Firestore queue to a dedicated print service on the restaurant PC. Built for an always-on tablet: keeps the screen awake, shows an offline overlay, and forces an update when the app version is too old.",
    tags: ["Expo", "React Native", "Firestore", "Cloud Functions", "Sentry"],
  },
  {
    slug: "rewards",
    title: "Asian Le Rewards",
    description:
      "Customer loyalty app. Customers sign up, see their points balance and a personal QR code, and follow their points history. Staff scan the QR at the POS to earn and redeem points, and customers can spend points at online checkout. Also on the web at rewards.asianle.ca.",
    appStore: "https://apps.apple.com/ca/app/asian-le-rewards/id6828595669",
    architecture:
      "Points only change through Cloud Functions, never from the client, and every transaction is keyed by order ID so retries are idempotent and refunds can be reversed cleanly. Security rules keep customers to their own data and refuse staff accounts.",
    tags: ["Expo", "React Native", "Firebase Auth", "Cloud Functions", "NativeWind"],
  },
  {
    slug: "customer-website",
    title: "Customer Website",
    description:
      "The public face of the restaurant, live at asianle.ca. Customers browse the menu, order takeout online (now or scheduled), book a table, and use their rewards points at checkout. A Next.js admin panel manages the menu, specials, gallery, and hours so content updates never require a code deploy.",
    website: "https://www.asianle.ca",
    architecture:
      "Built with Next.js for fast page loads and SEO. Prices are never trusted from the browser: the order API route re-prices the cart from live Firestore data, checks availability and pickup time, and writes with the Admin SDK.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
  },
  {
    slug: "cash-register",
    title: "Cash Register",
    description:
      "A web replacement for the restaurant's old cash register. Ring up sales with tax buttons on a touch keypad or physical numpad, show change due, issue refunds, print receipts, and run X / Z reports with a grand total. Supports multiple businesses with admin and view-only staff roles.",
    architecture:
      "Designed like a real register: money is stored as integer cents and tax rates as basis points, nothing is ever edited or deleted (mistakes are fixed with a refund), and the Z number, grand total, and receipt counters only change through sales and Z closes.",
    tags: ["Next.js", "Firestore", "Zustand", "Tailwind CSS"],
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
      "Shift and attendance tracking for staff, with a Next.js admin panel for reviewing hours and managing records. Core flows are live; currently paused while the production apps take priority.",
    architecture:
      "Kept on its own Firebase project so staff records stay completely isolated from customer-facing systems — a deliberate boundary that makes access control simpler and limits blast radius if either side has issues.",
    tags: ["Expo", "Next.js", "React Native", "Firebase", "NativeWind"],
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
      "Cloud Functions",
      "Firestore Security Rules",
      "Next.js API Routes",
      "Serverless Architecture",
    ],
  },
  {
    label: "Tools & Workflow",
    skills: ["Git", "GitHub", "Vercel", "VS Code", "Firebase App Hosting", "EAS Build", "Sentry"],
  },
];
