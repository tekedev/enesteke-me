import React from 'react';
import { capabilities } from '../data/portfolioData';
import styles from './CapabilitiesSection.module.css';

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
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

        {/* Responsive Typographic Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {capabilities.map((cap) => (
            <div key={cap.number} className={styles.capRow}>
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

              {/* Typographic Inline Focus */}
              <div>
                <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.2em', marginBottom: '12px' }}>
                  CORE STACK & FRAMEWORKS
                </div>
                <div className={styles.techText}>
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
