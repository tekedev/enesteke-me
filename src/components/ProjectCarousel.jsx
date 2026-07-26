import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PROJECTS = [
  {
    title: 'NEXUS AI Command Center',
    category: 'AI & Automation',
    year: '2026',
    image: '/images/projects/nexus.jpg',
    tags: ['Python', 'FastAPI', 'Playwright'],
  },
  {
    title: 'WHALETRACE BIST Tracker',
    category: 'FinTech & Trading',
    year: '2026',
    image: '/images/projects/whaletrace.jpg',
    tags: ['Python', 'FastAPI', 'Docker'],
  },
  {
    title: 'VISIONTRADER Bot',
    category: 'FinTech & Trading',
    year: '2025',
    image: '/images/projects/visiontrader.jpg',
    tags: ['OpenCV', 'EasyOCR', 'Python'],
  },
  {
    title: 'SMS Campaign & CRM',
    category: 'Mobile & Web',
    year: '2025',
    image: '/images/projects/sms-crm.jpg',
    tags: ['Flutter', 'Dart', 'Mobile'],
  },
  {
    title: 'HAREKI Studio SaaS',
    category: 'AI & Automation',
    year: '2026',
    image: '/images/projects/hareki.jpg',
    tags: ['Next.js 16', 'Supabase', 'Stripe'],
  },
  {
    title: 'NEBULA 3D Galaxy',
    category: 'Creative & R&D',
    year: '2025',
    image: '/images/projects/nebula.jpg',
    tags: ['Three.js', 'WebGL', 'N-body'],
  },
];

export default function ProjectCarousel() {
  const mountRef = useRef(null);
  const activeIndexRef = useRef(2);
  const [activeProject, setActiveProject] = useState(PROJECTS[2]);
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ═══ LOAD TEXTURES & CREATE PLANES ═══
    const textureLoader = new THREE.TextureLoader();
    const planes = [];
    const CARD_W = 3.2;
    const CARD_H = 1.8;
    const SPACING = 3.8;

    PROJECTS.forEach((proj, i) => {
      const tex = textureLoader.load(proj.image);
      tex.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Position in arc
      const offset = i - 2;
      mesh.position.x = offset * SPACING;
      mesh.position.z = -Math.abs(offset) * 1.5;
      mesh.rotation.y = -offset * 0.25;

      scene.add(mesh);
      planes.push({ mesh, mat, index: i });
    });

    // ═══ AMBIENT LIGHT ═══
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // ═══ TARGET POSITIONS ═══
    let targetOffset = 0;
    let currentOffset = 0;

    // ═══ SCROLL / DRAG ═══
    let isDragging = false;
    let startX = 0;
    let dragDelta = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches?.[0]?.clientX || 0;
      dragDelta = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX || e.touches?.[0]?.clientX || 0;
      dragDelta = (x - startX) * 0.005;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;

      // Snap to nearest project
      targetOffset = Math.round(targetOffset + dragDelta);
      targetOffset = Math.max(-(PROJECTS.length - 1), Math.min(0, targetOffset));

      const newIdx = -targetOffset;
      activeIndexRef.current = Math.max(0, Math.min(PROJECTS.length - 1, newIdx));
      setActiveIdx(activeIndexRef.current);
      setActiveProject(PROJECTS[activeIndexRef.current]);

      dragDelta = 0;
    };

    const onWheel = (e) => {
      const dir = Math.sign(e.deltaY);
      targetOffset -= dir;
      targetOffset = Math.max(-(PROJECTS.length - 1), Math.min(0, targetOffset));

      const newIdx = -targetOffset;
      activeIndexRef.current = Math.max(0, Math.min(PROJECTS.length - 1, newIdx));
      setActiveIdx(activeIndexRef.current);
      setActiveProject(PROJECTS[activeIndexRef.current]);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // ═══ ANIMATE ═══
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const smoothOffset = targetOffset + (isDragging ? dragDelta : 0);
      currentOffset += (smoothOffset - currentOffset) * 0.08;

      planes.forEach((p, i) => {
        const offset = i + currentOffset;
        p.mesh.position.x = offset * SPACING;
        p.mesh.position.z = -Math.abs(offset) * 1.8;
        p.mesh.rotation.y = -offset * 0.2;

        // Active card is brighter and closer
        const isActive = i === activeIndexRef.current;
        const targetOpacity = isActive ? 1.0 : 0.5;
        p.mat.opacity += (targetOpacity - p.mat.opacity) * 0.1;

        const targetScale = isActive ? 1.1 : 0.9;
        const currentScale = p.mesh.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        p.mesh.scale.set(newScale, newScale, newScale);
      });

      renderer.render(scene, camera);
    };
    animate();

    // ═══ RESIZE ═══
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      planes.forEach(p => { p.mesh.geometry.dispose(); p.mat.dispose(); });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <span className="carousel-label">WORKS</span>
        <span className="carousel-counter">{String(activeIdx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
      </div>

      <div ref={mountRef} className="carousel-canvas" />

      <div className="carousel-info">
        <div className="carousel-meta">
          <span className="carousel-year">{activeProject.year}</span>
          <span className="carousel-cat">{activeProject.category}</span>
        </div>
        <h3 className="carousel-title">{activeProject.title}</h3>
        <div className="carousel-tags">
          {activeProject.tags.map((tag, i) => (
            <span key={i} className="carousel-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="carousel-hint">
        <span>← drag or scroll →</span>
      </div>
    </div>
  );
}
