import React from 'react';
import { Project } from '../../types/portfolio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        fontFamily: "var(--font-family-mono)",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          backgroundColor: '#080808',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '2px',
          padding: '40px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#d7ff00',
            fontSize: '12px',
            fontFamily: "var(--font-family-mono)",
            cursor: 'pointer',
          }}
        >
          [CLOSE ×]
        </button>

        <div style={{ fontSize: '11px', color: '#73736e', marginBottom: '10px' }}>
          PROJECT ARCHITECTURE / {project.year}
        </div>

        <h2 style={{ fontSize: '32px', color: '#f5f5f2', marginBottom: '8px', fontWeight: 600 }}>
          {project.title} — {project.subtitle}
        </h2>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#d7ff00', background: 'rgba(215, 255, 0, 0.1)', padding: '2px 8px' }}>
            {project.category}
          </span>
          <span style={{ fontSize: '11px', color: '#b3b3ad' }}>
            ROLE: {project.role}
          </span>
        </div>

        <p style={{ color: '#b3b3ad', fontSize: '14px', lineHeight: 1.7, marginBottom: '30px' }}>
          {project.description}
        </p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginBottom: '30px' }}>
          <div style={{ fontSize: '11px', color: '#73736e', marginBottom: '12px' }}>
            SYSTEM TECHNOLOGIES & STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, i) => (
              <span key={i} style={{ fontSize: '11px', color: '#f5f5f2', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
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
              display: 'inline-block',
              padding: '10px 24px',
              backgroundColor: '#d7ff00',
              color: '#000000',
              fontWeight: 600,
              fontSize: '12px',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            VISIT LIVE SYSTEM →
          </a>
        )}
      </div>
    </div>
  );
}
