import { fileURLToPath } from "url";
import process from "node:process";

const sw = process.env.SW === "true";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@nuxt/image", "@vueuse/nuxt", "@nuxthub/core"],
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },
  pwa: {
    strategies: sw ? "injectManifest" : "generateSW",
    srcDir: sw ? "service-worker" : undefined,
    filename: sw ? "sw.ts" : undefined,
    registerType: "autoUpdate",
    registerWebManifestInRouteRules: true,
    manifest: {
      name: "My Book App",
      short_name: "My Book App",
      description: "mini library",
      start_url: "./",
      display: "standalone",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  imports: {
    autoImport: true,
  },
  image: {
    domains: ["m.media-amazon.com"],
  },
  alias: {
    "~": fileURLToPath(new URL("./", import.meta.url)),
    "@": fileURLToPath(new URL("./", import.meta.url)),
    "@lib": "./lib",
    // "~~": "/<rootDir>",
    // "@@": "/<rootDir>",
    assets: fileURLToPath(new URL("./assets", import.meta.url)),
    public: "/<srcDir>/public",
  },
});
