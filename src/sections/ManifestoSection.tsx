import React, { useEffect, useRef, useState } from 'react';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.2);
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
            const progress = Math.max(0.1, Math.min(1, currentScroll / totalScroll));
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

  const line1Opacity = isReducedMotion ? 1 : Math.min(1, 0.35 + scrollProgress * 2.2);
  const line2Opacity = isReducedMotion ? 0.75 : Math.max(0.35, Math.min(1, (scrollProgress - 0.15) * 2.2));
  const line3Opacity = isReducedMotion ? 0.75 : Math.max(0.26, Math.min(1, (scrollProgress - 0.35) * 2.2));

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#000000',
        minHeight: isReducedMotion ? 'auto' : 'clamp(100svh, 110svh, 125svh)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'calc(var(--header-height) + 40px) var(--page-padding) 60px',
        fontFamily: "var(--font-family-mono)",
        scrollMarginTop: 'calc(var(--header-height) + 24px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#73736e', marginBottom: '24px', textTransform: 'uppercase' }}>
          ENGINEERING PRINCIPLES & MANIFESTO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            data-manifesto-line="1"
            className="isActive"
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: `rgba(245, 245, 242, ${line1Opacity})`,
              margin: 0,
              textTransform: 'uppercase',
              transition: isReducedMotion ? 'none' : 'color 0.3s ease',
            }}
          >
            GOOD SYSTEMS DO MORE <br />
            THAN GENERATE OUTPUT.
          </p>

          <p
            data-manifesto-line="2"
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: `rgba(245, 245, 242, ${line2Opacity})`,
              margin: 0,
              textTransform: 'uppercase',
              transition: isReducedMotion ? 'none' : 'color 0.3s ease',
            }}
          >
            THEY OBSERVE, REASON,
          </p>

          <p
            data-manifesto-line="3"
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: 'clamp(2.2rem, 5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: isReducedMotion || line3Opacity > 0.7 ? '#d7ff00' : `rgba(245, 245, 242, ${line3Opacity})`,
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
