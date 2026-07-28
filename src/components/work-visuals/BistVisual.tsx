import React from 'react';
import styles from './WorkVisuals.module.css';

interface BistVisualProps {
  compact?: boolean;
}

export default function BistVisual({ compact }: BistVisualProps) {
  return (
    <div
      data-work-visual="bist-engine"
      className={`${styles.visualCanvas} ${styles.bistCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#00e5a3', letterSpacing: '0.22em' }}>BIST // ORDER FLOW RIBBONS</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>WEBSOCKET FEED</span>
      </div>

      <div className={`${styles.bistStage} ${compact ? styles.bistStageCompact : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: compact ? '14px' : '18px', color: '#f5f5f2', fontWeight: 300, letterSpacing: '-0.02em' }}>ORDER FLOW & LIQUIDITY CLUSTERS</span>
          <span style={{ fontSize: '10px', color: '#00e5a3', letterSpacing: '0.12em' }}>SIGNAL FIELD</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', alignItems: 'flex-end', height: compact ? '100px' : '140px' }}>
          <div style={{ height: '60%', background: 'linear-gradient(0deg, rgba(0,229,163,0.1), rgba(0,229,163,0.6))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '90%', background: 'linear-gradient(0deg, rgba(0,229,163,0.2), rgba(0,229,163,0.8))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '40%', background: 'linear-gradient(0deg, rgba(238,153,61,0.1), rgba(238,153,61,0.5))', borderTop: '2px solid #ee993d', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '100%', background: 'linear-gradient(0deg, rgba(0,229,163,0.25), #00e5a3)', borderTop: '2px solid #d7ff00', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '75%', background: 'linear-gradient(0deg, rgba(0,229,163,0.15), rgba(0,229,163,0.7))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
        </div>
      </div>

      <div className={styles.footerRow}>
        <span>FINTECH WEBSOCKET MONITOR</span>
        <span style={{ color: '#00e5a3' }}>STREAM ONLINE ✓</span>
      </div>
    </div>
  );
}
