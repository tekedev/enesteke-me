import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import styles from './WorksSection.module.css';

export default function WorksSection() {
  const featured = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = -rect.top / scrollableHeight;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const rawIndex = scrollProgress * (featured.length - 1);
  const activeIndex = Math.round(rawIndex);

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
            {/* Scroll Step Indicator */}
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
                // Previous Projects (drifted left & back)
                translateX = distance * 55;
                translateZ = Math.max(-400, distance * 220);
                rotateY = Math.min(25, -distance * 20);
                scale = Math.max(0.65, 1 - absDist * 0.25);
                opacity = Math.max(0, 1 - absDist * 0.7);
              } else if (distance > 0) {
                // Next Projects (drifted right & back)
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
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
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

                  <div style={{ fontSize: '12px', color: '#d7ff00', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                    {project.subtitle}
                  </div>

                  <p style={{ color: '#b3b3ad', fontSize: '13px', lineHeight: 1.6, marginBottom: '28px', maxWidth: '320px' }}>
                    {project.description}
                  </p>

                  <Link to={`/work/${project.slug}`} className={styles.ctaButton}>
                    VIEW CASE <span style={{ color: '#d7ff00' }}>↗</span>
                  </Link>
                </div>

                {/* Right Visual Panel Showcase */}
                <div className={styles.visualPanel}>
                  {index === 0 && (
                    /* NEXUS: Layered video frame strips & automated multi-model pipeline planes */
                    <>
                      <div style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                        ➜ [NEXUS_CORE_v2.5] MULTI-MODEL PIPELINE
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', margin: '20px 0', height: '100%', alignItems: 'center' }}>
                        <div style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.6)', padding: '16px', borderRadius: '2px' }}>
                          <div style={{ fontSize: '11px', color: '#f5f5f2', marginBottom: '8px' }}>GEMINI 2.5 PRO SCRIPT GENERATION</div>
                          <div style={{ fontSize: '10px', color: '#73736e', fontFamily: 'var(--font-family-mono)' }}>[00:02] Multi-modal prompt expansion active</div>
                          <div style={{ fontSize: '10px', color: '#d7ff00', marginTop: '8px' }}>FFmpeg 1080x1920 @ 60fps [OK]</div>
                        </div>
                        <div style={{ border: '1px solid rgba(215,255,0,0.3)', background: 'rgba(215,255,0,0.04)', padding: '16px', borderRadius: '2px' }}>
                          <div style={{ fontSize: '28px', fontWeight: 300, color: '#f5f5f2' }}>260+</div>
                          <div style={{ fontSize: '10px', color: '#d7ff00' }}>ACCOUNTS DISTRIBUTED</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#73736e', textAlign: 'right' }}>
                        STATUS: LIVE PRODUCTION ENGINE
                      </div>
                    </>
                  )}

                  {index === 1 && (
                    /* HAREKI: Editorial Content Surfaces & Web DNA Flow Planes */
                    <>
                      <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}>
                        <span>// EDITORIAL DNA PIPELINE FLOW</span>
                        <span style={{ color: '#d7ff00' }}>4 PIPELINE STAGES</span>
                      </div>
                      <div className={styles.pipelineCanvas}>
                        {/* SVG Flow Arrows Overlay */}
                        <svg
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
                          viewBox="0 0 400 200"
                          preserveAspectRatio="none"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <marker id="pipeline-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                              <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(245,245,242,.42)" />
                            </marker>
                            <marker id="pipeline-arrow-active" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                              <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(215,255,0,.78)" />
                            </marker>
                          </defs>
                          {/* Path 1: WEBSITE URL -> CONTENT CRAWLER */}
                          <path d="M 140 40 L 235 40" stroke="rgba(245, 245, 242, 0.34)" strokeWidth="1.25" strokeDasharray="5 7" markerEnd="url(#pipeline-arrow)" />
                          {/* Path 2: CONTENT CRAWLER -> VECTOR RAG */}
                          <path d="M 310 60 V 110 H 145 V 160" stroke="rgba(245, 245, 242, 0.34)" strokeWidth="1.25" markerEnd="url(#pipeline-arrow)" />
                          {/* Path 3: VECTOR RAG -> EDITORIAL DNA */}
                          <path d="M 145 165 L 235 165" stroke="rgba(215, 255, 0, 0.72)" strokeWidth="1.25" strokeDasharray="5 7" markerEnd="url(#pipeline-arrow-active)" />
                        </svg>

                        <div data-pipeline-step="1" className={styles.pipelineNode}>
                          <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[INPUT]</span>
                          WEBSITE URL
                        </div>
                        <div data-pipeline-step="2" className={styles.pipelineNode} style={{ justifySelf: 'end' }}>
                          <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[STAGE 01]</span>
                          CONTENT CRAWLER
                        </div>
                        <div data-pipeline-step="3" className={styles.pipelineNode}>
                          <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[STAGE 02]</span>
                          VECTOR RAG
                        </div>
                        <div data-pipeline-step="4" className={styles.pipelineNodeActive} style={{ justifySelf: 'end' }}>
                          <span style={{ color: '#d7ff00', opacity: 0.8, fontSize: '10px', display: 'block' }}>[OUTPUT]</span>
                          EDITORIAL DNA
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#73736e', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                        <span>SAAS PLATFORM: HAREKI.COM</span>
                        <span style={{ color: '#d7ff00' }}>ACTIVE PIPELINE ✓</span>
                      </div>
                    </>
                  )}

                  {index === 2 && (
                    /* TEKE.APP: Motion Typography & Spatial Social Media Panels */
                    <>
                      <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.15em' }}>
                        // SOCIAL MEDIA STUDIO METRICS
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
                        <div style={{ border: '1px solid rgba(255,255,255,0.12)', padding: '20px', borderRadius: '2px' }}>
                          <div style={{ fontSize: '32px', color: '#f5f5f2', fontWeight: 300 }}>100%</div>
                          <div style={{ fontSize: '10px', color: '#73736e', marginTop: '4px' }}>AUTOMATED RENDERING</div>
                        </div>
                        <div style={{ border: '1px solid rgba(215,255,0,0.3)', padding: '20px', borderRadius: '2px', background: 'rgba(215,255,0,0.03)' }}>
                          <div style={{ fontSize: '32px', color: '#d7ff00', fontWeight: 300 }}>AI VISION</div>
                          <div style={{ fontSize: '10px', color: '#73736e', marginTop: '4px' }}>MULTI-MODEL PIPELINE</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#73736e' }}>
                        PLATFORM: TEKE.APP
                      </div>
                    </>
                  )}

                  {index === 3 && (
                    /* BIST: Streaming Order Flow Ribbons & High-Speed Data Stream */
                    <>
                      <div style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                        // BIST WHALE ORDER FLOW MONITOR
                      </div>
                      <div style={{ fontSize: '11px', color: '#b3b3ad', lineHeight: 1.8, margin: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                          <span>THYAO.IS</span>
                          <span style={{ color: '#d7ff00' }}>+₺4.2M WHALE BUY</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                          <span>ASELS.IS</span>
                          <span style={{ color: '#d7ff00' }}>+₺2.8M ACCUMULATION</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#73736e' }}>
                        ENGINE: WEBSOCKET + TELEGRAM BOT
                      </div>
                    </>
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
