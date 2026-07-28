import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/common/ErrorBoundary';
import WebGLFallback from './components/common/WebGLFallback';
import StaticMonogramFallback from './components/common/StaticMonogramFallback';
import type { SceneState } from './hooks/useHomeExperienceController';

const ETMonogramScene = lazy(() => import('./components/scene/ETMonogramScene'));
const HomePage = lazy(() => import('./pages/HomePage'));
const WorkArchivePage = lazy(() => import('./pages/WorkArchivePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const [roughness, setRoughness] = useState<number>(0.10);
  const [noiseScale, setNoiseScale] = useState<number>(9.00);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);
  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const [scrollState, setScrollState] = useState<SceneState>('hero');
  const [heroExitProgress, setHeroExitProgress] = useState<number>(0);
  const [worksEntryProgress, setWorksEntryProgress] = useState<number>(0);
  const [worksProgress, setWorksProgress] = useState<number>(0);
  const [introProgress, setIntroProgress] = useState<number>(0);

  const location = useLocation();

  const isE2E = new URLSearchParams(location.search).get('e2e') === '1';

  useEffect(() => {
    if (introProgress < 0.95) {
      document.body.setAttribute('data-intro-active', 'true');
    } else {
      document.body.setAttribute('data-intro-active', 'false');
    }
  }, [introProgress]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: (prefersReducedMotion || isE2E) ? 'auto' : 'smooth' });
  }, [location.pathname, isE2E]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isE2E) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isE2E]);

  const handleExperienceUpdate = (update: {
    sceneState: SceneState;
    heroExitProgress: number;
    worksEntryProgress: number;
    worksProgress: number;
  }) => {
    setScrollState(update.sceneState);
    setHeroExitProgress(update.heroExitProgress);
    setWorksEntryProgress(update.worksEntryProgress);
    setWorksProgress(update.worksProgress);
  };

  return (
    <ErrorBoundary>
      <Navbar />

      {/* Static Fallback Monogram visible while scene is loading */}
      <StaticMonogramFallback visible={!sceneReady || webglFailed} />

      {/* WebGL Scene or Static 2D Fallback with Retry */}
      {webglFailed ? (
        <WebGLFallback onRetry={() => setWebglFailed(false)} />
      ) : (
        <Suspense fallback={null}>
          <ETMonogramScene
            roughness={roughness}
            noiseScale={noiseScale}
            scrollState={scrollState}
            heroExitProgress={heroExitProgress}
            worksEntryProgress={worksEntryProgress}
            worksProgress={worksProgress}
            introProgress={introProgress}
            onContextLost={() => setWebglFailed(true)}
            onSceneReady={() => setSceneReady(true)}
          />
        </Suspense>
      )}

      {/* Main Page Routes with pure black fallback */}
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#000000' }} />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                roughness={roughness}
                setRoughness={setRoughness}
                noiseScale={noiseScale}
                setNoiseScale={setNoiseScale}
                onSceneStateChange={setScrollState}
                onExperienceUpdate={handleExperienceUpdate}
                introProgress={introProgress}
                setIntroProgress={setIntroProgress}
              />
            }
          />
          <Route path="/work" element={<WorkArchivePage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
