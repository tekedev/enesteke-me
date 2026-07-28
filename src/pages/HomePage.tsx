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
  onExperienceUpdate?: (update: {
    sceneState: SceneState;
    heroExitProgress: number;
    worksEntryProgress: number;
    worksProgress: number;
  }) => void;
  introProgress?: number;
  setIntroProgress?: (progress: number) => void;
}

export default function HomePage({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
  onSceneStateChange,
  onExperienceUpdate,
  introProgress: _introProgress,
  setIntroProgress,
}: HomePageProps) {
  const { sceneState, heroExitProgress, worksEntryProgress, worksExitProgress, worksProgress, worksActive, scrollDirection, layoutStable, etScreenRect } =
    useHomeExperienceController();

  useEffect(() => {
    if (onSceneStateChange) {
      onSceneStateChange(sceneState);
    }
    if (onExperienceUpdate) {
      onExperienceUpdate({ sceneState, heroExitProgress, worksEntryProgress, worksProgress });
    }
  }, [sceneState, heroExitProgress, worksEntryProgress, worksProgress, onSceneStateChange, onExperienceUpdate]);

  return (
    <div
      data-scene-state={sceneState}
      data-hero-exit-progress={heroExitProgress.toFixed(2)}
      data-works-entry-progress={worksEntryProgress.toFixed(2)}
      data-works-exit-progress={worksExitProgress.toFixed(2)}
      data-works-progress={worksProgress.toFixed(2)}
      data-scroll-direction={scrollDirection}
      data-layout-stable={layoutStable ? 'true' : 'false'}
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
      <WorksSection
        progress={worksProgress}
        active={worksActive}
        worksEntryProgress={worksEntryProgress}
        worksExitProgress={worksExitProgress}
        layoutStable={layoutStable}
        sceneState={sceneState}
        etScreenRect={etScreenRect}
      />
      <CapabilitiesSection />
      <ManifestoSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
