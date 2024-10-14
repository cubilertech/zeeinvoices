/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGES_DOMAINS.split(","),
    // domains: ['localhost','lh3.googleusercontent.com'],
    domains: ["flagcdn.com"],
  },
};

export default nextConfig;
