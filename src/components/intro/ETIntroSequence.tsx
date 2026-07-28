import React, { useEffect, useState } from 'react';
import styles from './ETIntroSequence.module.css';

interface ETIntroSequenceProps {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export default function ETIntroSequence({ onProgress, onComplete }: ETIntroSequenceProps) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forceIntro = params?.get('intro') === '1';
    const disableIntro = params?.get('intro') === '0';
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('et-intro-seen') === 'true';

    if ((seen || prefersReduced || disableIntro) && !forceIntro) {
      setHidden(true);
      if (onProgress) onProgress(1);
      if (onComplete) onComplete();
      return;
    }

    const duration = 2400;
    const startTime = Date.now();
    let animId: number;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      if (onProgress) onProgress(progress);
      setIntroProgress(progress);

      if (progress < 1) {
        animId = requestAnimationFrame(animateProgress);
      }
    };
    animId = requestAnimationFrame(animateProgress);

    const timerExit = setTimeout(() => {
      setExiting(true);
    }, 2000);

    const timerComplete = setTimeout(() => {
      setHidden(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('et-intro-seen', 'true');
      }
      if (onProgress) onProgress(1);
      if (onComplete) onComplete();
    }, 2600);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timerExit);
      clearTimeout(timerComplete);
    };
  }, [onProgress, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`${styles.introOverlay} ${exiting ? styles.introOverlayExit : ''}`}
      data-intro-overlay="true"
      data-intro-progress={introProgress.toFixed(2)}
      onClick={() => {
        setExiting(true);
        if (onProgress) onProgress(1);
        setTimeout(() => {
          setHidden(true);
          if (onComplete) onComplete();
        }, 300);
      }}
    >
      <div className={styles.canvasContainer}>
        <svg className={styles.introSvg} viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Viewport Spanning Axis Lines & Concentric Ratio Circles */}
          <line x1="0" y1="300" x2="1000" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 8" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 8" />
          
          <line x1="0" y1="0" x2="1000" y2="600" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 10" />
          <line x1="1000" y1="0" x2="0" y2="600" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 10" />

          <circle cx="500" cy="300" r="280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8 12" />
          <circle cx="500" cy="300" r="180" stroke="rgba(215,255,0,0.12)" strokeWidth="1" />
          <circle cx="500" cy="300" r="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* E Construction Geometry Stroke */}
          <path
            d="M 360 180 H 480 V 215 H 410 V 230 H 460 V 265 H 410 V 285 H 480 V 320 H 360 Z"
            stroke="rgba(245,245,242,0.92)"
            strokeWidth="1.5"
            strokeDasharray="800"
            strokeDashoffset="800"
            style={{ animation: 'drawStroke 1.2s cubic-bezier(0.16,1,0.3,1) forwards 0.2s' }}
          />

          {/* T Construction Geometry Stroke */}
          <path
            d="M 490 180 H 640 V 215 H 580 V 320 H 530 V 215 H 490 Z"
            stroke="#d7ff00"
            strokeWidth="1.5"
            strokeDasharray="800"
            strokeDashoffset="800"
            style={{ animation: 'drawStroke 1.2s cubic-bezier(0.16,1,0.3,1) forwards 0.4s' }}
          />
        </svg>

        <style>{`
          @keyframes drawStroke {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>

      <div className={styles.manifestoText}>
        ENGINEERING SYSTEMS IN MOTION.
      </div>
    </div>
  );
}
