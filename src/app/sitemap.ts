import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildfast.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/en`,
          sl: `${siteUrl}/sl`,
        },
      },
    },
    {
      url: `${siteUrl}/sl`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/en`,
          sl: `${siteUrl}/sl`,
        },
      },
    },
  ];
}
