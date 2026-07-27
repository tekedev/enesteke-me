import React from 'react';
import { capabilities } from '../data/portfolioData';

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#000000',
        padding: '120px var(--page-padding)',
        fontFamily: "var(--font-family-mono)",
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '80px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '12px' }}>
            ENGINEERING CAPABILITIES & FOCUS
          </div>
          <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', margin: 0, lineHeight: 1.05 }}>
            TECHNICAL DOMAINS & <br />
            <span style={{ color: '#d7ff00' }}>SYSTEM FOCUS</span>
          </h2>
        </div>

        {/* Clean Typographic Rows (No Box Chips) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 2.5fr 3.5fr',
                gap: '40px',
                alignItems: 'flex-start',
                padding: '60px 0',
                borderTop: '1px solid var(--line-secondary)',
              }}
            >
              {/* Number */}
              <div style={{ fontSize: '16px', color: '#d7ff00', fontWeight: 600 }}>
                [{cap.number}]
              </div>

              {/* Title & Description */}
              <div>
                <h3 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', fontWeight: 300, color: '#f5f5f2', margin: 0, marginBottom: '12px', lineHeight: 1.1 }}>
                  {cap.title}
                </h3>
                <p style={{ color: '#b3b3ad', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                  {cap.description}
                </p>
              </div>

              {/* Typographic Inline Focus (Slash Separated Text Line) */}
              <div>
                <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.2em', marginBottom: '12px' }}>
                  CORE STACK & FRAMEWORKS
                </div>
                <div style={{ fontSize: '13px', color: '#f5f5f2', letterSpacing: '0.08em', lineHeight: 1.8, textTransform: 'uppercase' }}>
                  {cap.technologies.join(' / ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
