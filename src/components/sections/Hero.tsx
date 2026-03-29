'use client';

import { useEffect, useRef } from 'react';
import type { HeroContent } from '@/content/types';
import { gsap } from '@/lib/gsap';

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Static (reduced motion) version: just show everything
    if (prefersReduced) {
      gsap.set(
        [badgeRef.current, headlineRef.current, subRef.current, ctaRef.current, glowRef.current],
        { opacity: 1, y: 0 }
      );
      return;
    }

    let splitInstance: { words: HTMLElement[]; revert: () => void } | null = null;

    const init = async () => {
      const { default: SplitType } = await import('split-type');

      // Add will-change before animation
      if (headlineRef.current) {
        headlineRef.current.style.willChange = 'transform';
      }

      splitInstance = new SplitType(headlineRef.current!, {
        types: 'words',
      }) as unknown as { words: HTMLElement[]; revert: () => void };

      // Wrap each word in a clip container for clean reveal
      splitInstance.words.forEach((word: HTMLElement) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'bottom';
        word.parentNode?.insertBefore(wrapper, word);
        wrapper.appendChild(word);
      });

      // Set initial states
      gsap.set(badgeRef.current, { y: 20, opacity: 0 });
      gsap.set(splitInstance.words, { y: 60, opacity: 0, skewY: 3 });
      gsap.set(subRef.current, { opacity: 0, y: 12 });
      gsap.set(ctaRef.current, { scale: 0.94, opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.6 })
        .to(
          splitInstance.words,
          { y: 0, opacity: 1, skewY: 0, stagger: 0.065, duration: 0.85 },
          '-=0.35'
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .to(ctaRef.current, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.35')
        .to(glowRef.current, { opacity: 1, duration: 1 }, '-=0.4')
        .then(() => {
          // Remove will-change after animation completes
          if (headlineRef.current) {
            headlineRef.current.style.willChange = 'auto';
          }
        });
    };

    init();

    return () => {
      splitInstance?.revert();
    };
  }, []);

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-32 pb-24"
    >
      {/* Radial glow — behind headline */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 42%, rgba(249,115,22,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {/* Pulsing green dot */}
            <span
              className="pulse-dot inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#22c55e' }}
            />
            {content.badge}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-sans font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
        >
          {content.headline}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {content.subheadline}
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            onClick={handleAnchor('#pricing')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: '#f97316', color: '#000' }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, ease: 'power2.out' })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
            }
          >
            {content.cta1}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="#features"
            onClick={handleAnchor('#features')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' });
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            {content.cta2}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="font-mono text-xs text-white/50 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
