export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  logo: string;
  links: NavLink[];
  cta: string;
}

export interface TickerContent {
  badge: string;
  message: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  cta1: string;
  cta2: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  label: string;
  title: string;
  items: FeatureItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  label: string;
  title: string;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export interface TestimonialsContent {
  label: string;
  title: string;
  items: TestimonialItem[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export interface PricingContent {
  label: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface CTAContent {
  label: string;
  headline: string;
  subheadline: string;
  button: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  logo: string;
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
}

export interface SiteContent {
  nav: NavContent;
  ticker: TickerContent;
  hero: HeroContent;
  stats: StatItem[];
  features: FeaturesContent;
  process: ProcessContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  cta: CTAContent;
  footer: FooterContent;
}
