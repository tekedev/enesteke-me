import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';
import SystemControls from '../components/ui/SystemControls';

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

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '140px var(--page-padding) 60px',
        fontFamily: "var(--font-family-mono)",
        color: '#f5f5f2',
        pointerEvents: 'none',
      }}
    >
      {/* Top Header Line */}
      <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#d7ff00', borderRadius: '50%' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#b3b3ad' }}>
            {profile.status}
          </span>
        </div>

        {/* Collapsed Scene Controls Trigger */}
        <button
          onClick={() => setControlsOpen(!controlsOpen)}
          style={{
            background: controlsOpen ? '#d7ff00' : 'rgba(0,0,0,0.6)',
            color: controlsOpen ? '#000000' : '#b3b3ad',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '6px 14px',
            fontSize: '10px',
            fontFamily: "var(--font-family-mono)",
            letterSpacing: '0.15em',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.2s ease',
          }}
        >
          SCENE / CONTROLS [{controlsOpen ? 'OPEN' : 'CLOSE'}]
        </button>
      </div>

      {/* Controls Overlay Dropdown */}
      {controlsOpen && (
        <div style={{ position: 'absolute', top: '180px', right: 'var(--page-padding)', zIndex: 10, pointerEvents: 'auto' }}>
          <SystemControls
            roughness={roughness}
            setRoughness={setRoughness}
            noiseScale={noiseScale}
            setNoiseScale={setNoiseScale}
          />
        </div>
      )}

      {/* Center Main Headline */}
      <div style={{ maxWidth: '1000px', pointerEvents: 'auto', margin: '40px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#73736e', marginBottom: '20px', textTransform: 'uppercase' }}>
          SYSTEMS ENGINEER & CREATIVE DEVELOPER
        </div>
        <h1
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: 'clamp(3.0rem, 7vw, 7.8rem)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          ENGINEERING SYSTEMS <br />
          <span style={{ color: '#d7ff00', fontWeight: 400 }}>THAT THINK & SCALE.</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#b3b3ad', maxWidth: '580px', lineHeight: 1.65 }}>
          {profile.bio}
        </p>

        <div style={{ display: 'flex', gap: '20px', marginTop: '36px', alignItems: 'center' }}>
          <Link
            to="/work"
            style={{
              backgroundColor: '#d7ff00',
              color: '#000000',
              padding: '12px 28px',
              fontSize: '12px',
              fontFamily: "var(--font-family-mono)",
              fontWeight: 600,
              letterSpacing: '0.12em',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            EXPLORE ARCHIVE →
          </Link>
          <Link
            to="/contact"
            style={{
              color: '#f5f5f2',
              fontSize: '12px',
              fontFamily: "var(--font-family-mono)",
              letterSpacing: '0.12em',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '2px',
            }}
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line-secondary)', paddingTop: '20px' }}>
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
