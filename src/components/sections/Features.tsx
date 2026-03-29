'use client';

import { useEffect, useRef } from 'react';
import type { FeaturesContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface FeaturesProps {
  content: FeaturesContent;
}

export default function Features({ content }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = cardsRef.current?.querySelectorAll('[data-feature-card]');
    if (!cards) return;

    gsap.set(cards, { y: 40, opacity: 0, willChange: 'transform' });

    ScrollTrigger.batch(cards, {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          onComplete: () => {
            batch.forEach((el) => {
              (el as HTMLElement).style.willChange = 'auto';
            });
          },
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, { y: -4, scale: 1.01, duration: 0.3, ease: 'power2.out' });
    el.style.borderColor = 'rgba(255,255,255,0.18)';
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
    el.style.borderColor = 'rgba(255,255,255,0.07)';
  };

  return (
    <section id="features" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-4">
            <span>{'// '}</span>
            {content.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.title}</h2>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {content.items.map((item, i) => (
            <div
              key={item.title}
              data-feature-card
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="p-8 transition-colors duration-300"
              style={{
                borderRight:
                  (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.07)' : undefined,
                borderBottom:
                  i < content.items.length - 3
                    ? '1px solid rgba(255,255,255,0.07)'
                    : undefined,
                cursor: 'default',
              }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded font-mono text-xs font-semibold mb-6"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
