'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from '@i18n/navigation';
import type { NavContent } from '@/content/types';
import { gsap } from '@/lib/gsap';

interface NavProps {
  content: NavContent;
  locale: string;
}

export default function Nav({ content, locale }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'sl' });
  };

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href={`/${locale}`}
          className="font-mono text-base font-semibold tracking-tight text-white"
        >
          {content.logo}
          <span className="text-[#f97316]">.</span>
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-8">
          {content.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={handleAnchor(link.href)}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center gap-1 font-mono text-xs text-white/40">
            {(['en', 'sl'] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/20">/</span>}
                <button
                  onClick={() => switchLocale(l)}
                  className={`uppercase tracking-widest transition-colors duration-200 ${
                    locale === l ? 'text-white' : 'hover:text-white/70'
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#pricing"
            onClick={handleAnchor('#pricing')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: '#f97316',
              color: '#000',
            }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: 'power2.out' })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
            }
          >
            {content.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
