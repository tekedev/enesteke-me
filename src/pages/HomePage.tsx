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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (!onSceneStateChange) return;

      if (scrollY < windowHeight * 0.8) {
        onSceneStateChange('hero');
      } else if (scrollY >= windowHeight * 0.8 && scrollY < windowHeight * 2.8) {
        onSceneStateChange('works');
      } else {
        onSceneStateChange('manifesto');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
