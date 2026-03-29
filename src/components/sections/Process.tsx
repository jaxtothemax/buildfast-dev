'use client';

import { useEffect, useRef } from 'react';
import type { ProcessContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ProcessProps {
  content: ProcessContent;
}

export default function Process({ content }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const line = lineRef.current;
    const list = listRef.current;
    if (!section || !line || !list) return;

    const steps = list.querySelectorAll('[data-process-step]');

    gsap.set(steps, { x: -20, opacity: 0 });
    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      end: 'bottom 75%',
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.set(line, { scaleY: self.progress });

        const stepProgress = 1 / steps.length;
        steps.forEach((step, i) => {
          const threshold = i * stepProgress + stepProgress * 0.3;
          if (self.progress >= threshold) {
            gsap.to(step, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="section-label mb-4">
            <span>{'// '}</span>
            {content.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.title}</h2>
        </div>

        {/* Steps — two-column: circle | content */}
        <div className="max-w-2xl relative" ref={listRef}>
          {/* Vertical connecting line, positioned to center on the circles */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0"
            style={{
              left: 18,
              width: 1,
              background:
                'linear-gradient(to bottom, rgba(249,115,22,0.55) 0%, rgba(249,115,22,0.05) 100%)',
            }}
          />

          {content.steps.map((step, i) => (
            <div
              key={step.number}
              data-process-step
              className="flex gap-6 mb-14 last:mb-0"
            >
              {/* Circle — 38px wide, centered on line at left: 0 */}
              <div className="flex-shrink-0 relative z-10" style={{ width: 38 }}>
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(249,115,22,0.45)',
                    color: '#f97316',
                  }}
                >
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="pt-1.5 pb-2">
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
