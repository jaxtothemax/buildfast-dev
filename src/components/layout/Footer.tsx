'use client';

import type { FooterContent } from '@/content/types';

interface FooterProps {
  content: FooterContent;
  locale: string;
}

export default function Footer({ content, locale }: FooterProps) {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-mono text-lg font-semibold text-white mb-3">
              {content.logo}
              <span className="text-[#f97316]">.</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">{content.tagline}</p>
          </div>

          {/* Link columns */}
          {content.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs text-white/30 font-mono">{content.copyright}</p>
          <div className="flex items-center gap-1 text-xs font-mono text-white/30">
            <span>Built with</span>
            <span className="text-[#f97316]">Next.js</span>
            <span>&</span>
            <span className="text-[#f97316]">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
