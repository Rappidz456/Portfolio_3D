# 3D Developer Portfolio

Interactive developer portfolio for **Muhammad Ali**, built with React, Vite, Three.js (React Three Fiber), Tailwind CSS, and Framer Motion.

Live experience highlights a 3D desktop hero, animated work timeline, floating tech spheres, project gallery, testimonials, and a contact form with a 3D Earth scene.

## Tech stack

- React 18 + Vite 5
- Three.js / `@react-three/fiber` / `@react-three/drei`
- Tailwind CSS
- Framer Motion
- React Parallax Tilt
- EmailJS (contact form)
- Vitest + ESLint + Prettier

## Features

- Customizable 3D hero (desktop PC GLTF)
- Scroll-driven section animations via `SectionWrapper`
- 3D skills balls and starfield background
- Vertical timeline experience section
- Project cards with source links
- Contact form wired through environment-based EmailJS config
- Lazy-loaded / in-view canvases for better performance

## Project structure

```text
src/
  components/        # UI sections + Loader
  components/canvas/ # R3F scenes (Computers, Earth, Ball, Stars)
  config/            # Env-driven config (EmailJS)
  constants/         # Portfolio content (edit here to update copy)
  hooks/             # Shared React hooks
  hoc/               # SectionWrapper animation HOC
  utils/             # Motion variants + form helpers
public/
  desktop_pc/        # Hero GLTF model
  planet/            # Earth GLTF model
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

3D models live under `public/desktop_pc` and `public/planet`. UI images and icons live under `src/assets`.

## License

This project is based on the open 3D developer portfolio template pattern and customized for personal use.
