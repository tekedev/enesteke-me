import React from 'react';
import styles from './CapabilitiesSection.module.css';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      number: '01',
      title: 'AGENTIC AI SYSTEMS',
      description: 'Autonomous software that observes, reasons and acts.',
    },
    {
      number: '02',
      title: 'DIGITAL PRODUCTS',
      description: 'Scalable products from interface to infrastructure.',
    },
    {
      number: '03',
      title: 'INTERACTIVE EXPERIENCES',
      description: 'Real-time visual systems shaped by motion and interaction.',
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              data-capability-header={cap.number}
              className={styles.capabilityRow}
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
