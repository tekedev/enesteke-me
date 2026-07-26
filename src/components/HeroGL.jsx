import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ═══ CUSTOM GLSL SHADERS ═══
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uNoiseScale;

  // Simplex noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Noise-based surface deformation
    float noise = snoise(position * uNoiseScale + uTime * 0.3) * 0.15;
    vec3 newPosition = position + normal * noise;

    vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRoughness;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main() {
    // Fresnel effect (edge glow)
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

    // Chromatic color shift based on normal direction
    float colorShift = dot(vNormal, vec3(sin(uTime * 0.5), cos(uTime * 0.3), sin(uTime * 0.7))) * 0.5 + 0.5;

    // Rainbow chromatic aberration
    vec3 rainbow;
    rainbow.r = sin(colorShift * 6.28 + 0.0) * 0.5 + 0.5;
    rainbow.g = sin(colorShift * 6.28 + 2.09) * 0.5 + 0.5;
    rainbow.b = sin(colorShift * 6.28 + 4.19) * 0.5 + 0.5;

    // Mix base colors with chromatic effect
    vec3 baseColor = mix(uColor1, uColor2, colorShift);
    vec3 finalColor = mix(baseColor, rainbow, 0.35);

    // Apply fresnel glow
    finalColor += fresnel * vec3(0.0, 0.9, 0.9) * 0.8;

    // Scanline effect
    float scanline = sin(vUv.y * 200.0 + uTime * 2.0) * 0.03;

    // Mouse-reactive highlight
    float mouseHighlight = smoothstep(0.8, 0.0, length(vNormal.xy - uMouse * 0.5)) * 0.3;

    finalColor += scanline + mouseHighlight;

    // Alpha: more transparent in center, more opaque at edges
    float alpha = mix(0.15, 0.85, fresnel) + uRoughness * 0.1;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function HeroGL() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ═══ SCENE ═══
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ═══ MAIN CRYSTAL OBJECT (Custom Shader) ═══
    const crystalGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const crystalMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uNoiseScale: { value: 1.5 },
        uRoughness: { value: 0.4 },
        uColor1: { value: new THREE.Color(0x00e5e5) },
        uColor2: { value: new THREE.Color(0x635bff) },
      },
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystal);

    // ═══ WIREFRAME OVERLAY ═══
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const wireEdges = new THREE.EdgesGeometry(wireGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });
    const wireframe = new THREE.LineSegments(wireEdges, wireMat);
    scene.add(wireframe);

    // ═══ INNER CORE GLOW ═══
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const coreMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        uniform float uTime;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          float pulse = sin(uTime * 2.0) * 0.05;
          vec3 pos = position * (1.0 + pulse);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float uTime;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(vec3(0.0, 0.9, 0.9), vec3(0.4, 0.2, 1.0), sin(uTime) * 0.5 + 0.5);
          gl_FragColor = vec4(color, intensity * 0.6);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ═══ OUTER GLOW HALO ═══
    const haloGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          gl_FragColor = vec4(0.0, 0.85, 0.85, intensity * 0.15);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // ═══ FLOATING PARTICLES ═══
    const pCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSizes = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      pSizes[i] = Math.random() * 2 + 0.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ═══ MOUSE ═══
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ═══ ANIMATE ═══
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse
      targetX += (mouseX * 0.3 - targetX) * 0.05;
      targetY += (mouseY * 0.25 - targetY) * 0.05;

      // Update shader uniforms
      crystalMat.uniforms.uTime.value = t;
      crystalMat.uniforms.uMouse.value.set(targetX, targetY);
      coreMat.uniforms.uTime.value = t;

      // Rotate crystal
      crystal.rotation.x = t * 0.1 + targetY * 0.5;
      crystal.rotation.y = t * 0.15 + targetX * 0.5;
      crystal.rotation.z = t * 0.05;

      // Wireframe follows but slightly delayed
      wireframe.rotation.x = t * 0.08 + targetY * 0.3;
      wireframe.rotation.y = t * 0.12 + targetX * 0.3;

      // Core pulsates
      core.rotation.x = -t * 0.2;
      core.rotation.y = -t * 0.15;

      // Particles drift
      particles.rotation.y = t * 0.015;
      particles.rotation.x = t * 0.008;

      // Camera subtle sway
      camera.position.x += (targetX * 0.4 - camera.position.x) * 0.02;
      camera.position.y += (-targetY * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ═══ RESIZE ═══
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      crystalGeo.dispose(); crystalMat.dispose();
      wireGeo.dispose(); wireEdges.dispose(); wireMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      haloGeo.dispose(); haloMat.dispose();
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
