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
      <div className={styles.harekiHeader}>
        <span className={styles.harekiTitle}>
          HAREKI
        </span>
        <span className={styles.harekiRibbon}>
          EDITORIAL DNA
        </span>
      </div>

      <div className={`${styles.harekiCollage} ${compact ? styles.harekiCollageCompact : ''}`}>
        {/* Main HAREKI Product Screen Capture */}
        <div className={styles.harekiMainCapture}>
          <img
            src={imgSrc}
            alt=""
            data-project-media-id={project?.id || 'hareki'}
            data-project-media-slug={project?.slug || 'hareki-dna'}
            data-project-media-type={media?.mediaType || 'real-capture'}
            className={`${styles.projectMedia} ${styles.harekiImgMain}`}
          />
        </div>

        {/* Detail Crop A */}
        <div className={styles.harekiDetailCropA}>
          <img
            src={imgSrc}
            alt=""
            data-project-media-id={project?.id || 'hareki'}
            data-project-media-slug={project?.slug || 'hareki-dna'}
            data-project-media-type={media?.mediaType || 'real-capture'}
            className={`${styles.projectMedia} ${styles.harekiImgCropA}`}
          />
        </div>

        {/* Detail Crop B (Desktop Only) */}
        {!compact && (
          <div className={styles.harekiDetailCropB}>
            <img
              src={imgSrc}
              alt=""
              data-project-media-id={project?.id || 'hareki'}
              data-project-media-slug={project?.slug || 'hareki-dna'}
              data-project-media-type={media?.mediaType || 'real-capture'}
              className={`${styles.projectMedia} ${styles.harekiImgCropB}`}
            />
          </div>
        )}

        {/* Decorative Editorial Display Typography */}
        <div aria-hidden="true" className={styles.harekiDisplayType}>
          EDITORIAL
        </div>

        {/* Decorative Brand DNA Ribbon */}
        <div aria-hidden="true" className={styles.harekiDnaRibbon} />
      </div>
    </div>
  );
}
