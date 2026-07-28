import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const roomVertexShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uDisplacement;
uniform float uIntroProgress;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;

float waveNoise(vec3 p) {
  float a = sin(p.x * 0.72 + uTime * 0.22);
  float b = sin(p.y * 0.48 - uTime * 0.17);
  float c = sin((p.x + p.y) * 0.31 + uPointer.x * 1.4);
  return (a + b + c) / 3.0;
}

void main() {
  vUv = uv;
  vec3 transformed = position;
  float pointerFalloff = smoothstep(1.2, 0.0, distance(uv, vec2(0.5 + uPointer.x * 0.12, 0.5 - uPointer.y * 0.12)));
  float displacement = waveNoise(position * 0.36) * uDisplacement + pointerFalloff * uPointer.x * 0.18;
  transformed += normal * displacement * uIntroProgress;

  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
  vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);

  vWorldPosition = worldPosition.xyz;
  vViewPosition = viewPosition.xyz;
  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * viewPosition;
}
`;

const roomFragmentShader = `
uniform vec2 uPointer;
uniform float uTime;
uniform float uBgContrast;
uniform float uIntroProgress;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {
  float angularCoordinate = atan(vWorldPosition.z, vWorldPosition.y);
  float angularGrid = abs(sin(angularCoordinate * 12.0));
  float depthGrid = abs(sin(vWorldPosition.x * 1.2));

  float angularLine = smoothstep(0.955, 1.0, angularGrid);
  float depthLine = smoothstep(0.960, 1.0, depthGrid);
  float distanceFade = smoothstep(14.0, 1.8, length(vViewPosition));

  vec3 angularColor = vec3(0.26, 0.28, 0.32) * angularLine;
  vec3 depthColor = vec3(0.18, 0.20, 0.22) * depthLine;

  float gridFactor = max(angularLine, depthLine) * distanceFade * uBgContrast * uIntroProgress;

  vec2 pointerCenter = vec2(0.5 + uPointer.x * 0.18, 0.5 - uPointer.y * 0.14);
  float pointerLight = smoothstep(0.78, 0.0, distance(vUv, pointerCenter));

  vec3 baseRoom = vec3(0.012, 0.014, 0.018);
  vec3 gridColor = (angularColor + depthColor) * gridFactor * 1.4;
  vec3 neutralLight = vec3(0.26, 0.28, 0.35) * pointerLight * 0.35;
  vec3 limeRim = vec3(0.84, 1.0, 0.0) * 0.06 * pointerLight * uIntroProgress;

  vec3 finalRoom = baseRoom + gridColor + neutralLight * distanceFade + limeRim;
  gl_FragColor = vec4(finalRoom, 1.0);
}
`;

const logoVertexShader = `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const logoFragmentShader = `
uniform float uRoughness;
uniform vec2 uPointer;
uniform float uIntroProgress;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  vec3 keyLightDir = normalize(vec3(1.4 + uPointer.x * 1.2, 1.8 + uPointer.y * 0.8, 2.2));
  vec3 fillLightDir = normalize(vec3(-2.2, -0.8, 1.2));
  vec3 rimLightDir = normalize(vec3(0.0, 2.5, -2.0));

  float keyDiff = max(dot(normal, keyLightDir), 0.0);
  float fillDiff = max(dot(normal, fillLightDir), 0.0);
  float rimDiff = max(dot(normal, rimLightDir), 0.0);

  vec3 halfVectorKey = normalize(keyLightDir + viewDir);
  float specKey = pow(max(dot(normal, halfVectorKey), 0.0), mix(64.0, 16.0, uRoughness));

  vec3 darkBase = vec3(0.04, 0.045, 0.052);
  vec3 keyColor = vec3(0.88, 0.90, 0.95) * keyDiff * 0.75;
  vec3 fillColor = vec3(0.22, 0.25, 0.32) * fillDiff * 0.35;
  vec3 specularColor = vec3(1.0, 1.0, 0.95) * specKey * (1.0 - uRoughness * 0.6);

  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
  vec3 limeFresnel = vec3(0.84, 1.0, 0.0) * fresnel * 0.28 * uIntroProgress;

  vec3 finalColor = darkBase + keyColor + fillColor + specularColor + limeFresnel;
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export interface ETMonogramSceneProps {
  roughness?: number;
  noiseScale?: number;
  scrollState?: 'hero' | 'works' | 'manifesto';
  heroExitProgress?: number;
  worksEntryProgress?: number;
  worksExitProgress?: number;
  worksProgress?: number;
  introProgress?: number;
  onContextLost?: () => void;
  onSceneReady?: () => void;
}

export default function ETMonogramScene({
  roughness = 0.10,
  noiseScale = 9.00,
  scrollState = 'hero',
  heroExitProgress = 0,
  worksEntryProgress = 0,
  worksExitProgress = 0,
  worksProgress = 0,
  introProgress = 1,
  onContextLost,
  onSceneReady,
}: ETMonogramSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const logoMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderSingleFrameRef = useRef<(() => void) | null>(null);

  const isMobile = window.innerWidth <= 900;
  const isScrollAudit = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('scrollAudit') === '1';

  const introProgressRef = useRef(introProgress);
  const worksEntryProgressRef = useRef(worksEntryProgress);
  const worksExitProgressRef = useRef(worksExitProgress);
  const worksProgressRef = useRef(worksProgress);
  const heroExitProgressRef = useRef(heroExitProgress);

  useEffect(() => {
    introProgressRef.current = introProgress;
    worksEntryProgressRef.current = worksEntryProgress;
    worksExitProgressRef.current = worksExitProgress;
    worksProgressRef.current = worksProgress;
    heroExitProgressRef.current = heroExitProgress;
    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uIntroProgress.value = introProgress;
    }
    if (logoMaterialRef.current) {
      logoMaterialRef.current.uniforms.uIntroProgress.value = introProgress;
    }
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
  }, [introProgress, worksEntryProgress, worksExitProgress, worksProgress, heroExitProgress]);

  const sceneVisibleRef = useRef(scrollState !== 'manifesto');
  const onSceneReadyRef = useRef(onSceneReady);
  onSceneReadyRef.current = onSceneReady;

  useEffect(() => {
    sceneVisibleRef.current = scrollState !== 'manifesto';
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
  }, [scrollState]);

  useEffect(() => {
    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uNoiseScale.value = noiseScale;
    }
    if (logoMaterialRef.current) {
      logoMaterialRef.current.uniforms.uRoughness.value = roughness;
    }
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
  }, [roughness, noiseScale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvasEl = document.createElement('canvas');
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.pointerEvents = 'none';
    container.appendChild(canvasEl);

    let renderer: THREE.WebGLRenderer | null = null;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (onContextLost) onContextLost();
    };

    const handleContextRestored = () => {
      if (renderer) {
        renderer.dispose();
      }
    };

    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
    } catch {
      if (onContextLost) onContextLost();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const roomGeometry = new THREE.CylinderGeometry(12, 12, 28, 64, 48, true);
    const roomMaterial = new THREE.ShaderMaterial({
      vertexShader: roomVertexShader,
      fragmentShader: roomFragmentShader,
      side: THREE.BackSide,
      uniforms: {
        uPointer: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uNoiseScale: { value: noiseScale },
        uBgContrast: { value: 0.34 },
        uDisplacement: { value: isMobile ? 0.025 : 0.085 },
        uIntroProgress: { value: introProgressRef.current },
      },
    });
    bgMaterialRef.current = roomMaterial;
    const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(roomMesh);

    // Create 3D ET Logo Shapes
    const logoGroup = new THREE.Group();

    const eShape = new THREE.Shape();
    eShape.moveTo(-3.2, 4.0);
    eShape.lineTo(0.2, 4.0);
    eShape.lineTo(0.2, 2.6);
    eShape.lineTo(-1.8, 2.6);
    eShape.lineTo(-1.8, 0.7);
    eShape.lineTo(0.1, 0.7);
    eShape.lineTo(0.1, -0.7);
    eShape.lineTo(-1.8, -0.7);
    eShape.lineTo(-1.8, -2.6);
    eShape.lineTo(0.2, -2.6);
    eShape.lineTo(0.2, -4.0);
    eShape.lineTo(-3.2, -4.0);
    eShape.closePath();

    const eExtrudeSettings = { steps: 4, depth: 1.2, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.2, bevelSegments: 10 };
    const eGeometry = new THREE.ExtrudeGeometry(eShape, eExtrudeSettings);
    eGeometry.center();

    const tShape = new THREE.Shape();
    tShape.moveTo(0.2, 4.0);
    tShape.lineTo(3.4, 4.0);
    tShape.lineTo(3.4, 2.6);
    tShape.lineTo(2.2, 2.6);
    tShape.lineTo(2.2, -4.0);
    tShape.lineTo(1.4, -4.0);
    tShape.lineTo(1.4, 2.6);
    tShape.lineTo(0.2, 2.6);
    tShape.closePath();

    const tExtrudeSettings = { steps: 4, depth: 1.5, bevelEnabled: true, bevelThickness: 0.35, bevelSize: 0.25, bevelSegments: 10 };
    const tGeometry = new THREE.ExtrudeGeometry(tShape, tExtrudeSettings);
    tGeometry.center();

    const logoMaterial = new THREE.ShaderMaterial({
      vertexShader: logoVertexShader,
      fragmentShader: logoFragmentShader,
      uniforms: {
        uRoughness: { value: roughness },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uIntroProgress: { value: introProgressRef.current },
      },
      transparent: true,
    });
    logoMaterialRef.current = logoMaterial;

    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0xd7ff00,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.005 : 0.035,
    });

    const eMesh = new THREE.Mesh(eGeometry, logoMaterial);
    const eOutline = new THREE.Mesh(eGeometry, outlineMaterial);
    eMesh.position.set(-0.85, 0, 0.18);
    eOutline.position.copy(eMesh.position);

    const tMesh = new THREE.Mesh(tGeometry, logoMaterial);
    const tOutline = new THREE.Mesh(tGeometry, outlineMaterial);
    tMesh.position.set(0.82, 0.14, -0.08);
    tMesh.scale.x = 0.72;
    tOutline.position.copy(tMesh.position);
    tOutline.scale.x = 0.72;

    logoGroup.add(eMesh);
    logoGroup.add(eOutline);
    logoGroup.add(tMesh);
    logoGroup.add(tOutline);
    scene.add(logoGroup);

    let targetMouse = new THREE.Vector2(0, 0);
    let currentMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrollAudit) return;
      targetMouse.x = (e.clientX / width) * 2 - 1;
      targetMouse.y = -(e.clientY / height) * 2 + 1;
    };

    let firstRenderSignaled = false;
    let frameId = 0;

    const renderPass = (time: number = 0) => {
      frameId++;
      const entry = Math.max(0, Math.min(1, worksEntryProgressRef.current));
      const heroTransform = {
        posX: isMobile ? 1.8 : 3.8,
        posY: isMobile ? -3.2 : 0.1,
        scale: isMobile ? 0.35 : 0.95,
        bgContrast: isMobile ? 0.16 : 0.34,
        wireframeOpacity: isMobile ? 0.005 : 0.035,
      };

      const worksTransformTarget = {
        posX: isMobile ? -0.4 : -1.35,
        posY: isMobile ? 0.8 : 0.05,
        scale: isMobile ? 0.38 : 0.58,
        bgContrast: 0.20,
        wireframeOpacity: isMobile ? 0.008 : 0.018,
      };

      // Direct, Pure Scroll-Linked Position & Scale (No History-Dependent Positional Easing!)
      const targetX = THREE.MathUtils.lerp(heroTransform.posX, worksTransformTarget.posX, entry);
      const targetY = THREE.MathUtils.lerp(heroTransform.posY, worksTransformTarget.posY, entry);
      const targetScale = THREE.MathUtils.lerp(heroTransform.scale, worksTransformTarget.scale, entry);
      const currentBgContrast = THREE.MathUtils.lerp(heroTransform.bgContrast, worksTransformTarget.bgContrast, entry);
      const currentWireframeOpacity = THREE.MathUtils.lerp(heroTransform.wireframeOpacity, worksTransformTarget.wireframeOpacity, entry);

      // Direct, Pure Scroll-Linked ET Exit Opacity without history-dependent easing lag
      const etExitOpacity = 1 - smoothstep(0.00, 0.48, worksExitProgressRef.current);
      const sceneOpacity = scrollState === 'hero' ? 1 : scrollState === 'works' ? etExitOpacity : 0;

      container.style.opacity = sceneOpacity.toFixed(3);

      if (sceneOpacity < 0.01) return;

      const p = introProgressRef.current;
      const currentHeroScale = THREE.MathUtils.lerp(0.25, targetScale, p);

      logoGroup.position.set(targetX, targetY, 0);
      logoGroup.scale.set(currentHeroScale, currentHeroScale, currentHeroScale);
      logoGroup.rotation.z = Math.sin(worksProgressRef.current * Math.PI * 2) * 0.025;

      roomMesh.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, p));
      outlineMaterial.opacity = currentWireframeOpacity * p;
      roomMaterial.uniforms.uBgContrast.value = currentBgContrast;
      roomMaterial.uniforms.uTime.value = time;

      if (renderer) {
        renderer.render(scene, camera);
      }

      // Compute Projected Screen Bounds for ET Box in 2D Viewport Space
      const box = new THREE.Box3().setFromObject(logoGroup);
      const corners = [
        new THREE.Vector3(box.min.x, box.min.y, box.min.z),
        new THREE.Vector3(box.min.x, box.min.y, box.max.z),
        new THREE.Vector3(box.min.x, box.max.y, box.min.z),
        new THREE.Vector3(box.min.x, box.max.y, box.max.z),
        new THREE.Vector3(box.max.x, box.min.y, box.min.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z),
        new THREE.Vector3(box.max.x, box.max.y, box.min.z),
        new THREE.Vector3(box.max.x, box.max.y, box.max.z),
      ];

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      corners.forEach((corner) => {
        corner.project(camera);
        const x = (corner.x * 0.5 + 0.5) * width;
        const y = (-corner.y * 0.5 + 0.5) * height;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      });

      const screenX = Math.round(minX);
      const screenY = Math.round(minY);
      const screenW = Math.round(maxX - minX);
      const screenH = Math.round(maxY - minY);

      if (containerRef.current) {
        containerRef.current.setAttribute('data-et-screen-x', String(screenX));
        containerRef.current.setAttribute('data-et-screen-y', String(screenY));
        containerRef.current.setAttribute('data-et-screen-width', String(screenW));
        containerRef.current.setAttribute('data-et-screen-height', String(screenH));
        containerRef.current.setAttribute('data-et-opacity', sceneOpacity.toFixed(3));
        containerRef.current.setAttribute('data-et-frame-id', String(frameId));
      }

      if (!firstRenderSignaled) {
        firstRenderSignaled = true;
        if (containerRef.current) {
          containerRef.current.setAttribute('data-scene-ready', 'true');
        }
        if (onSceneReadyRef.current) onSceneReadyRef.current();
      }
    };
    renderSingleFrameRef.current = () => renderPass(0);

    const clock = new THREE.Clock();
    let animId: number;
    let isPaused = false;

    if (!prefersReducedMotion) {
      if (!isMobile && !isScrollAudit) {
        window.addEventListener('mousemove', handleMouseMove);
      }

      const animate = () => {
        if (isPaused) return;
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        currentMouse.lerp(targetMouse, 0.055);

        if (!isMobile) {
          camera.position.x = currentMouse.x * 0.62;
          camera.position.y = currentMouse.y * 0.38;
          camera.lookAt(currentMouse.x * 0.30, currentMouse.y * 0.18, -0.9);
          roomMesh.rotation.y = currentMouse.x * 0.13;
          roomMesh.rotation.z = currentMouse.y * -0.055;
        }

        roomMaterial.uniforms.uPointer.value.copy(currentMouse);

        if (!isMobile) {
          if (isScrollAudit) {
            logoGroup.quaternion.identity();
          } else {
            const targetRotX = currentMouse.y * -0.28;
            const targetRotY = currentMouse.x * 0.42;
            const q = new THREE.Quaternion();
            q.setFromEuler(new THREE.Euler(targetRotX + Math.sin(time * 0.3) * 0.02, targetRotY + Math.cos(time * 0.25) * 0.02, 0));
            logoGroup.quaternion.slerp(q, 0.08);
          }
        }

        renderPass(time);
      };
      animate();

      const handleVisibilityChange = () => {
        if (document.hidden) {
          isPaused = true;
          cancelAnimationFrame(animId);
        } else {
          if (isPaused) {
            isPaused = false;
            clock.start();
            animate();
          }
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } else {
      renderPass(0);
    }

    let resizeTimeout: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(width, height);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
      if (!isMobile && !isScrollAudit) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimeout);
      cancelAnimationFrame(animId);
      if (renderer) {
        renderer.dispose();
      }
      roomGeometry.dispose();
      roomMaterial.dispose();
      eGeometry.dispose();
      tGeometry.dispose();
      logoMaterial.dispose();
      outlineMaterial.dispose();
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      data-scene-layer="true"
      data-scene-ready="false"
      data-et-mode={scrollState}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        transition: 'opacity 0.5s ease',
      }}
    />
  );
}
