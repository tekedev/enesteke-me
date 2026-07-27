import React from 'react';
import { capabilities } from '../data/portfolioData';

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        zIndex: 3,
        backgroundColor: '#000000',
        padding: 'var(--section-gap) var(--page-padding)',
        borderTop: '1px solid var(--line-secondary)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '20px' }}>
          03 / SYSTEMS & EXPERTISE
        </div>

        <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-section)", fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', marginBottom: '60px', lineHeight: 1.05 }}>
          DOMAINS OF <br />
          <span style={{ color: '#b3b3ad' }}>APPLIED INTELLIGENCE</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              style={{
                padding: '40px 0',
                borderTop: '1px solid var(--line-secondary)',
                display: 'grid',
                gridTemplateColumns: '100px 1.5fr 2.5fr',
                gap: '30px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '16px', color: '#d7ff00', fontWeight: 600 }}>
                {cap.number}
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-family-sans)", fontSize: '24px', color: '#f5f5f2', fontWeight: 400, textTransform: 'uppercase', marginBottom: '12px' }}>
                  {cap.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cap.technologies.map((tech, i) => (
                    <span key={i} style={{ fontSize: '10px', fontFamily: "var(--font-family-mono)", color: '#73736e', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: '2px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ fontFamily: "var(--font-family-mono)", fontSize: '13px', color: '#b3b3ad', lineHeight: 1.6, margin: 0 }}>
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
