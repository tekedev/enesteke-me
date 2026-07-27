import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';
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
  const [controlsOpen, setControlsOpen] = useState(false);
  const isE2E = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e2e') === '1';

  // Close controls dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && controlsOpen) {
        setControlsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlsOpen]);

  return (
    <section id="hero" className={styles.hero}>
      {/* E2E Monogram Safe Area Target (Only rendered in E2E mode for automated testing) */}
      {isE2E && <div data-monogram-safe-area="true" aria-hidden="true" />}

      {/* Top Header Status Line */}
      <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#d7ff00', borderRadius: '50%' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#b3b3ad' }}>
            {profile.status}
          </span>
        </div>

        {/* Desktop Scene Controls Toggle Button (Hidden on Mobile) */}
        <div className={styles.controlsTrigger}>
          <button
            onClick={() => setControlsOpen(!controlsOpen)}
            aria-expanded={controlsOpen}
            aria-controls="scene-controls-panel"
            style={{
              background: controlsOpen ? 'rgba(215, 255, 0, 0.15)' : 'rgba(0,0,0,0.72)',
              color: controlsOpen ? '#d7ff00' : '#b3b3ad',
              border: controlsOpen ? '1px solid #d7ff00' : '1px solid rgba(255,255,255,0.15)',
              padding: '8px 16px',
              fontSize: '11px',
              fontFamily: "var(--font-family-mono)",
              letterSpacing: '0.12em',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
          >
            {controlsOpen ? 'CLOSE SCENE CONTROLS ✕' : 'OPEN SCENE CONTROLS ⚙'}
          </button>
        </div>
      </div>

      {/* Controls Overlay Panel */}
      {controlsOpen && (
        <div
          id="scene-controls-panel"
          style={{ position: 'absolute', top: '190px', right: 'var(--page-padding)', zIndex: 10, pointerEvents: 'auto' }}
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
          ENGINEERING SYSTEMS <br />
          THAT <span style={{ color: '#d7ff00' }}>THINK</span> & SCALE.
        </h1>
        <p className={styles.heroBio}>
          Designing products, systems and interfaces with intelligence, structure and motion.
        </p>

        {/* Refined Minimal Text Links (44px touch targets) */}
        <div data-hero-actions="true" className={styles.heroCtaGroup}>
          <Link to="/work" className={styles.heroPrimaryCta}>
            VIEW WORK <span style={{ color: '#d7ff00' }}>→</span>
          </Link>
          <Link to="/contact" className={styles.heroSecondaryCta}>
            GET IN TOUCH
          </Link>
        </div>
      </div>

      {/* Bottom Footer Status Line */}
      <div data-hero-status="true" style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line-secondary)', paddingTop: '20px' }}>
        <div style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.15em' }}>
          SCROLL TO DISCOVER ↓
        </div>
        <div style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.15em' }}>
          IST / UTC+3
        </div>
      </div>
    </section>
  );
}
