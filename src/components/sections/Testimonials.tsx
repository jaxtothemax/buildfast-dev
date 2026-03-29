'use client';

import { useEffect, useRef } from 'react';
import type { TestimonialsContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface TestimonialsProps {
  content: TestimonialsContent;
}

export default function Testimonials({ content }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = gridRef.current?.querySelectorAll('[data-testimonial-card]');
    if (!cards) return;

    gsap.set(cards, {
      y: 30,
      opacity: 0,
      rotationX: 8,
      transformPerspective: 800,
      willChange: 'transform',
    });

    ScrollTrigger.batch(cards, {
      start: 'top 87%',
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.7,
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

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 px-6"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
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
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {content.items.map((item) => (
            <div
              key={item.author}
              data-testimonial-card
              className="p-6 rounded-lg"
              style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Quote mark */}
              <div
                className="text-3xl font-serif leading-none mb-4"
                style={{ color: 'rgba(249,115,22,0.5)' }}
              >
                &ldquo;
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-6">{item.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0"
                  style={{
                    background: 'rgba(249,115,22,0.12)',
                    color: '#f97316',
                    border: '1px solid rgba(249,115,22,0.2)',
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{item.author}</div>
                  <div className="font-mono text-xs text-white/40">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
