# Enes Teke — Personal Portfolio & Creative Studio

Experimental, cinematic personal portfolio of **Enes Teke**, Full-Stack Developer & AI Systems Engineer.

Live Site: [https://enesteke.me](https://enesteke.me)

## 🛠️ Architecture & Tech Stack

- **Core Framework**: React 19 + TypeScript (Strict Mode)
- **Bundler & Build Tool**: Vite
- **Graphics Engine**: Three.js (WebGL with Custom Physical Glass GLSL Refraction & Simplex FBM Liquid Noise Shaders)
- **Routing**: `react-router-dom` (Dynamic SPA routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact`, `*`)
- **Styling**: Vanilla CSS Design System with custom design tokens (`design-tokens.css`), HSL palette (`#000000` dark surface, `#d7ff00` Acid Lime), and fluid `clamp()` typography
- **Smooth Scroll**: Lenis
- **Deployment**: Custom VPS with Docker / Nginx SPA configuration

## 📁 Verified Projects Featured

1. **NEXUS** — AI Content Command Center (Python, FastAPI, Gemini AI, Playwright, Redis)
2. **HAREKI** — AI Editorial DNA SaaS Platform ([https://hareki.com](https://hareki.com))
3. **TEKE.APP** — AI Social Media Studio ([https://teke.app](https://teke.app))
4. **WHALETRACE** — BIST Stock Market Whale Tracker & Order Flow Engine
5. **MAPFORGE** — B2B Lead Intelligence Suite
6. **FECIR** — Content Management & Auto-Publishing Platform
7. **STILMATCHER** — Instagram Style Analysis Engine
8. **CLASSIFY** — AI Video Intelligence Pipeline
9. **SHADOWMAPS** — Multi-Profile Browser Manager
10. **SHOPFLOW** — E-Commerce Management Dashboard
11. **LOVECRAFT** — Interactive Couple's Universe
12. **NEBULA** — Real-time WebGL N-body Particle Simulator

## 🚀 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/tekedev/enesteke-me.git
cd enesteke-me

# Install dependencies
npm ci

# Typecheck TypeScript
npm run typecheck

# Lint with Oxlint
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
