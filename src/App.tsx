import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/layout/LoadingScreen';
import ErrorBoundary from './components/common/ErrorBoundary';
import WebGLFallback from './components/common/WebGLFallback';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);
  const [scrollState, setScrollState] = useState<'hero' | 'works' | 'manifesto'>('hero');

  // Smooth Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}

      <Navbar />

      {/* WebGL Scene or Static 2D Fallback with Retry */}
      {webglFailed ? (
        <WebGLFallback onRetry={() => setWebglFailed(false)} />
      ) : (
        <Suspense fallback={null}>
          <ETMonogramScene
            roughness={roughness}
            noiseScale={noiseScale}
            scrollState={scrollState}
            onContextLost={() => setWebglFailed(true)}
          />
        </Suspense>
      )}

      {/* Main Page Routes */}
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
