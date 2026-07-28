import { useState, useEffect, useRef } from 'react';

export type SceneState = 'hero' | 'works' | 'manifesto';
export type ScrollDirection = 'down' | 'up';

export interface HomeExperienceState {
  sceneState: SceneState;
  heroExitProgress: number;
  worksEntryProgress: number;
  worksProgress: number;
  worksActive: boolean;
  scrollDirection: ScrollDirection;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function useHomeExperienceController(): HomeExperienceState {
  const [state, setState] = useState<HomeExperienceState>({
    sceneState: 'hero',
    heroExitProgress: 0,
    worksEntryProgress: 0,
    worksProgress: 0,
    worksActive: false,
    scrollDirection: 'down',
  });

  const lastScrollYRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateState = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 900;
      const scrollDirection: ScrollDirection = scrollY >= lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = scrollY;

      const heroEl = document.getElementById('hero');
      const worksEl = document.getElementById('works');
      const manifestoEl = document.getElementById('manifesto');

      // Hero Exit Progress (0 -> 1 as user scrolls down from hero)
      let heroExitProgress = 0;
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight || viewportHeight;
        heroExitProgress = clamp(scrollY / (heroHeight * 0.65), 0, 1);
      } else {
        heroExitProgress = clamp(scrollY / (viewportHeight * 0.65), 0, 1);
      }

      // Works Entry Progress & Works Scroll Progress
      let worksEntryProgress = 0;
      let worksProgress = 0;
      let worksActive = false;
      let manifestoActive = false;

      if (worksEl) {
        const worksRect = worksEl.getBoundingClientRect();
        const entryStart = viewportHeight * 0.95;
        const entryEnd = viewportHeight * 0.15;

        worksEntryProgress = clamp((entryStart - worksRect.top) / (entryStart - entryEnd), 0, 1);

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

      setState((prev) => {
        if (
          prev.sceneState === sceneState &&
          Math.abs(prev.heroExitProgress - heroExitProgress) < 0.005 &&
          Math.abs(prev.worksEntryProgress - worksEntryProgress) < 0.005 &&
          Math.abs(prev.worksProgress - worksProgress) < 0.005 &&
          prev.worksActive === worksActive &&
          prev.scrollDirection === scrollDirection
        ) {
          return prev;
        }

        return {
          sceneState,
          heroExitProgress,
          worksEntryProgress,
          worksProgress,
          worksActive,
          scrollDirection,
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
