import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import CaseStudyModal from '../components/ui/CaseStudyModal';

export default function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('ALL');

  const categories = ['ALL', 'AI SYSTEMS', 'FULL-STACK', 'FINTECH'];

  const filteredProjects = filter === 'ALL'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.featured && p.category === filter);

  return (
    <section
      id="works"
      style={{
        position: 'relative',
        zIndex: 3,
        backgroundColor: '#000000',
        padding: 'var(--section-gap) var(--page-padding)',
        borderTop: '1px solid var(--line-secondary)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '10px' }}>
              02 / SELECTED WORK
            </div>
            <h2 style={{ fontFamily: "var(--font-family-sans)", fontSize: "var(--font-section)", fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', lineHeight: 1.05 }}>
              SELECTED <br />
              <span style={{ color: '#b3b3ad' }}>SYSTEMS & PRODUCTS</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? '#d7ff00' : 'transparent',
                  color: filter === cat ? '#000000' : '#b3b3ad',
                  border: filter === cat ? '1px solid #d7ff00' : '1px solid rgba(255,255,255,0.15)',
                  padding: '6px 16px',
                  fontSize: '11px',
                  fontFamily: "var(--font-family-mono)",
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.2s ease',
                  fontWeight: filter === cat ? 600 : 400,
                }}
              >
                {cat}
              </button>
            ))}
            <Link
              to="/work"
              style={{
                color: '#d7ff00',
                fontSize: '11px',
                fontFamily: "var(--font-family-mono)",
                textDecoration: 'none',
                marginLeft: '15px',
              }}
            >
              VIEW ALL 12 →
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                padding: '40px 0',
                borderTop: '1px solid var(--line-secondary)',
                display: 'grid',
                gridTemplateColumns: '80px 2fr 3fr 1.5fr',
                gap: '20px',
                alignItems: 'center',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '14px', color: '#d7ff00', fontWeight: 600 }}>
                {project.number}
              </div>

              <div>
                <Link
                  to={`/work/${project.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <h3 style={{ fontFamily: "var(--font-family-sans)", fontSize: '28px', color: '#f5f5f2', fontWeight: 400, margin: 0 }}>
                    {project.title}
                  </h3>
                </Link>
                <span style={{ fontFamily: "var(--font-family-mono)", fontSize: '11px', color: '#73736e' }}>
                  {project.subtitle}
                </span>
              </div>

              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: '12px', color: '#b3b3ad', lineHeight: 1.5 }}>
                {project.description}
              </div>

              <div style={{ textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedProject(project)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#b3b3ad',
                    fontSize: '10px',
                    fontFamily: "var(--font-family-mono)",
                    padding: '4px 10px',
                    cursor: 'pointer',
                  }}
                >
                  PREVIEW
                </button>
                <Link
                  to={`/work/${project.slug}`}
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontFamily: "var(--font-family-mono)",
                    color: '#000000',
                    backgroundColor: '#d7ff00',
                    padding: '4px 10px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  DETAILS →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
