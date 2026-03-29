'use client';

import { useEffect, useRef } from 'react';
import type { PricingContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface PricingProps {
  content: PricingContent;
}

export default function Pricing({ content }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const allCards = cardsRef.current?.querySelectorAll('[data-pricing-card]');
    const featuredCard = cardsRef.current?.querySelector('[data-pricing-featured]');
    const sideCards = cardsRef.current?.querySelectorAll('[data-pricing-side]');

    if (!allCards) return;

    gsap.set(allCards, { opacity: 0, y: 30, willChange: 'transform' });

    if (featuredCard) {
      gsap.fromTo(
        featuredCard,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          onComplete: () => {
            (featuredCard as HTMLElement).style.willChange = 'auto';
          },
        }
      );
    }

    if (sideCards && sideCards.length > 0) {
      gsap.to(sideCards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        onComplete: () => {
          sideCards.forEach((el) => {
            (el as HTMLElement).style.willChange = 'auto';
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="section-label mb-4">
            <span>{'// '}</span>
            {content.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {content.title}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">{content.subtitle}</p>
        </div>

        {/* Tiers */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {content.tiers.map((tier, i) => {
            const isFeatured = tier.featured;
            return (
              <div
                key={tier.name}
                data-pricing-card
                data-pricing-featured={isFeatured ? '' : undefined}
                data-pricing-side={!isFeatured ? '' : undefined}
                className="rounded-xl p-8 relative overflow-hidden"
                style={{
                  background: isFeatured ? '#111' : 'rgba(255,255,255,0.02)',
                  border: isFeatured
                    ? '1px solid rgba(249,115,22,0.3)'
                    : '1px solid rgba(255,255,255,0.07)',
                  ...(isFeatured && {
                    boxShadow: '0 0 40px rgba(249,115,22,0.06)',
                  }),
                }}
              >
                {/* Orange top-edge accent for featured */}
                {isFeatured && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                    style={{ background: '#f97316' }}
                  />
                )}

                {/* Most Popular badge */}
                {isFeatured && (
                  <div className="mb-6">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded font-mono text-xs font-semibold"
                      style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                    >
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="font-mono text-xs text-white/40">{tier.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="flex-shrink-0 mt-0.5"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <circle cx="7" cy="7" r="6" fill="rgba(34,197,94,0.12)" />
                        <path
                          d="M4.5 7l2 2 3.5-3.5"
                          stroke="#22c55e"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-white/65">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="block text-center py-3 px-6 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    isFeatured
                      ? { background: '#f97316', color: '#000' }
                      : {
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.8)',
                        }
                  }
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: 'power2.out' })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
                  }
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
