import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import WorkVisual from '../components/work-visuals/WorkVisual';
import styles from './WorksSection.module.css';

const shortDescriptions: Record<string, string> = {
  'nexus-ai': 'Autonomous multi-channel video production and content orchestration engine.',
  'hareki-dna': 'Turns brand websites into personalized editorial content systems.',
  'teke-app': 'Motion typography and automated multi-format video creation platform.',
  'bist-engine': 'High-frequency stock data collector and real-time whale movement monitor.',
};

export default function WorksSection() {
  const featured = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

  const visualRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const applyProgress = () => {
      rafRef.current = null;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const rawIndex = rawProgress * (featured.length - 1);

      visualRefs.current.forEach((element, index) => {
        if (!element) return;
        const distance = index - rawIndex;
        const absDist = Math.abs(distance);

        let translateX = 0;
        let translateZ = 0;
        let rotateY = 0;
        let scale = 1;

        if (distance < 0) {
          translateX = distance * 55;
          translateZ = Math.max(-400, distance * 220);
          rotateY = Math.min(25, -distance * 20);
          scale = Math.max(0.65, 1 - absDist * 0.25);
        } else if (distance > 0) {
          translateX = distance * 55;
          translateZ = Math.max(-400, -distance * 220);
          rotateY = Math.max(-25, -distance * 20);
          scale = Math.max(0.65, 1 - absDist * 0.25);
        }

        const nextActive = Math.round(rawIndex);
        const opacity = index === nextActive ? 1 : Math.max(0, 0.18 - Math.max(0, absDist - 1) * 0.08);

        element.style.transform = `translate3d(${translateX}vw, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        element.style.opacity = String(opacity);
        element.style.zIndex = String(Math.round(10 - absDist * 2));
      });

      const nextActive = Math.round(rawIndex);
      if (nextActive !== activeIndexRef.current) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(applyProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    applyProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, featured.length]);

  const activeProject = featured[activeIndex] || featured[0];

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
              <WorkVisual slug={project.slug} compact />
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

  // Desktop 3D Corridor Architecture
  return (
    <section id="works" ref={sectionRef} className={styles.worksSection}>
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

        {/* 3D Showcase Stage */}
        <div className={styles.showcaseStage}>
          {/* Visual Planes Layer */}
          <div className={styles.visualPlanesContainer}>
            {featured.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { visualRefs.current[index] = el; }}
                data-project-slug={project.slug}
                data-project-index={index}
                data-project-active={index === activeIndex ? 'true' : 'false'}
                className={styles.projectVisualPlane}
              >
                <WorkVisual slug={project.slug} />
              </div>
            ))}
          </div>

          {/* Single Active Metadata Overlay (Zero Ghosting, Anchored Bottom-Left) */}
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
