import React from 'react';

export default function BistVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #0f221e 0%, #030806 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontSize: '11px', color: '#00e5a3', letterSpacing: '0.22em' }}>BIST // ORDER FLOW RIBBONS</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>WEBSOCKET FEED</span>
      </div>

      {/* Liquidity Ribbons & Wave Density Art */}
      <div style={{ height: '260px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(0,229,163,0.3)', borderRadius: '2px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '20px 0', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', color: '#f5f5f2', fontWeight: 300, letterSpacing: '-0.02em' }}>ORDER FLOW & LIQUIDITY CLUSTERS</span>
          <span style={{ fontSize: '11px', color: '#00e5a3', letterSpacing: '0.12em' }}>LIVE SIGNAL FIELD</span>
        </div>

        {/* Streaming Ribbon Wave Field */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', alignItems: 'flex-end', height: '140px' }}>
          <div style={{ height: '60%', background: 'linear-gradient(0deg, rgba(0,229,163,0.1), rgba(0,229,163,0.6))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '90%', background: 'linear-gradient(0deg, rgba(0,229,163,0.2), rgba(0,229,163,0.8))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '40%', background: 'linear-gradient(0deg, rgba(238,153,61,0.1), rgba(238,153,61,0.5))', borderTop: '2px solid #ee993d', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '100%', background: 'linear-gradient(0deg, rgba(0,229,163,0.25), #00e5a3)', borderTop: '2px solid #d7ff00', borderRadius: '2px 2px 0 0' }} />
          <div style={{ height: '75%', background: 'linear-gradient(0deg, rgba(0,229,163,0.15), rgba(0,229,163,0.7))', borderTop: '2px solid #00e5a3', borderRadius: '2px 2px 0 0' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', zIndex: 2 }}>
        <span style={{ fontSize: '10px', color: '#73736e' }}>FINTECH WEBSOCKET MONITOR</span>
        <span style={{ fontSize: '10px', color: '#00e5a3' }}>STREAM ONLINE ✓</span>
      </div>
    </div>
  );
}
