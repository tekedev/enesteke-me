import React from 'react';
import { updates } from '../../data/portfolioData';

export default function UpdatesPanel() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        right: 'var(--page-padding)',
        width: '240px',
        backgroundColor: 'rgba(8, 8, 8, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        padding: '14px',
        fontFamily: "var(--font-family-mono)",
        zIndex: 10,
      }}
      className="updates-panel"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#b3b3ad' }}>
          LATEST / 03
        </span>
        <span style={{ fontSize: '10px', color: '#d7ff00' }}>[LIVE]</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {updates.map((item) => (
          <div key={item.id} style={{ fontSize: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#73736e', marginBottom: '2px' }}>
              <span>{item.date}</span>
              <span style={{ color: '#d7ff00' }}>{item.category}</span>
            </div>
            <div style={{ color: '#f5f5f2', fontSize: '11px', lineHeight: 1.3 }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
