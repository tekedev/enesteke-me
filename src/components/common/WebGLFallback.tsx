import React from 'react';

interface WebGLFallbackProps {
  onRetry?: () => void;
}

export default function WebGLFallback({ onRetry }: WebGLFallbackProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 30,
        pointerEvents: 'auto',
        backgroundColor: 'rgba(8, 8, 8, 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '12px 18px',
        borderRadius: '2px',
        fontFamily: "var(--font-family-mono)",
        color: '#f5f5f2',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          3D SCENE UNAVAILABLE
        </span>
        <span style={{ fontSize: '11px', color: '#b3b3ad' }}>
          Static 2D Mode Active
        </span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #d7ff00',
            color: '#d7ff00',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            padding: '6px 14px',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.2s ease',
          }}
        >
          RETRY ↺
        </button>
      )}
    </div>
  );
}
