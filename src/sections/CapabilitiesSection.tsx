import React from 'react';
import styles from './CapabilitiesSection.module.css';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      number: '01',
      title: 'AGENTIC AI SYSTEMS',
      description: 'Autonomous multi-agent pipelines, LLM orchestration, and vector RAG architectures.',
    },
    {
      number: '02',
      title: 'FULL-STACK DIGITAL PRODUCTS',
      description: 'Scalable web applications, high-throughput APIs, and real-time streaming backends.',
    },
    {
      number: '03',
      title: 'INTELLIGENT VISUAL EXPERIENCES',
      description: 'Creative technology, interactive 3D WebGL, and high-performance user interfaces.',
    },
  ];

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div style={{ marginBottom: '60px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '12px' }}>
            CAPABILITIES / CORE DISCIPLINES
          </div>
          <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', margin: 0, lineHeight: 1.05 }}>
            SYSTEMS & <span style={{ color: '#d7ff00' }}>ARCHITECTURE</span>
          </h2>
        </div>

        {/* 3 Clean Minimal Capabilities Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              data-capability-header={cap.number}
              style={{
                borderTop: '1px solid var(--line-secondary)',
                paddingTop: '32px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1.2fr',
                gap: '24px',
                alignItems: 'baseline',
                scrollMarginTop: 'calc(var(--header-height) + 24px)',
              }}
            >
              <span style={{ fontSize: '12px', color: '#73736e', letterSpacing: '0.15em' }}>
                [{cap.number}]
              </span>
              <h3 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 300, color: '#f5f5f2', margin: 0, textTransform: 'uppercase' }}>
                {cap.title}
              </h3>
              <p style={{ color: '#b3b3ad', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
