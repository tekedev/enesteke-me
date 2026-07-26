import { motion } from 'motion/react';
import HeroGL from '../components/HeroGL';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero-fullscreen">
      {/* ═══ GRID OVERLAY (Alche Studio tarzı ızgara deseni) ═══ */}
      <div className="hero-grid-overlay" />

      {/* ═══ THREE.JS 3D SCENE ═══ */}
      <HeroGL />

      {/* ═══ MASSIVE TEKEDEV TEXT ═══ */}
      <div className="hero-massive-text">
        <motion.h1
          className="hero-logo-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          TEKEDEV
        </motion.h1>
      </div>

      {/* ═══ OVERLAY UI (Metin + Butonlar) ═══ */}
      <div className="hero-overlay-ui">
        {/* Sol alt: Açıklama */}
        <motion.div
          className="hero-bottom-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="hero-tagline">
            Full-Stack Developer & AI Systems Architect
          </p>
          <p className="hero-sub">
            Autonomous AI Pipelines · FinTech Intelligence · Creative Engineering
          </p>
        </motion.div>

        {/* Sağ alt: Stats / Debug Panel (Alche tweakpane tarzı) */}
        <motion.div
          className="hero-debug-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="debug-title">System.stats</div>
          <div className="debug-row">
            <span className="debug-label">projects</span>
            <span className="debug-value">30</span>
          </div>
          <div className="debug-row">
            <span className="debug-label">tech_stack</span>
            <span className="debug-value">25+</span>
          </div>
          <div className="debug-row">
            <span className="debug-label">ai_accounts</span>
            <span className="debug-value">260</span>
          </div>
          <div className="debug-row">
            <span className="debug-label">status</span>
            <span className="debug-value debug-value--green">AVAILABLE</span>
          </div>
        </motion.div>
      </div>

      {/* ═══ SCROLL TO EXPLORE (Dikey metin — sağ alt) ═══ */}
      <div className="hero-scroll-text">
        <span>scroll to explore →</span>
      </div>

      {/* ═══ NEWS / UPDATES OVERLAY (Sağ üst — Alche tarzı) ═══ */}
      <motion.div
        className="hero-news-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="news-title">RECENT</div>
        <div className="news-item">
          <span className="news-date">2026</span>
          <span className="news-text">30 Open Source Projects Released</span>
        </div>
        <div className="news-item">
          <span className="news-date">2026</span>
          <span className="news-text">NEXUS AI Command Center v4.0</span>
        </div>
        <div className="news-item">
          <span className="news-date">2025</span>
          <span className="news-text">WHALETRACE BIST Tracker Launch</span>
        </div>
      </motion.div>
    </section>
  );
}
