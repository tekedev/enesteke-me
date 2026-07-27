# enesteke.me Redesign & Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign and implement `enesteke.me` as a high-end, experimental, cinematic portfolio inspired by Alche Studio—featuring a full-screen WebGL 3D ET monogram scene, custom GLSL noise shaders, acid-lime (#d7ff00) accent palette, 12-column grid, GSAP & Lenis smooth scrolling, and full mobile optimization.

**Architecture:** A single-page WebGL-driven React 19 application built with Vite, Three.js, GSAP ScrollTrigger, and Lenis smooth scrolling. A single WebGL scene manager handles background FBM noise + 3D refracting ET monogram, layered behind high-contrast, editorial typography sections.

**Tech Stack:** React 19, Three.js (WebGL GLSL shaders), GSAP + @gsap/react, Lenis Smooth Scroll, Lucide Icons, CSS Modules / Custom Tokens, Vite.

---

### Task 1: Core Design System & Tokens
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\styles\design-tokens.css`
- Modify: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\main.jsx`

- [ ] **Step 1: Create design-tokens.css**
  Define color tokens (`--background: #000000`, `--surface: #080808`, `--text-primary: #f5f5f2`, `--accent: #d7ff00`), responsive clamp font scale (`--font-hero`, `--font-display`, `--font-section`, `--font-body`, `--font-meta`), 12-column grid utilities, and Lenis smooth scroll setup.

- [ ] **Step 2: Update main.jsx**
  Import `design-tokens.css` and initialize Lenis smooth scroll at root level.

- [ ] **Step 3: Test build**
  Run `npm run build` to verify no CSS/Vite bundling errors.

---

### Task 2: Data Architecture (Single Source of Truth)
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\data\portfolioData.js`

- [ ] **Step 1: Create portfolioData.js**
  Define structured arrays for `projects` (NEXUS, HAREKI, TEKE.APP, MAPFORGE, BIST Whale Tracker), `capabilities` (AI Systems, Full-Stack Products, Automation & Integration), `updates` (Latest 2026 releases), `experiences`, and `socials`.

- [ ] **Step 2: Verify exports**
  Export TypeScript-compatible types and default data arrays.

---

### Task 3: 3D WebGL ET Monogram & Shader Scene
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\scene\ETMonogramScene.jsx`

- [ ] **Step 1: Implement ETMonogramScene.jsx**
  Build a Three.js scene with:
  1. Fullscreen FBM noise background quad (GLSL shader with animated time & mouse parallax).
  2. Extruded 3D geometric `ET` monogram mesh with custom glass refraction material (GGX specular + Fresnel + 8-sample chromatic aberration).
  3. Interactive mouse quaternion rotation & spring smoothing.
  4. Exposed control hook for System Controls panel (roughness, noiseScale, wireframe toggle).

- [ ] **Step 2: Test rendering**
  Verify canvas fills 100vw x 100vh with 0 canvas overflow or flickering.

---

### Task 4: Loading Screen & Header Navigation
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\layout\LoadingScreen.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\layout\Navbar.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\layout\MobileMenu.jsx`

- [ ] **Step 1: Implement LoadingScreen.jsx**
  Sleek black overlay with `SYSTEM INITIALIZING`, percentage counter (0% to 100% over 1200ms), ET monogram SVG path animation, and smooth clip-path mask reveal.

- [ ] **Step 2: Implement Navbar.jsx & MobileMenu.jsx**
  Fixed header with `ENES TEKE` logo, minimal navigation links (`01 / WORKS`, `02 / ABOUT`, `03 / CAPABILITIES`, `04 / CONTACT`), IST live time clock, `CONTACT / HIRE` button with acid-lime dot indicator, and full-screen mobile menu overlay with keyboard trap.

---

### Task 5: Hero Section & Interactive Controls
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\HeroSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\ui\SystemControls.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\ui\UpdatesPanel.jsx`

- [ ] **Step 1: Implement SystemControls.jsx**
  Floating panel on right side allowing real-time tuning of WebGL parameters (Roughness, Noise Scale, Rotation Gizmo).

- [ ] **Step 2: Implement UpdatesPanel.jsx**
  Minimal bottom-right panel displaying real system releases (`LATEST / 03`).

- [ ] **Step 3: Assemble HeroSection.jsx**
  Fullscreen `100svh` hero layout with statement title `"ENGINEERING SYSTEMS THAT THINK, ACT AND SCALE."`, WebGL canvas background, vertical `SCROLL TO EXPLORE →`, and controls overlay.

---

### Task 6: Editorial Sections (Intro, Works, Capabilities, Manifesto, Contact, Footer)
**Files:**
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\IntroSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\WorksSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\CapabilitiesSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\ManifestoSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\ContactSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\sections\FooterSection.jsx`
- Create: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\components\ui\CaseStudyModal.jsx`

- [ ] **Step 1: Implement IntroSection.jsx**
  Editorial text reveal section (`01 / INTRODUCTION`) with GSAP ScrollTrigger word-by-word opacity transition.

- [ ] **Step 2: Implement WorksSection.jsx & CaseStudyModal.jsx**
  Full-width editorial project showcase (`02 / SELECTED WORK`) with interactive category filter tabs (`ALL`, `AI SYSTEMS`, `FULL-STACK`, `AUTOMATION`, `VISION`), metadata, tags, and detailed modal overlay.

- [ ] **Step 3: Implement CapabilitiesSection.jsx & ManifestoSection.jsx**
  3 horizontal technical service domains (`03 / SYSTEMS`) and principle section (`04 / PRINCIPLE`).

- [ ] **Step 4: Implement ContactSection.jsx & FooterSection.jsx**
  High-impact `HAVE A SYSTEM WORTH BUILDING? LET'S TALK →` section, open email mailto trigger, giant `ENES TEKE` footer typography, live IST time, and `BACK TO TOP` smooth scroll link.

---

### Task 7: App Integration & Production Build Verification
**Files:**
- Modify: `c:\Users\enesj\Desktop\.me projeleri\enesteke.me\src\App.jsx`

- [ ] **Step 1: Assemble all sections in App.jsx**
  Combine LoadingScreen, Navbar, ETMonogramScene, HeroSection, IntroSection, WorksSection, CapabilitiesSection, ManifestoSection, ContactSection, and FooterSection into a cohesive layout.

- [ ] **Step 2: Verify responsiveness & motion accessibility**
  Test 320px, 768px, 1024px, 1440px viewports. Add `prefers-reduced-motion` media queries.

- [ ] **Step 3: Production Build & Deployment**
  Run `npm run build` to confirm 0 build errors, then deploy to VPS and verify live URL `https://enesteke.me`.
