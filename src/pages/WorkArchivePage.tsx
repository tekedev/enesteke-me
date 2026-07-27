import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import SEO from '../components/common/SEO';

export default function WorkArchivePage() {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'AI SYSTEMS', 'FULL-STACK', 'FINTECH', 'TOOLS', 'CREATIVE'];

  const filtered = filter === 'ALL'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <>
      <SEO
        title="Work Archive — Enes Teke"
        description="A comprehensive selection of products, experiments, AI agent workflows, and scalable systems engineered by Enes Teke."
        url="https://enesteke.me/work"
      />
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: '#000000',
          minHeight: '100vh',
          padding: '140px var(--page-padding) var(--section-gap)',
          fontFamily: "var(--font-family-mono)",
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#73736e', marginBottom: '20px' }}>
              WORK ARCHIVE / 12 VERIFIED SYSTEMS
            </div>
            <h1
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "var(--font-display)",
                fontWeight: 300,
                color: '#f5f5f2',
                textTransform: 'uppercase',
                lineHeight: 1.02,
                marginBottom: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              SELECTED WORK, <br />
              <span style={{ color: '#d7ff00' }}>AI AGENTS & ENGINES</span>
            </h1>
            <p style={{ color: '#b3b3ad', fontSize: '15px', maxWidth: '650px', lineHeight: 1.7 }}>
              Production SaaS platforms, multi-model AI workflows, real-time stock market data engines, and WebGL applications.
            </p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '60px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '24px' }}>
            {categories.map((cat) => {
              const count = cat === 'ALL' ? projects.length : projects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: filter === cat ? '#d7ff00' : 'transparent',
                    color: filter === cat ? '#000000' : '#b3b3ad',
                    border: filter === cat ? '1px solid #d7ff00' : '1px solid rgba(255,255,255,0.12)',
                    padding: '6px 18px',
                    fontSize: '11px',
                    fontFamily: "var(--font-family-mono)",
                    cursor: 'pointer',
                    borderRadius: '2px',
                    fontWeight: filter === cat ? 600 : 400,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat} [{count}]
                </button>
              );
            })}
          </div>

          {/* Large Editorial Rows Presentation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 2.5fr 3.5fr 1.5fr',
                  gap: '30px',
                  alignItems: 'center',
                  padding: '48px 0',
                  borderTop: '1px solid var(--line-secondary)',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Number & Year */}
                <div>
                  <div style={{ fontSize: '16px', color: '#d7ff00', fontWeight: 600, marginBottom: '4px' }}>
                    {project.number}
                  </div>
                  <div style={{ fontSize: '11px', color: '#73736e' }}>
                    {project.year}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: '32px', color: '#f5f5f2', fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
                    {project.title}
                  </h2>
                  <span style={{ fontSize: '12px', color: '#73736e', marginTop: '6px', display: 'block' }}>
                    {project.subtitle}
                  </span>
                </div>

                {/* Description & Tech Pills */}
                <div>
                  <p style={{ fontSize: '13px', color: '#b3b3ad', lineHeight: 1.6, marginBottom: '12px', margin: 0 }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {project.technologies.slice(0, 5).map((tech, i) => (
                      <span key={i} style={{ fontSize: '10px', color: '#73736e', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '2px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', fontSize: '11px', color: '#d7ff00', border: '1px solid rgba(215, 255, 0, 0.3)', padding: '6px 14px', borderRadius: '2px' }}>
                    INSPECT ARCHITECTURE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
