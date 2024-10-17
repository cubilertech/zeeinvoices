import { MetadataRoute } from 'next'
const siteUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL || "https://staging.zeeinvoices.com"; // Fallback in case env is missing
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}