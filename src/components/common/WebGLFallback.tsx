import React from 'react';

export default function WebGLFallback() {
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
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 40%, rgba(215, 255, 0, 0.05) 0%, rgba(0,0,0,1) 70%)',
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" style={{ width: '280px', height: '280px', opacity: 0.15 }}>
        <path d="M 140 40 H 60 V 160 H 140" fill="none" stroke="#f5f5f2" strokeWidth="6" />
        <path d="M 60 100 H 120" fill="none" stroke="#d7ff00" strokeWidth="6" />
      </svg>
    </div>
  );
}
