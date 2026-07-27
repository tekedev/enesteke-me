import React from 'react';

interface StaticMonogramFallbackProps {
  visible?: boolean;
}

export default function StaticMonogramFallback({ visible = false }: StaticMonogramFallbackProps) {
  return (
    <div
      data-static-monogram="true"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 'clamp(20px, 8vw, 140px)',
        opacity: visible ? 0.28 : 0,
        transition: 'opacity 700ms cubic-bezier(.22, 1, .36, 1)',
      }}
    >
      <svg
        width="400"
        height="400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: '42vw',
          maxHeight: '42vh',
          filter: 'drop-shadow(0 0 20px rgba(215, 255, 0, 0.12))',
        }}
      >
        {/* Sculptural 3D Depth Silhouette of ET Monogram */}
        <path
          d="M 22 22 L 88 22 L 88 36 L 72 36 L 72 88 L 58 88 L 58 74 L 38 74 L 38 60 L 60 60 L 60 46 L 38 46 L 38 36 L 22 36 Z"
          fill="rgba(255, 255, 255, 0.04)"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <path
          d="M 20 20 L 86 20 L 86 34 L 70 34 L 70 86 L 56 86 L 56 72 L 36 72 L 36 58 L 58 58 L 58 44 L 36 44 L 36 34 L 20 34 Z"
          fill="rgba(20, 20, 24, 0.6)"
          stroke="#f5f5f2"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M 20 20 L 86 20 L 86 34 L 70 34 L 70 86 L 56 86 L 56 72 L 36 72 L 36 58 L 58 58 L 58 44 L 36 44 L 36 34 L 20 34 Z"
          fill="none"
          stroke="#d7ff00"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
