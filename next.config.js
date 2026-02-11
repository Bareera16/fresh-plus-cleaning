/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [],
        unoptimized: true,
    },
    // Transpile packages that need it
    transpilePackages: [
        '@radix-ui/react-accordion',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        'lucide-react',
    ],
};

module.exports = nextConfig;
