import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/layout/LoadingScreen';
import Navbar from './components/layout/Navbar';
import WebGLFallback from './components/common/WebGLFallback';
import FooterSection from './sections/FooterSection';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded WebGL 3D Heavy Chunk
const ETMonogramScene = lazy(() => import('./components/scene/ETMonogramScene'));

// Lazy-loaded Route Page Chunks
const HomePage = lazy(() => import('./pages/HomePage'));
const WorkArchivePage = lazy(() => import('./pages/WorkArchivePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [webglFailed, setWebglFailed] = useState(false);
  const [sceneParams, setSceneParams] = useState({ roughness: 0.10, noiseScale: 9.00 });

  return (
    <ErrorBoundary>
      <div style={{ backgroundColor: '#000000', color: '#f5f5f2', minHeight: '100vh', position: 'relative' }}>
        {/* Initial Loading Screen */}
        {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

        {/* Fixed Navigation Header */}
        <Navbar />

        {/* WebGL 3D Monogram & Shader Canvas - Lazy Loaded */}
        <Suspense fallback={<WebGLFallback />}>
          {!webglFailed ? (
            <ETMonogramScene
              roughness={sceneParams.roughness}
              noiseScale={sceneParams.noiseScale}
              onContextLost={() => setWebglFailed(true)}
            />
          ) : (
            <WebGLFallback />
          )}
        </Suspense>

        {/* Route-Based Code Splitting */}
        <Suspense fallback={
          <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#73736e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-family-mono)", fontSize: '11px' }}>
            LOADING ROUTE ARCHITECTURE...
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage onParamsChange={setSceneParams} />} />
            <Route path="/work" element={<WorkArchivePage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <FooterSection />
      </div>
    </ErrorBoundary>
  );
}
