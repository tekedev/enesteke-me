import React, { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
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
}

export default function HomePage({
  roughness,
  setRoughness,
  noiseScale,
  setNoiseScale,
  onSceneStateChange,
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
          // Select entry closest to viewport center
          const highestRatio = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          const targetState = sections.find((s) => s.id === highestRatio.target.id)?.state;
          if (targetState) {
            onSceneStateChange(targetState);
          }
        }
      },
      {
        threshold: [0.1, 0.4, 0.7],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSceneStateChange]);

  return (
    <>
      <SEO
        title="Enes Teke — Creative Developer & AI Systems Engineer"
        description="Personal portfolio of Enes Teke. Specialized in AI systems engineering, computer vision, production web applications, and high-performance WebGL digital experiences."
        url="https://enesteke.me"
      />
      <HeroSection
        roughness={roughness}
        setRoughness={setRoughness}
        noiseScale={noiseScale}
        setNoiseScale={setNoiseScale}
      />
      <IntroSection />
      <WorksSection />
      <CapabilitiesSection />
      <ManifestoSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
