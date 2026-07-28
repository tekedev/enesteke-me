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
  // World-space angular and depth coordinate calculation for spatial room
  float angularCoordinate = atan(vWorldPosition.z, vWorldPosition.y);
  float angularGrid = abs(sin(angularCoordinate * 12.0));
  float depthGrid = abs(sin(vWorldPosition.x * 1.2));

  float angularLine = smoothstep(0.955, 1.0, angularGrid);
  float depthLine = smoothstep(0.960, 1.0, depthGrid);
  float distanceFade = smoothstep(14.0, 1.8, length(vViewPosition));

  vec3 angularColor = vec3(0.22, 0.24, 0.28) * angularLine;
  vec3 depthColor = vec3(0.14, 0.16, 0.18) * depthLine;

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
  
  float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.8);
  vec3 baseColor = vec3(0.14, 0.145, 0.16);
  vec3 specularColor = vec3(0.98, 0.98, 1.0);
  vec3 limeRim = vec3(0.84, 1.0, 0.0) * 0.10;
  
  vec3 finalColor = mix(baseColor, specularColor, fresnel * 0.82) + limeRim * fresnel;
  gl_FragColor = vec4(finalColor, uIntroProgress * 0.98);
}
`;

interface ETMonogramSceneProps {
  roughness?: number;
  noiseScale?: number;
  scrollState?: 'hero' | 'works' | 'manifesto';
  introProgress?: number;
  onContextLost?: () => void;
  onSceneReady?: () => void;
}

export default function ETMonogramScene({
  roughness = 0.10,
  noiseScale = 9.00,
  scrollState = 'hero',
  introProgress = 1,
  onContextLost,
  onSceneReady,
}: ETMonogramSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const logoMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderSingleFrameRef = useRef<(() => void) | null>(null);

  const isMobile = window.innerWidth <= 900;
  const introProgressRef = useRef(introProgress);

  useEffect(() => {
    introProgressRef.current = introProgress;
    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uIntroProgress.value = introProgress;
    }
    if (logoMaterialRef.current) {
      logoMaterialRef.current.uniforms.uIntroProgress.value = introProgress;
    }
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
  }, [introProgress]);

  const getScrollTransform = (state: string) => {
    switch (state) {
      case 'works':
      case 'manifesto':
        return { posX: 14.0, posY: 0, scale: 0.1, bgContrast: 0.0, wireframeOpacity: 0.0 };
      case 'hero':
      default:
        return {
          posX: isMobile ? 1.8 : 3.8,
          posY: isMobile ? -3.2 : 0.1,
          scale: isMobile ? 0.35 : 0.95,
          bgContrast: isMobile ? 0.16 : 0.34,
          wireframeOpacity: isMobile ? 0.005 : 0.035
        };
    }
  };

  const targetTransformRef = useRef(getScrollTransform(scrollState));
  const sceneVisibleRef = useRef(scrollState === 'hero');
  const onSceneReadyRef = useRef(onSceneReady);
  onSceneReadyRef.current = onSceneReady;

  useEffect(() => {
    targetTransformRef.current = getScrollTransform(scrollState);
    sceneVisibleRef.current = scrollState === 'hero';
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (renderSingleFrameRef.current) renderSingleFrameRef.current();
    };

    canvasEl.addEventListener('webglcontextlost', handleContextLost);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;
    const scene = new THREE.Scene();

    // World-Space Inverted Cylinder Spatial Room Mesh
    const roomGeometry = new THREE.CylinderGeometry(10, 10, 18, 48, 24, true);
    roomGeometry.rotateZ(Math.PI / 2);

    const roomMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      vertexShader: roomVertexShader,
      fragmentShader: roomFragmentShader,
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

    // Create Distinct 3D E and T Shapes with Distinct Spatial Depth Limits
    const logoGroup = new THREE.Group();

    // Extended E Letter Shape
    const eShape = new THREE.Shape();
    eShape.moveTo(-3.2, 4.0);
    eShape.lineTo(0.2, 4.0); // Extended top arm
    eShape.lineTo(0.2, 2.6);
    eShape.lineTo(-1.8, 2.6);
    eShape.lineTo(-1.8, 0.7);
    eShape.lineTo(0.1, 0.7); // Extended middle arm
    eShape.lineTo(0.1, -0.7);
    eShape.lineTo(-1.8, -0.7);
    eShape.lineTo(-1.8, -2.6);
    eShape.lineTo(0.2, -2.6); // Extended bottom arm
    eShape.lineTo(0.2, -4.0);
    eShape.lineTo(-3.2, -4.0);
    eShape.closePath();

    const eExtrudeSettings = { steps: 4, depth: 1.2, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.2, bevelSegments: 10 };
    const eGeometry = new THREE.ExtrudeGeometry(eShape, eExtrudeSettings);
    eGeometry.center();

    // Narrowed T Letter Shape
    const tShape = new THREE.Shape();
    tShape.moveTo(0.2, 4.0);
    tShape.lineTo(3.4, 4.0);
    tShape.lineTo(3.4, 2.6);
    tShape.lineTo(2.2, 2.6);
    tShape.lineTo(2.2, -4.0);
    tShape.lineTo(1.4, -4.0); // 30% Narrower stem
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
    eMesh.position.set(-0.72, 0, 0.18);
    eOutline.position.copy(eMesh.position);

    const tMesh = new THREE.Mesh(tGeometry, logoMaterial);
    const tOutline = new THREE.Mesh(tGeometry, outlineMaterial);
    tMesh.position.set(0.68, 0.10, -0.22);
    tMesh.scale.x = 0.62;
    tOutline.position.copy(tMesh.position);
    tOutline.scale.x = 0.62;

    logoGroup.add(eMesh);
    logoGroup.add(eOutline);
    logoGroup.add(tMesh);
    logoGroup.add(tOutline);
    scene.add(logoGroup);

    let targetMouse = new THREE.Vector2(0, 0);
    let currentMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / width) * 2 - 1;
      targetMouse.y = -(e.clientY / height) * 2 + 1;
    };

    let firstRenderSignaled = false;
    let currentOpacity = 1;

    const renderPass = (time: number = 0) => {
      const target = targetTransformRef.current;
      const targetOpacity = sceneVisibleRef.current ? 1 : 0;
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      container.style.opacity = currentOpacity.toFixed(3);

      if (currentOpacity < 0.01) return;

      const p = introProgressRef.current;
      const currentHeroScale = THREE.MathUtils.lerp(0.25, target.scale, p);
      logoGroup.scale.set(currentHeroScale, currentHeroScale, currentHeroScale);
      logoGroup.position.set(target.posX, target.posY, 0);

      roomMesh.scale.setScalar(THREE.MathUtils.lerp(0.72, 1, p));
      outlineMaterial.opacity = target.wireframeOpacity * p;
      roomMaterial.uniforms.uBgContrast.value = target.bgContrast;
      roomMaterial.uniforms.uTime.value = time;

      if (renderer) {
        renderer.render(scene, camera);
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
      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
      }

      const animate = () => {
        if (isPaused) return;
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        currentMouse.lerp(targetMouse, 0.055);

        // Enhanced Camera Yaw & Pitch Pointer Parallax
        if (!isMobile) {
          camera.position.x = currentMouse.x * 0.62;
          camera.position.y = currentMouse.y * 0.38;
          camera.lookAt(currentMouse.x * 0.30, currentMouse.y * 0.18, -0.9);
          roomMesh.rotation.y = currentMouse.x * 0.13;
          roomMesh.rotation.z = currentMouse.y * -0.055;
        }

        const target = targetTransformRef.current;
        logoGroup.position.x += (target.posX - logoGroup.position.x) * 0.05;
        logoGroup.position.y += (target.posY - logoGroup.position.y) * 0.05;

        roomMaterial.uniforms.uPointer.value.copy(currentMouse);

        if (!isMobile) {
          const targetRotX = currentMouse.y * -0.28;
          const targetRotY = currentMouse.x * 0.42;
          const q = new THREE.Quaternion();
          q.setFromEuler(new THREE.Euler(targetRotX + Math.sin(time * 0.3) * 0.02, targetRotY + Math.cos(time * 0.25) * 0.02, 0));
          logoGroup.quaternion.slerp(q, 0.08);
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
        if (prefersReducedMotion) {
          renderPass(0);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
      if (!isMobile) {
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#000000',
        transition: 'opacity 0.5s ease',
      }}
    />
  );
}
