import React from 'react';
import { Link } from 'react-router-dom';
import SystemControls from '../components/ui/SystemControls';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  roughness: number;
  setRoughness: (val: number) => void;
  noiseScale: number;
  setNoiseScale: (val: number) => void;
}

export default function HeroSection({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
}: HeroSectionProps) {
  const isE2E = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e2e') === '1';
  const debugScene = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debugScene') === '1';

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

      {/* Main Editorial Headline */}
      <div className={styles.heroContent}>
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

        {/* Refined Minimal Text Links (44px touch targets) */}
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
