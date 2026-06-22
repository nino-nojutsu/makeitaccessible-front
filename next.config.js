/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "C:/DumpStack.log.tmp",
          "C:/hiberfil.sys",
          "C:/pagefile.sys",
          "C:/swapfile.sys",
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig;
