/* ═══════════════════════════════════════════════════════
   ENES TEKE — Portfolio Data Source of Truth
   Single source for all projects, capabilities & updates.
   ═══════════════════════════════════════════════════════ */

export const profile = {
  name: 'ENES TEKE',
  title: 'Full-Stack Developer & AI Systems Engineer',
  tagline: 'Engineering systems that think, act and scale.',
  bio: 'Full-stack developer and AI engineer building production products at the intersection of agentic AI, computer vision, real-time FinTech data engines, and modern WebGL digital experiences.',
  email: 'hello@enesteke.me',
  location: 'Türkiye / Remote Worldwide',
  status: 'AVAILABLE FOR HIGH-IMPACT PROJECTS',
  socials: [
    { name: 'GitHub', url: 'https://github.com/tekedev', handle: '@tekedev' },
    { name: 'TEKE.APP', url: 'https://teke.app', handle: 'teke.app' },
    { name: 'HAREKI', url: 'https://hareki.com', handle: 'hareki.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/enesteke', handle: 'in/enesteke' },
  ],
};

export const updates = [
  { id: 'u1', date: '2026.07', title: 'CINEMATIC WEBGL PORTFOLIO SYSTEM', category: 'RELEASE' },
  { id: 'u2', date: '2026.05', title: 'AGENTIC AI CONTENT AUTOMATION (NEXUS)', category: 'PRODUCT' },
  { id: 'u3', date: '2026.02', title: 'HIGH-FREQUENCY BIST STOCK DATA ENGINE', category: 'FINTECH' },
];

export const capabilities = [
  {
    number: '01',
    title: 'AGENTIC AI & AUTOMATION',
    description: 'Multi-model AI workflows, LLM agents (Gemini 2.5, Vertex AI, OpenAI), RAG vector retrieval, and autonomous content pipelines managing hundreds of accounts.',
    technologies: ['Python', 'FastAPI', 'Gemini AI', 'Vertex AI', 'LangChain', 'Playwright', 'FFmpeg'],
  },
  {
    number: '02',
    title: 'FULL-STACK WEB PRODUCTS',
    description: 'Scalable web platforms, microservices architecture, real-time WebSocket communication, and responsive Three.js/WebGL interactive interfaces.',
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
  },
  {
    number: '03',
    title: 'FINTECH & DATA ENGINES',
    description: 'High-speed financial data collection, stock market whale tracking algorithms, automated order flow monitoring, and instant Telegram alert systems.',
    technologies: ['Python', 'Redis', 'WebSockets', 'SQLite', 'Pandas', 'REST APIs'],
  },
];

export const projects = [
  {
    id: 'nexus',
    slug: 'nexus-ai',
    number: '01',
    title: 'NEXUS',
    subtitle: 'AI Content Command Center',
    category: 'AI SYSTEMS',
    year: '2026',
    role: 'Lead Architect & Developer',
    description: 'Enterprise-grade AI content platform managing 260+ accounts with a 17-tab dashboard. Features autonomous video production pipeline, multi-model image generation, Instagram style cloning, and real-time SSE streaming.',
    technologies: ['Python', 'FastAPI', 'Gemini AI', 'FFmpeg', 'Playwright', 'SQLite'],
    link: null,
    github: null,
    featured: true,
  },
  {
    id: 'hareki',
    slug: 'hareki-dna',
    number: '02',
    title: 'HAREKI',
    subtitle: 'AI Editorial DNA Platform',
    category: 'FULL-STACK',
    year: '2026',
    role: 'Creator & Full-Stack Engineer',
    description: 'SaaS platform that analyzes brand websites to create an "Editorial DNA" and generates personalized social media content. Supports 9 languages, Stripe billing, and 223 profession profiles.',
    technologies: ['Next.js', 'TypeScript', 'React 19', 'Supabase', 'MongoDB', 'Stripe'],
    link: 'https://hareki.com',
    github: null,
    featured: true,
  },
  {
    id: 'tekeapp',
    slug: 'teke-app',
    number: '03',
    title: 'TEKE.APP',
    subtitle: 'AI Social Media Studio',
    category: 'AI SYSTEMS',
    year: '2025',
    role: 'Full-Stack Developer',
    description: 'AI-powered social media content creation platform with Vertex AI image generation (Gemini + Imagen 4.0), Instagram auto-publishing, carousel generation, and style analysis.',
    technologies: ['FastAPI', 'Vertex AI', 'Vanilla JS', 'Oracle Cloud', 'Google Drive API'],
    link: 'https://teke.app',
    github: null,
    featured: true,
  },
  {
    id: 'bist-tracker',
    slug: 'bist-tracker',
    number: '04',
    title: 'BIST WHALE TRACKER',
    subtitle: 'Stock Market Intelligence Engine',
    category: 'FINTECH',
    year: '2026',
    role: 'Core Developer',
    description: 'Automated stock market monitoring system detecting institutional volume surges and whale movements in Borsa Istanbul, sending instant alerts via Telegram.',
    technologies: ['Python', 'Redis', 'WebSockets', 'SQLite', 'Telegram Bot API'],
    link: null,
    github: null,
    featured: true,
  },
];
