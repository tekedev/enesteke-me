import React, { useEffect } from 'react';
import ETIntroSequence from '../components/intro/ETIntroSequence';
import HeroSection from '../sections/HeroSection';
import WorksSection from '../sections/WorksSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import ManifestoSection from '../sections/ManifestoSection';
import ContactSection from '../sections/ContactSection';
import FooterSection from '../sections/FooterSection';
import SEO from '../components/common/SEO';
import { useHomeExperienceController, type SceneState } from '../hooks/useHomeExperienceController';

interface HomePageProps {
  roughness: number;
  setRoughness: (val: number) => void;
  noiseScale: number;
  setNoiseScale: (val: number) => void;
  onSceneStateChange?: (state: SceneState) => void;
  introProgress?: number;
  setIntroProgress?: (progress: number) => void;
}

export default function HomePage({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
  onSceneStateChange,
  introProgress: _introProgress,
  setIntroProgress,
}: HomePageProps) {
  const { sceneState, heroExitProgress, worksEntryProgress, worksProgress, worksActive, scrollDirection } =
    useHomeExperienceController();

  useEffect(() => {
    if (onSceneStateChange) {
      onSceneStateChange(sceneState);
    }
  }, [sceneState, onSceneStateChange]);

  return (
    <div
      data-scene-state={sceneState}
      data-hero-exit-progress={heroExitProgress.toFixed(2)}
      data-works-entry-progress={worksEntryProgress.toFixed(2)}
      data-works-progress={worksProgress.toFixed(2)}
      data-scroll-direction={scrollDirection}
    >
      <ETIntroSequence onProgress={setIntroProgress} />
      <SEO
        title="Enes Teke — Full-Stack Developer & AI Systems Engineer"
        description="Engineering systems that think, act and scale. Portfolio of Enes Teke spanning Agentic AI systems, FinTech intelligence, and digital experiences."
        url="https://enesteke.me"
      />
      <HeroSection
        roughness={roughness}
        setRoughness={setRoughness}
        noiseScale={noiseScale}
        setNoiseScale={setNoiseScale}
        heroExitProgress={heroExitProgress}
      />
      <WorksSection progress={worksProgress} active={worksActive} />
      <CapabilitiesSection />
      <ManifestoSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
