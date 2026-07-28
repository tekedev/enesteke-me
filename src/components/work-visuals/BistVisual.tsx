import React from 'react';
import type { Project } from '../../types/portfolio';
import { PROJECT_MEDIA } from '../../data/projectMedia';
import styles from './WorkVisuals.module.css';

interface BistVisualProps {
  project?: Project;
  compact?: boolean;
}

export default function BistVisual({ project, compact }: BistVisualProps) {
  const media = project ? PROJECT_MEDIA[project.id] : PROJECT_MEDIA.whaletrace;
  const imgSrc = compact && media?.mobileSrc ? media.mobileSrc : media?.desktopSrc || '/projects/whaletrace.jpg';

  return (
    <div
      data-work-visual="bist-whale-tracker"
      className={`${styles.visualCanvas} ${styles.bistCanvas} ${compact ? styles.visualCanvasCompact : ''}`}
    >
      <div className={styles.headerRow}>
        <span style={{ fontSize: '11px', color: '#00e5a3', letterSpacing: '0.22em', fontWeight: 600 }}>
          WHALETRACE
        </span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>
          ORDER FLOW
        </span>
      </div>

      <div className={styles.bistStage}>
        {/* SVG Interconnecting Order Flow Ribbons Art */}
        <svg className={styles.bistSvgRibbon} viewBox="0 0 500 280" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5a3" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00e5a3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d7ff00" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ee993d" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#ee993d" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff4466" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fluid Ribbon Flow Path 1 */}
          <path
            d="M -20 180 C 100 240, 200 60, 320 140 T 520 80"
            stroke="url(#tealGrad)"
            strokeWidth="8"
            fill="none"
            filter="url(#glow)"
          />

          {/* Fluid Ribbon Flow Path 2 */}
          <path
            d="M -20 120 C 120 40, 240 220, 380 100 T 520 200"
            stroke="url(#amberGrad)"
            strokeWidth="5"
            fill="none"
            filter="url(#glow)"
          />

          {/* Liquidity Node Clusters */}
          <circle cx="200" cy="115" r="8" fill="#00e5a3" filter="url(#glow)" />
          <circle cx="320" cy="140" r="12" fill="#d7ff00" opacity="0.8" filter="url(#glow)" />
          <circle cx="380" cy="100" r="6" fill="#ee993d" filter="url(#glow)" />

          {/* Interconnecting Signal Branches */}
          <path d="M 200 115 L 320 140" stroke="#00e5a3" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          <path d="M 320 140 L 380 100" stroke="#ee993d" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        </svg>

        {/* Real Project Asset Overlay */}
        <div style={{ position: 'absolute', width: '50%', height: '55%', right: '5%', bottom: '10%', opacity: 0.25, borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,229,163,0.3)' }}>
          <img
            src={imgSrc}
            alt=""
            data-project-media-id={project?.id || 'whaletrace'}
            data-project-media-slug={project?.slug || 'bist-whale-tracker'}
            data-project-media-type={media?.mediaType || 'real-capture'}
            className={styles.projectMedia}
          />
        </div>
      </div>
    </div>
  );
}
