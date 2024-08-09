import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "77.243.80.138",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withNextIntl(nextConfig);
