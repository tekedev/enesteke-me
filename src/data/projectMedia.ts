import type { Project } from '../types/portfolio';

export interface ProjectMediaDefinition {
  projectId: Project['id'];
  projectSlug: Project['slug'];
  desktopSrc: string;
  mobileSrc?: string;
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
    mediaType: 'procedural-art',
    sourceNote: 'TEKE.APP social media studio art',
  },
  whaletrace: {
    projectId: 'whaletrace',
    projectSlug: 'bist-whale-tracker',
    desktopSrc: '/projects/whaletrace.jpg',
    mediaType: 'real-capture',
    sourceNote: 'WHALETRACE product capture',
  },
};
