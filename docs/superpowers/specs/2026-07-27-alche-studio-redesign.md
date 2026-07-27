# Design Specification: enesteke.me — Alche.studio Level Portfolio Redesign

> **Goal**: Transform `enesteke.me` into a world-class, award-winning developer portfolio matching and exceeding the visual, GLSL shader, 3D WebGL, and interactive standards of [Alche Studio](https://alche.studio/).
> **Target Quality Match**: > 90% aesthetic and interactive parity with Alche.studio.

---

## 1. Executive Summary & Design Vision

The redesign elevates `enesteke.me` from a standard dark-mode portfolio to a cutting-edge 3D WebGL interactive experience modeled directly after Alche.studio. 

### Core Highlights
1. **Hero 3D WebGL Stage**:
   - **Background Text**: Giant bold typography **"TEKEDEV"** spanning the screen with fine technical grid overlays.
   - **Foreground 3D Monogram**: A 3D extruded **"E"** glass/metallic prism with refractive GLSL shaders, chromatic aberration, noise displacement, roughness controls, and interactive mouse-driven 3D rotation.
2. **Liquid GLSL Shader & Background Canvas**:
   - Continuous shifting color gradients (cyan, deep electric indigo, violet, neon teal) driven by time-based GLSL noise shaders.
   - Fluid ripple displacement reacting to cursor movement and scroll velocity.
3. **Lenis Smooth Scroll & GSAP Animations**:
   - Momentum scrolling with GSAP ScrollTrigger timeline reveals, clip-path image reveals, and staggered text line splits.
4. **Alche-Style Layout & Micro-Interactions**:
   - Top navbar with live status meters, location clock (Frankfurt / Istanbul), and Web Audio API synthesized sound toggle (`AUDIO [ON/OFF]`).
   - Section indices (`01 / ARCHITECTURE`, `02 / SYSTEMS`, `03 / CAPABILITIES`).
   - WebGL image plane distortion on project card hovers and 3D tilt.
   - Magnetic custom cursor with contextual action labels (`EXPLORE`, `VIEW CASE`).

---

## 2. Component Architecture

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │                  Navbar & Sound Engine                 │
   │    (Grid Border, Live Clock, Web Audio Toggle)         │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │         Three.js GLSL WebGL Hero Stage                 │
   │  ┌──────────────────────────────────────────────────┐  │
   │  │ Background: Giant "TEKEDEV" Text + Grid Shader   │  │
   │  │ Foreground: 3D Refractive Glass "E" Monogram     │  │
   │  └──────────────────────────────────────────────────┘  │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │               Lenis Smooth Momentum Scroll             │
   └───────┬───────────────────┬────────────────────┬───────┘
           │                   │                    │
           ▼                   ▼                    ▼
  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
  │ 01 / PROJECTS   │ │ 02 / CAPABILITY │ │ 03 / CONTACT    │
  │ WebGL Hover     │ │ Interactive     │ │ Minimalist      │
  │ Distortion Cards│ │ Radar/Grid      │ │ Terminal Form   │
  └─────────────────┘ └─────────────────┘ └─────────────────┘
\`\`\`

---

## 3. Detailed Component & Shader Specs

### 3.1 Hero Canvas (`HeroGL.jsx` & `HeroE3D.jsx`)
- **Background Canvas**: Three.js WebGL Scene with a custom GLSL vertex & fragment shader.
- **Fragment Shader Features**:
  - Simplex 3D noise for organic liquid color flow shifting continuously between `#0a0a14`, `#1a103c`, `#00e5e5`, and `#635bff`.
  - Mouse coordinate uniform \`u_mouse\` driving fluid ripples.
  - Grid line texture overlay (\`rgba(255, 255, 255, 0.04)\`).
- **Foreground 3D Object**: Custom 3D "E" letter geometry created using Three.js \`ExtrudeGeometry\` or custom shape mesh.
- **Material Shader**: Refractive \`MeshPhysicalMaterial\` or custom ShaderMaterial with:
  - Transmission (glass refraction), Roughness, Iridescence, and Fresnel edge glow.
  - Interactive rotation responding to mouse movement (quaternion damping).

### 3.2 Smooth Scroll & GSAP Reveals (`Layout.jsx` & `ScrollReveal.jsx`)
- `Lenis` smooth scroll initialized globally to match Alche.studio's inertial scrolling feel.
- `GSAP ScrollTrigger` animating section headings, text line splits, and card entrances.

### 3.3 Projects Showcase (`Projects.jsx` & `ProjectCardWebGL.jsx`)
- Custom WebGL canvas plane per project card. On hover, the texture displacement shader distorts the image like liquid ripples.
- 3D card tilt on mouse move.
- Full Case Study inspection modal.

### 3.4 Navbar & Web Audio Sound Engine (`Navbar.jsx` & `useAudio.js`)
- Synthesizes subtle high-frequency UI clicks and low sub-bass clicks on hover/toggle using Web Audio API (\`AudioContext\`).
- Audio toggle state saved to \`localStorage\`.

---

## 4. Verification & Self-Assessment Criteria (> 90% Target)

1. **Visual Parity**: 3D "E" Glass Monogram floating over giant "TEKEDEV" text matches Alche.studio's 3D "A" floating over "ALCHE".
2. **Shader Fluidity**: Liquid color-shifting GLSL background responds smoothly to cursor movement.
3. **Scroll Momentum**: Lenis smooth scroll provides inertial physics identical to Alche.studio.
4. **Interaction Quality**: WebGL hover distortion on project images, magnetic cursor, and Web Audio API feedback.
5. **Production Build Verification**: Clean compilation via `npm run build` and zero console errors.

---
*Authored by **Antigravity AI Agent** for **Enes Teke (tekedev)**.*
