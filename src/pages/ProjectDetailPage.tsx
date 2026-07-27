import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import SEO from '../components/common/SEO';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          color: '#f5f5f2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "var(--font-family-mono)",
          zIndex: 3,
          position: 'relative',
        }}
      >
        <SEO title="Project Not Found — Enes Teke" />
        <h1 style={{ fontSize: '36px', color: '#d7ff00', marginBottom: '16px' }}>404 / PROJECT NOT FOUND</h1>
        <p style={{ color: '#73736e', marginBottom: '30px' }}>The requested system architecture slug does not exist.</p>
        <Link to="/work" style={{ color: '#f5f5f2', textDecoration: 'none', borderBottom: '1px solid #d7ff00', paddingBottom: '4px' }}>
          RETURN TO WORK ARCHIVE →
        </Link>
      </div>
    );
  }

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <SEO
        title={`${project.title} — ${project.subtitle} | Enes Teke`}
        description={project.description}
        url={`https://enesteke.me/work/${project.slug}`}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: '#000000',
          minHeight: '100vh',
          padding: '120px var(--page-padding) var(--section-gap)',
          fontFamily: "var(--font-family-mono)",
          color: '#f5f5f2',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Top Nav Back Link */}
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => navigate('/work')}
              style={{
                background: 'none',
                border: 'none',
                color: '#d7ff00',
                fontFamily: "var(--font-family-mono)",
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              ← BACK TO ARCHIVE
            </button>
          </div>

          {/* Project Header */}
          <div style={{ marginBottom: '50px', borderBottom: '1px solid var(--line-secondary)', paddingBottom: '40px' }}>
            <div style={{ fontSize: '11px', color: '#73736e', marginBottom: '12px' }}>
              PROJECT {project.number} / {project.year} — {project.category}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "var(--font-display)",
                fontWeight: 300,
                color: '#f5f5f2',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                marginBottom: '16px',
              }}
            >
              {project.title}
            </h1>

            <div style={{ fontSize: '18px', color: '#b3b3ad', marginBottom: '24px' }}>
              {project.subtitle}
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '12px', color: '#73736e' }}>
              <div>
                ROLE: <span style={{ color: '#f5f5f2' }}>{project.role}</span>
              </div>
              <div>
                CATEGORY: <span style={{ color: '#d7ff00' }}>{project.category}</span>
              </div>
            </div>
          </div>

          {/* Overview & Architecture */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#73736e', marginBottom: '16px', textTransform: 'uppercase' }}>
                OVERVIEW & PURPOSE
              </h2>
              <p style={{ fontSize: '15px', color: '#b3b3ad', lineHeight: 1.7, marginBottom: '30px' }}>
                {project.fullOverview || project.description}
              </p>

              {project.architectureDetails && (
                <div>
                  <h2 style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#73736e', marginBottom: '16px', textTransform: 'uppercase' }}>
                    SYSTEM ARCHITECTURE
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {project.architectureDetails.map((detail, idx) => (
                      <li key={idx} style={{ fontSize: '13px', color: '#f5f5f2', paddingLeft: '16px', borderLeft: '2px solid #d7ff00', lineHeight: 1.5 }}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar Technologies & Links */}
            <div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#73736e', marginBottom: '12px', textTransform: 'uppercase' }}>
                  TECHNOLOGY STACK
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} style={{ fontSize: '11px', color: '#f5f5f2', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    backgroundColor: '#d7ff00',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '2px',
                  }}
                >
                  VISIT LIVE SYSTEM ↗
                </a>
              )}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line-secondary)', paddingTop: '40px' }}>
            <Link
              to={`/work/${prevProject.slug}`}
              style={{ color: '#b3b3ad', textDecoration: 'none', fontSize: '12px' }}
            >
              ← PREV: {prevProject.title}
            </Link>

            <Link
              to={`/work/${nextProject.slug}`}
              style={{ color: '#d7ff00', textDecoration: 'none', fontSize: '12px' }}
            >
              NEXT: {nextProject.title} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
