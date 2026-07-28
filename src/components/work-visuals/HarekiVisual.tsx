import React from 'react';
import styles from './WorkVisuals.module.css';

interface HarekiVisualProps {
  compact?: boolean;
}

export default function HarekiVisual({ compact }: HarekiVisualProps) {
  return (
    <div
      data-work-visual="hareki-dna"
      className={`${styles.visualCanvas} ${styles.harekiCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow} style={{ borderBottom: '1px solid rgba(10,10,10,0.15)', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#0a0a0a' }}>HAREKI // EDITORIAL SYSTEM</span>
        <span style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>VECTOR RAG</span>
      </div>

      <div className={`${styles.harekiStage} ${compact ? styles.harekiStageCompact : ''}`}>
        <div className={`${styles.harekiPage} ${compact ? styles.harekiPageCompact : ''}`}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#666', marginBottom: '6px' }}>[EDITORIAL_COLLAGE]</div>
            <div style={{ fontSize: compact ? '20px' : '26px', fontFamily: 'var(--font-family-sans)', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.05 }}>DYNAMIC BRAND SYSTEM ARCHITECTURE</div>
          </div>
          <div style={{ fontSize: '11px', color: '#444', borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '10px' }}>
            Extracted Editorial DNA Surface
          </div>
        </div>

        {!compact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ height: '110px', background: '#0a0a0a', color: '#f5f5f2', padding: '16px', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>CONTENT MATRIX</span>
              <span style={{ fontSize: '13px', fontWeight: 300 }}>AUTOMATED EDITORIAL STREAM</span>
            </div>

            <div style={{ height: '110px', background: '#ffffff', border: '1px solid rgba(10,10,10,0.2)', padding: '16px', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.15em' }}>DYNAMIC PUBLISHING</span>
              <span style={{ fontSize: '13px', color: '#0a0a0a', fontWeight: 300 }}>VECTOR RAG CRAWLER</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerRow} style={{ borderTop: '1px solid rgba(10,10,10,0.15)', color: '#444' }}>
        <span>PLATFORM: HAREKI.COM</span>
        <span style={{ fontWeight: 600, color: '#0a0a0a' }}>EDITORIAL DNA ACTIVE ✓</span>
      </div>
    </div>
  );
}
