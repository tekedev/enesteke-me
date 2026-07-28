import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/portfolioData';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Lock body scroll and handle Escape key when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const github = profile.socials.find((s) => s.name === 'GitHub')?.url || 'https://github.com/tekedev';
  const linkedin = profile.socials.find((s) => s.name === 'LinkedIn')?.url || 'https://linkedin.com/in/enesteke';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 24px 40px',
        fontFamily: "var(--font-family-mono)",
        color: '#f5f5f2',
      }}
    >
      {/* Menu Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link
          to="/"
          onClick={onClose}
          style={{ textDecoration: 'none', color: '#f5f5f2', fontSize: '16px', fontWeight: 500, letterSpacing: '0.18em' }}
        >
          ET <span style={{ color: '#73736e' }}>/</span> ENES TEKE
        </Link>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            background: 'none',
            border: '1px solid #d7ff00',
            color: '#d7ff00',
            fontFamily: "var(--font-family-mono)",
            fontSize: '12px',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '2px',
            letterSpacing: '0.1em',
            minHeight: '44px',
          }}
        >
          CLOSE ✕
        </button>
      </div>

      {/* Clean Mobile Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px', margin: '40px 0' }}>
        <Link
          to="/work"
          onClick={onClose}
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: '36px',
            fontWeight: 300,
            color: '#f5f5f2',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '14px', color: '#d7ff00', fontFamily: 'var(--font-family-mono)' }}>01</span> WORK
        </Link>
        <Link
          to="/about"
          onClick={onClose}
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: '36px',
            fontWeight: 300,
            color: '#f5f5f2',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '14px', color: '#d7ff00', fontFamily: 'var(--font-family-mono)' }}>02</span> ABOUT
        </Link>
        <Link
          to="/contact"
          onClick={onClose}
          style={{
            fontFamily: "var(--font-family-sans)",
            fontSize: '36px',
            fontWeight: 300,
            color: '#f5f5f2',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '14px', color: '#d7ff00', fontFamily: 'var(--font-family-mono)' }}>03</span> CONTACT
        </Link>
      </nav>

      {/* Clean Menu Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', fontSize: '12px', color: '#73736e' }}>
        <div style={{ marginBottom: '12px' }}>
          <a href={`mailto:${profile.email}`} style={{ color: '#d7ff00', textDecoration: 'none', letterSpacing: '0.1em' }}>{profile.email}</a>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: '#b3b3ad', textDecoration: 'none' }}>
            GITHUB ↗
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#b3b3ad', textDecoration: 'none' }}>
            LINKEDIN ↗
          </a>
        </div>
      </div>
    </div>
  );
}
