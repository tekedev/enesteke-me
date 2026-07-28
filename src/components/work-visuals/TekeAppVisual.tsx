import React from 'react';

export default function TekeAppVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #1b1624 0%, #060408 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontSize: '11px', color: '#ff77aa', letterSpacing: '0.22em' }}>TEKE.APP // MOTION STUDIO</span>
        <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.15em' }}>SPATIAL REFRAMING</span>
      </div>

      {/* 3D Spatial Format Planes */}
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', margin: '20px 0', zIndex: 2 }}>
        {/* 9:16 Vertical Plane */}
        <div style={{ width: '150px', height: '260px', background: 'linear-gradient(180deg, rgba(42,90,240,0.4), rgba(255,119,170,0.2))', border: '1px solid #ff77aa', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 12px 30px rgba(255,119,170,0.2)' }}>
          <span style={{ fontSize: '10px', color: '#ff77aa', letterSpacing: '0.1em' }}>[9:16 REELS]</span>
          <div style={{ fontSize: '12px', color: '#f5f5f2', fontWeight: 500 }}>VERTICAL MOTION CROP</div>
          <span style={{ fontSize: '9px', color: '#d7ff00' }}>60 FPS RENDER</span>
        </div>

        {/* 1:1 Square Plane */}
        <div style={{ width: '210px', height: '210px', background: 'linear-gradient(135deg, rgba(255,119,170,0.3), rgba(255,170,88,0.2))', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', color: '#f5f5f2', letterSpacing: '0.1em' }}>[1:1 FEED]</span>
          <div style={{ fontSize: '14px', color: '#f5f5f2', fontWeight: 300 }}>SQUARE TYPOGRAPHY</div>
          <span style={{ fontSize: '9px', color: 'rgba(245,245,242,0.6)' }}>AUTO REFRAME</span>
        </div>

        {/* 16:9 Wide Plane */}
        <div style={{ width: '230px', height: '150px', background: 'linear-gradient(135deg, rgba(42,90,240,0.3), rgba(10,10,12,0.8))', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', color: 'rgba(245,245,242,0.6)', letterSpacing: '0.1em' }}>[16:9 LANDSCAPE]</span>
          <div style={{ fontSize: '12px', color: '#f5f5f2' }}>CINEMATIC WIDE</div>
          <span style={{ fontSize: '9px', color: 'rgba(245,245,242,0.4)' }}>HIGH BITRATE</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', zIndex: 2 }}>
        <span style={{ fontSize: '10px', color: '#73736e' }}>TEKE.APP</span>
        <span style={{ fontSize: '10px', color: '#d7ff00' }}>CREATIVE STUDIO ONLINE ✓</span>
      </div>
    </div>
  );
}
