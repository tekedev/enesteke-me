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
          padding: '120px var(--page-padding) var(--section-gap)',
          fontFamily: "var(--font-family-mono)",
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '16px' }}>
              WORK / ARCHIVE
            </div>
            <h1
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "var(--font-display)",
                fontWeight: 300,
                color: '#f5f5f2',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                marginBottom: '24px',
              }}
            >
              PRODUCTS, EXPERIMENTS <br />
              <span style={{ color: '#b3b3ad' }}>AND AI SYSTEMS.</span>
            </h1>
            <p style={{ color: '#73736e', fontSize: '14px', maxWidth: '600px', lineHeight: 1.6 }}>
              A selection of 12 verified production systems, SaaS applications, and data engines built across AI automation, FinTech, and WebGL.
            </p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map((cat) => {
              const count = cat === 'ALL' ? projects.length : projects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: filter === cat ? '#d7ff00' : 'transparent',
                    color: filter === cat ? '#000000' : '#b3b3ad',
                    border: filter === cat ? '1px solid #d7ff00' : '1px solid rgba(255,255,255,0.15)',
                    padding: '6px 14px',
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

          {/* Archive Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '30px',
            }}
          >
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#080808',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d7ff00';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '11px', color: '#73736e' }}>
                    <span>{project.number}</span>
                    <span style={{ color: '#d7ff00' }}>{project.year}</span>
                  </div>

                  <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: '24px', color: '#f5f5f2', fontWeight: 400, marginBottom: '6px' }}>
                    {project.title}
                  </h2>

                  <div style={{ fontSize: '11px', color: '#b3b3ad', marginBottom: '16px' }}>
                    {project.subtitle}
                  </div>

                  <p style={{ fontSize: '12px', color: '#73736e', lineHeight: 1.6, marginBottom: '24px' }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} style={{ fontSize: '10px', color: '#b3b3ad', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '2px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: '11px', color: '#d7ff00', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    VIEW DETAILS →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
