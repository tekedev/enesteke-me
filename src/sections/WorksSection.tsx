import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolioData';
import WorkVisual from '../components/work-visuals/WorkVisual';
import type { SceneState } from '../hooks/useHomeExperienceController';
import styles from './WorksSection.module.css';

const shortDescriptions: Record<string, string> = {
  'nexus-ai': 'Autonomous multi-channel video production and content orchestration engine.',
  'hareki-dna': 'Turns brand websites into personalized editorial content systems.',
  'teke-app': 'Motion typography and automated multi-format video creation platform.',
  'bist-whale-tracker': 'High-frequency stock data collector and real-time whale movement monitor.',
};

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export interface WorksSectionProps {
  progress?: number;
  active?: boolean;
  worksEntryProgress?: number;
  worksExitProgress?: number;
  layoutStable?: boolean;
  sceneState?: SceneState;
  etScreenRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
}

export default function WorksSection({
  progress = 0,
  active = false,
  worksEntryProgress = 0,
  worksExitProgress = 0,
  layoutStable = false,
  sceneState: _sceneState = 'hero',
  etScreenRect,
}: WorksSectionProps) {
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

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth || 1440 : 1440;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;

  const etX = etScreenRect?.x || Math.round(viewportWidth * 0.264);
  const etY = etScreenRect?.y || Math.round(viewportHeight * 0.277);
  const etWidth = etScreenRect?.width || Math.round(viewportWidth * 0.194);
  const etHeight = etScreenRect?.height || Math.round(viewportHeight * 0.400);

  const etCenterX = etScreenRect?.centerX || Math.round(etX + etWidth / 2);
  const etCenterY = etScreenRect?.centerY || Math.round(etY + etHeight / 2);

  const ACTIVE_PANEL_GAP_PX = 48;
  const panelWidth = Math.min(viewportWidth * 0.37, 660);
  const requiredRadiusX = etWidth / 2 + ACTIVE_PANEL_GAP_PX + panelWidth / 2;
  const radiusX = Math.min(Math.max(requiredRadiusX, viewportWidth * 0.30), viewportWidth * 0.42);
  const radiusY = Math.min(viewportHeight * 0.16, 135);

  const applyProgress = useCallback(
    (currentProgress: number) => {
      if (isMobile) return;
      const rawIndex = currentProgress * (featured.length - 1);
      const vWidth = window.innerWidth || 1440;
      const vHeight = window.innerHeight || 900;

      const currentEtX = etScreenRect?.x || Math.round(vWidth * 0.264);
      const currentEtW = etScreenRect?.width || Math.round(vWidth * 0.194);
      const currentEtRight = currentEtX + currentEtW;
      const currentEtCenterY = etScreenRect?.centerY || Math.round(vHeight * 0.460);

      const pWidth = Math.min(vWidth * 0.37, 660);
      const dLeft = currentEtRight + 48;
      const mLeft = vWidth - pWidth - 40;
      const aLeft = Math.min(dLeft, mLeft);
      const aCenterX = aLeft + pWidth / 2;
      const aTranslateX = aCenterX - vWidth / 2;

      const reqRadiusX = currentEtW / 2 + 48 + pWidth / 2;
      const rX = Math.min(Math.max(reqRadiusX, vWidth * 0.30), vWidth * 0.42);
      const rY = Math.min(vHeight * 0.16, 135);

      visualRefs.current.forEach((element, index) => {
        if (!element) return;
        const distance = index - rawIndex;
        const angle = distance * 1.05; // ~60 degrees

        const x = aTranslateX + (Math.cos(angle) - 1) * rX;
        const y = (currentEtCenterY - vHeight / 2) + Math.sin(angle) * rY;
        const z = (Math.cos(angle) - 1) * 420;
        const rotateY = ((-angle * 180) / Math.PI) * 0.65;

        const activeWeight = Math.max(0, 1 - Math.abs(distance));
        const scale = 0.48 + activeWeight * 0.52;
        const opacity = 0.08 + activeWeight * 0.92;

        element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
        element.style.opacity = opacity.toFixed(2);
        element.style.zIndex = String(Math.round(2 + activeWeight * 38));
        element.setAttribute('data-orbit-distance', distance.toFixed(2));
      });

      const nextActive = Math.round(rawIndex);
      if (nextActive !== activeIndexRef.current) {
        activeIndexRef.current = nextActive;
        setActiveIndex(nextActive);
      }
    },
    [isMobile, featured.length, etScreenRect]
  );

  useLayoutEffect(() => {
    applyProgress(progress);
    setWorksReady(true);
  }, [progress, applyProgress]);

  const activeProject = featured[activeIndex] || featured[0];
  const orbitAngle = progress * (featured.length - 1) * 1.05;

  // Two-Phase Exit Opacity Math
  const entryBackdropOpacity = smoothstep(0.00, 0.18, worksEntryProgress);
  const entryOverlayOpacity = smoothstep(0.10, 0.38, worksEntryProgress);

  const overlayExitOpacity = 1 - smoothstep(0.00, 0.52, worksExitProgress);
  const backdropExitOpacity = 1 - smoothstep(0.52, 1.00, worksExitProgress);

  const overlayOpacity = isMobile ? 1 : entryOverlayOpacity * overlayExitOpacity;
  const backdropOpacity = isMobile ? 1 : entryBackdropOpacity * backdropExitOpacity;

  const markerX = etCenterX + Math.cos(orbitAngle) * radiusX;
  const markerY = etCenterY + Math.sin(orbitAngle) * radiusY;

  // Backdrop Portal Content
  const desktopBackdropContent = (
    <div
      className={styles.worksBackdrop}
      data-works-backdrop="true"
      data-visible={backdropOpacity > 0.01 ? 'true' : 'false'}
      data-backdrop-opacity={backdropOpacity.toFixed(3)}
      style={{ opacity: backdropOpacity }}
    />
  );

  // Overlay Portal Content
  const desktopOverlayContent = (
    <div
      className={styles.worksExperienceOverlay}
      data-works-overlay="true"
      data-visible={overlayOpacity > 0.01 ? 'true' : 'false'}
      data-overlay-opacity={overlayOpacity.toFixed(3)}
      data-works-ready={worksReady ? 'true' : 'false'}
      data-works-active={active ? 'true' : 'false'}
      data-active-project-slug={activeProject.slug}
      data-layout-stable={layoutStable ? 'true' : 'false'}
      data-orbit-angle={orbitAngle.toFixed(2)}
      style={{ opacity: overlayOpacity }}
    >
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
          className={styles.allProjectsLink}
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

      {/* 3D Orbital Showcase Stage Anchored to ET Projected Center */}
      <div className={styles.showcaseStage}>
        {/* Spatial Orbital Ring Guide Centered at ET Screen Location */}
        <svg
          className={styles.orbitGuide}
          aria-hidden="true"
          viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
          fill="none"
        >
          <ellipse
            cx={etCenterX}
            cy={etCenterY}
            rx={radiusX}
            ry={radiusY}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle
            cx={etCenterX}
            cy={etCenterY}
            r={Math.round(etWidth * 0.55)}
            stroke="rgba(215,255,0,0.22)"
            strokeWidth="1"
          />
          <circle
            cx={markerX}
            cy={markerY}
            r="4"
            fill="#d7ff00"
            className={styles.activeOrbitMarker}
          />
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
  );

  return (
    <>
      <section
        id="works"
        ref={sectionRef}
        className={styles.worksScrollSpacer}
        data-active-project-slug={activeProject.slug}
      >
        {/* Mobile Architecture rendered directly inside document flow */}
        {isMobile && (
          <div className={styles.mobileWorksContainer}>
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
          </div>
        )}
      </section>

      {/* Desktop Portals under document.body */}
      {!isMobile && typeof document !== 'undefined' && createPortal(desktopBackdropContent, document.body)}
      {!isMobile && typeof document !== 'undefined' && createPortal(desktopOverlayContent, document.body)}
    </>
  );
}
