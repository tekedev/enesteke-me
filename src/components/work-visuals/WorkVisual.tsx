import React from 'react';
import NexusVisual from './NexusVisual';
import HarekiVisual from './HarekiVisual';
import TekeAppVisual from './TekeAppVisual';
import BistVisual from './BistVisual';

interface WorkVisualProps {
  slug: string;
}

export default function WorkVisual({ slug }: WorkVisualProps) {
  switch (slug) {
    case 'nexus-ai':
      return <NexusVisual />;
    case 'hareki-dna':
      return <HarekiVisual />;
    case 'teke-app':
      return <TekeAppVisual />;
    case 'bist-engine':
      return <BistVisual />;
    default:
      return <NexusVisual />;
  }
}
