import { ReactLenis } from 'lenis/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

/**
 * Layout — Root layout wrapper for every page.
 *
 * Stacking order (z-index):
 *   1    — Main content area
 *   1000 — Navbar (fixed pill)
 *   9999 — CustomCursor (pointer-events: none)
 *
 * ParticleBackground has been removed for a cleaner editorial look.
 * Hero handles its own top spacing — no paddingTop on main.
 */
export default function Layout({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, smoothWheel: true }}>
      {/* Custom cursor overlay */}
      <CustomCursor />

      {/* Fixed pill navbar */}
      <Navbar />

      {/* Page content — hero handles its own spacing */}
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </ReactLenis>
  );
}
