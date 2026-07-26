import { useState, useEffect } from 'react';
import SlotButton from './SlotButton';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`Header__container ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="Header__inner">
        {/* Brand Logo */}
        <div className="Header__logo">
          <a href="#top" className="logo-text">
            TEKEDEV
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="Header__nav">
          <a href="#work" className="Header__nav_item">
            <span>Works</span>
          </a>
          <a href="#skills" className="Header__nav_item">
            <span>Capabilities</span>
          </a>
          <a href="#about" className="Header__nav_item">
            <span>Mission</span>
          </a>
          <a href="#contact" className="Header__nav_item">
            <span>Contact</span>
          </a>
        </nav>

        {/* Right CTA */}
        <div className="Header__right_controls">
          <SlotButton
            text="Contact / Hire"
            href="#contact"
            className="Header__contact_btn"
          />
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={e => e.stopPropagation()}>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Works</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Mission</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
