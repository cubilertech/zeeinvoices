/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGES_DOMAINS.split(","),
    domains: ["flagcdn.com"],
  },
};

export default nextConfig;
