import React from 'react';
import NexusVisual from './NexusVisual';
import HarekiVisual from './HarekiVisual';
import TekeAppVisual from './TekeAppVisual';
import BistVisual from './BistVisual';

interface WorkVisualProps {
  slug: string;
  compact?: boolean;
}

export default function WorkVisual({ slug, compact }: WorkVisualProps) {
  switch (slug) {
    case 'nexus-ai':
      return <NexusVisual compact={compact} />;
    case 'hareki-dna':
      return <HarekiVisual compact={compact} />;
    case 'teke-app':
      return <TekeAppVisual compact={compact} />;
    case 'bist-whale-tracker':
    case 'bist-engine':
      return <BistVisual compact={compact} />;
    default:
      return <NexusVisual compact={compact} />;
  }
}
