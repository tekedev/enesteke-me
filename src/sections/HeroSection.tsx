import React from 'react';
import SystemControls from '../components/ui/SystemControls';
import UpdatesPanel from '../components/ui/UpdatesPanel';
import { profile } from '../data/portfolioData';

interface HeroSectionProps {
  onParamsChange?: (params: { roughness: number; noiseScale: number }) => void;
}

export default function HeroSection({ onParamsChange }: HeroSectionProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '650px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px var(--page-padding) 40px',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <SystemControls onParamsChange={onParamsChange} />
        <UpdatesPanel />
      </div>

      <div style={{ maxWidth: '900px', zIndex: 3, pointerEvents: 'none' }}>
        <div
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: '#d7ff00',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d7ff00' }} />
          {profile.title}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: "var(--font-hero)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
          }}
        >
          ENGINEERING SYSTEMS <br />
          <span style={{ color: '#b3b3ad', fontWeight: 300 }}>THAT THINK, ACT</span> <br />
          AND SCALE.
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          zIndex: 3,
        }}
      >
        <div style={{ maxWidth: '420px', fontFamily: "var(--font-family-mono)", fontSize: '11px', color: '#b3b3ad', lineHeight: 1.6 }}>
          Full-Stack Developer & AI Systems Engineer working across agentic AI, automation workflows, computer vision, and scalable production web products.
        </div>

        <div
          style={{
            writingMode: 'vertical-rl',
            fontFamily: "var(--font-family-mono)",
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: '#73736e',
            textTransform: 'uppercase',
          }}
        >
          SCROLL TO EXPLORE →
        </div>
      </div>
    </section>
  );
}
