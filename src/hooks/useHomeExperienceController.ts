import { useState, useEffect, useRef } from 'react';

export type SceneState = 'hero' | 'works' | 'manifesto';
export type ScrollDirection = 'down' | 'up';

export interface HomeExperienceState {
  sceneState: SceneState;
  heroExitProgress: number;
  worksEntryProgress: number;
  worksExitProgress: number;
  worksProgress: number;
  worksActive: boolean;
  scrollDirection: ScrollDirection;
  layoutStable: boolean;
  etScreenRect: {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function useHomeExperienceController(): HomeExperienceState {
  const [state, setState] = useState<HomeExperienceState>({
    sceneState: 'hero',
    heroExitProgress: 0,
    worksEntryProgress: 0,
    worksExitProgress: 0,
    worksProgress: 0,
    worksActive: false,
    scrollDirection: 'down',
    layoutStable: false,
    etScreenRect: {
      x: 380,
      y: 250,
      width: 280,
      height: 360,
      centerX: 520,
      centerY: 430,
    },
  });

  const lastScrollYRef = useRef<number>(0);
  const stableCountRef = useRef<number>(0);
  const lastMetricsRef = useRef<{ scrollY: number; worksProgress: number; etX: number; etY: number }>({
    scrollY: 0,
    worksProgress: 0,
    etX: 0,
    etY: 0,
  });

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateState = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 900;
      const viewportWidth = window.innerWidth || 1440;
      const scrollDirection: ScrollDirection = scrollY >= lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = scrollY;

      const heroEl = document.getElementById('hero');
      const worksEl = document.getElementById('works');
      const manifestoEl = document.getElementById('manifesto');

      // Hero Exit Progress (0 -> 1 as user scrolls down from hero)
      let heroExitProgress = 0;
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight || viewportHeight;
        heroExitProgress = clamp(scrollY / (heroHeight * 0.60), 0, 1);
      } else {
        heroExitProgress = clamp(scrollY / (viewportHeight * 0.60), 0, 1);
      }

      // Works Entry Progress, Exit Progress & Works Scroll Progress
      let worksEntryProgress = 0;
      let worksExitProgress = 0;
      let worksProgress = 0;
      let worksActive = false;
      let manifestoActive = false;

      if (worksEl) {
        const worksRect = worksEl.getBoundingClientRect();
        const entryStart = viewportHeight * 0.95;
        const entryEnd = viewportHeight * 0.15;
        worksEntryProgress = clamp((entryStart - worksRect.top) / (entryStart - entryEnd), 0, 1);

        const exitStart = viewportHeight * 1.10;
        const exitEnd = viewportHeight * 0.35;
        worksExitProgress = clamp((exitStart - worksRect.bottom) / (exitStart - exitEnd), 0, 1);

        const worksTriggerY = viewportHeight * 0.88;
        worksActive = worksRect.top <= worksTriggerY && worksRect.bottom > viewportHeight * 0.10;

        const scrollableHeight = worksRect.height - viewportHeight;
        if (scrollableHeight > 0) {
          const rawProgress = -worksRect.top / scrollableHeight;
          worksProgress = clamp(rawProgress, 0, 1);
        }
      }

      if (manifestoEl) {
        const manifestoRect = manifestoEl.getBoundingClientRect();
        manifestoActive = manifestoRect.top <= viewportHeight * 0.45;
      }

      // Determinist Scene State Decision based strictly on viewport geometry
      let sceneState: SceneState = 'hero';
      if (manifestoActive) {
        sceneState = 'manifesto';
      } else if (worksActive) {
        sceneState = 'works';
      } else {
        sceneState = 'hero';
      }

      // Read ET Screen Bounds from 3D projected attributes
      let etX = Math.round(viewportWidth * 0.264);
      let etY = Math.round(viewportHeight * 0.277);
      let etW = Math.round(viewportWidth * 0.194);
      let etH = Math.round(viewportHeight * 0.400);

      const etElement = document.querySelector('[data-et-screen-x]');
      if (etElement) {
        const parsedX = Number(etElement.getAttribute('data-et-screen-x'));
        const parsedY = Number(etElement.getAttribute('data-et-screen-y'));
        const parsedW = Number(etElement.getAttribute('data-et-screen-width'));
        const parsedH = Number(etElement.getAttribute('data-et-screen-height'));
        if (!isNaN(parsedX) && parsedW > 0) etX = parsedX;
        if (!isNaN(parsedY) && parsedH > 0) etY = parsedY;
        if (parsedW > 0) etW = parsedW;
        if (parsedH > 0) etH = parsedH;
      }

      const etRect = {
        x: etX,
        y: etY,
        width: etW,
        height: etH,
        centerX: Math.round(etX + etW / 2),
        centerY: Math.round(etY + etH / 2),
      };

      // Check stability for 8 consecutive RAFs
      const last = lastMetricsRef.current;
      const isStableFrame =
        Math.abs(last.scrollY - scrollY) <= 1 &&
        Math.abs(last.worksProgress - worksProgress) <= 0.002 &&
        Math.abs(last.etX - etX) <= 1 &&
        Math.abs(last.etY - etY) <= 1;

      if (isStableFrame) {
        stableCountRef.current = Math.min(20, stableCountRef.current + 1);
      } else {
        stableCountRef.current = 0;
      }
      lastMetricsRef.current = { scrollY, worksProgress, etX, etY };
      const layoutStable = stableCountRef.current >= 8;

      setState((prev) => {
        if (
          prev.sceneState === sceneState &&
          Math.abs(prev.heroExitProgress - heroExitProgress) < 0.005 &&
          Math.abs(prev.worksEntryProgress - worksEntryProgress) < 0.005 &&
          Math.abs(prev.worksExitProgress - worksExitProgress) < 0.005 &&
          Math.abs(prev.worksProgress - worksProgress) < 0.005 &&
          prev.worksActive === worksActive &&
          prev.scrollDirection === scrollDirection &&
          prev.layoutStable === layoutStable &&
          Math.abs(prev.etScreenRect.centerX - etRect.centerX) < 2
        ) {
          return prev;
        }

        return {
          sceneState,
          heroExitProgress,
          worksEntryProgress,
          worksExitProgress,
          worksProgress,
          worksActive,
          scrollDirection,
          layoutStable,
          etScreenRect: etRect,
        };
      });

      rafIdRef.current = requestAnimationFrame(updateState);
    };

    rafIdRef.current = requestAnimationFrame(updateState);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return state;
}
