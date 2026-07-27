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
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 'clamp(20px, 8vw, 120px)',
        opacity: visible ? 0.35 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <svg
        width="380"
        height="380"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: '45vw',
          maxHeight: '45vh',
          filter: 'drop-shadow(0 0 20px rgba(215, 255, 0, 0.15))',
        }}
      >
        <path
          d="M 20 20 L 80 20 L 80 34 L 38 34 L 38 46 L 72 46 L 72 60 L 38 60 L 38 72 L 80 72 L 80 86 L 20 86 Z"
          fill="none"
          stroke="#f5f5f2"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          d="M 20 20 L 80 20 L 80 34 L 38 34 L 38 46 L 72 46 L 72 60 L 38 60 L 38 72 L 80 72 L 80 86 L 20 86 Z"
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
