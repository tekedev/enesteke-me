import React from 'react';

export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      style={{
        position: 'relative',
        zIndex: 3,
        backgroundColor: '#000000',
        padding: 'var(--section-gap) var(--page-padding)',
        borderTop: '1px solid var(--line-secondary)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '30px' }}>
          04 / PRINCIPLE
        </div>

        <blockquote
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          GOOD SYSTEMS DO MORE <br />
          THAN GENERATE OUTPUT. <br />
          <span style={{ color: '#d7ff00' }}>THEY OBSERVE, REASON,</span> <br />
          ACT AND IMPROVE.
        </blockquote>
      </div>
    </section>
  );
}
