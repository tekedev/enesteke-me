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
          style={{ textDecoration: 'none', color: '#f5f5f2', fontSize: '18px', fontWeight: 700, letterSpacing: '0.15em' }}
        >
          <span style={{ color: '#d7ff00' }}>ET</span> / ENES TEKE
        </Link>
        <button
          onClick={onClose}
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

      {/* Menu Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '28px', margin: '40px 0' }}>
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
        <a
          href="/#capabilities"
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
          <span style={{ fontSize: '14px', color: '#d7ff00', fontFamily: 'var(--font-family-mono)' }}>03</span> SYSTEMS
        </a>
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
          <span style={{ fontSize: '14px', color: '#d7ff00', fontFamily: 'var(--font-family-mono)' }}>04</span> CONTACT
        </Link>
      </nav>

      {/* Menu Footer Contact Info */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', fontSize: '12px', color: '#73736e' }}>
        <div style={{ marginBottom: '12px' }}>
          DIRECT: <a href={`mailto:${profile.email}`} style={{ color: '#d7ff00', textDecoration: 'none' }}>{profile.email}</a>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {profile.socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#b3b3ad', textDecoration: 'none' }}>
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
