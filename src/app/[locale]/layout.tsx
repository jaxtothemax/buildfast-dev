import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { routing } from '@i18n/routing';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';
import '@/app/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildfast.dev';

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'BuildFast — Web Development Agency',
    description:
      'High-performance web development for startups and scale-ups. Landing pages, SaaS platforms, and SEO architecture. PageSpeed 95+ guaranteed.',
  },
  sl: {
    title: 'BuildFast — Agencija za spletni razvoj',
    description:
      'Visoko-zmogljiv spletni razvoj za startupe in rastoča podjetja. Landing pages, SaaS platforme in SEO arhitektura. PageSpeed 95+ zagotovljeno.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metaByLocale[locale] ?? metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        sl: '/sl',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: 'BuildFast',
      locale: locale === 'sl' ? 'sl_SI' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BuildFast',
  url: siteUrl,
  description:
    'High-performance web development agency specialising in Next.js, SEO, and Core Web Vitals optimisation.',
  serviceType: 'Web Development',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landing Page Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SaaS Platform Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Architecture' } },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'sl')) notFound();

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="sl" href={`${siteUrl}/sl`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
