import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsFading(true), 150);
        setTimeout(() => {
          if (onLoaded) onLoaded();
        }, 650);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 50px',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
        transition: 'opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
        fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
        color: '#f5f5f2',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', textTransform: 'uppercase' }}>
          ENES TEKE <span style={{ color: '#d7ff00', marginLeft: '6px' }}>●</span>
        </span>
        <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#73736e' }}>
          SYSTEM INITIALIZING...
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" style={{ width: '80px', height: '80px', marginBottom: '20px' }}>
          <path
            d="M 74 22 H 26 V 78 H 74"
            fill="none"
            stroke="#f5f5f2"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: 200 - (progress / 100) * 200,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
          <path
            d="M 26 50 H 64"
            fill="none"
            stroke="#d7ff00"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100 - (progress / 100) * 100,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>
        <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#b3b3ad', fontWeight: 300 }}>
          BUILDING INTELLIGENT PRODUCTS
        </span>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '11px', color: '#73736e' }}>
          <span>CORE ENGINE / GLSL SHADERS</span>
          <span style={{ color: '#d7ff00', fontWeight: 600 }}>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.08)', position: 'relative' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#d7ff00',
              boxShadow: '0 0 10px rgba(215, 255, 0, 0.4)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
