/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  // Removed rewrites since we're using full API URLs in axios configuration
  // This prevents path resolution issues
};

module.exports = nextConfig;