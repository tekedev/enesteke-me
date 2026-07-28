import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Left Brand */}
          <Link to="/" className={styles.brand}>
            ET <span style={{ color: '#73736e', margin: '0 4px' }}>/</span> ENES TEKE
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.navLinks} aria-label="Main Navigation">
            <Link to="/work" className={isCurrent('/work') ? styles.activeLink : styles.link}>
              WORK
            </Link>
            <Link to="/about" className={isCurrent('/about') ? styles.activeLink : styles.link}>
              ABOUT
            </Link>
            <Link to="/contact" className={isCurrent('/contact') ? styles.activeLink : styles.link}>
              CONTACT
            </Link>
          </nav>

          {/* Desktop Start a Project CTA Button */}
          <div className={styles.ctaWrapper}>
            <Link to="/contact" className={styles.ctaButton}>
              START A PROJECT <span style={{ color: '#d7ff00' }}>↗</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            MENU ☰
          </button>
        </div>
      </header>

      {/* Accessible Full-screen Mobile Menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
