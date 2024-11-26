import { i18nConfig } from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...i18nConfig,
  images: {
    domains: [
      ...process.env.NEXT_PUBLIC_IMAGES_DOMAINS.split(","), // Using environment variable domains
      "flagcdn.com", // Additional domain
    ],
  },
  async redirects() {
    return [
      {
        source: "/about", // Old URL path
        destination: "/about-us", // New URL path
        permanent: true, // 301 Redirect
      },
      {
        source: "/privacyPolicy", // Old URL path
        destination: "/privacy-policy", // New URL path
        permanent: true, // 301 Redirect
      },
      {
        source: "/termsAndCondition", // Old URL path
        destination: "/terms-and-condition", // New URL path
        permanent: true, // 301 Redirect
      },
      // Additional redirects can be added here
    ];
  },
};

export default nextConfig;
