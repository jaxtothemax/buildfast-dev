import type { SiteContent } from './types';

export const content: SiteContent = {
  nav: {
    logo: 'BuildFast',
    links: [
      { label: 'Services', href: '#features' },
      { label: 'Process', href: '#process' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '#testimonials' },
    ],
    cta: 'Get a quote',
  },

  ticker: {
    badge: 'New',
    message:
      'We now offer Core Web Vitals optimization sprints — PageSpeed 95+ guaranteed or your money back  ·  Certified Next.js & Vercel partners  ·  Free landing page audit this month  ·',
  },

  hero: {
    badge: 'Available for new projects',
    headline: 'We build websites that perform.',
    subheadline:
      'Full-stack web development for startups and scale-ups. From landing pages to complex SaaS platforms — shipped fast, built to last.',
    cta1: 'Start a project',
    cta2: 'See our work',
  },

  stats: [
    { value: 95, suffix: '+', label: 'Lighthouse score avg.' },
    { value: 120, suffix: '+', label: 'Projects delivered' },
    { value: 48, suffix: 'h', label: 'Avg. first delivery' },
    { value: 98, suffix: '%', label: 'Client satisfaction' },
  ],

  features: {
    label: 'What we build',
    title: 'Every service, production-ready.',
    items: [
      {
        title: 'Landing Pages',
        description:
          'High-converting landing pages with animations, A/B-ready copy structure, and PageSpeed scores that make your ads cheaper.',
        icon: '01',
      },
      {
        title: 'SaaS Platforms',
        description:
          'Full-stack Next.js applications with auth, billing, dashboards, and API integrations. Shipped iteratively, never as a monolith.',
        icon: '02',
      },
      {
        title: 'CMS & Editorial',
        description:
          'Headless CMS setups with Sanity, Contentful, or Payload. Your team edits content — no developer required.',
        icon: '03',
      },
      {
        title: 'SEO Architecture',
        description:
          'Technical SEO baked in from day one. Semantic HTML, structured data, hreflang, sitemaps, and Core Web Vitals tuning.',
        icon: '04',
      },
      {
        title: 'Performance Audits',
        description:
          'We diagnose slow sites and fix them. LCP, CLS, FID — we know what moves the needle and we move it.',
        icon: '05',
      },
      {
        title: 'Design Systems',
        description:
          'Scalable component libraries in Figma and code. One source of truth for your brand, built for teams that ship fast.',
        icon: '06',
      },
    ],
  },

  process: {
    label: 'How we work',
    title: 'From brief to shipped in weeks, not months.',
    steps: [
      {
        number: '01',
        title: 'Discovery call',
        description:
          'We spend 30 minutes understanding your goals, your users, and your constraints. No fluff, just signal.',
      },
      {
        number: '02',
        title: 'Proposal & scope',
        description:
          'Within 24 hours you receive a fixed-scope proposal with deliverables, timeline, and a clear price. No surprises.',
      },
      {
        number: '03',
        title: 'Design & prototype',
        description:
          'We design in Figma and share interactive prototypes early. You see exactly what we\'re building before a single line of code is written.',
      },
      {
        number: '04',
        title: 'Development sprints',
        description:
          'We build in two-week sprints with a staging URL from day one. You review real, working software at every checkpoint.',
      },
      {
        number: '05',
        title: 'Launch & handover',
        description:
          'We deploy to Vercel, run final Lighthouse checks, and hand over documentation. You own your codebase completely.',
      },
    ],
  },

  testimonials: {
    label: 'Client stories',
    title: 'Trusted by teams who ship.',
    items: [
      {
        quote:
          'BuildFast delivered our landing page in 10 days. Our conversion rate jumped 34% in the first month. Worth every cent.',
        author: 'Ana Kovač',
        role: 'CEO',
        company: 'Flarespark',
        initials: 'AK',
      },
      {
        quote:
          'These guys understand both design and performance. Our PageSpeed went from 54 to 97. The difference in ad spend alone paid for the project.',
        author: 'Tom Reilly',
        role: 'Head of Growth',
        company: 'Loopcast',
        initials: 'TR',
      },
      {
        quote:
          'The CMS handover was seamless. Our editors were writing content without any training on day one. That never happens.',
        author: 'Maja Novak',
        role: 'Product Manager',
        company: 'Gridly',
        initials: 'MN',
      },
      {
        quote:
          'We\'ve worked with three agencies before. BuildFast is the first one that actually communicates proactively and ships on time.',
        author: 'James Wu',
        role: 'CTO',
        company: 'Stackpilot',
        initials: 'JW',
      },
      {
        quote:
          'They built our entire SaaS MVP in six weeks. Clean code, proper auth, Stripe billing — everything worked on day one.',
        author: 'Sara Petrič',
        role: 'Founder',
        company: 'Formbloc',
        initials: 'SP',
      },
      {
        quote:
          'The animation work alone is worth it. Our site is the best demo we have — prospects comment on it in every sales call.',
        author: 'Luca Ferrari',
        role: 'Head of Marketing',
        company: 'Driftly',
        initials: 'LF',
      },
    ],
  },

  transformations: {
    label: 'our work',
    title: 'Websites we\'ve transformed.',
    subtitle: 'Drag the divider to compare the old and new design side by side.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    slides: [
      {
        id: 1,
        label: 'SaaS startup rebrand',
        beforeImage: 'https://placehold.co/1200x700/111111/444444?text=Before+—+SaaS+Startup',
        afterImage: 'https://placehold.co/1200x700/0d1117/5ba3f5?text=After+—+SaaS+Startup',
        beforeAlt: 'SaaS startup website before redesign',
        afterAlt: 'SaaS startup website after redesign',
      },
      {
        id: 2,
        label: 'E-commerce redesign',
        beforeImage: 'https://placehold.co/1200x700/111111/444444?text=Before+—+E-commerce',
        afterImage: 'https://placehold.co/1200x700/0f1a10/4aad52?text=After+—+E-commerce',
        beforeAlt: 'E-commerce site before redesign',
        afterAlt: 'E-commerce site after redesign',
      },
      {
        id: 3,
        label: 'Agency website',
        beforeImage: 'https://placehold.co/1200x700/111111/444444?text=Before+—+Agency',
        afterImage: 'https://placehold.co/1200x700/1a0d0d/f97316?text=After+—+Agency',
        beforeAlt: 'Agency website before redesign',
        afterAlt: 'Agency website after redesign',
      },
    ],
  },

  pricing: {
    label: 'Pricing',
    title: 'Transparent, fixed-scope pricing.',
    subtitle:
      'No retainers, no hourly surprises. Every project starts with a fixed proposal.',
    tiers: [
      {
        name: 'Launch',
        price: '€2,900',
        period: 'one-time',
        description:
          'Perfect for startups that need a high-quality landing page shipped fast.',
        features: [
          'Single landing page',
          'Mobile-first responsive',
          'GSAP animations included',
          'SEO optimisation',
          'PageSpeed 90+ guarantee',
          'Vercel deployment',
          '2 rounds of revisions',
          '30-day support',
        ],
        cta: 'Get started',
        featured: false,
      },
      {
        name: 'Growth',
        price: '€6,900',
        period: 'one-time',
        description:
          'For teams who need a complete website with CMS, multi-page, and advanced performance.',
        features: [
          'Up to 8 pages',
          'Headless CMS setup',
          'i18n (2 languages)',
          'Advanced animations',
          'Core Web Vitals audit',
          'PageSpeed 95+ guarantee',
          'Unlimited revisions',
          '90-day support',
          'Design system in Figma',
        ],
        cta: 'Start a project',
        featured: true,
      },
      {
        name: 'Platform',
        price: 'Custom',
        period: 'scoped',
        description:
          'Full-stack SaaS platforms, complex integrations, and long-term engineering partnerships.',
        features: [
          'Full-stack Next.js app',
          'Auth & billing',
          'Dashboard & analytics',
          'API integrations',
          'CI/CD pipeline',
          'Dedicated Slack channel',
          'Weekly sprint reviews',
          '12-month support SLA',
          'Team knowledge transfer',
        ],
        cta: 'Book a call',
        featured: false,
      },
    ],
  },

  cta: {
    label: 'Get started',
    headline: 'Ready to build something fast?',
    subheadline:
      'Book a 30-minute discovery call. No commitment, no sales pressure — just a conversation about what you\'re building.',
    button: 'Book a discovery call',
  },

  footer: {
    logo: 'BuildFast',
    tagline: 'We build websites that perform.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Landing Pages', href: '#features' },
          { label: 'SaaS Platforms', href: '#features' },
          { label: 'CMS & Editorial', href: '#features' },
          { label: 'SEO Architecture', href: '#features' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Process', href: '#process' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Contact', href: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Cookie Policy', href: '#' },
        ],
      },
    ],
    copyright: '© 2025 BuildFast. All rights reserved.',
  },
};
