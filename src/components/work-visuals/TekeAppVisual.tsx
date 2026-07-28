import React from 'react';
import type { Project } from '../../types/portfolio';
import { PROJECT_MEDIA } from '../../data/projectMedia';
import styles from './WorkVisuals.module.css';

interface TekeAppVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function TekeAppVisual({ project, compact }: TekeAppVisualProps) {
  const media = project ? PROJECT_MEDIA[project.id] : PROJECT_MEDIA.tekeapp;
  const verticalSrc = media?.variants?.vertical ?? media?.mobileSrc ?? media?.desktopSrc ?? '/projects/tekeapp-vertical.webp';
  const squareSrc = media?.variants?.square ?? media?.desktopSrc ?? '/projects/tekeapp-square.webp';
  const landscapeSrc = media?.variants?.landscape ?? media?.desktopSrc ?? '/projects/tekeapp-landscape.webp';

  return (
    <div
      data-work-visual="teke-app"
      className={`${styles.visualCanvas} ${styles.tekeCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span className={styles.tekeTitle}>
          TEKE.APP
        </span>
        <span className={styles.tekeSubtitle}>
          MOTION STUDIO
        </span>
      </div>

      <div className={`${styles.tekeStage} ${compact ? styles.tekeStageCompact : ''}`}>
        {/* 9:16 Vertical Reel Format Plane */}
        <div data-teke-format="vertical" className={styles.tekePlaneVertical}>
          <img
            src={verticalSrc}
            alt=""
            data-project-media-id={project?.id || 'tekeapp'}
            data-project-media-slug={project?.slug || 'teke-app'}
            data-project-media-type={media?.mediaType || 'procedural-art'}
            className={styles.projectMedia}
          />
        </div>

        {/* 1:1 Square Campaign Format Plane (Desktop Only) */}
        {!compact && (
          <div data-teke-format="square" className={styles.tekePlaneSquare}>
            <div className={styles.tekePlaneInner}>
              <img
                src={squareSrc}
                alt=""
                data-project-media-id={project?.id || 'tekeapp'}
                data-project-media-slug={project?.slug || 'teke-app'}
                data-project-media-type={media?.mediaType || 'procedural-art'}
                className={styles.projectMedia}
              />
            </div>
          </div>
        )}

        {/* 16:9 Cinematic Landscape Format Plane (Desktop Only) */}
        {!compact && (
          <div data-teke-format="landscape" className={styles.tekePlaneLandscape}>
            <div className={styles.tekePlaneInner}>
              <img
                src={landscapeSrc}
                alt=""
                data-project-media-id={project?.id || 'tekeapp'}
                data-project-media-slug={project?.slug || 'teke-app'}
                data-project-media-type={media?.mediaType || 'procedural-art'}
                className={styles.projectMedia}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
