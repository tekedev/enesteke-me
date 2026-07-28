import React from 'react';
import type { Project } from '../../types/portfolio';
import styles from './WorkVisuals.module.css';

interface NexusVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function NexusVisual({ project, compact }: NexusVisualProps) {
  const imgSrc = project?.image || '/projects/nexus.jpg';

  return (
    <div
      data-work-visual="nexus-ai"
      className={`${styles.visualCanvas} ${styles.nexusCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.2em', fontWeight: 600 }}>
          NEXUS
        </span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>
          MEDIA PIPELINE
        </span>
      </div>

      <div className={styles.nexusStage}>
        {!compact && <div className={styles.nexusBackgroundPlaneA} />}
        {!compact && <div className={styles.nexusBackgroundPlaneB} />}

        <div className={styles.nexusPrimarySurface}>
          <img src={imgSrc} alt="" className={styles.projectMedia} />
          <div className={styles.nexusPlayhead}>
            <div className={styles.nexusPlayheadBar} />
          </div>
        </div>
      </div>

      <div className={styles.footerRow}>
        <span style={{ color: 'rgba(245,245,242,0.5)' }}>AUTOMATED MEDIA ORCHESTRATION</span>
        <span style={{ color: '#d7ff00' }}>ONLINE ✓</span>
      </div>
    </div>
  );
}
