import React from 'react';
import type { Project } from '../../types/portfolio';
import { PROJECT_MEDIA } from '../../data/projectMedia';
import styles from './WorkVisuals.module.css';

interface HarekiVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function HarekiVisual({ project, compact }: HarekiVisualProps) {
  const media = project ? PROJECT_MEDIA[project.id] : PROJECT_MEDIA.hareki;
  const imgSrc = compact && media?.mobileSrc ? media.mobileSrc : media?.desktopSrc || '/projects/hareki.jpg';

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
          <div className={styles.harekiImageContainer}>
            <img
              src={imgSrc}
              alt=""
              data-project-media-id={project?.id || 'hareki'}
              data-project-media-slug={project?.slug || 'hareki-dna'}
              data-project-media-type={media?.mediaType || 'real-capture'}
              className={styles.projectMedia}
            />
          </div>
        </div>

        {!compact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
            <div style={{ flex: 1, background: '#0a0a0a', color: '#f5f5f2', padding: '14px', borderRadius: '3px' }} />
            <div style={{ flex: 1, background: '#ffffff', border: '1px solid rgba(10,10,10,0.15)', padding: '14px', borderRadius: '3px' }} />
          </div>
        )}
      </div>
    </div>
  );
}
