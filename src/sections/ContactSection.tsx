import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 3,
        backgroundColor: '#000000',
        padding: 'var(--section-gap) var(--page-padding)',
        borderTop: '1px solid var(--line-secondary)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '20px' }}>
          05 / CONTACT
        </div>

        <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-display)", fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '30px' }}>
          HAVE A SYSTEM <br />
          <span style={{ color: '#d7ff00' }}>WORTH BUILDING?</span>
        </h2>

        <div style={{ marginBottom: '60px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href={`mailto:${profile.email}`}
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "var(--font-project)",
              color: '#f5f5f2',
              textDecoration: 'none',
              borderBottom: '2px solid #d7ff00',
              paddingBottom: '8px',
              display: 'inline-block',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#d7ff00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f5f2')}
          >
            LET'S TALK → {profile.email}
          </a>

          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#d7ff00',
              color: '#000000',
              fontWeight: 600,
              fontSize: '12px',
              fontFamily: "var(--font-family-mono)",
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            OPEN CONTACT FORM →
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', borderTop: '1px solid var(--line-secondary)', paddingTop: '30px' }}>
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: '#b3b3ad',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d7ff00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#b3b3ad')}
            >
              {s.name.toUpperCase()} [{s.handle}] ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
