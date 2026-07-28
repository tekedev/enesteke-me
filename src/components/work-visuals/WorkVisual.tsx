import React from 'react';
import type { Project } from '../../types/portfolio';
import NexusVisual from './NexusVisual';
import HarekiVisual from './HarekiVisual';
import TekeAppVisual from './TekeAppVisual';
import BistVisual from './BistVisual';

interface WorkVisualProps {
  project: Project;
  compact?: boolean;
}

const VISUAL_COMPONENTS = {
  nexus: NexusVisual,
  hareki: HarekiVisual,
  tekeapp: TekeAppVisual,
  whaletrace: BistVisual,
} satisfies Record<
  string,
  React.ComponentType<{
    compact?: boolean;
    project: Project;
  }>
>;

export default function WorkVisual({ project, compact }: WorkVisualProps) {
  const Visual = VISUAL_COMPONENTS[project.id as keyof typeof VISUAL_COMPONENTS];

  if (!Visual) {
    if (import.meta.env.DEV) {
      throw new Error(`Missing visual mapping: ${project.id} / ${project.slug}`);
    }

    return <div data-work-visual-missing={project.id} aria-hidden="true" />;
  }

  return <Visual project={project} compact={compact} />;
}
