'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import type { TransformationsContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface BeforeAfterSliderProps {
  content: TransformationsContent;
}

const badgeStyle: React.CSSProperties = {
  position: 'absolute',
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 6,
  padding: '5px 12px',
  fontSize: 12,
  color: 'white',
  fontFamily: 'var(--font-geist-mono)',
  pointerEvents: 'none',
  userSelect: 'none',
  bottom: 16,
};

// Set the slider's position by directly writing the CSS variable the library uses.
// This matches what the library's internal setPosition() does, with no React re-render.
function setSliderCSSPosition(container: HTMLDivElement | null, pos: number) {
  const root = container?.querySelector<HTMLElement>('[data-rcs="root"]');
  if (root) {
    root.style.setProperty(
      '--rcs-raw-position',
      `${Math.min(100, Math.max(0, pos))}%`
    );
  }
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: '#1a1a1a',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 8,
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            flex: 1,
            marginInline: 32,
            height: 20,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontFamily: 'var(--font-geist-mono)',
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.02em',
          }}
        >
          buildfast.dev
        </div>
      </div>
      {children}
    </div>
  );
}

function CompareHandle() {
  return (
    <ReactCompareSliderHandle
      buttonStyle={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: '#ffffff',
        border: 'none',
        boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        color: '#000',
        cursor: 'ew-resize',
        flexShrink: 0,
      }}
      linesStyle={{ width: 1, background: 'rgba(255,255,255,0.8)' }}
    >
      ↔
    </ReactCompareSliderHandle>
  );
}

export default function BeforeAfterSlider({ content }: BeforeAfterSliderProps) {
  const { slides } = content;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  // wraps the slider — animated for slide transitions
  const sliderWrapRef = useRef<HTMLDivElement>(null);
  // inner container — queried for the [data-rcs="root"] element
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const navigateFnRef = useRef<(dir: number) => void>(() => {});

  // ─── Entrance animation + sweep hint ───────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headline = headlineRef.current;
    const mockup = mockupRef.current;
    const section = sectionRef.current;
    if (!headline || !mockup || !section) return;

    let splitInstance: { words: HTMLElement[]; revert: () => void } | null = null;

    const init = async () => {
      const { default: SplitType } = await import('split-type');
      splitInstance = new SplitType(headline, { types: 'words' }) as unknown as {
        words: HTMLElement[];
        revert: () => void;
      };

      if (prefersReduced) return;

      gsap.set(splitInstance.words, { y: 40, opacity: 0 });
      gsap.set(mockup, { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });

      tl.to(splitInstance.words, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.75,
        ease: 'power3.out',
      }).to(
        mockup,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            // Sweep hint: 50 → 28 → 50
            const obj = { val: 50 };
            gsap.to(obj, {
              val: 28,
              duration: 0.7,
              ease: 'power2.inOut',
              onUpdate: () => setSliderCSSPosition(sliderContainerRef.current, obj.val),
              onComplete: () => {
                gsap.to(obj, {
                  val: 50,
                  duration: 0.65,
                  ease: 'power2.inOut',
                  onUpdate: () => setSliderCSSPosition(sliderContainerRef.current, obj.val),
                });
              },
            });
          },
        },
        '-=0.3'
      );
    };

    init();

    return () => {
      splitInstance?.revert();
    };
  }, []);

  // ─── In-view tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });
    return () => st.kill();
  }, []);

  // ─── Navigation with GSAP slide transition ─────────────────────────────────
  const navigate = useCallback(
    (dir: number) => {
      if (transitioning) return;
      const wrap = sliderWrapRef.current;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextIndex = (currentSlide + dir + slides.length) % slides.length;

      if (prefersReduced || !wrap) {
        flushSync(() => setCurrentSlide(nextIndex));
        return;
      }

      setTransitioning(true);
      const xOut = dir > 0 ? -30 : 30;
      const xIn = dir > 0 ? 30 : -30;

      gsap.to(wrap, {
        opacity: 0,
        x: xOut,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // Synchronous re-render so DOM is updated before incoming animation
          flushSync(() => setCurrentSlide(nextIndex));
          gsap.fromTo(
            wrap,
            { opacity: 0, x: xIn },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => setTransitioning(false),
            }
          );
        },
      });
    },
    [currentSlide, transitioning, slides.length]
  );

  useEffect(() => {
    navigateFnRef.current = navigate;
  }, [navigate]);

  // ─── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateFnRef.current(-1);
      if (e.key === 'ArrowRight') navigateFnRef.current(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isInView]);

  const slide = slides[currentSlide];

  return (
    <section ref={sectionRef} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-4">
            <span>{'// '}</span>
            {content.label}
          </p>
          <h2
            ref={headlineRef}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {content.title}
          </h2>
          <p className="text-white/45 text-sm">{content.subtitle}</p>
        </div>

        {/* Slider — max-w-[1000px] centered */}
        <div ref={mockupRef} className="max-w-[1000px] mx-auto">
          <BrowserChrome>
            {/* ── Desktop: interactive compare slider ── */}
            <div ref={sliderWrapRef} className="hidden md:block">
              <div ref={sliderContainerRef}>
                <ReactCompareSlider
                  key={currentSlide}
                  defaultPosition={50}
                  handle={<CompareHandle />}
                  itemOne={
                    <div style={{ position: 'relative' }}>
                      <ReactCompareSliderImage
                        src={slide.beforeImage}
                        alt={slide.beforeAlt}
                      />
                      <div style={{ ...badgeStyle, left: 16 }}>{content.beforeLabel}</div>
                    </div>
                  }
                  itemTwo={
                    <div style={{ position: 'relative' }}>
                      <ReactCompareSliderImage
                        src={slide.afterImage}
                        alt={slide.afterAlt}
                      />
                      <div style={{ ...badgeStyle, right: 16 }}>{content.afterLabel}</div>
                    </div>
                  }
                />
              </div>
            </div>

            {/* ── Mobile: stacked layout ── */}
            <div className="md:hidden">
              <div style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.beforeImage}
                  alt={slide.beforeAlt}
                  className="w-full block"
                  loading="lazy"
                />
                <div style={{ ...badgeStyle, left: 12 }}>{content.beforeLabel}</div>
              </div>
              <div
                style={{
                  position: 'relative',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.afterImage}
                  alt={slide.afterAlt}
                  className="w-full block"
                  loading="lazy"
                />
                <div style={{ ...badgeStyle, right: 12 }}>{content.afterLabel}</div>
              </div>
            </div>
          </BrowserChrome>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between px-1">
            <span className="font-mono text-xs text-white/35">
              {currentSlide + 1}/{slides.length}
            </span>
            <span className="font-mono text-xs text-white/50 text-center">{slide.label}</span>
            <div className="flex items-center gap-2">
              {[
                { dir: -1, label: 'Previous project', arrow: '←' },
                { dir: 1, label: 'Next project', arrow: '→' },
              ].map(({ dir, label, arrow }) => (
                <button
                  key={dir}
                  onClick={() => navigate(dir)}
                  disabled={transitioning}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors duration-200 disabled:opacity-40"
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(255,255,255,0.3)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLButtonElement).style.color =
                      'rgba(255,255,255,0.7)';
                  }}
                >
                  {arrow}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
