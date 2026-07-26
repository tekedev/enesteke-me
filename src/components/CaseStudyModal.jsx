import { motion, AnimatePresence } from 'motion/react';
import './CaseStudyModal.css';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-container"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          {/* Category & Badge */}
          <div className="modal-header">
            <span className="modal-cat">{project.category}</span>
            {project.isPrivateCode ? (
              <span className="modal-badge badge-private">🔒 Private Architecture & Case Study</span>
            ) : (
              <span className="modal-badge badge-public">🌐 Open Source Project</span>
            )}
          </div>

          {/* Title & Subtitle */}
          <h2 className="modal-title">{project.name}</h2>
          <p className="modal-subtitle">{project.subtitle}</p>

          {/* Tags */}
          <div className="modal-tags">
            {project.tags.map(t => (
              <span key={t} className="modal-tag">{t}</span>
            ))}
          </div>

          {/* Description */}
          <p className="modal-desc">{project.description}</p>

          {/* Case Study Details if present */}
          {project.caseStudy && (
            <div className="modal-casestudy-section">
              <h3 className="cs-heading">Architecture & System Specs</h3>
              
              {/* Metrics Grid */}
              <div className="cs-metrics-grid">
                {project.caseStudy.metrics.map(m => (
                  <div key={m} className="cs-metric-card">
                    <span className="cs-metric-icon">⚡</span>
                    <span className="cs-metric-text">{m}</span>
                  </div>
                ))}
              </div>

              {/* System Architecture */}
              <div className="cs-arch-box">
                <span className="cs-label">SYSTEM ARCHITECTURE</span>
                <p className="cs-arch-text">{project.caseStudy.architecture}</p>
              </div>

              {/* Engineering Highlights */}
              <div className="cs-highlights-box">
                <span className="cs-label">ENGINEERING HIGHLIGHTS</span>
                <ul className="cs-highlights-list">
                  {project.caseStudy.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="modal-footer">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn--solid">
                GitHub Repository ↗
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pill-btn">
                Live Demo ↗
              </a>
            )}
            <button className="pill-btn pill-btn--outline" onClick={onClose}>
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
