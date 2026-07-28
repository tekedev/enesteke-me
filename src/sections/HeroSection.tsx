import React from 'react';
import { Link } from 'react-router-dom';
import SystemControls from '../components/ui/SystemControls';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  roughness: number;
  setRoughness: (val: number) => void;
  noiseScale: number;
  setNoiseScale: (val: number) => void;
  heroExitProgress?: number;
}

export default function HeroSection({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
  heroExitProgress = 0,
}: HeroSectionProps) {
  const isE2E = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e2e') === '1';
  const debugScene = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debugScene') === '1';

  const opacity = Math.max(0, 1 - heroExitProgress * 1.6);
  const translateY = -heroExitProgress * 48;
  const pointerEvents = heroExitProgress > 0.65 ? 'none' : 'auto';

  return (
    <section id="hero" className={styles.hero}>
      {/* E2E Monogram Safe Area Target (Only rendered in E2E mode for automated testing) */}
      {isE2E && <div data-monogram-safe-area="true" aria-hidden="true" />}

      {/* Debug Controls Overlay Panel (Only shown when ?debugScene=1) */}
      {debugScene && (
        <div
          id="scene-controls-panel"
          style={{ position: 'absolute', top: '120px', right: 'var(--page-padding)', zIndex: 10, pointerEvents: 'auto' }}
        >
          <SystemControls
            roughness={roughness}
            setRoughness={setRoughness}
            noiseScale={noiseScale}
            setNoiseScale={setNoiseScale}
          />
        </div>
      )}

      {/* Main Editorial Headline with controlled exit transition */}
      <div
        className={styles.heroContent}
        style={{
          opacity,
          transform: `translate3d(0px, ${translateY}px, 0px)`,
          pointerEvents,
          transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
        }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#73736e', marginBottom: '16px', textTransform: 'uppercase' }}>
          SYSTEMS ENGINEER / CREATIVE DEVELOPER
        </div>
        <h1 className={styles.heroTitle}>
          ENGINEERING <br />
          SYSTEMS THAT <br />
          <span style={{ color: '#d7ff00' }}>THINK</span> & SCALE.
        </h1>
        <p className={styles.heroBio}>
          Designing intelligent digital products through code, systems and motion.
        </p>

        {/* Refined Minimal Text Links */}
        <div data-hero-actions="true" className={styles.heroCtaGroup}>
          <Link to="/work" className={styles.heroPrimaryCta}>
            VIEW WORK <span style={{ color: '#d7ff00' }}>↗</span>
          </Link>
          <Link to="/contact" className={styles.heroSecondaryCta}>
            CONTACT ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
