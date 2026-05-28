/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Force Next.js to transpile these packages to avoid "Module not found" errors
  transpilePackages: ['lucide-react', 'recharts'],
};

module.exports = nextConfig;
