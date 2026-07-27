import React from 'react';
import { profile } from '../data/portfolioData';
import SEO from '../components/common/SEO';

export default function AboutPage() {
  const experiences = [
    { year: '2025 — PRESENT', role: 'Full-Stack Developer & AI Systems Engineer', company: 'Independent / Freelance', desc: 'Building multi-account agentic AI content architectures, stock market volume alert engines, and custom SaaS web applications.' },
    { year: '2024 — 2025', role: 'AI Automation & Full-Stack Engineer', company: 'Client Projects', desc: 'Engineered Google Cloud Vertex AI integrations, Instagram Graph API auto-publishing pipelines, and desktop browser profile utilities.' },
  ];

  const techCategories = [
    { name: 'LANGUAGES', items: ['TypeScript', 'Python', 'JavaScript (ESNext)', 'SQL', 'HTML5/CSS3'] },
    { name: 'AI & AUTOMATION', items: ['Gemini 2.5', 'Vertex AI', 'OpenAI GPT-4o', 'LangChain', 'Playwright', 'FFmpeg'] },
    { name: 'FRONTEND & GRAPHICS', items: ['React 19', 'Next.js', 'Three.js', 'WebGL (GLSL)', 'Tailwind CSS', 'GSAP'] },
    { name: 'BACKEND & DATA', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'SQLite', 'Docker'] },
  ];

  return (
    <>
      <SEO
        title="About — Enes Teke"
        description="Learn more about Enes Teke: Full-Stack Developer & AI Systems Engineer. Experience, engineering principles, and technology stack."
        url="https://enesteke.me/about"
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
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '16px' }}>
              ABOUT / ENES TEKE
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
              BUILDING RELIABLE PRODUCTS <br />
              <span style={{ color: '#d7ff00' }}>WHERE SOFTWARE & AI MEET.</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#b3b3ad', maxWidth: '750px', lineHeight: 1.7 }}>
              {profile.bio}
            </p>
          </div>

          {/* Experience Timeline */}
          <div style={{ marginBottom: '70px', borderTop: '1px solid var(--line-secondary)', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '30px', textTransform: 'uppercase' }}>
              SELECTED EXPERIENCE
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
                  <div style={{ color: '#d7ff00', fontSize: '12px' }}>{exp.year}</div>
                  <div>
                    <div style={{ fontSize: '16px', color: '#f5f5f2', fontWeight: 600, marginBottom: '4px' }}>
                      {exp.role} — <span style={{ color: '#73736e', fontWeight: 400 }}>{exp.company}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#b3b3ad', lineHeight: 1.6 }}>{exp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Tech Stack */}
          <div style={{ borderTop: '1px solid var(--line-secondary)', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '30px', textTransform: 'uppercase' }}>
              TECHNOLOGY DOMAINS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
              {techCategories.map((cat) => (
                <div key={cat.name}>
                  <div style={{ fontSize: '11px', color: '#d7ff00', marginBottom: '12px', fontWeight: 600 }}>
                    {cat.name}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {cat.items.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '13px', color: '#b3b3ad' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
