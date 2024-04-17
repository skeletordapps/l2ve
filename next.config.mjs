/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jade-neat-squirrel-625.mypinata.cloud/",
        port: "",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add this line to disable fs
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
};

export default nextConfig;
