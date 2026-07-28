import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import styles from './WorksSection.module.css';

export default function WorksSection() {
  const featured = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  useEffect(() => {
    if (isMobile) return;

    const update = () => {
      rafRef.current = null;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = -rect.top / scrollableHeight;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  const rawIndex = scrollProgress * (featured.length - 1);
  const activeIndex = Math.round(rawIndex);

  // Short 1-sentence descriptions (max 100 chars)
  const shortDescriptions: Record<string, string> = {
    'nexus-ai': 'Autonomous multi-channel video production and content orchestration engine.',
    'hareki-dna': 'Turns brand websites into personalized editorial content systems.',
    'teke-app': 'Motion typography and automated multi-format video creation platform.',
    'bist-engine': 'High-frequency stock data collector and real-time whale movement monitor.',
  };

  return (
    <section id="works" ref={sectionRef} className={styles.worksSection}>
      <div className={styles.worksSticky}>
        {/* Top Section Header */}
        <div className={styles.headerRow}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '8px' }}>
              SELECTED WORK / SHOWCASE CORRIDOR
            </div>
            <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', margin: 0, lineHeight: 1.05 }}>
              PRODUCTIONS & <span style={{ color: '#d7ff00' }}>AI ENGINES</span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ fontSize: '12px', color: '#d7ff00', letterSpacing: '0.2em' }}>
              [0{activeIndex + 1} / 04]
            </div>
            <Link
              to="/work"
              style={{
                fontSize: '12px',
                color: '#d7ff00',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                borderBottom: '1px solid #d7ff00',
                paddingBottom: '2px',
              }}
            >
              ALL 12 PROJECTS →
            </Link>
          </div>
        </div>

        {/* 3D Showcase Stage */}
        <div className={styles.showcaseStage}>
          {featured.map((project, index) => {
            const distance = index - rawIndex;
            const absDist = Math.abs(distance);

            // Compute 3D Transform Properties
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;

            if (!isMobile) {
              if (distance < 0) {
                translateX = distance * 55;
                translateZ = Math.max(-400, distance * 220);
                rotateY = Math.min(25, -distance * 20);
                scale = Math.max(0.65, 1 - absDist * 0.25);
                opacity = Math.max(0, 1 - absDist * 0.7);
              } else if (distance > 0) {
                translateX = distance * 55;
                translateZ = Math.max(-400, -distance * 220);
                rotateY = Math.max(-25, -distance * 20);
                scale = Math.max(0.65, 1 - absDist * 0.25);
                opacity = Math.max(0, 1 - absDist * 0.7);
              }
            }

            const cardStyle: React.CSSProperties = isMobile
              ? {}
              : {
                  transform: `translate3d(${translateX}vw, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  pointerEvents: absDist < 0.4 ? 'auto' : 'none',
                  zIndex: Math.round(10 - absDist * 2),
                };

            return (
              <article
                key={project.id}
                data-project-slug={project.slug}
                className={styles.projectCard}
                style={cardStyle}
              >
                {/* Left Metadata & Title Header */}
                <div data-project-header={project.slug} className={styles.projectCopy}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#73736e', letterSpacing: '0.2em' }}>
                      [{project.number}]
                    </span>
                    <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                      [{project.category}]
                    </span>
                  </div>

                  <h3 className={styles.projectTitle}>
                    {project.title}
                  </h3>

                  <p style={{ color: '#b3b3ad', fontSize: '13px', lineHeight: 1.5, marginBottom: '24px', maxWidth: '280px' }}>
                    {shortDescriptions[project.slug] || project.description}
                  </p>

                  <Link to={`/work/${project.slug}`} className={styles.ctaButton}>
                    VIEW CASE <span style={{ color: '#d7ff00' }}>↗</span>
                  </Link>
                </div>

                {/* Right Visual Panel (Occupies 80% Panel Area with Rich Graphics) */}
                <div className={styles.visualPanel}>
                  {index === 0 && (
                    /* NEXUS: Layered video frame strips & thumbnail surfaces */
                    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #141418 0%, #050507 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.2em' }}>NEXUS // MEDIA PIPELINE</span>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>4K @ 60FPS</span>
                      </div>
                      
                      {/* Layered Video Frames Graphic */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '20px 0', position: 'relative' }}>
                        <div style={{ height: '220px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                          <span style={{ fontSize: '10px', color: '#73736e' }}>FRAME 01</span>
                          <span style={{ fontSize: '12px', color: '#f5f5f2' }}>RAW SCRIPT</span>
                        </div>
                        <div style={{ height: '240px', background: 'rgba(215,255,0,0.05)', border: '1px solid #d7ff00', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px', transform: 'translateY(-10px)' }}>
                          <span style={{ fontSize: '10px', color: '#d7ff00' }}>FRAME 02</span>
                          <span style={{ fontSize: '12px', color: '#f5f5f2' }}>AI SYNTHESIS</span>
                        </div>
                        <div style={{ height: '220px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                          <span style={{ fontSize: '10px', color: '#73736e' }}>FRAME 03</span>
                          <span style={{ fontSize: '12px', color: '#f5f5f2' }}>RENDERED OUTPUT</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>AUTOMATED DISTRIBUTION ENGINE</span>
                        <span style={{ fontSize: '10px', color: '#d7ff00' }}>RENDER ACTIVE ✓</span>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    /* HAREKI: Editorial Page Mockup Surfaces & Content Blocks */
                    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #121612 0%, #050705 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.2em' }}>HAREKI // EDITORIAL SURFACES</span>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>VECTOR RAG</span>
                      </div>

                      {/* Editorial Canvas Graphic */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', margin: '20px 0', alignItems: 'center' }}>
                        <div style={{ height: '220px', border: '1px solid rgba(245,245,242,0.2)', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div style={{ fontSize: '20px', fontFamily: 'var(--font-family-sans)', fontWeight: 300, color: '#f5f5f2', lineHeight: 1.1 }}>BRAND SYSTEM ARCHITECTURE</div>
                          <div style={{ fontSize: '10px', color: '#73736e' }}>EXTRACTED EDITORIAL DNA</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ height: '100px', border: '1px solid #d7ff00', background: 'rgba(215,255,0,0.06)', padding: '16px', borderRadius: '2px' }}>
                            <div style={{ fontSize: '11px', color: '#d7ff00' }}>CONTENT MATRIX</div>
                          </div>
                          <div style={{ height: '100px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '2px' }}>
                            <div style={{ fontSize: '11px', color: '#b3b3ad' }}>DYNAMIC PUBLISHING</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>HAREKI.COM</span>
                        <span style={{ fontSize: '10px', color: '#d7ff00' }}>SYSTEM ONLINE ✓</span>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    /* TEKE.APP: Spatial Media Planes */
                    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #181512 0%, #070605 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.2em' }}>TEKE.APP // MOTION STUDIO</span>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>MULTI-FORMAT</span>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                        <div style={{ width: '130px', height: '220px', border: '1px solid #d7ff00', background: 'rgba(215,255,0,0.05)', borderRadius: '2px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '10px', color: '#d7ff00' }}>9:16 VERTICAL</span>
                        </div>
                        <div style={{ width: '180px', height: '180px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.6)', borderRadius: '2px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '10px', color: '#f5f5f2' }}>1:1 SQUARE</span>
                        </div>
                        <div style={{ width: '200px', height: '130px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '10px', color: '#73736e' }}>16:9 WIDE</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>TEKE.APP</span>
                        <span style={{ fontSize: '10px', color: '#d7ff00' }}>CREATIVE STUDIO ✓</span>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    /* BIST: Order Flow Ribbons & Data Surface */
                    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'radial-gradient(circle at center, #101816 0%, #040807 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.2em' }}>BIST // ORDER FLOW RIBBONS</span>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>WEBSOCKET REALTIME</span>
                      </div>

                      <div style={{ height: '220px', border: '1px solid rgba(215,255,0,0.3)', background: 'rgba(0,0,0,0.7)', borderRadius: '2px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '18px', color: '#f5f5f2', fontWeight: 300 }}>HIGH-SPEED DATA STREAM</span>
                          <span style={{ fontSize: '12px', color: '#d7ff00' }}>TELEGRAM BOT ACTIVE</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                          <div style={{ height: '40px', background: 'rgba(215,255,0,0.15)', borderTop: '2px solid #d7ff00' }} />
                          <div style={{ height: '60px', background: 'rgba(215,255,0,0.25)', borderTop: '2px solid #d7ff00' }} />
                          <div style={{ height: '35px', background: 'rgba(215,255,0,0.1)', borderTop: '2px solid #d7ff00' }} />
                          <div style={{ height: '75px', background: 'rgba(215,255,0,0.35)', borderTop: '2px solid #d7ff00' }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '10px', color: '#73736e' }}>FINTECH DATA ENGINE</span>
                        <span style={{ fontSize: '10px', color: '#d7ff00' }}>MONITOR ACTIVE ✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
