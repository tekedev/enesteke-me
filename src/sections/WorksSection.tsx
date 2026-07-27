import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import styles from './WorksSection.module.css';

export default function WorksSection() {
  const featured = projects.slice(0, 4);

  return (
    <section id="works" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '12px' }}>
              SELECTED WORK / 04 FEATURED SCENES
            </div>
            <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', margin: 0, lineHeight: 1.05 }}>
              PRODUCTIONS & <br />
              <span style={{ color: '#d7ff00' }}>AI ENGINES</span>
            </h2>
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
            VIEW ALL 12 PROJECTS →
          </Link>
        </div>

        {/* 4 Distinct Visual Project Scenes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {featured.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                data-project-slug={project.slug}
                className={styles.projectScene}
              >
                {/* Top Metadata & Title Header */}
                <div data-project-header={project.slug} className={styles.projectHeader}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <span style={{ fontSize: '12px', color: '#73736e', letterSpacing: '0.2em' }}>
                      [{project.number} / {project.year}]
                    </span>
                    <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                      [{project.category}]
                    </span>
                  </div>

                  <h3 className={styles.projectTitle}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#d7ff00', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                    {project.subtitle}
                  </div>
                </div>

                {/* Asymmetric Content Grid */}
                <div className={isEven ? styles.gridNormal : styles.gridReverse}>
                  <div className={styles.copyArea} style={{ order: isEven ? 1 : 2 }}>
                    <p style={{ color: '#b3b3ad', fontSize: '14px', lineHeight: 1.75, maxWidth: '520px', marginBottom: '32px' }}>
                      {project.description}
                    </p>
                    <div>
                      <Link to={`/work/${project.slug}`} className={styles.ctaButton}>
                        VIEW CASE <span style={{ color: '#d7ff00' }}>↗</span>
                      </Link>
                    </div>
                  </div>

                  {/* 4 Distinct Visual Visualizations */}
                  <div className={styles.visualBox} style={{ order: isEven ? 2 : 1 }}>
                    {index === 0 && (
                      /* Variation 1: Terminal / Command Output View */
                      <>
                        <div style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                          ➜ [NEXUS_CORE_v2.5] EXECUTION LOG
                        </div>
                        <div style={{ fontSize: '11px', color: '#b3b3ad', fontFamily: 'var(--font-family-mono)', lineHeight: 1.6, margin: '16px 0' }}>
                          <div>[00:01] Initializing 260+ account publishing cluster...</div>
                          <div>[00:02] Gemini 2.5 Pro multi-modal script generated</div>
                          <div>[00:04] FFmpeg rendering 1080x1920 video at 60fps [OK]</div>
                          <div style={{ color: '#d7ff00' }}>[00:06] Playwright distribution active ✓</div>
                        </div>
                        <div style={{ fontSize: '10px', color: '#73736e', textAlign: 'right' }}>
                          STATUS: LIVE PRODUCTION ENGINE
                        </div>
                      </>
                    )}

                    {index === 1 && (
                      /* Variation 2: Architecture Data Flow Diagram with Prominent Connections */
                      <>
                        <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}>
                          <span>// EDITORIAL DNA PIPELINE FLOW</span>
                          <span style={{ color: '#d7ff00' }}>4 PIPELINE STAGES</span>
                        </div>
                        <div className={styles.pipelineCanvas}>
                          {/* SVG Flow Arrows Overlay */}
                          <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
                            viewBox="0 0 400 240"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Top Stage 01 Arrow */}
                            <path d="M 140 40 L 250 40" stroke="rgba(245, 245, 242, 0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                            {/* Vertical Right Arrow */}
                            <path d="M 320 70 L 320 170" stroke="rgba(245, 245, 242, 0.35)" strokeWidth="1.5" />
                            {/* Bottom Active Output Arrow */}
                            <path d="M 250 200 L 140 200" stroke="#d7ff00" strokeWidth="1.5" strokeDasharray="4 4" />
                          </svg>

                          <div className={styles.pipelineNode}>
                            <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[INPUT]</span>
                            WEBSITE URL
                          </div>
                          <div className={styles.pipelineNode} style={{ justifySelf: 'end' }}>
                            <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[STAGE 01]</span>
                            CONTENT CRAWLER
                          </div>
                          <div className={styles.pipelineNode}>
                            <span style={{ color: '#73736e', fontSize: '10px', display: 'block' }}>[STAGE 02]</span>
                            VECTOR RAG
                          </div>
                          <div className={styles.pipelineNodeActive} style={{ justifySelf: 'end' }}>
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
                      /* Variation 3: Metric & Spec Sheet View */
                      <>
                        <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.15em' }}>
                          // SOCIAL MEDIA STUDIO METRICS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
                          <div>
                            <div style={{ fontSize: '24px', color: '#f5f5f2', fontWeight: 300 }}>100%</div>
                            <div style={{ fontSize: '10px', color: '#73736e' }}>AUTOMATED RENDERING</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '24px', color: '#d7ff00', fontWeight: 300 }}>AI MULTI-MODEL</div>
                            <div style={{ fontSize: '10px', color: '#73736e' }}>TEXT + VISION PIPELINE</div>
                          </div>
                        </div>
                        <div style={{ fontSize: '10px', color: '#73736e' }}>
                          PLATFORM: TEKE.APP
                        </div>
                      </>
                    )}

                    {index === 3 && (
                      /* Variation 4: High-Speed Order Flow Stream */
                      <>
                        <div style={{ fontSize: '10px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                          // BIST WHALE ORDER FLOW MONITOR
                        </div>
                        <div style={{ fontSize: '11px', color: '#b3b3ad', lineHeight: 1.6, margin: '16px 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                            <span>THYAO.IS</span>
                            <span style={{ color: '#d7ff00' }}>+₺4.2M WHALE BUY</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
