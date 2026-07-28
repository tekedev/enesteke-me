import React from 'react';
import type { Project } from '../../types/portfolio';
import { PROJECT_MEDIA } from '../../data/projectMedia';
import styles from './WorkVisuals.module.css';

interface NexusVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function NexusVisual({ project, compact }: NexusVisualProps) {
  const media = project ? PROJECT_MEDIA[project.id] : PROJECT_MEDIA.nexus;
  const imgSrc = compact && media?.mobileSrc ? media.mobileSrc : media?.desktopSrc || '/projects/nexus.jpg';

  return (
    <div
      data-work-visual="nexus-ai"
      className={`${styles.visualCanvas} ${styles.nexusCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span className={styles.nexusTitle}>
          NEXUS
        </span>
        <span className={styles.nexusSubtitle}>
          MEDIA PIPELINE
        </span>
      </div>

      <div className={styles.nexusStage}>
        {!compact && <div className={styles.nexusBackgroundPlaneA} />}
        {!compact && <div className={styles.nexusBackgroundPlaneB} />}

        <div className={styles.nexusPrimarySurface}>
          <img
            src={imgSrc}
            alt=""
            data-project-media-id={project?.id || 'nexus'}
            data-project-media-slug={project?.slug || 'nexus-ai'}
            data-project-media-type={media?.mediaType || 'real-capture'}
            className={styles.projectMedia}
          />
          <div className={styles.nexusPlayhead}>
            <div className={styles.nexusPlayheadBar} />
          </div>
        </div>
      </div>
    </div>
  );
}
