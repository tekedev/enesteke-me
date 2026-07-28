import React, { useEffect } from 'react';
import ETIntroSequence from '../components/intro/ETIntroSequence';
import HeroSection from '../sections/HeroSection';
import WorksSection from '../sections/WorksSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import ManifestoSection from '../sections/ManifestoSection';
import ContactSection from '../sections/ContactSection';
import FooterSection from '../sections/FooterSection';
import SEO from '../components/common/SEO';

interface HomePageProps {
  roughness: number;
  setRoughness: (val: number) => void;
  noiseScale: number;
  setNoiseScale: (val: number) => void;
  onSceneStateChange?: (state: 'hero' | 'works' | 'manifesto') => void;
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
  useEffect(() => {
    if (!onSceneStateChange) return;

    const sections = [
      { id: 'hero', state: 'hero' as const },
      { id: 'works', state: 'works' as const },
      { id: 'manifesto', state: 'manifesto' as const },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const highestRatio = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          const targetState = sections.find((s) => s.id === highestRatio.target.id)?.state;
          if (targetState) {
            onSceneStateChange(targetState);
          }
        }
      },
      { threshold: [0.1, 0.4, 0.7] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSceneStateChange]);

  return (
    <>
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
      />
      <WorksSection />
      <CapabilitiesSection />
      <ManifestoSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
