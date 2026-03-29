'use client';

import { useEffect, useRef } from 'react';
import type { CTAContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface BottomCTAProps {
  content: CTAContent;
}

export default function BottomCTA({ content }: BottomCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const glow = glowRef.current;
    const headline = headlineRef.current;
    if (!section || !glow || !headline) return;

    // Pulsing glow on a repeating timeline
    const glowTl = gsap.timeline({ repeat: -1, yoyo: true });
    glowTl.fromTo(
      glow,
      { opacity: 0.04 },
      { opacity: 0.09, duration: 3, ease: 'sine.inOut' }
    );

    // Headline word split + scroll animation
    const init = async () => {
      const { default: SplitType } = await import('split-type');
      const split = new SplitType(headline, { types: 'words' }) as unknown as {
        words: HTMLElement[];
        revert: () => void;
      };

      gsap.set(split.words, { y: 40, opacity: 0 });
      gsap.set([subRef.current, btnRef.current], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.to(split.words, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.75,
        ease: 'power3.out',
      })
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35')
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      return () => split.revert();
    };

    const cleanup = init();

    return () => {
      glowTl.kill();
      cleanup.then((fn) => fn?.());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 px-6 text-center overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Pulsing glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="section-label mb-6">
          <span>{'// '}</span>
          {content.label}
        </p>

        <h2
          ref={headlineRef}
          className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
        >
          {content.headline}
        </h2>

        <p ref={subRef} className="text-lg text-white/55 leading-relaxed mb-10">
          {content.subheadline}
        </p>

        <a
          ref={btnRef}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-200"
          style={{ background: '#f97316', color: '#000' }}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, ease: 'power2.out' })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
          }
        >
          {content.button}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 5l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
