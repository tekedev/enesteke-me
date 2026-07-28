import React from 'react';

export default function HarekiVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(135deg, #f0eee6 0%, #dcd8cc 100%)', color: '#0a0a0a', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(10,10,10,0.15)', paddingBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#0a0a0a' }}>HAREKI // EDITORIAL SURFACES</span>
        <span style={{ fontSize: '10px', color: '#555', letterSpacing: '0.15em' }}>VECTOR RAG SYSTEM</span>
      </div>

      {/* Editorial Content Surface & Reassembling Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px', margin: '24px 0', alignItems: 'center' }}>
        <div style={{ height: '250px', background: '#ffffff', border: '1px solid rgba(10,10,10,0.2)', padding: '24px', borderRadius: '2px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#666', marginBottom: '8px' }}>[BRAND_EDITORIAL_DNA]</div>
            <div style={{ fontSize: '26px', fontFamily: 'var(--font-family-sans)', fontWeight: 300, color: '#0a0a0a', lineHeight: 1.05 }}>DYNAMIC BRAND SYSTEM ARCHITECTURE</div>
          </div>
          <div style={{ fontSize: '11px', color: '#444', borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '12px' }}>
            Extracted Editorial DNA & Vector Search Index
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ height: '115px', background: '#0a0a0a', color: '#f5f5f2', padding: '20px', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>CONTENT MATRIX</span>
            <span style={{ fontSize: '14px', fontWeight: 300 }}>AUTOMATED EDITORIAL STREAM</span>
          </div>

          <div style={{ height: '115px', background: '#ffffff', border: '1px solid rgba(10,10,10,0.2)', padding: '20px', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.15em' }}>DYNAMIC PUBLISHING</span>
            <span style={{ fontSize: '14px', color: '#0a0a0a', fontWeight: 300 }}>CRAWLER + LLM VECTOR RAG</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(10,10,10,0.15)', paddingTop: '12px', fontSize: '10px', color: '#444' }}>
        <span>PLATFORM: HAREKI.COM</span>
        <span style={{ fontWeight: 600, color: '#0a0a0a' }}>EDITORIAL DNA ACTIVE ✓</span>
      </div>
    </div>
  );
}
