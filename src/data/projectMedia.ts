import type { Project } from '../types/portfolio';

export interface ProjectMediaVariants {
  vertical?: string;
  square?: string;
  landscape?: string;
}

export interface ProjectMediaDefinition {
  projectId: Project['id'];
  projectSlug: Project['slug'];
  desktopSrc: string;
  mobileSrc?: string;
  variants?: ProjectMediaVariants;
  mediaType: 'real-capture' | 'procedural-art';
  sourceNote: string;
}

export const PROJECT_MEDIA: Record<string, ProjectMediaDefinition> = {
  nexus: {
    projectId: 'nexus',
    projectSlug: 'nexus-ai',
    desktopSrc: '/projects/nexus.jpg',
    mediaType: 'real-capture',
    sourceNote: 'NEXUS product capture',
  },
  hareki: {
    projectId: 'hareki',
    projectSlug: 'hareki-dna',
    desktopSrc: '/projects/hareki.jpg',
    mediaType: 'real-capture',
    sourceNote: 'HAREKI product capture',
  },
  tekeapp: {
    projectId: 'tekeapp',
    projectSlug: 'teke-app',
    desktopSrc: '/projects/tekeapp.jpg',
    mobileSrc: '/projects/tekeapp-vertical.webp',
    variants: {
      vertical: '/projects/tekeapp-vertical.webp',
      square: '/projects/tekeapp-square.webp',
      landscape: '/projects/tekeapp-landscape.webp',
    },
    mediaType: 'procedural-art',
    sourceNote: 'Custom social-media motion studio artwork with art-directed format variants',
  },
  whaletrace: {
    projectId: 'whaletrace',
    projectSlug: 'bist-whale-tracker',
    desktopSrc: '/projects/whaletrace.jpg',
    mediaType: 'real-capture',
    sourceNote: 'WHALETRACE product capture',
  },
};
