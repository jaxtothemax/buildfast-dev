import { notFound } from 'next/navigation';
import { routing } from '@i18n/routing';
import { content as enContent } from '@/content/en';
import { content as slContent } from '@/content/sl';
import Nav from '@/components/layout/Nav';
import TickerBar from '@/components/layout/TickerBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Features from '@/components/sections/Features';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import BottomCTA from '@/components/sections/BottomCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'sl')) notFound();

  const content = locale === 'sl' ? slContent : enContent;

  return (
    <main>
      <Nav content={content.nav} locale={locale} />
      <TickerBar content={content.ticker} />
      <Hero content={content.hero} />
      <Stats stats={content.stats} />
      <Features content={content.features} />
      <Process content={content.process} />
      <Testimonials content={content.testimonials} />
      <Pricing content={content.pricing} />
      <BottomCTA content={content.cta} />
      <Footer content={content.footer} locale={locale} />
    </main>
  );
}
