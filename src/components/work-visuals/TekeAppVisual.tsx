import React from 'react';
import type { Project } from '../../types/portfolio';
import styles from './WorkVisuals.module.css';

interface TekeAppVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function TekeAppVisual({ project, compact }: TekeAppVisualProps) {
  const imgSrc = project?.image || '/projects/tekeapp.jpg';

  return (
    <div
      data-work-visual="teke-app"
      className={`${styles.visualCanvas} ${styles.tekeCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#ff77aa', letterSpacing: '0.22em', fontWeight: 600 }}>
          TEKE.APP
        </span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>
          MOTION STUDIO
        </span>
      </div>

      <div className={`${styles.tekeStage} ${compact ? styles.tekeStageCompact : ''}`}>
        {/* 9:16 Vertical Reel Plane */}
        <div className={styles.tekePlaneVertical}>
          <img src={imgSrc} alt="" className={styles.projectMedia} />
        </div>

        {!compact && (
          <div className={styles.tekePlaneSquare}>
            <div style={{ fontSize: '14px', color: '#f5f5f2', fontWeight: 300 }}>
              KINETIC TYPOGRAPHY
            </div>
            <div style={{ height: '70px', borderRadius: '2px', overflow: 'hidden' }}>
              <img src={imgSrc} alt="" className={styles.projectMedia} />
            </div>
          </div>
        )}

        {!compact && (
          <div className={styles.tekePlaneLandscape}>
            <div style={{ fontSize: '12px', color: '#f5f5f2', textTransform: 'uppercase' }}>
              CINEMATIC MOTION
            </div>
            <div style={{ height: '60px', borderRadius: '2px', overflow: 'hidden' }}>
              <img src={imgSrc} alt="" className={styles.projectMedia} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerRow}>
        <span style={{ color: 'rgba(245,245,242,0.5)' }}>MULTI-FORMAT MOTION PIPELINE</span>
        <span style={{ color: '#ff77aa' }}>ACTIVE ✓</span>
      </div>
    </div>
  );
}
