/* ═══════════════════════════════════════════════════════
   ENES TEKE — Portfolio TypeScript Types
   ═══════════════════════════════════════════════════════ */

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'AI SYSTEMS' | 'FULL-STACK' | 'FINTECH' | 'TOOLS' | 'CREATIVE';
  year: string;
  role: string;
  description: string;
  fullOverview?: string;
  architectureDetails?: string[];
  technologies: string[];
  image?: string | null;
  link?: string | null;
  github?: string | null;
  featured: boolean;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface Update {
  id: string;
  date: string;
  title: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  status: string;
  socials: SocialLink[];
}
