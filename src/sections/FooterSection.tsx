import React from 'react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 3,
        backgroundColor: '#000000',
        padding: '60px var(--page-padding) 30px',
        borderTop: '1px solid var(--line-secondary)',
        fontFamily: "var(--font-family-mono)",
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ overflow: 'hidden', marginBottom: '40px' }}>
          <div
            style={{
              fontSize: 'clamp(3rem, 15vw, 16rem)',
              fontFamily: "var(--font-family-sans)",
              fontWeight: 800,
              color: 'rgba(255, 255, 255, 0.05)',
              letterSpacing: '-0.04em',
              lineHeight: 0.8,
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            ENES TEKE
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', fontSize: '11px', color: '#73736e' }}>
          <div>
            © 2026 ENES TEKE — ALL RIGHTS RESERVED.
          </div>

          <div>
            FULL-STACK PRODUCTS & AGENTIC AI SYSTEMS
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: '#d7ff00',
              fontFamily: "var(--font-family-mono)",
              fontSize: '11px',
              cursor: 'pointer',
              letterSpacing: '0.15em',
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
