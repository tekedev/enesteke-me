import React, { useEffect, useRef, useState } from 'react';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalScroll = rect.height - windowHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const line1Opacity = isReducedMotion ? 1 : Math.min(1, scrollProgress * 2.5);
  const line2Opacity = isReducedMotion ? 1 : Math.max(0.2, Math.min(1, (scrollProgress - 0.25) * 2.5));
  const line3Opacity = isReducedMotion ? 1 : Math.max(0.2, Math.min(1, (scrollProgress - 0.5) * 2.5));

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#000000',
        minHeight: isReducedMotion ? 'auto' : 'clamp(105svh, 115svh, 130svh)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'calc(var(--header-height) + 40px) var(--page-padding) 80px',
        fontFamily: "var(--font-family-mono)",
        scrollMarginTop: 'calc(var(--header-height) + 24px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#73736e', marginBottom: '32px', textTransform: 'uppercase' }}>
          ENGINEERING PRINCIPLES & MANIFESTO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: `rgba(245, 245, 242, ${0.2 + line1Opacity * 0.8})`,
              margin: 0,
              textTransform: 'uppercase',
              transition: isReducedMotion ? 'none' : 'color 0.3s ease',
            }}
          >
            GOOD SYSTEMS DO MORE <br />
            THAN GENERATE OUTPUT.
          </p>

          <p
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: `rgba(245, 245, 242, ${0.2 + line2Opacity * 0.8})`,
              margin: 0,
              textTransform: 'uppercase',
              transition: isReducedMotion ? 'none' : 'color 0.3s ease',
            }}
          >
            THEY OBSERVE, REASON,
          </p>

          <p
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: isReducedMotion || line3Opacity > 0.6 ? '#d7ff00' : 'rgba(245, 245, 242, 0.3)',
              margin: 0,
              textTransform: 'uppercase',
              transition: isReducedMotion ? 'none' : 'color 0.3s ease',
            }}
          >
            ACT AND IMPROVE.
          </p>
        </div>
      </div>
    </section>
  );
}
