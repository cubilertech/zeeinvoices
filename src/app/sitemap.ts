import { MetadataRoute } from 'next'
const siteUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL || "https://staging.zeeinvoices.com"; // Fallback in case env is missing
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
    //   alternates: {
    //     languages: {
    //       es: 'https://acme.com/es',
    //       de: 'https://acme.com/de',
    //     },
    //   },
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
    //   alternates: {
    //     languages: {
    //       es: 'https://acme.com/es/about',
    //       de: 'https://acme.com/de/about',
    //     },
    //   },
    },
  ]
}