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
          filter: 'drop-shadow(0 0 16px rgba(215, 255, 0, 0.10))',
        }}
      >
        {/* Sculptural 3D Silhouette of Unified ET Monogram */}
        <path
          d="M 20 20 L 92 20 L 92 34 L 74 34 L 74 90 L 58 90 L 58 74 L 38 74 L 38 60 L 60 60 L 60 46 L 38 46 L 38 34 L 20 34 Z"
          fill="rgba(255, 255, 255, 0.03)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        <path
          d="M 18 18 L 90 18 L 90 32 L 72 32 L 72 88 L 56 88 L 56 72 L 36 72 L 36 60 L 58 60 L 58 46 L 36 46 L 36 32 L 18 32 Z"
          fill="rgba(18, 18, 22, 0.6)"
          stroke="#f5f5f2"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 18 18 L 90 18 L 90 32 L 72 32 L 72 88 L 56 88 L 56 72 L 36 72 L 36 60 L 58 60 L 58 46 L 36 46 L 36 32 L 18 32 Z"
          fill="none"
          stroke="#d7ff00"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
