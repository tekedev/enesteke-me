import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const bgVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const bgFragmentShader = `
uniform vec2 uMouse;
uniform float uTime;
uniform float uNoiseScale;
uniform float uScreenAspectRatio;
uniform float uBgContrast;
varying vec2 vUv;

// Simplex Noise Utilities
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = vUv;
  st.x *= uScreenAspectRatio;
  
  vec2 mouseOffset = uMouse * 0.05;
  float n = snoise((st + mouseOffset) * uNoiseScale + uTime * 0.05);
  float val = (n + 1.0) * 0.5 * uBgContrast * 0.15;
  
  gl_FragColor = vec4(vec3(val), 1.0);
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
uniform sampler2D uTrnsTex;
uniform vec2 uTrnsWinRes;
uniform float uRoughness;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Fresnel Specular Edge Highlight
  float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.8);
  
  // Premium Studio Neutral Metallic Surface Tint
  vec3 baseColor = vec3(0.10, 0.105, 0.12);
  vec3 specularColor = vec3(0.92, 0.92, 0.98);
  vec3 limeRim = vec3(0.84, 1.0, 0.0) * 0.06;
  
  vec3 finalColor = mix(baseColor, specularColor, fresnel * 0.75) + limeRim * fresnel;
  
  gl_FragColor = vec4(finalColor, 0.94);
}
`;

interface ETMonogramSceneProps {
  roughness?: number;
  noiseScale?: number;
  scrollState?: 'hero' | 'works' | 'manifesto';
  onContextLost?: () => void;
  onSceneReady?: () => void;
}

export default function ETMonogramScene({
  roughness = 0.10,
  noiseScale = 9.00,
  scrollState = 'hero',
  onContextLost,
  onSceneReady,
}: ETMonogramSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const logoMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderSingleFrameRef = useRef<(() => void) | null>(null);

  const isMobile = window.innerWidth <= 900;

  const getScrollTransform = (state: string) => {
    switch (state) {
      case 'works':
        return { posX: isMobile ? 0 : 5.3, posY: isMobile ? -3.0 : -1.2, scale: isMobile ? 0.35 : 0.40, bgContrast: 0.12, wireframeOpacity: 0.008 };
      case 'manifesto':
        return { posX: isMobile ? 0 : 5.0, posY: isMobile ? -2.0 : -1.6, scale: isMobile ? 0.40 : 0.46, bgContrast: 0.08, wireframeOpacity: 0.006 };
      case 'hero':
      default:
        return {
          posX: isMobile ? 2.05 : 4.7,
          posY: isMobile ? -3.45 : 0.05,
          scale: isMobile ? 0.28 : 0.76,
          bgContrast: isMobile ? 0.18 : 0.22,
          wireframeOpacity: isMobile ? 0.008 : 0.035
        };
    }
  };

  const targetTransformRef = useRef(getScrollTransform(scrollState));
  const onSceneReadyRef = useRef(onSceneReady);
  onSceneReadyRef.current = onSceneReady;

  useEffect(() => {
    targetTransformRef.current = getScrollTransform(scrollState);
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
    let renderTarget: THREE.WebGLRenderTarget | null = null;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);

    renderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgScene = new THREE.Scene();
    const bgGeometry = new THREE.PlaneGeometry(2, 2);

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uNoiseScale: { value: noiseScale },
        uScreenAspectRatio: { value: width / height },
        uBgContrast: { value: 0.22 },
      },
      depthWrite: false,
    });
    bgMaterialRef.current = bgMaterial;
    bgScene.add(new THREE.Mesh(bgGeometry, bgMaterial));

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;
    const scene = new THREE.Scene();

    // Create Unified 3D ET Monogram Shape (E + T interlocking)
    const shape = new THREE.Shape();
    shape.moveTo(-3.2, 4.0);
    shape.lineTo(3.8, 4.0);
    shape.lineTo(3.8, 2.6);
    shape.lineTo(2.2, 2.6);
    shape.lineTo(2.2, -4.0);
    shape.lineTo(0.8, -4.0);
    shape.lineTo(0.8, -2.6);
    shape.lineTo(-1.6, -2.6);
    shape.lineTo(-1.6, -0.7);
    shape.lineTo(0.6, -0.7);
    shape.lineTo(0.6, 0.7);
    shape.lineTo(-1.6, 0.7);
    shape.lineTo(-1.6, 2.6);
    shape.lineTo(-3.2, 2.6);
    shape.closePath();

    const extrudeSettings = {
      steps: 4, depth: 1.4, bevelEnabled: true, bevelThickness: 0.35, bevelSize: 0.25, bevelSegments: 12
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    const logoMaterial = new THREE.ShaderMaterial({
      vertexShader: logoVertexShader,
      fragmentShader: logoFragmentShader,
      uniforms: {
        uTrnsTex: { value: renderTarget.texture },
        uTrnsWinRes: { value: new THREE.Vector2(width, height) },
        uRoughness: { value: roughness },
      },
      transparent: true,
    });
    logoMaterialRef.current = logoMaterial;

    const mesh = new THREE.Mesh(geometry, logoMaterial);
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0xd7ff00,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.008 : 0.035,
    });
    const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);

    const logoGroup = new THREE.Group();
    logoGroup.add(mesh);
    logoGroup.add(outlineMesh);
    scene.add(logoGroup);

    let targetMouse = new THREE.Vector2(0, 0);
    let currRot = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / width) * 2 - 1;
      targetMouse.y = -(e.clientY / height) * 2 + 1;
    };

    let firstRenderSignaled = false;
    const renderPass = (time: number = 0) => {
      const target = targetTransformRef.current;
      logoGroup.position.set(target.posX, target.posY, 0);
      logoGroup.scale.set(target.scale, target.scale, target.scale);
      outlineMaterial.opacity = target.wireframeOpacity;
      bgMaterial.uniforms.uBgContrast.value = target.bgContrast;
      bgMaterial.uniforms.uTime.value = time;

      if (renderer) {
        renderer.setRenderTarget(renderTarget);
        renderer.render(bgScene, bgCamera);

        renderer.setRenderTarget(null);
        renderer.render(bgScene, bgCamera);

        renderer.autoClear = false;
        renderer.render(scene, camera);
        renderer.autoClear = true;
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

        const target = targetTransformRef.current;
        logoGroup.position.x += (target.posX - logoGroup.position.x) * 0.05;
        logoGroup.position.y += (target.posY - logoGroup.position.y) * 0.05;

        const currentScale = logoGroup.scale.x;
        const newScale = currentScale + (target.scale - currentScale) * 0.05;
        logoGroup.scale.set(newScale, newScale, newScale);

        outlineMaterial.opacity += (target.wireframeOpacity - outlineMaterial.opacity) * 0.05;
        bgMaterial.uniforms.uBgContrast.value += (target.bgContrast - bgMaterial.uniforms.uBgContrast.value) * 0.05;

        if (!isMobile) {
          currRot.x += (-targetMouse.y * 0.35 - currRot.x) * 0.05;
          currRot.y += (targetMouse.x * 0.35 - currRot.y) * 0.05;
        }

        const q = new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(currRot.x + Math.sin(time * 0.3) * 0.02, currRot.y + Math.cos(time * 0.25) * 0.02, 0));
        logoGroup.quaternion.slerp(q, 0.08);

        bgMaterial.uniforms.uMouse.value.lerp(targetMouse, 0.04);
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
          if (renderTarget) renderTarget.setSize(width, height);
        }
        logoMaterial.uniforms.uTrnsWinRes.value.set(width, height);
        bgMaterial.uniforms.uScreenAspectRatio.value = width / height;
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
      if (renderTarget) renderTarget.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      geometry.dispose();
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
      }}
    />
  );
}
