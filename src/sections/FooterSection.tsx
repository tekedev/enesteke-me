import React from 'react';
import { profile } from '../data/portfolioData';
import styles from './FooterSection.module.css';

export default function FooterSection() {
  const github = profile.socials.find((s) => s.name === 'GitHub')?.url || 'https://github.com/tekedev';
  const linkedin = profile.socials.find((s) => s.name === 'LinkedIn')?.url || 'https://linkedin.com/in/enesteke';

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        {/* Main Closing Call to Action */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#73736e', marginBottom: '20px', textTransform: 'uppercase' }}>
            INITIATE DISCUSSION / COLLABORATION
          </div>
          <h2 className={styles.headline}>
            HAVE A SYSTEM <br />
            WORTH BUILDING? <br />
            <a href={`mailto:${profile.email}`} style={{ color: '#d7ff00', textDecoration: 'none', borderBottom: '2px solid #d7ff00' }}>
              LET’S TALK.
            </a>
          </h2>
        </div>

        {/* Minimal Direct Contact & Social Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line-secondary)', paddingTop: '32px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.15em', marginBottom: '8px' }}>
              DIRECT EMAIL
            </div>
            <a href={`mailto:${profile.email}`} style={{ fontSize: '14px', color: '#f5f5f2', textDecoration: 'none', letterSpacing: '0.1em' }}>
              {profile.email}
            </a>
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            <a href={github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#b3b3ad', textDecoration: 'none', letterSpacing: '0.15em' }}>
              GITHUB ↗
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#b3b3ad', textDecoration: 'none', letterSpacing: '0.15em' }}>
              LINKEDIN ↗
            </a>
          </div>

          <div style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.15em' }}>
            © {new Date().getFullYear()} ENES TEKE
          </div>
        </div>
      </div>
    </footer>
  );
}
