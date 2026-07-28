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
  const imgSrc = compact && media?.mobileSrc ? media.mobileSrc : media?.desktopSrc || '/projects/tekeapp.jpg';

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
          <img
            src={imgSrc}
            alt=""
            data-project-media-id={project?.id || 'tekeapp'}
            data-project-media-slug={project?.slug || 'teke-app'}
            data-project-media-type={media?.mediaType || 'procedural-art'}
            className={styles.projectMedia}
          />
        </div>

        {!compact && (
          <div className={styles.tekePlaneSquare}>
            <div style={{ height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src={imgSrc}
                alt=""
                data-project-media-id={project?.id || 'tekeapp'}
                data-project-media-slug={project?.slug || 'teke-app'}
                data-project-media-type={media?.mediaType || 'procedural-art'}
                className={styles.projectMedia}
              />
            </div>
          </div>
        )}

        {!compact && (
          <div className={styles.tekePlaneLandscape}>
            <div style={{ height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src={imgSrc}
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
