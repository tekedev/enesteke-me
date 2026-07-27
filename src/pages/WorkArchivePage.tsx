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
                letterSpacing: '-0.03em',
              }}
            >
              SELECTED WORK, <br />
              <span style={{ color: '#d7ff00' }}>AI AGENTS & ENGINES</span>
            </h1>
            <p style={{ color: '#b3b3ad', fontSize: '15px', maxWidth: '650px', lineHeight: 1.7 }}>
              Production SaaS platforms, multi-model AI workflows, real-time stock market data engines, and WebGL applications.
            </p>
          </div>

          {/* Typographic Minimal Filters */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              marginBottom: '60px',
              borderBottom: '1px solid var(--line-secondary)',
              paddingBottom: '20px',
              fontSize: '11px',
            }}
          >
            {categories.map((cat) => {
              const count = cat === 'ALL' ? projects.length : projects.filter(p => p.category === cat).length;
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#d7ff00' : '#73736e',
                    fontFamily: "var(--font-family-mono)",
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    padding: '4px 0',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                    borderBottom: isActive ? '2px solid #d7ff00' : '2px solid transparent',
                  }}
                >
                  {cat} <span style={{ color: isActive ? '#f5f5f2' : '#454541', marginLeft: '4px' }}>[{count}]</span>
                </button>
              );
            })}
          </div>

          {/* Alche Studio Inspired Editorial Project Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: 'clamp(180px, 22vw, 340px)',
                  padding: '40px 0',
                  borderTop: '1px solid var(--line-secondary)',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="editorial-project-row"
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '16px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                {/* Top Metadata Line */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: '#73736e', letterSpacing: '0.15em' }}>
                    [{project.number} / {project.year}]
                  </span>
                  <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                    [{project.category}]
                  </span>
                </div>

                {/* Giant Editorial Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: 'clamp(2.8rem, 6vw, 7.5rem)',
                        fontWeight: 300,
                        lineHeight: 0.9,
                        letterSpacing: '-0.04em',
                        color: '#f5f5f2',
                        textTransform: 'uppercase',
                        margin: 0,
                        transition: 'color 0.2s ease',
                      }}
                      className="project-row-title"
                    >
                      {project.title}
                    </h2>
                    <span style={{ fontSize: '13px', color: '#b3b3ad', marginTop: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {project.subtitle}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                    VIEW PROJECT <span style={{ fontSize: '16px' }}>↗</span>
                  </div>
                </div>

                {/* Bottom Short Description Line */}
                <div style={{ marginTop: '20px', maxWidth: '750px', color: '#73736e', fontSize: '12px', lineHeight: 1.6 }}>
                  {project.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
