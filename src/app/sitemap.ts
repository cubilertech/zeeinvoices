import { MetadataRoute } from 'next'
 const url = 'https://staging.zeeinvoices.com'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${url}`,
      lastModified: new Date(),
    //   alternates: {
    //     languages: {
    //       es: 'https://acme.com/es',
    //       de: 'https://acme.com/de',
    //     },
    //   },
    },
    {
      url: `${url}/about`,
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