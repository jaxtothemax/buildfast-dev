'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';

export default function PageTransition({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Skip first render — no transition on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Slide in from bottom, then slide out
    const tl = gsap.timeline();
    tl.set(overlay, { yPercent: 100, display: 'block' })
      .to(overlay, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
      .to(overlay, { yPercent: -100, duration: 0.45, ease: 'power3.inOut', delay: 0.1 })
      .set(overlay, { display: 'none' });
  }, [pathname]);

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9000] bg-[#0a0a0a] hidden pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      {children}
    </>
  );
}
