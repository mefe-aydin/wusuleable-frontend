import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "en",
  },
};

export default nextConfig;
