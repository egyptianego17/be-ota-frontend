import withPWA from "@ducanh2912/next-pwa";
import pkg from "./next-i18next.config.js";
const { i18n } = pkg;

/** @type {import("next").NextConfig} */
const nextConfig = {
webpack(config) {
    config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    });
    return config;
    },
  reactStrictMode: true,
  i18n,
};

export default withPWA({
  dest: "public",
  register: true, // Registers the service worker automatically
  skipWaiting: true, // Installs new service workers as soon as they become available
  runtimeCaching: [
    {
      // Cache API calls
      urlPattern: /^https:\/\/api\.example\.com\//,
      handler: "NetworkFirst", // First tries network, then falls back to cache if offline
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
      handler: "CacheFirst", // Serves fonts from cache, then fetches newer versions in the background
      options: {
        cacheName: "google-fonts-cache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=/,
      handler: "CacheFirst",
      options: {
        cacheName: "next-image-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
  ...nextConfig,
});
