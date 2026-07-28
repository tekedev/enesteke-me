import React, { useEffect, useState } from 'react';
import styles from './ETIntroSequence.module.css';

interface ETIntroSequenceProps {
  onComplete?: () => void;
}

export default function ETIntroSequence({ onComplete }: ETIntroSequenceProps) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forceIntro = params?.get('intro') === '1';
    const disableIntro = params?.get('intro') === '0';
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('et-intro-seen') === 'true';

    if ((seen || prefersReduced || disableIntro) && !forceIntro) {
      setHidden(true);
      if (onComplete) onComplete();
      return;
    }

    const timerExit = setTimeout(() => {
      setExiting(true);
    }, 2000);

    const timerComplete = setTimeout(() => {
      setHidden(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('et-intro-seen', 'true');
      }
      if (onComplete) onComplete();
    }, 2600);

    return () => {
      clearTimeout(timerExit);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`${styles.introOverlay} ${exiting ? styles.introOverlayExit : ''}`}
      data-intro-overlay="true"
      onClick={() => {
        setExiting(true);
        setTimeout(() => {
          setHidden(true);
          if (onComplete) onComplete();
        }, 300);
      }}
    >
      <div className={styles.canvasContainer}>
        <svg className={styles.introSvg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Architectural Axis & Ratio Circle Guides */}
          <circle cx="200" cy="200" r="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="100" stroke="rgba(215,255,0,0.12)" strokeWidth="1" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 4" />

          {/* E Construction Outline Stroke */}
          <path
            d="M 120 120 H 210 V 160 H 160 V 180 H 200 V 220 H 160 V 240 H 210 V 280 H 120 Z"
            stroke="rgba(245,245,242,0.9)"
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset="600"
            style={{ animation: 'drawStroke 1.2s cubic-bezier(0.16,1,0.3,1) forwards 0.2s' }}
          />

          {/* T Construction Outline Stroke */}
          <path
            d="M 190 120 H 280 V 160 H 250 V 280 H 210 V 160 H 190 Z"
            stroke="#d7ff00"
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset="600"
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
