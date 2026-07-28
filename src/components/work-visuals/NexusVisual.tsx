import React from 'react';

export default function NexusVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #1e1914 0%, #060504 100%)', overflow: 'hidden', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontSize: '11px', color: '#ee993d', letterSpacing: '0.22em' }}>NEXUS // AI MEDIA SYSTEM</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>4K @ 60FPS</span>
      </div>

      {/* Layered 16:9 Cinematic Video Strips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ height: '240px', background: 'linear-gradient(135deg, rgba(238,153,61,0.15), rgba(16,19,27,0.8))', border: '1px solid rgba(238,153,61,0.3)', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', color: '#ee993d' }}>[FRAME_01]</span>
          <div style={{ height: '80px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', color: '#f5f5f2', letterSpacing: '0.1em' }}>RAW SCRIPT</span>
          </div>
          <span style={{ fontSize: '9px', color: '#73736e' }}>SYNTHESIS INITIATED</span>
        </div>

        <div style={{ height: '270px', background: 'linear-gradient(135deg, rgba(42,210,220,0.2), rgba(37,22,42,0.9))', border: '1px solid #2ad2dc', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translateY(-12px)', boxShadow: '0 10px 30px rgba(42,210,220,0.2)' }}>
          <span style={{ fontSize: '10px', color: '#2ad2dc' }}>[FRAME_02_ACTIVE]</span>
          <div style={{ height: '110px', background: 'rgba(0,0,0,0.6)', border: '1px solid #2ad2dc', borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#2ad2dc', letterSpacing: '0.12em' }}>MULTI-MODEL ENGINE</span>
            <span style={{ fontSize: '9px', color: '#d7ff00' }}>GEMINI 2.5 PRO ACTIVE</span>
          </div>
          <span style={{ fontSize: '9px', color: '#2ad2dc' }}>RENDER ACTIVE ✓</span>
        </div>

        <div style={{ height: '240px', background: 'linear-gradient(135deg, rgba(238,153,61,0.15), rgba(16,19,27,0.8))', border: '1px solid rgba(238,153,61,0.3)', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', color: '#ee993d' }}>[FRAME_03]</span>
          <div style={{ height: '80px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', color: '#f5f5f2', letterSpacing: '0.1em' }}>4K OUTPUT</span>
          </div>
          <span style={{ fontSize: '9px', color: '#73736e' }}>DISTRIBUTION READY</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', zIndex: 2 }}>
        <span style={{ fontSize: '10px', color: '#73736e' }}>AUTONOMOUS CONTENT ORCHESTRATION</span>
        <span style={{ fontSize: '10px', color: '#d7ff00' }}>SYSTEM ONLINE ✓</span>
      </div>
    </div>
  );
}
