import React from 'react';
import styles from './WorkVisuals.module.css';

interface TekeAppVisualProps {
  compact?: boolean;
}

export default function TekeAppVisual({ compact }: TekeAppVisualProps) {
  return (
    <div
      data-work-visual="teke-app"
      className={`${styles.visualCanvas} ${styles.tekeCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#ff77aa', letterSpacing: '0.22em' }}>TEKE.APP // MOTION STUDIO</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>SPATIAL REFRAMING</span>
      </div>

      <div className={`${styles.tekeStage} ${compact ? styles.tekeStageCompact : ''}`}>
        {/* 9:16 Vertical Plane */}
        <div className={styles.tekeVerticalPlane} style={{ height: compact ? '180px' : '260px', width: compact ? '100%' : '150px' }}>
          <span style={{ fontSize: '10px', color: '#ff77aa', letterSpacing: '0.1em' }}>[9:16 REELS]</span>
          <div style={{ fontSize: '12px', color: '#f5f5f2', fontWeight: 500 }}>VERTICAL MOTION CROP</div>
          <span style={{ fontSize: '9px', color: '#d7ff00' }}>60 FPS RENDER</span>
        </div>

        {!compact && (
          <div className={styles.tekeSquarePlane}>
            <span style={{ fontSize: '10px', color: '#f5f5f2', letterSpacing: '0.1em' }}>[1:1 FEED]</span>
            <div style={{ fontSize: '14px', color: '#f5f5f2', fontWeight: 300 }}>SQUARE TYPOGRAPHY</div>
            <span style={{ fontSize: '9px', color: 'rgba(245,245,242,0.6)' }}>AUTO REFRAME</span>
          </div>
        )}

        {!compact && (
          <div className={styles.tekeWidePlane}>
            <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.1em' }}>[16:9 LANDSCAPE]</span>
            <div style={{ fontSize: '12px', color: '#f5f5f2' }}>CINEMATIC WIDE</div>
            <span style={{ fontSize: '9px', color: 'rgba(245,245,242,0.4)' }}>HIGH BITRATE</span>
          </div>
        )}
      </div>

      <div className={styles.footerRow}>
        <span>TEKE.APP PLATFORM</span>
        <span style={{ color: '#d7ff00' }}>CREATIVE STUDIO ONLINE ✓</span>
      </div>
    </div>
  );
}
