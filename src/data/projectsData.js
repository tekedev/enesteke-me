export const skills = [
  {
    category: "Frontend & UI Engineering",
    icon: "palette",
    description: "Modern, akıcı ve görsel olarak büyüleyici arayüzler",
    items: [
      { name: "React 19 / Next.js 16", level: "Expert" },
      { name: "TypeScript & JavaScript", level: "Expert" },
      { name: "Framer Motion & CSS Animations", level: "Advanced" },
      { name: "Three.js & WebGL 3D", level: "Advanced" },
      { name: "Vanilla CSS & Glassmorphism", level: "Expert" },
      { name: "Responsive & Editorial Layouts", level: "Expert" }
    ]
  },
  {
    category: "Backend & System Engineering",
    icon: "server",
    description: "Yüksek performanslı, async ve ölçeklenebilir sunucu altyapıları",
    items: [
      { name: "Python (FastAPI / Flask)", level: "Expert" },
      { name: "Node.js & Express", level: "Advanced" },
      { name: "Playwright & Selenium Automation", level: "Expert" },
      { name: "FFmpeg Video Processing", level: "Advanced" },
      { name: "WebSockets & Real-Time SSE", level: "Advanced" },
      { name: "C / C++ Core Utilities", level: "Intermediate" }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: "cpu",
    description: "Yapay zeka modelleri ve otonom içerik hatları entegrasyonu",
    items: [
      { name: "Google Gemini API & Vertex AI", level: "Expert" },
      { name: "OpenAI GPT-4 Integration", level: "Advanced" },
      { name: "OpenCV & EasyOCR Computer Vision", level: "Advanced" },
      { name: "GCP Video Intelligence API", level: "Advanced" },
      { name: "AI Style Cloning & Content Pipelines", level: "Expert" }
    ]
  },
  {
    category: "FinTech & Quantitative Trading",
    icon: "trending-up",
    description: "Borsa verileri, balina takibi ve indikatör sistemleri",
    items: [
      { name: "BIST Data Scrapers & Analytics", level: "Expert" },
      { name: "Technical Indicators (RSI, MACD, MA)", level: "Advanced" },
      { name: "Telethon Telegram Alert Bots", level: "Expert" },
      { name: "Volume Profiling & Orderbook Engines", level: "Advanced" }
    ]
  },
  {
    category: "DevOps, Cloud & Infrastructure",
    icon: "cloud",
    description: "Sunucu yönetimi, Docker konteynerizasyon ve dağıtım",
    items: [
      { name: "Oracle Cloud Infrastructure (OCI)", level: "Advanced" },
      { name: "Docker & Container Architecture", level: "Advanced" },
      { name: "Nginx Reverse Proxy & SSL", level: "Advanced" },
      { name: "Ubuntu Linux & Bash Scripting", level: "Advanced" },
      { name: "Multi-Profile Browser & SOCKS5 Proxies", level: "Expert" }
    ]
  },
  {
    category: "Databases & Storage",
    icon: "database",
    description: "Veri mimarileri ve güvenli depolama",
    items: [
      { name: "PostgreSQL & SQLite", level: "Advanced" },
      { name: "Supabase & MongoDB", level: "Advanced" },
      { name: "Redis Caching", level: "Advanced" },
      { name: "Firebase Firestore", level: "Advanced" }
    ]
  }
];

export const projects = [
  // FEATURED PUBLIC PROJECTS
  {
    id: "sms-campaign-crm",
    name: "SMS Kampanya & CRM",
    subtitle: "Mobile Campaign & Client Management App",
    description: "Toplu SMS kampanya yönetimi ve rehber CRM mobil uygulaması. Kullanıcı dostu arayüz ve hızlı rehber işleme.",
    category: "mobile",
    tags: ["Flutter", "Dart", "Mobile CRM", "SQLite"],
    github: "https://github.com/tekedev/sms-campaign-crm",
    demo: null,
    featured: true,
    size: "large",
    isPrivateCode: false
  },
  {
    id: "hareki-studio",
    name: "HAREKI Studio",
    subtitle: "AI Editorial DNA Platform",
    description: "Marka web sitesini analiz edip Editorial DNA çıkaran ve 9 dilde sosyal medya içeriği üreten SaaS platformu.",
    category: "ai",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Stripe", "OpenAI"],
    github: "https://github.com/tekedev/hareki-studio",
    demo: "https://hareki.com",
    featured: true,
    size: "large",
    isPrivateCode: false
  },
  {
    id: "whaletrace",
    name: "WHALETRACE BIST Tracker",
    subtitle: "Real-time Stock Market Whale Tracking",
    description: "BIST borsasında büyük hacimli işlemleri (balinaları) tespit eden, indikatör analizi yapan ve Telegram alarmları gönderen sistem.",
    category: "fintech",
    tags: ["Python", "FastAPI", "Telethon", "Docker", "Telegram"],
    github: "https://github.com/tekedev/whaletrace-bist-tracker",
    demo: null,
    featured: true,
    size: "large",
    isPrivateCode: false
  },
  {
    id: "vision-trader",
    name: "VISIONTRADER Bot",
    subtitle: "Computer Vision & OCR Powered Trader",
    description: "Ekran yakalama, OpenCV görüntü işleme ve EasyOCR ile canlı borsa ekranlarını okuyup otomatik alım-satım yapan bot.",
    category: "fintech",
    tags: ["Python", "OpenCV", "EasyOCR", "Tesseract"],
    github: "https://github.com/tekedev/vision-trader-bot",
    demo: null,
    featured: true,
    size: "medium",
    isPrivateCode: false
  },
  {
    id: "nebula",
    name: "NEBULA 3D Galaxy",
    subtitle: "Real-time N-body Galaxy Simulator",
    description: "WebGL ve Three.js kullanarak gerçek zamanlı galaksi oluşumu ve parçacık fiziği simülasyonu.",
    category: "creative",
    tags: ["Three.js", "WebGL", "JavaScript", "Physics Engine"],
    github: "https://github.com/tekedev/nebula-3d-galaxy",
    demo: null,
    featured: true,
    size: "medium",
    isPrivateCode: false
  },

  // CASE STUDY / ARCHITECTURE HIGHLIGHTS (PRIVATE CODE, ZERO LEAK)
  {
    id: "nexus-ai",
    name: "NEXUS AI Command Center",
    subtitle: "High-Concurrency AI Content Pipeline",
    description: "260+ Google hesabı yöneten, 17-tab'lı devasa AI içerik üretim paneli. Otonom video üretimi, görsel stil klonlama ve real-time SSE akışı.",
    category: "ai",
    tags: ["Python", "FastAPI", "Playwright", "SQLite", "FFmpeg"],
    github: null,
    demo: null,
    featured: true,
    size: "large",
    isPrivateCode: true,
    caseStudy: {
      metrics: ["260+ Google Accounts Managed", "17-Tab Master Dashboard", "50,000+ Lines of Code", "Real-Time SSE Streaming"],
      architecture: "Python FastAPI backend with Playwright headful/headless workers, SQLite connection pooling, and custom async task queue.",
      highlights: [
        "Autonomous multi-account rotation & IP rate-limit evasion",
        "Multi-model image generation & Instagram style cloning engine",
        "FFmpeg hardware-accelerated video rendering pipeline"
      ]
    }
  },
  {
    id: "shadowmaps",
    name: "SHADOWMAPS Multi-Profile Manager",
    subtitle: "Desktop Browser Profile & Network Isolator",
    description: "100+ Gmail hesabını izole Firefox profilleriyle yöneten, SOCKS5 proxy ve VPN rotasyonu sağlayan masaüstü uygulaması.",
    category: "tools",
    tags: ["Electron", "Node.js", "SQLite", "Firefox Engine", "VPN"],
    github: null,
    demo: null,
    featured: true,
    size: "medium",
    isPrivateCode: true,
    caseStudy: {
      metrics: ["100+ Isolated Firefox Instances", "SOCKS5 Proxy Rotation", "Custom Electron GUI", "Zero Profile Fingerprint Cross-Talk"],
      architecture: "Electron main-process orchestrating headless & headful Firefox profile containers with custom SQLite session store.",
      highlights: [
        "Per-account proxy, user-agent, and fingerprint isolation",
        "Automated session recovery & health check background workers",
        "Windscribe VPN API integration for IP rotation"
      ]
    }
  },
  {
    id: "mapforge",
    name: "MAPFORGE Lead Suite",
    subtitle: "B2B Lead Intelligence & Multi-Channel Outreach",
    description: "Google Maps verilerini tarayan, SMS ve WhatsApp ile otomatik kişiselleştirilmiş kampanya gönderen B2B pazarlama sistemi.",
    category: "tools",
    tags: ["Python", "PyQt6", "FastAPI", "Playwright", "Twilio", "Gemini AI"],
    github: null,
    demo: null,
    featured: false,
    size: "large",
    isPrivateCode: true,
    caseStudy: {
      metrics: ["81 Province Coverage", "3 User Interfaces (GUI, Web, CLI)", "AI Personalized Outreach"],
      architecture: "PyQt6 desktop GUI communicating with FastAPI local engine for Playwright scrapers and Gemini AI messaging.",
      highlights: [
        "Gemini AI prompt engine for business-specific message creation",
        "Multi-channel SMS & WhatsApp messaging queue",
        "High-volume data cleaning & deduplication engine"
      ]
    }
  }
];
