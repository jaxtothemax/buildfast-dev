'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer-capable devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo for smooth lag-based following
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    // Start off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    // Expand on hover over interactive elements
    const expandTargets = 'button, a, [data-cursor-expand]';

    const onEnter = (e: Event) => {
      const el = e.currentTarget as Element;
      if (el.matches(expandTargets)) {
        gsap.to(ring, { scale: 2.5, opacity: 0.8, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { scale: 0.5, duration: 0.25, ease: 'power2.out' });
      }
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);

    // Delegate hover to body
    document.querySelectorAll(expandTargets).forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Re-attach on DOM mutations (for dynamically rendered elements)
    const observer = new MutationObserver(() => {
      document.querySelectorAll(expandTargets).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.6)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
