# 3D Developer Portfolio

Interactive developer portfolio for **Muhammad Ali**, built with React, Vite, Three.js (React Three Fiber), Tailwind CSS, and Framer Motion.

Editorial, typography-driven layout with a persisted dark/light theme, animated WebGL scenes (hero rig, particle depth field, technology spheres, contact globe), a cursor-tracking project index, and an EmailJS-backed contact form.

## Tech stack

- React 18 + Vite 5
- Three.js / `@react-three/fiber` / `@react-three/drei`
- Tailwind CSS
- Framer Motion
- EmailJS (contact form)
- Vitest + ESLint + Prettier

## Features

- Dark/light theme, defaulting to dark, persisted in localStorage and applied before first paint
- Editorial hero with a masked word reveal over an animated 3D rig that follows the cursor
- Scroll-driven section animations via `SectionWrapper`
- Project index with a cursor-tracking preview on desktop, inline images on touch
- Expandable services list, procedurally textured 3D planets in a single canvas, and a full-bleed looping marquee
- Brand logos rendered to canvas textures with Path2D from `src/constants/techIcons.js` (Simple Icons, CC0-1.0)
- Experience laid out as a typographic index rather than a timeline widget
- Contact form wired through environment-based EmailJS config, with an inline submit spinner and toast notifications
- Reduced-motion support throughout

## Project structure

```text
src/
  components/        # UI sections + Loader + ScrollProgress
  components/canvas/ # R3F scenes (CanvasShell, HeroScene, ParticleField, TechSpheres, GlobeScene)
  context/           # Theme and toast providers
  config/            # Env-driven config (EmailJS)
  constants/         # Portfolio content (edit here to update copy)
  hooks/             # Shared React hooks
  hoc/               # SectionWrapper animation HOC
  utils/             # Motion variants + form helpers
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

## Quick start

```bash
git clone https://github.com/Rappidz456/Portfolio_3D.git
cd Portfolio_3D
npm install
cp .env.example .env
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Environment variables

Copy `.env.example` to `.env` and set your [EmailJS](https://www.emailjs.com/) values:

| Variable | Description |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

Never commit real secrets. `.env` is gitignored.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source with Prettier |
| `npm run test` | Run unit tests (Vitest) |

## Customizing content

Edit `src/constants/index.js` to update navigation, services, technologies, experience, testimonials, and projects.

Both theme palettes are defined as RGB-channel CSS variables in `src/index.css` (under `:root` and `[data-theme="dark"]`) and surfaced to Tailwind in `tailwind.config.cjs`, so utilities like `bg-paper` and `text-accent` follow the active theme. UI images and icons live under `src/assets`.

## License

Customized for personal use.
