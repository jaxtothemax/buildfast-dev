'use client';

import { useEffect, useRef } from 'react';
import type { TickerContent } from '@/content/types';
import { gsap } from '@/lib/gsap';

interface TickerBarProps {
  content: TickerContent;
}

export default function TickerBar({ content }: TickerBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Duplicate content for seamless loop
    track.innerHTML = track.innerHTML + track.innerHTML;

    const anim = gsap.to(track, {
      x: '-50%',
      duration: 28,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <div
      className="mt-16 overflow-hidden py-2.5"
      style={{
        background: 'rgba(249,115,22,0.07)',
        borderBottom: '1px solid rgba(249,115,22,0.15)',
      }}
    >
      <div className="flex items-center whitespace-nowrap">
        <div ref={trackRef} className="flex items-center gap-8 pr-8">
          {/* Badge */}
          <span
            className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-medium"
            style={{ background: '#f97316', color: '#000' }}
          >
            {content.badge}
          </span>
          <span className="text-sm text-white/60 flex-shrink-0">{content.message}</span>
        </div>
      </div>
    </div>
  );
}
