import React from 'react';

export default function IntroSection() {
  return (
    <section
      id="intro"
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
          01 / INTRODUCTION
        </div>

        <h2
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          I DESIGN AND ENGINEER <br />
          <span style={{ color: '#d7ff00', fontStyle: 'normal' }}>INTELLIGENT SYSTEMS</span> <br />
          THAT CONNECT SOFTWARE, <br />
          DATA AND ACTION.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--font-body-large)",
            color: '#b3b3ad',
            maxWidth: '650px',
            lineHeight: 1.6,
          }}
        >
          From production-ready full-stack applications to AI agents, automation workflows and vision-driven data pipelines.
        </p>
      </div>
    </section>
  );
}
