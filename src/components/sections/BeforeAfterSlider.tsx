'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { useReactCompareSlider } from 'react-compare-slider/hooks';
import {
  Provider as SliderProvider,
  Root as SliderRoot,
  Item as SliderItem,
  Handle as SliderHandle,
  HandleRoot as SliderHandleRoot,
  Image as SliderImage,
} from 'react-compare-slider/components';
import type { TransformationsContent } from '@/content/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface BeforeAfterSliderProps {
  content: TransformationsContent;
}

// Pill badge for Before / After labels
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

// Browser chrome wrapper
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

// The interactive compare slider built with the low-level API
// so we have access to `setPosition` for programmatic control.
interface ControlledSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  setPositionRef: React.MutableRefObject<((pos: number) => void) | null>;
}

function ControlledSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  setPositionRef,
}: ControlledSliderProps) {
  const sliderState = useReactCompareSlider({ defaultPosition: 50 });

  // Expose setPosition to parent via ref
  useEffect(() => {
    setPositionRef.current = sliderState.setPosition;
    return () => {
      setPositionRef.current = null;
    };
  }, [sliderState.setPosition, setPositionRef]);

  return (
    <SliderProvider {...sliderState}>
      <SliderRoot
        style={{ position: 'relative', width: '100%', display: 'block', userSelect: 'none' }}
      >
        {/* Before — itemOne */}
        <SliderItem item="itemOne" style={{ position: 'relative', display: 'block' }}>
          <SliderImage
            src={beforeSrc}
            alt={beforeAlt}
            style={{ display: 'block', width: '100%' }}
          />
          <div style={{ ...badgeStyle, left: 16 }}>{beforeLabel}</div>
        </SliderItem>

        {/* After — itemTwo */}
        <SliderItem item="itemTwo" style={{ position: 'relative', display: 'block' }}>
          <SliderImage
            src={afterSrc}
            alt={afterAlt}
            style={{ display: 'block', width: '100%' }}
          />
          <div style={{ ...badgeStyle, right: 16 }}>{afterLabel}</div>
        </SliderItem>

        {/* Handle */}
        <SliderHandleRoot>
          <SliderHandle
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#ffffff',
              border: 'none',
              boxShadow: '0 2px 16px rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
              color: '#000',
              cursor: 'ew-resize',
              flexShrink: 0,
            }}
          >
            ↔
          </SliderHandle>
        </SliderHandleRoot>
      </SliderRoot>
    </SliderProvider>
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
  const sliderWrapRef = useRef<HTMLDivElement>(null);

  // Ref to the slider's setPosition function (populated by ControlledSlider)
  const setPositionRef = useRef<((pos: number) => void) | null>(null);

  // Stable navigate ref to avoid stale closures in keyboard handler
  const navigateFnRef = useRef<(dir: number) => void>(() => {});

  // ─── Entrance animation + sweep hint ───────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const mockup = mockupRef.current;
    if (!section || !headline || !mockup) return;

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
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
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
              onUpdate: () => setPositionRef.current?.(obj.val),
              onComplete: () => {
                gsap.to(obj, {
                  val: 50,
                  duration: 0.65,
                  ease: 'power2.inOut',
                  onUpdate: () => setPositionRef.current?.(obj.val),
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

  // ─── In-view tracking for keyboard nav ─────────────────────────────────────
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

  // ─── Slide navigation with GSAP transition ─────────────────────────────────
  const navigate = useCallback(
    (dir: number) => {
      if (transitioning) return;
      const wrap = sliderWrapRef.current;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextIndex = (currentSlide + dir + slides.length) % slides.length;

      if (prefersReduced || !wrap) {
        flushSync(() => setCurrentSlide(nextIndex));
        setPositionRef.current?.(50);
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
          // Force synchronous React re-render before animating in
          flushSync(() => setCurrentSlide(nextIndex));
          setPositionRef.current?.(50);

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

  // Keep navigateFnRef current
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
            {/* ── Desktop: interactive slider ── */}
            <div ref={sliderWrapRef} className="hidden md:block">
              <ControlledSlider
                key={currentSlide}
                beforeSrc={slide.beforeImage}
                afterSrc={slide.afterImage}
                beforeAlt={slide.beforeAlt}
                afterAlt={slide.afterAlt}
                beforeLabel={content.beforeLabel}
                afterLabel={content.afterLabel}
                setPositionRef={setPositionRef}
              />
            </div>

            {/* ── Mobile: stacked static layout ── */}
            <div className="md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="relative">
                <img
                  src={slide.beforeImage}
                  alt={slide.beforeAlt}
                  className="w-full block"
                  loading="lazy"
                />
                <div style={{ ...badgeStyle, left: 12 }}>{content.beforeLabel}</div>
              </div>
              <div
                className="relative"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
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

          {/* Controls row */}
          <div className="mt-5 flex items-center justify-between px-1">
            {/* Slide counter — bottom-left as per spec */}
            <span className="font-mono text-xs text-white/35">
              {currentSlide + 1}/{slides.length}
            </span>

            {/* Project label — center */}
            <span className="font-mono text-xs text-white/50 text-center">{slide.label}</span>

            {/* Arrows — bottom-right */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                disabled={transitioning}
                aria-label="Previous project"
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
                ←
              </button>
              <button
                onClick={() => navigate(1)}
                disabled={transitioning}
                aria-label="Next project"
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
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
