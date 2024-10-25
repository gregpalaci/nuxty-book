import { fileURLToPath } from "url";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@nuxt/image", "@vueuse/nuxt", "@nuxthub/core"],
  experimental: {
    componentIslands: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
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