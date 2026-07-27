import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/portfolioData';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '100px 30px 40px',
        fontFamily: "var(--font-family-mono)",
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <Link
          to="/work"
          onClick={onClose}
          style={{ fontSize: '28px', color: '#f5f5f2', textDecoration: 'none', letterSpacing: '0.1em' }}
        >
          <span style={{ color: '#d7ff00', fontSize: '14px', marginRight: '15px' }}>01</span>
          WORK
        </Link>
        <Link
          to="/about"
          onClick={onClose}
          style={{ fontSize: '28px', color: '#f5f5f2', textDecoration: 'none', letterSpacing: '0.1em' }}
        >
          <span style={{ color: '#d7ff00', fontSize: '14px', marginRight: '15px' }}>02</span>
          ABOUT
        </Link>
        <a
          href="/#capabilities"
          onClick={onClose}
          style={{ fontSize: '28px', color: '#f5f5f2', textDecoration: 'none', letterSpacing: '0.1em' }}
        >
          <span style={{ color: '#d7ff00', fontSize: '14px', marginRight: '15px' }}>03</span>
          SYSTEMS
        </a>
        <Link
          to="/contact"
          onClick={onClose}
          style={{ fontSize: '28px', color: '#f5f5f2', textDecoration: 'none', letterSpacing: '0.1em' }}
        >
          <span style={{ color: '#d7ff00', fontSize: '14px', marginRight: '15px' }}>04</span>
          CONTACT
        </Link>
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <div style={{ fontSize: '11px', color: '#73736e', marginBottom: '15px', textTransform: 'uppercase' }}>
          DIRECT CONTACT
        </div>
        <a
          href={`mailto:${profile.email}`}
          style={{ fontSize: '16px', color: '#d7ff00', textDecoration: 'none', display: 'block', marginBottom: '20px' }}
        >
          {profile.email} →
        </a>
        <div style={{ display: 'flex', gap: '20px' }}>
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '12px', color: '#b3b3ad', textDecoration: 'none' }}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
