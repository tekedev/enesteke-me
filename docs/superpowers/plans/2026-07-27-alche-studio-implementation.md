# Implementation Plan: Alche.studio Level Portfolio Transformation

> **Goal**: Execute the full redesign of `enesteke.me` to match [Alche Studio](https://alche.studio/) at > 90% quality parity.

---

## Task Breakdown

### Phase 1: Core Design Tokens & Lenis Smooth Scroll Foundation
- [ ] **Task 1.1**: Update `src/styles/index.css` with Alche-style color tokens, grid lines, sharp typography specs, and global layout resets.
- [ ] **Task 1.2**: Implement global `Lenis` smooth momentum scroll in `src/components/Layout.jsx` with GSAP `ScrollTrigger` synchronization.

### Phase 2: Web Audio API & Sound Engine
- [ ] **Task 2.1**: Create `src/utils/audioEngine.js` using Web Audio API to synthesize sleek UI clicks, hovers, and ambient hums.
- [ ] **Task 2.2**: Update `src/components/Navbar.jsx` with Alche-style grid borders, live clock, and interactive `AUDIO [ON/OFF]` sound toggle.

### Phase 3: Hero 3D WebGL Stage ("E" Glass Monogram + "TEKEDEV" Text)
- [ ] **Task 3.1**: Build `src/components/HeroE3D.jsx` — 3D extruded "E" glass/refractive prism geometry with chromatic aberration, transmission, iridescence, and mouse quaternion rotation.
- [ ] **Task 3.2**: Update `src/components/HeroGL.jsx` — Liquid GLSL color-shifting noise shader canvas with cursor ripple displacement and background giant "TEKEDEV" typography.
- [ ] **Task 3.3**: Integrate Hero stage into `src/sections/Hero.jsx` with Alche-style technical telemetry overlay parameters (e.g. `MainLogo Material`, `Quaternion`).

### Phase 4: WebGL Image Distortion Cards & Case Study Showcase
- [ ] **Task 4.1**: Build `src/components/ProjectCardWebGL.jsx` — Three.js WebGL plane shader for project cards applying liquid ripple distortion on mouse hover and 3D tilt.
- [ ] **Task 4.2**: Update `src/sections/Projects.jsx` to render Alche-style project grid and perspective carousel.

### Phase 5: Mission, Capabilities & Footer
- [ ] **Task 5.1**: Build `src/sections/MissionVision.jsx` with grid-aligned interactive capability cards and kinetic typography.
- [ ] **Task 5.2**: Update `src/components/CustomCursor.jsx` with magnetic attraction and dynamic label states (`EXPLORE`, `VIEW`).
- [ ] **Task 5.3**: Update `src/sections/Footer.jsx` with Alche-style minimalist terminal contact form and social links.

### Phase 6: Iterative Testing, Build Verification & Self-Assessment (>90% Parity)
- [ ] **Task 6.1**: Run `npm run build` to verify clean build without TypeScript/Vite errors.
- [ ] **Task 6.2**: Execute self-assessment audit measuring similarity against `https://alche.studio/`.
- [ ] **Task 6.3**: Deploy updated build to Frankfurt Oracle VPS (`130.61.83.48`).

---
*Implementation Plan authored by **Antigravity AI Agent**.*
