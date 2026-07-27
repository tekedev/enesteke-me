import React from 'react';

interface WebGLFallbackProps {
  onRetry?: () => void;
}

export default function WebGLFallback({ onRetry }: WebGLFallbackProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "var(--font-family-mono)",
        color: '#73736e',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.25, marginBottom: '24px' }}
      >
        <path
          d="M 20,20 L 80,20 L 80,35 L 35,35 L 35,50 L 70,50 L 70,65 L 35,65 L 35,80 L 80,80 L 80,95 L 20,95 Z"
          stroke="#d7ff00"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', color: '#f5f5f2' }}>
        STATIC 2D FALLBACK MODE
      </div>
      <div style={{ fontSize: '12px', maxWidth: '380px', lineHeight: 1.5, color: '#73736e', marginBottom: '20px' }}>
        WebGL hardware acceleration is inactive or context was reset by browser.
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #d7ff00',
            color: '#d7ff00',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            padding: '8px 20px',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.2s ease',
          }}
        >
          RETRY 3D SCENE ↺
        </button>
      )}
    </div>
  );
}
