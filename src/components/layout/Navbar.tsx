import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [time, setTime] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Istanbul', hour12: false });
      setTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '74px',
          padding: '0 var(--page-padding)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 9999,
          mixBlendMode: 'difference',
          fontFamily: "var(--font-family-mono)",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            to="/"
            style={{
              color: '#f5f5f2',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#d7ff00' }}>ET</span>
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#73736e' }}>/ ENES TEKE</span>
          </Link>
        </div>

        <nav className="desktop-nav" style={{ display: 'flex', gap: '36px', fontSize: '11px', letterSpacing: '0.15em' }}>
          <Link to="/work" style={{ color: '#b3b3ad', textDecoration: 'none', transition: 'color 0.2s' }}>01 / WORK</Link>
          <Link to="/about" style={{ color: '#b3b3ad', textDecoration: 'none', transition: 'color 0.2s' }}>02 / ABOUT</Link>
          <a href="/#capabilities" style={{ color: '#b3b3ad', textDecoration: 'none', transition: 'color 0.2s' }}>03 / SYSTEMS</a>
          <Link to="/contact" style={{ color: '#b3b3ad', textDecoration: 'none', transition: 'color 0.2s' }}>04 / CONTACT</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.1em' }} className="desktop-clock">
            {time}
          </span>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px',
              color: '#f5f5f2',
              textDecoration: 'none',
              fontSize: '11px',
              letterSpacing: '0.1em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d7ff00';
              e.currentTarget.style.color = '#d7ff00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#f5f5f2';
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d7ff00' }} />
            CONTACT / HIRE
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-trigger"
            style={{
              background: 'none',
              border: 'none',
              color: '#f5f5f2',
              fontFamily: "var(--font-family-mono)",
              fontSize: '12px',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            {mobileOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
