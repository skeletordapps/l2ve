/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
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

    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
};

export default nextConfig;
