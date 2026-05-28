/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This tells Next.js how to handle these libraries specifically
  transpilePackages: ['lucide-react', 'recharts']
};

module.exports = nextConfig;
