/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add this line to disable fs
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
};

export default nextConfig;
