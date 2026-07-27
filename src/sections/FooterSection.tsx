import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#000000',
        padding: '120px 0 60px',
        fontFamily: "var(--font-family-mono)",
        color: '#f5f5f2',
        borderTop: '1px solid var(--line-secondary)',
      }}
    >
      {/* Top CTA Area */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)', marginBottom: '100px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '20px' }}>
          CONTACT / COLLABORATION
        </div>
        <h2
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: 'clamp(2.8rem, 6.5vw, 7.2rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
            marginBottom: '36px',
          }}
        >
          HAVE A SYSTEM <br />
          <span style={{ color: '#d7ff00' }}>WORTH BUILDING?</span>
        </h2>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: '#f5f5f2',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontFamily: "var(--font-family-sans)",
            fontWeight: 300,
            letterSpacing: '-0.02em',
            textDecoration: 'none',
            borderBottom: '1px solid #d7ff00',
            paddingBottom: '8px',
          }}
        >
          LET’S TALK <span style={{ color: '#d7ff00' }}>↗</span>
        </Link>
      </div>

      {/* Giant Full-Viewport Width Brand Display Text */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          borderTop: '1px solid var(--line-secondary)',
          borderBottom: '1px solid var(--line-secondary)',
          padding: '40px 0',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: 'clamp(3.5rem, 14vw, 16rem)',
            fontWeight: 300,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#f5f5f2',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: 0.9,
          }}
        >
          ENES TEKE
        </div>
      </div>

      {/* Bottom Footer Info Bar */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px var(--page-padding) 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          fontSize: '11px',
          color: '#73736e',
        }}
      >
        <div>
          DIRECT: <a href={`mailto:${profile.email}`} style={{ color: '#f5f5f2', textDecoration: 'none' }}>{profile.email}</a>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#b3b3ad', textDecoration: 'none' }}
            >
              {s.name} ↗
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span>TRT / UTC+3</span>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: '#d7ff00',
              fontFamily: "var(--font-family-mono)",
              fontSize: '11px',
              cursor: 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
