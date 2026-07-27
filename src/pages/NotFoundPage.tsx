import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 Signal Lost — Enes Teke" />
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--page-padding)',
          fontFamily: "var(--font-family-mono)",
          color: '#f5f5f2',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#d7ff00', marginBottom: '16px' }}>
          404 / SIGNAL LOST
        </div>

        <h1
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: "var(--font-display)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#f5f5f2',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          THE SYSTEM COULD NOT <br />
          <span style={{ color: '#73736e' }}>LOCATE THIS ROUTE.</span>
        </h1>

        <p style={{ color: '#b3b3ad', fontSize: '14px', maxWidth: '450px', lineHeight: 1.6, marginBottom: '30px' }}>
          The path you are looking for has been moved, removed, or never existed in this architectural domain.
        </p>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            backgroundColor: '#d7ff00',
            color: '#000000',
            fontWeight: 600,
            fontSize: '12px',
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          RETURN TO TOP →
        </Link>
      </div>
    </>
  );
}
