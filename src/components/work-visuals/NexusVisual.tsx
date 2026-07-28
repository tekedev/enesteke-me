import React from 'react';
import styles from './WorkVisuals.module.css';

interface NexusVisualProps {
  compact?: boolean;
}

export default function NexusVisual({ compact }: NexusVisualProps) {
  return (
    <div
      data-work-visual="nexus-ai"
      className={`${styles.visualCanvas} ${styles.nexusCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#ee993d', letterSpacing: '0.22em' }}>NEXUS // MEDIA PIPELINE</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>MEDIA SYSTEM</span>
      </div>

      {/* Layered 16:9 Media Surfaces */}
      <div className={`${styles.nexusMediaStage} ${compact ? styles.nexusMediaStageCompact : ''}`}>
        <div className={`${styles.nexusFrame} ${compact ? styles.nexusFrameCompact : ''}`}>
          <span style={{ fontSize: '10px', color: '#ee993d' }}>[MEDIA_SURFACE_A]</span>
          <div style={{ height: '70px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(238,153,61,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', color: '#f5f5f2', letterSpacing: '0.1em' }}>CINEMATIC CROP</span>
          </div>
          <span style={{ fontSize: '9px', color: '#73736e' }}>REFRACTION LAYER</span>
        </div>

        {!compact && (
          <div className={styles.nexusFrameActive}>
            <span style={{ fontSize: '10px', color: '#2ad2dc' }}>[MAIN_RENDER_STAGE]</span>
            <div style={{ height: '100px', background: 'rgba(0,0,0,0.6)', border: '1px solid #2ad2dc', borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#2ad2dc', letterSpacing: '0.12em' }}>MULTI-CANVAS ORCHESTRATION</span>
              <span style={{ fontSize: '9px', color: '#d7ff00' }}>RENDER ACTIVE ✓</span>
            </div>
            <span style={{ fontSize: '9px', color: '#2ad2dc' }}>4K STREAM</span>
          </div>
        )}

        {!compact && (
          <div className={styles.nexusFrame}>
            <span style={{ fontSize: '10px', color: '#ee993d' }}>[MEDIA_SURFACE_B]</span>
            <div style={{ height: '70px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(238,153,61,0.3)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', color: '#f5f5f2', letterSpacing: '0.1em' }}>DISTRIBUTION</span>
            </div>
            <span style={{ fontSize: '9px', color: '#73736e' }}>OUTPUT STAGE</span>
          </div>
        )}
      </div>

      <div className={styles.footerRow}>
        <span>AUTONOMOUS MEDIA PIPELINE</span>
        <span style={{ color: '#d7ff00' }}>SYSTEM ONLINE ✓</span>
      </div>
    </div>
  );
}
