import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';

export default function WorksSection() {
  const featured = projects.slice(0, 4);

  return (
    <section
      id="works"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#000000',
        padding: '120px var(--page-padding)',
        fontFamily: "var(--font-family-mono)",
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '24px' }}>
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

        {/* 4 Varied Editorial Project Scenes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {featured.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                style={{
                  minHeight: 'clamp(320px, 55vw, 760px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '60px 0',
                  borderTop: '1px solid var(--line-secondary)',
                  position: 'relative',
                }}
              >
                {/* Top Metadata */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '12px', color: '#73736e', letterSpacing: '0.2em' }}>
                    [{project.number} / {project.year}]
                  </span>
                  <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                    [{project.category}]
                  </span>
                </div>

                {/* Asymmetric Content Layout */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isEven ? '1.2fr 1fr' : '1fr 1.2fr',
                    gap: '60px',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: 'clamp(2.6rem, 5.5vw, 6.5rem)',
                        fontWeight: 300,
                        lineHeight: 0.92,
                        letterSpacing: '-0.04em',
                        color: '#f5f5f2',
                        textTransform: 'uppercase',
                        margin: 0,
                        marginBottom: '20px',
                      }}
                    >
                      {project.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#d7ff00', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                      {project.subtitle}
                    </div>
                    <p style={{ color: '#b3b3ad', fontSize: '14px', lineHeight: 1.75, maxWidth: '520px', marginBottom: '32px' }}>
                      {project.description}
                    </p>
                    <Link
                      to={`/work/${project.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#d7ff00',
                        color: '#000000',
                        padding: '12px 24px',
                        fontSize: '11px',
                        fontFamily: "var(--font-family-mono)",
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textDecoration: 'none',
                        borderRadius: '2px',
                      }}
                    >
                      VIEW CASE ↗
                    </Link>
                  </div>

                  {/* Editorial System Diagram / Preview Box */}
                  <div
                    style={{
                      order: isEven ? 2 : 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '40px',
                      minHeight: '280px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '2px',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#73736e', letterSpacing: '0.2em' }}>
                      // SYSTEM ARCHITECTURE BREAKDOWN
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0' }}>
                      {(project.architectureDetails || []).slice(0, 3).map((detail, idx) => (
                        <div key={idx} style={{ fontSize: '12px', color: '#f5f5f2', lineHeight: 1.5, borderLeft: '2px solid #d7ff00', paddingLeft: '12px' }}>
                          {detail}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '10px', color: '#73736e', textAlign: 'right' }}>
                      ROLE: {project.role.toUpperCase()}
                    </div>
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
