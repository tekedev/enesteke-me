/* ═══════════════════════════════════════════════════════
   Project Data — Single Source of Truth
   All portfolio content is defined here.
   ═══════════════════════════════════════════════════════ */

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'web', label: 'Web Platforms' },
  { id: 'creative', label: 'Creative' },
  { id: 'tools', label: 'Tools' },
];

export const projects = [
  {
    id: 'nexus',
    name: 'NEXUS',
    subtitle: 'AI Content Command Center',
    description:
      'Enterprise-grade AI content platform managing 260+ accounts with a 17-tab dashboard. Features autonomous video production pipeline, multi-model image generation, Instagram style cloning, and real-time SSE streaming. 50,000+ lines of code.',
    category: 'ai',
    tags: ['Python', 'FastAPI', 'Gemini AI', 'FFmpeg', 'Playwright', 'SQLite'],
    image: '/projects/neonflow.jpg',
    github: null,
    demo: null,
    featured: true,
    size: 'large',
  },
  {
    id: 'hareki',
    name: 'HAREKI',
    subtitle: 'AI Editorial DNA Platform',
    description:
      'SaaS platform that analyzes brand websites to create an "Editorial DNA" and generates personalized social media content. Supports 9 languages, Stripe billing, 223 profession profiles.',
    category: 'ai',
    tags: ['Next.js', 'TypeScript', 'React 19', 'Supabase', 'MongoDB', 'Stripe', 'OpenAI'],
    image: null,
    github: null,
    demo: 'https://hareki.com',
    featured: true,
    size: 'large',
  },
  {
    id: 'tekeapp',
    name: 'TEKE.APP',
    subtitle: 'AI Social Media Studio',
    description:
      'AI-powered social media content creation platform with Vertex AI image generation (Gemini + Imagen 4.0), Instagram auto-publishing, carousel generation, and style analysis.',
    category: 'ai',
    tags: ['FastAPI', 'Vertex AI', 'Vanilla JS', 'Oracle Cloud', 'Google Drive API'],
    image: '/projects/tekeapp.jpg',
    github: null,
    demo: 'https://teke.app',
    featured: true,
    size: 'large',
  },
  {
    id: 'mapforge',
    name: 'MAPFORGE',
    subtitle: 'B2B Lead Intelligence Suite',
    description:
      'Google Maps data extraction and marketing automation tool with SMS/WhatsApp campaigns, AI-powered message personalization, and multi-channel outreach across 81 Turkish cities.',
    category: 'web',
    tags: ['Python', 'PyQt6', 'FastAPI', 'Playwright', 'Twilio', 'Gemini AI'],
    image: null,
    github: null,
    demo: null,
    featured: false,
    size: 'large',
  },
  {
    id: 'fecir',
    name: 'FECIR',
    subtitle: 'Content Management & Auto-Publishing',
    description:
      'Centralized content management platform with auto-publishing to Facebook/Instagram via Meta Graph API, Chrome Extension for video capture, and Docker production deployment.',
    category: 'web',
    tags: ['FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Meta API', 'Chrome Extension'],
    image: null,
    github: null,
    demo: null,
    featured: false,
    size: 'large',
  },
  {
    id: 'whaletrace',
    name: 'WHALETRACE',
    subtitle: 'Stock Market Intelligence',
    description:
      'BIST whale tracking system with opportunity detection, backtesting, sentiment analysis, and real-time Telegram alerts. Deployed on VPS with Docker.',
    category: 'fintech',
    tags: ['Python', 'FastAPI', 'Telethon', 'WebSocket', 'Docker', 'Telegram'],
    image: '/projects/whaletrace.jpg',
    github: null,
    demo: null,
    featured: true,
    size: 'medium',
  },
  {
    id: 'stilmatcher',
    name: 'STILMATCHER',
    subtitle: 'Instagram Style Cloning Engine',
    description:
      'AI-powered Instagram account style analysis and content cloning system. Analyzes visual aesthetics and generates matching content for multiple accounts.',
    category: 'ai',
    tags: ['Python', 'Gemini AI', 'Instagram API', 'Image Processing'],
    image: '/projects/stilmatcher.jpg',
    github: null,
    demo: null,
    featured: false,
    size: 'medium',
  },
  {
    id: 'classify',
    name: 'CLASSIFY',
    subtitle: 'AI Video Intelligence Pipeline',
    description:
      'Automated pipeline that downloads Instagram videos, extracts audio, transcribes with Gemini AI, auto-categorizes content, and uploads organized files to Google Drive.',
    category: 'ai',
    tags: ['Python', 'Flask', 'Gemini AI', 'MoviePy', 'Google Drive API'],
    image: null,
    github: null,
    demo: null,
    featured: false,
    size: 'medium',
  },
  {
    id: 'shadowmaps',
    name: 'SHADOWMAPS',
    subtitle: 'Multi-Profile Browser Manager',
    description:
      'Desktop application managing 100+ browser profiles with isolated Firefox instances, per-account proxy configuration, and VPN integration.',
    category: 'tools',
    tags: ['Electron', 'Node.js', 'SQLite', 'Firefox'],
    image: '/projects/shadowmaps.jpg',
    github: null,
    demo: null,
    featured: false,
    size: 'medium',
  },
  {
    id: 'shopflow',
    name: 'SHOPFLOW',
    subtitle: 'E-Commerce Dashboard',
    description:
      'Modern multi-store e-commerce management dashboard with sales analytics, social media integration, and comprehensive reporting.',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Radix UI', 'Recharts'],
    image: null,
    github: null,
    demo: null,
    featured: false,
    size: 'medium',
  },
  {
    id: 'lovecraft',
    name: 'LOVECRAFT',
    subtitle: "Interactive Couple's Universe",
    description:
      'Interactive romantic web app featuring 12+ mini games, real-time chat, memory albums, drawing board, and heart score gamification. Deployed on Vercel with Firebase backend.',
    category: 'creative',
    tags: ['Vanilla JS', 'Vite', 'Firebase', 'PWA', 'Vercel'],
    image: '/projects/lovecraft.jpg',
    github: null,
    demo: null,
    featured: false,
    size: 'medium',
  },
  {
    id: 'nebula',
    name: 'NEBULA',
    subtitle: 'Galaxy Formation Simulator',
    description:
      'Real-time N-body particle simulation of galaxy formation using WebGL. Features gravity physics, multiple skybox environments, and interactive controls.',
    category: 'creative',
    tags: ['Three.js', 'WebGL', 'JavaScript', 'Physics Engine'],
    image: '/projects/nebula.jpg',
    github: null,
    demo: null,
    featured: false,
    size: 'small',
  },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/tekedev', icon: 'Github' },
  { name: 'LinkedIn', url: '#', icon: 'Linkedin' },
  { name: 'Twitter', url: '#', icon: 'Twitter' },
  { name: 'Email', url: 'mailto:hello@enesteke.me', icon: 'Mail' },
];

export const stats = [
  { label: 'Projects Built', value: '20+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Lines of Code', value: '100K+' },
];
