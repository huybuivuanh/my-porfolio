# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

Single-page portfolio site for Vu Anh Huy Bui, built with Next.js 16 App Router, Tailwind CSS v4, and Framer Motion. The entire site lives on one scrollable page — no additional routes.

```
app/
  layout.tsx        # Root layout, metadata, fonts
  page.tsx          # Imports all section components in order
  globals.css       # Tailwind import, base styles, custom scrollbar
components/
  Nav.tsx           # Sticky nav, backdrop blur on scroll
  Hero.tsx          # Name, one-liner, two CTAs
  Projects.tsx      # Suite overview card + 5 individual app cards
  Skills.tsx        # Grouped pill/badge tags, no progress bars
  About.tsx         # 3-4 sentence bio
  Footer.tsx        # GitHub + LinkedIn links
  icons.tsx         # Inline SVG icons (GithubIcon, LinkedinIcon)
```

## Tailwind v4 + Turbopack

Next.js 16 uses Turbopack by default in dev mode. Turbopack does not auto-scan source files for Tailwind classes. If utility classes stop appearing, add `@source` directives to `app/globals.css`:

```css
@source "../components";
@source "../app";
```

Production builds (webpack) scan correctly without these directives.

## Design Constraints

- **Dark mode only** — background `#0a0a0a` or similar deep dark, never pure black
- **Single accent color** — muted electric blue or emerald green, used consistently for hover states, highlights, CTAs
- **No** animated skill bars, percentage ratings, light mode toggle, contact form, placeholder images, or multiple page routes
- Framer Motion animations should be subtle
- Section IDs are used for smooth scroll nav links (e.g. `href="#projects"`)
- Path alias `@/*` maps to the repo root

## Key Content

- GitHub: https://github.com/huybuivuanh
- LinkedIn: https://www.linkedin.com/in/vu-anh-huy-bui-1467a8277/
- Site metadata title: `"Vu Anh Huy Bui | Software Developer"`
- Project suite: 5 apps (POS, KDS, Gift Card, Staff Clock-In, Customer Website) all on Firebase

The `instruction.md` file at the repo root is the authoritative source for all copy, section order, project descriptions, and design decisions.
