import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

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
      <header className={styles.header}>
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

        <nav className={styles.desktopNav}>
          <Link to="/work">01 / WORK</Link>
          <Link to="/about">02 / ABOUT</Link>
          <a href="/#capabilities">03 / SYSTEMS</a>
          <Link to="/contact">04 / CONTACT</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className={styles.desktopClock}>{time}</span>
          <Link to="/contact" className={styles.desktopContactBtn}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d7ff00' }} />
            CONTACT / HIRE
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle Mobile Menu"
            className={styles.mobileMenuTrigger}
          >
            {mobileOpen ? 'CLOSE ✕' : 'MENU ☰'}
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
