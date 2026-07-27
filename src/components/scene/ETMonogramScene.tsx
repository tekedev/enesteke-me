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
varying vec2 vUv;
uniform float uTime;
uniform float uScreenAspectRatio;
uniform vec2 uMouse;
uniform float uNoiseScale;
uniform float uBgContrast;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float noise3D(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(void){
  float tn=uTime*0.06;
  float t=uTime*0.06;
  vec2 aspUv=(vUv+uMouse*0.03)*vec2(uScreenAspectRatio,1.0)-0.5;
  vec2 nuv=aspUv*(uNoiseScale * 0.05);
  float n1=noise3D(vec3(nuv+1234.0,tn+0.0));
  float n2=noise3D(vec3(nuv+5678.0,tn+10.0));
  vec2 uv=aspUv*0.6+vec2(n1,n2)*0.6;
  vec4 col=vec4(0.0);
  col.x+=noise3D(vec3(uv+1.0,t+0.0));
  col.y+=noise3D(vec3(uv+2.0,t+1.0));
  col.z+=noise3D(vec3(uv+3.0,t+2.0));
  col.w+=noise3D(vec3(aspUv+noise3D(vec3(nuv+1234.0,t*0.0)),t*0.04+3.0));
  col=col*0.5+0.5;
  
  vec3 monoColor = vec3(col.x * 0.3 + col.y * 0.4 + col.z * 0.3) * uBgContrast;
  vec3 acidAccent = vec3(0.84, 1.0, 0.0);
  vec3 finalBg = mix(monoColor, acidAccent, 0.02 * sin(uTime * 0.4));
  
  gl_FragColor = vec4(finalBg, 1.0);
}
`;

const logoVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPos;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vUv = uv;
  vNormal = normalMatrix * normal;
  vViewPos = -mvPosition.xyz;
}
`;

const logoFragmentShader = `
uniform sampler2D uTrnsTex;
uniform vec2 uTrnsWinRes;
uniform float uRoughness;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPos;

#define PI 3.14159265359

float ggx(float dNH, float roughness) {
  float a2 = roughness * roughness;
  a2 = a2 * a2;
  float dNH2 = dNH * dNH;
  if(dNH2 <= 0.0) return 0.0;
  return a2 / (PI * pow(dNH2 * (a2 - 1.0) + 1.0, 2.0));
}

void main() {
  vec2 trnsUv = gl_FragCoord.xy / uTrnsWinRes.xy;
  vec3 normal = normalize(vNormal);
  
  vec2 refractNormal = normal.xy * (1.0 - normal.z * 0.6);
  vec2 refractUv = trnsUv - refractNormal * 0.06;
  vec3 glassRefract = texture2D(uTrnsTex, refractUv).rgb;

  vec3 viewDir = normalize(vViewPos);
  vec3 L = normalize(vec3(-0.8, 1.0, 0.8));
  vec3 H = normalize(viewDir + L);
  float spec = ggx(dot(normal, H), 0.005 + uRoughness * 0.3);

  vec3 specCol = vec3(0.84, 1.0, 0.0) * spec * 0.6 + vec3(spec * 0.4);
  vec3 finalColor = glassRefract * 0.95 + specCol;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface ETMonogramSceneProps {
  roughness?: number;
  noiseScale?: number;
  scrollState?: 'hero' | 'works' | 'manifesto';
  onContextLost?: () => void;
}

export default function ETMonogramScene({
  roughness = 0.10,
  noiseScale = 9.00,
  scrollState = 'hero',
  onContextLost,
}: ETMonogramSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);
  const logoMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const bgMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderSingleFrameRef = useRef<(() => void) | null>(null);

  // Target positions based on scrollState
  const getScrollTransform = (state: string) => {
    switch (state) {
      case 'works':
        return { posX: 3.2, posY: 0.5, scale: 0.65, bgContrast: 0.65, wireframeOpacity: 0.22 };
      case 'manifesto':
        return { posX: 0.0, posY: 0.0, scale: 0.45, bgContrast: 0.35, wireframeOpacity: 0.08 };
      case 'hero':
      default:
        return { posX: 0.0, posY: 0.0, scale: 1.0, bgContrast: 1.0, wireframeOpacity: 0.10 };
    }
  };

  useEffect(() => {
    if (logoMaterialRef.current) {
      logoMaterialRef.current.uniforms.uRoughness.value = roughness;
    }
    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uNoiseScale.value = noiseScale;
    }
    if (renderSingleFrameRef.current) {
      renderSingleFrameRef.current();
    }
  }, [roughness, noiseScale]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      if (onContextLost) onContextLost();
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.25));
    container.appendChild(renderer.domElement);

    const canvasEl = renderer.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (onContextLost) onContextLost();
    };
    const handleContextRestored = () => {
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    canvasEl.addEventListener('webglcontextlost', handleContextLost);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored);

    const renderTarget = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScreenAspectRatio: { value: width / height },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uNoiseScale: { value: noiseScale },
        uBgContrast: { value: 1.0 },
      },
      depthWrite: false,
    });
    bgMaterialRef.current = bgMaterial;
    bgScene.add(new THREE.Mesh(bgGeometry, bgMaterial));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const shape = new THREE.Shape();
    shape.moveTo(-3.0, 4.0);
    shape.lineTo(3.0, 4.0);
    shape.lineTo(3.0, 2.5);
    shape.lineTo(-1.2, 2.5);
    shape.lineTo(-1.2, 1.0);
    shape.lineTo(2.3, 1.0);
    shape.lineTo(2.3, -0.5);
    shape.lineTo(-1.2, -0.5);
    shape.lineTo(-1.2, -2.5);
    shape.lineTo(3.0, -2.5);
    shape.lineTo(3.0, -4.0);
    shape.lineTo(-3.0, -4.0);
    shape.closePath();

    const extrudeSettings = {
      steps: 4, depth: 1.8, bevelEnabled: true, bevelThickness: 0.45, bevelSize: 0.35, bevelSegments: 16
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
      opacity: 0.10,
    });
    const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);

    const logoGroup = new THREE.Group();
    logoGroup.add(mesh);
    logoGroup.add(outlineMesh);
    scene.add(logoGroup);
    logoGroupRef.current = logoGroup;

    let targetMouse = new THREE.Vector2(0, 0);
    let currRot = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / width) * 2 - 1;
      targetMouse.y = -(e.clientY / height) * 2 + 1;
    };

    const renderPass = (time: number = 0) => {
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
    };
    renderSingleFrameRef.current = () => renderPass(0);

    const clock = new THREE.Clock();
    let animId: number;
    let isPaused = false;

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        if (isPaused) return;
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        // Smooth Interpolation towards target scroll state
        const target = getScrollTransform(scrollState);
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
      // Reduced Motion static frame
      const target = getScrollTransform(scrollState);
      logoGroup.position.set(target.posX, target.posY, 0);
      logoGroup.scale.set(target.scale, target.scale, target.scale);
      outlineMaterial.opacity = target.wireframeOpacity;
      bgMaterial.uniforms.uBgContrast.value = target.bgContrast;
      renderPass(0);
    }

    // Throttled Resize Handler
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
          renderTarget.setSize(width, height);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimeout);
      cancelAnimationFrame(animId);
      if (renderer) {
        renderer.dispose();
      }
      renderTarget.dispose();
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
  }, [onContextLost, scrollState]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
