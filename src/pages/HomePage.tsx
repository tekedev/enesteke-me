import React from 'react';
import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
import WorksSection from '../sections/WorksSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import ManifestoSection from '../sections/ManifestoSection';
import ContactSection from '../sections/ContactSection';
import SEO from '../components/common/SEO';

interface HomePageProps {
  onParamsChange?: (params: { roughness: number; noiseScale: number }) => void;
}

export default function HomePage({ onParamsChange }: HomePageProps) {
  return (
    <>
      <SEO
        title="Enes Teke — Full-Stack Developer & AI Systems Engineer"
        description="Portfolio of Enes Teke, a full-stack developer and AI systems engineer building agentic AI, automation, computer vision and scalable digital products."
        url="https://enesteke.me/"
      />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection onParamsChange={onParamsChange} />
        <IntroSection />
        <WorksSection />
        <CapabilitiesSection />
        <ManifestoSection />
        <ContactSection />
      </main>
    </>
  );
}
