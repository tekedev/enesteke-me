import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import WorkVisual from '../components/work-visuals/WorkVisual';
import styles from './WorksSection.module.css';

const shortDescriptions: Record<string, string> = {
  'nexus-ai': 'Autonomous multi-channel video production and content orchestration engine.',
  'hareki-dna': 'Turns brand websites into personalized editorial content systems.',
  'teke-app': 'Motion typography and automated multi-format video creation platform.',
  'bist-whale-tracker': 'High-frequency stock data collector and real-time whale movement monitor.',
};

export interface WorksSectionProps {
  progress?: number;
  active?: boolean;
}

export default function WorksSection({ progress = 0, active = false }: WorksSectionProps) {
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [worksReady, setWorksReady] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

  const visualRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const applyProgress = useCallback(
    (currentProgress: number) => {
      if (isMobile) return;
      const rawIndex = currentProgress * (featured.length - 1);
      const viewportWidth = window.innerWidth || 1440;
      const viewportHeight = window.innerHeight || 900;

      const orbitStepRadians = 1.02; // ~58 degrees
      const radiusX = Math.min(viewportWidth * 0.34, 620);
      const radiusY = Math.min(viewportHeight * 0.10, 86);
      const radiusZ = 520;
      const orbitCenterOffsetX = viewportWidth * 0.12;

      visualRefs.current.forEach((element, index) => {
        if (!element) return;
        const distance = index - rawIndex;
        const angle = distance * orbitStepRadians;

        const x = orbitCenterOffsetX + Math.sin(angle) * radiusX;
        const y = Math.sin(angle * 0.65) * radiusY;
        const z = (Math.cos(angle) - 1) * radiusZ;
        const rotateY = ((-angle * 180) / Math.PI) * 0.72; // in degrees

        const activeWeight = Math.max(0, 1 - Math.abs(distance));
        const scale = 0.56 + activeWeight * 0.44;
        const opacity = 0.10 + activeWeight * 0.90;

        element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
        element.style.opacity = opacity.toFixed(2);
        element.style.zIndex = String(Math.round(100 - Math.abs(distance) * 20));
        element.setAttribute('data-orbit-distance', distance.toFixed(2));
      });

      const nextActive = Math.round(rawIndex);
      if (nextActive !== activeIndexRef.current) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }
    },
    [isMobile, featured.length]
  );

  useLayoutEffect(() => {
    applyProgress(progress);
    setWorksReady(true);
  }, [progress, applyProgress]);

  const activeProject = featured[activeIndex] || featured[0];
  const orbitAngle = progress * (featured.length - 1) * 1.02;

  // Mobile Render Architecture
  if (isMobile) {
    return (
      <section id="works" className={styles.mobileWorksContainer}>
        <div className={styles.headerRow}>
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e' }}>
            SELECTED WORK [01 / 04]
          </span>
          <Link to="/work" style={{ fontSize: '11px', color: '#d7ff00', textDecoration: 'none', letterSpacing: '0.15em' }}>
            ALL PROJECTS →
          </Link>
        </div>

        {featured.map((project) => (
          <article
            key={project.id}
            data-mobile-project={project.slug}
            className={styles.mobileProjectCard}
            style={{ scrollMarginTop: 'calc(var(--header-height) + 12px)' }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.15em' }}>
                [{project.number}]
              </span>
              <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                [{project.category}]
              </span>
            </div>

            <div className={styles.mobileVisualWrapper}>
              <WorkVisual project={project} compact />
            </div>

            <h3 style={{ fontFamily: 'var(--font-family-sans)', fontSize: '28px', fontWeight: 300, color: '#f5f5f2', textTransform: 'uppercase', margin: '4px 0' }}>
              {project.title}
            </h3>

            <p style={{ color: '#b3b3ad', fontSize: '13px', lineHeight: 1.5 }}>
              {shortDescriptions[project.slug] || project.description}
            </p>

            <Link to={`/work/${project.slug}`} className={styles.ctaButton}>
              VIEW CASE <span style={{ color: '#d7ff00' }}>↗</span>
            </Link>
          </article>
        ))}
      </section>
    );
  }

  // Desktop 3D Orbital Ring Architecture
  return (
    <section
      id="works"
      ref={sectionRef}
      data-works-ready={worksReady ? 'true' : 'false'}
      data-works-active={active ? 'true' : 'false'}
      data-active-project-slug={activeProject.slug}
      data-orbit-angle={orbitAngle.toFixed(2)}
      className={styles.worksSection}
    >
      <div className={styles.worksSticky}>
        {/* Compact Desktop Header */}
        <div className={styles.headerRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e' }}>
              SELECTED WORK
            </span>
            <span style={{ fontSize: '12px', color: '#d7ff00', letterSpacing: '0.2em' }}>
              [0{activeIndex + 1} / 04]
            </span>
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
            ALL 12 PROJECTS →
          </Link>
        </div>

        {/* 3D Orbital Showcase Stage */}
        <div className={styles.showcaseStage}>
          {/* Spatial Orbital Ring Guide */}
          <svg className={styles.orbitGuide} aria-hidden="true" viewBox="0 0 1000 400" fill="none">
            <ellipse cx="450" cy="200" rx="380" ry="80" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="450" cy="200" r="140" stroke="rgba(215,255,0,0.12)" strokeWidth="1" />
          </svg>

          {/* Visual Planes Orbital Ring Layer */}
          <div className={styles.visualPlanesContainer}>
            {featured.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { visualRefs.current[index] = el; }}
                data-project-id={project.id}
                data-project-slug={project.slug}
                data-project-index={index}
                data-project-active={index === activeIndex ? 'true' : 'false'}
                className={styles.projectVisualPlane}
              >
                <WorkVisual project={project} />
              </div>
            ))}
          </div>

          {/* Single Active Metadata Overlay */}
          <div data-project-meta="true" data-active="true" className={styles.activeMetaOverlay}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#73736e', letterSpacing: '0.2em' }}>
                [{activeProject.number}]
              </span>
              <span style={{ fontSize: '11px', color: '#d7ff00', letterSpacing: '0.15em' }}>
                [{activeProject.category}]
              </span>
            </div>

            <h3 className={styles.projectTitle}>
              {activeProject.title}
            </h3>

            <p style={{ color: '#b3b3ad', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
              {shortDescriptions[activeProject.slug] || activeProject.description}
            </p>

            <Link to={`/work/${activeProject.slug}`} className={styles.ctaButton}>
              VIEW CASE <span style={{ color: '#d7ff00' }}>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
