import React from 'react';
import type { Project } from '../../types/portfolio';
import styles from './WorkVisuals.module.css';

interface HarekiVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function HarekiVisual({ project, compact }: HarekiVisualProps) {
  const imgSrc = project?.image || '/projects/hareki.jpg';

  return (
    <div
      data-work-visual="hareki-dna"
      className={`${styles.visualCanvas} ${styles.harekiCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow} style={{ borderBottom: '1px solid rgba(10,10,10,0.15)', paddingBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#0a0a0a' }}>
          HAREKI
        </span>
        <span className={styles.harekiRibbon}>
          EDITORIAL DNA
        </span>
      </div>

      <div className={`${styles.harekiStage} ${compact ? styles.harekiStageCompact : ''}`}>
        <div className={styles.harekiPage}>
          <div style={{ fontSize: '18px', fontFamily: 'var(--font-family-sans)', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.15, textTransform: 'uppercase' }}>
            EDITORIAL CONTENT SYSTEM
          </div>

          <div className={styles.harekiImageContainer}>
            <img src={imgSrc} alt="" className={styles.projectMedia} />
          </div>

          <div style={{ fontSize: '11px', color: '#555', borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '8px' }}>
            EXTRACTED BRAND IDENTITY SURFACE
          </div>
        </div>

        {!compact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            <div style={{ flex: 1, background: '#0a0a0a', color: '#f5f5f2', padding: '14px', borderRadius: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>BRAND MATRIX</span>
              <span style={{ fontSize: '14px', fontWeight: 300, textTransform: 'uppercase' }}>DYNAMIC EDITORIAL</span>
            </div>

            <div style={{ flex: 1, background: '#ffffff', border: '1px solid rgba(10,10,10,0.15)', padding: '14px', borderRadius: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.15em' }}>PUBLISHING STREAM</span>
              <span style={{ fontSize: '14px', color: '#0a0a0a', fontWeight: 300, textTransform: 'uppercase' }}>VECTOR RAG ARCHITECTURE</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerRow} style={{ borderTop: '1px solid rgba(10,10,10,0.15)', paddingTop: '8px', color: '#444' }}>
        <span>HAREKI.COM</span>
        <span style={{ fontWeight: 600, color: '#0a0a0a' }}>ACTIVE ✓</span>
      </div>
    </div>
  );
}
