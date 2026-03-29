import type { SiteContent } from './types';

export const content: SiteContent = {
  nav: {
    logo: 'BuildFast',
    links: [
      { label: 'Storitve', href: '#features' },
      { label: 'Proces', href: '#process' },
      { label: 'Cenik', href: '#pricing' },
      { label: 'O nas', href: '#testimonials' },
    ],
    cta: 'Pridobi ponudbo',
  },

  ticker: {
    badge: 'Novo',
    message:
      'Ponujamo optimizacijo Core Web Vitals — PageSpeed 95+ zagotovljeno ali vračamo denar  ·  Certificirani Next.js & Vercel partnerji  ·  Brezplačna revizija landing page ta mesec  ·',
  },

  hero: {
    badge: 'Sprejemamo nove projekte',
    headline: 'Gradimo spletne strani, ki delujejo.',
    subheadline:
      'Full-stack spletni razvoj za startupe in rastoča podjetja. Od landing pages do kompleksnih SaaS platform — dostavljeno hitro, zgrajeno za vztrajnost.',
    cta1: 'Začni projekt',
    cta2: 'Poglej naše delo',
  },

  stats: [
    { value: 95, suffix: '+', label: 'Povprečna Lighthouse ocena' },
    { value: 120, suffix: '+', label: 'Dostavljenih projektov' },
    { value: 48, suffix: 'h', label: 'Povprečna prva dostava' },
    { value: 98, suffix: '%', label: 'Zadovoljstvo strank' },
  ],

  features: {
    label: 'Kaj gradimo',
    title: 'Vsaka storitev, pripravljena za produkcijo.',
    items: [
      {
        title: 'Landing Pages',
        description:
          'Visoko konverzijske landing pages z animacijami, A/B-pripravljeno strukturo besedila in PageSpeed ocenami, ki znižujejo stroške oglaševanja.',
        icon: '01',
      },
      {
        title: 'SaaS Platforme',
        description:
          'Full-stack Next.js aplikacije z avtentikacijo, zaračunavanjem, nadzornimi ploščami in API integracijami. Dostavljamo iterativno, nikoli kot monolit.',
        icon: '02',
      },
      {
        title: 'CMS & Uredništvo',
        description:
          'Headless CMS namestitve s Sanity, Contentful ali Payload. Vaša ekipa ureja vsebino — brez razvijalca.',
        icon: '03',
      },
      {
        title: 'SEO Arhitektura',
        description:
          'Tehnični SEO vgrajen od prvega dne. Semantični HTML, strukturirani podatki, hreflang, sitemaps in optimizacija Core Web Vitals.',
        icon: '04',
      },
      {
        title: 'Revizije zmogljivosti',
        description:
          'Diagnosticiramo počasne strani in jih popravimo. LCP, CLS, FID — vemo, kaj premika iglo, in jo premaknemo.',
        icon: '05',
      },
      {
        title: 'Dizajn sistemi',
        description:
          'Skalabilne knjižnice komponent v Figmi in kodi. En vir resnice za vašo znamko, zgrajen za ekipe, ki hitro dostavljajo.',
        icon: '06',
      },
    ],
  },

  process: {
    label: 'Kako delamo',
    title: 'Od briefa do zagona v tednih, ne mesecih.',
    steps: [
      {
        number: '01',
        title: 'Odkrivalni klic',
        description:
          'Porabimo 30 minut za razumevanje vaših ciljev, uporabnikov in omejitev. Brez praznih besed, samo signal.',
      },
      {
        number: '02',
        title: 'Predlog in obseg',
        description:
          'V 24 urah prejmete predlog s fiksnim obsegom, deliverables, časovnim načrtom in jasno ceno. Brez presenečenj.',
      },
      {
        number: '03',
        title: 'Dizajn in prototip',
        description:
          'Oblikujemo v Figmi in zgodaj delimo interaktivne prototipe. Točno vidite, kaj gradimo, preden napišemo eno samo vrstico kode.',
      },
      {
        number: '04',
        title: 'Razvojni sprinti',
        description:
          'Gradimo v dvotedenskih sprintih s staging URL-jem od prvega dne. Na vsaki kontrolni točki pregledate resnično delujočo programsko opremo.',
      },
      {
        number: '05',
        title: 'Zagon in predaja',
        description:
          'Namestimo na Vercel, opravimo končne Lighthouse preveritve in predamo dokumentacijo. Kodo v celoti posedujete vi.',
      },
    ],
  },

  testimonials: {
    label: 'Zgodbe strank',
    title: 'Zaupanje ekip, ki dostavljajo.',
    items: [
      {
        quote:
          'BuildFast je dostavil našo landing page v 10 dneh. Stopnja konverzije se je v prvem mesecu povečala za 34 %. Vredno vsake evrske cent.',
        author: 'Ana Kovač',
        role: 'CEO',
        company: 'Flarespark',
        initials: 'AK',
      },
      {
        quote:
          'Ti fantje razumejo tako dizajn kot zmogljivost. Naša ocena PageSpeed je šla s 54 na 97. Razlika v stroških oglaševanja je sama pokrila projekt.',
        author: 'Tom Reilly',
        role: 'Vodja rasti',
        company: 'Loopcast',
        initials: 'TR',
      },
      {
        quote:
          'Predaja CMS je bila brezhibna. Naši uredniki so pisali vsebino brez kakršnega koli usposabljanja prvi dan. To se nikoli ne zgodi.',
        author: 'Maja Novak',
        role: 'Produktni manager',
        company: 'Gridly',
        initials: 'MN',
      },
      {
        quote:
          'Pred tem smo delali s tremi agencijami. BuildFast je prva, ki dejansko proaktivno komunicira in dostavi pravočasno.',
        author: 'James Wu',
        role: 'CTO',
        company: 'Stackpilot',
        initials: 'JW',
      },
      {
        quote:
          'V šestih tednih so zgradili naš celoten SaaS MVP. Čista koda, ustrezna avtentikacija, Stripe zaračunavanje — vse je delovalo prvi dan.',
        author: 'Sara Petrič',
        role: 'Ustanoviteljica',
        company: 'Formbloc',
        initials: 'SP',
      },
      {
        quote:
          'Samo animacijsko delo je vredno tega. Naša stran je najboljša demo, ki jo imamo — potencialne stranke jo komentirajo na vsakem prodajnem klicu.',
        author: 'Luca Ferrari',
        role: 'Vodja trženja',
        company: 'Driftly',
        initials: 'LF',
      },
    ],
  },

  pricing: {
    label: 'Cenik',
    title: 'Transparentne cene z fiksnim obsegom.',
    subtitle:
      'Brez mesečnih nadomestil, brez urnih presenečenj. Vsak projekt se začne s fiksnim predlogom.',
    tiers: [
      {
        name: 'Launch',
        price: '€2.900',
        period: 'enkratno',
        description:
          'Idealno za startupe, ki potrebujejo kakovostno landing page dostavljeno hitro.',
        features: [
          'Ena landing page',
          'Mobile-first odzivnost',
          'GSAP animacije vključene',
          'SEO optimizacija',
          'Garancija PageSpeed 90+',
          'Namestitev na Vercel',
          '2 kroga popravkov',
          '30-dnevna podpora',
        ],
        cta: 'Začni',
        featured: false,
      },
      {
        name: 'Growth',
        price: '€6.900',
        period: 'enkratno',
        description:
          'Za ekipe, ki potrebujejo celotno spletno stran s CMS, več stranmi in napredno zmogljivostjo.',
        features: [
          'Do 8 strani',
          'Headless CMS namestitev',
          'i18n (2 jezika)',
          'Napredne animacije',
          'Revizija Core Web Vitals',
          'Garancija PageSpeed 95+',
          'Neomejeni popravki',
          '90-dnevna podpora',
          'Dizajn sistem v Figmi',
        ],
        cta: 'Začni projekt',
        featured: true,
      },
      {
        name: 'Platform',
        price: 'Po meri',
        period: 'po obsegu',
        description:
          'Full-stack SaaS platforme, kompleksne integracije in dolgoročna inženirska partnerstva.',
        features: [
          'Full-stack Next.js aplikacija',
          'Avtentikacija in zaračunavanje',
          'Nadzorna plošča in analitika',
          'API integracije',
          'CI/CD pipeline',
          'Namenski Slack kanal',
          'Tedenski pregledi sprintov',
          '12-mesečni SLA za podporo',
          'Prenos znanja na ekipo',
        ],
        cta: 'Rezerviraj klic',
        featured: false,
      },
    ],
  },

  cta: {
    label: 'Začni',
    headline: 'Pripravljen zgraditi kaj hitrega?',
    subheadline:
      'Rezerviraj 30-minutni odkrivalni klic. Brez zaveze, brez prodajnega pritiska — samo pogovor o tem, kar gradite.',
    button: 'Rezerviraj odkrivalni klic',
  },

  footer: {
    logo: 'BuildFast',
    tagline: 'Gradimo spletne strani, ki delujejo.',
    columns: [
      {
        title: 'Storitve',
        links: [
          { label: 'Landing Pages', href: '#features' },
          { label: 'SaaS Platforme', href: '#features' },
          { label: 'CMS & Uredništvo', href: '#features' },
          { label: 'SEO Arhitektura', href: '#features' },
        ],
      },
      {
        title: 'Podjetje',
        links: [
          { label: 'O nas', href: '#' },
          { label: 'Proces', href: '#process' },
          { label: 'Cenik', href: '#pricing' },
          { label: 'Kontakt', href: '#' },
        ],
      },
      {
        title: 'Pravno',
        links: [
          { label: 'Politika zasebnosti', href: '#' },
          { label: 'Pogoji storitve', href: '#' },
          { label: 'Politika piškotkov', href: '#' },
        ],
      },
    ],
    copyright: '© 2025 BuildFast. Vse pravice pridržane.',
  },
};
