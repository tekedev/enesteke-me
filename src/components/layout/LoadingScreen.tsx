import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export default function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const isE2E = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e2e') === '1';

  useEffect(() => {
    if (isE2E) {
      setProgress(100);
      setFade(true);
      onLoaded();
      const timer = setTimeout(() => setShowLoader(false), 200);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFade(true);
          onLoaded();
          setTimeout(() => setShowLoader(false), 600);
          return 100;
        }
        return prev + 20;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoaded, isE2E]);

  if (!showLoader) return null;

  return (
    <div
      data-app-loader="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px var(--page-padding)',
        fontFamily: "var(--font-family-mono)",
        color: '#f5f5f2',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fade ? 'none' : 'auto',
      }}
    >
      <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e' }}>
        SYSTEM INITIALIZING...
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '20px' }}>
          BUILDING INTELLIGENT PRODUCTS
        </div>
        <div style={{ fontSize: '12px', color: '#d7ff00', letterSpacing: '0.15em' }}>
          CORE ENGINE / GLSL SHADERS
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <div style={{ fontSize: '11px', color: '#73736e' }}>
          TRT / UTC+3
        </div>
        <div style={{ fontSize: '48px', fontFamily: "var(--font-family-sans)", fontWeight: 300, color: '#f5f5f2' }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
