import React from 'react';

interface StaticMonogramFallbackProps {
  visible?: boolean;
}

export default function StaticMonogramFallback({ visible = true }: StaticMonogramFallbackProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 'clamp(20px, 8vw, 140px)',
        opacity: visible ? 0.65 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <svg
        width="420"
        height="420"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: '45vw',
          maxHeight: '45vh',
          filter: 'drop-shadow(0 0 24px rgba(215, 255, 0, 0.2))',
        }}
      >
        {/* Extruded 3D Shadow Layers for Depth */}
        <path
          d="M 22 22 L 82 22 L 82 36 L 40 36 L 40 48 L 74 48 L 74 62 L 40 62 L 40 74 L 82 74 L 82 88 L 22 88 Z"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />
        <path
          d="M 20 20 L 80 20 L 80 34 L 38 34 L 38 46 L 72 46 L 72 60 L 38 60 L 38 72 L 80 72 L 80 86 L 20 86 Z"
          fill="rgba(20, 20, 24, 0.7)"
          stroke="#f5f5f2"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M 20 20 L 80 20 L 80 34 L 38 34 L 38 46 L 72 46 L 72 60 L 38 60 L 38 72 L 80 72 L 80 86 L 20 86 Z"
          fill="none"
          stroke="#d7ff00"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
