'use client';

import { useEffect, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenisInstance: import('lenis').default | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    async function initLenis() {
      const { default: Lenis } = await import('lenis');

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Sync Lenis scroll position with ScrollTrigger
      lenisInstance.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Feed Lenis RAF into GSAP ticker
      rafCallback = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after fonts load to prevent offset bugs
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    initLenis();

    return () => {
      if (rafCallback) gsap.ticker.remove(rafCallback);
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
