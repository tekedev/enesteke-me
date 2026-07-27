import React from 'react';

interface SystemControlsProps {
  roughness: number;
  setRoughness: (val: number) => void;
  noiseScale: number;
  setNoiseScale: (val: number) => void;
}

export default function SystemControls({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
}: SystemControlsProps) {
  return (
    <div
      style={{
        width: '220px',
        backgroundColor: 'rgba(8, 8, 8, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '2px',
        padding: '14px',
        fontFamily: "var(--font-family-mono)",
        zIndex: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
      }}
      className="system-controls-panel"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#b3b3ad', textTransform: 'uppercase' }}>
          SYSTEM CONTROLS
        </span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d7ff00' }} />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#73736e', marginBottom: '4px' }}>
          <span>ROUGHNESS</span>
          <span style={{ color: '#d7ff00' }}>{roughness.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.80"
          step="0.01"
          value={roughness}
          onChange={(e) => setRoughness(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#d7ff00', cursor: 'pointer' }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#73736e', marginBottom: '4px' }}>
          <span>NOISE SCALE</span>
          <span style={{ color: '#d7ff00' }}>{noiseScale.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="2.00"
          max="20.00"
          step="0.50"
          value={noiseScale}
          onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#d7ff00', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
