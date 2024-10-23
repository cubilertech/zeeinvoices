import { MetadataRoute } from 'next'
const siteUrl =  "https://zeeinvoices.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/terms-and-condition`,
      lastModified: new Date(),
    },
  ]
}