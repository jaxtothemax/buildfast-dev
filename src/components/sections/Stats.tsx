'use client';

import { useEffect, useRef } from 'react';
import type { StatItem } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    stats.forEach((stat, i) => {
      const valueEl = valueRefs.current[i];
      const labelEl = labelRefs.current[i];
      if (!valueEl || !labelEl) return;

      const obj = { val: 0 };

      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            valueEl.textContent = Math.round(obj.val).toString();
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        labelEl,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, [stats]);

  return (
    <section ref={sectionRef} className="border-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-8 py-10 flex flex-col items-center text-center"
              style={{
                borderRight:
                  i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined,
              }}
            >
              <div className="font-sans text-4xl font-bold tabular-nums mb-1">
                <span
                  ref={(el) => {
                    valueRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-[#f97316]">{stat.suffix}</span>
              </div>
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="font-mono text-xs text-white/45 tracking-wide mt-1"
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
