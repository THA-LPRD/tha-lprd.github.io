// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
// import db from "@astrojs/db";
import svelte from "@astrojs/svelte";

const isDev = process.env.NODE_ENV === "development"

// https://astro.build/config
export default defineConfig({
  // The `site` property specifies the base URL for your site.
  // Be sure to update this to your own domain (e.g., "https://yourdomain.com") before deploying.
  site: "https://lprd-display.com",
  // site: "https://tha-lprd.github.io",
  // base: "/homepage",
  prefetch: true,
  trailingSlash: "ignore",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    // ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
    ...(isDev ? [keystatic()] : []), // Uses the integration conditionally
    // db(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: isDev ? 'server' : 'static', // Only set server rendering for dev mode
  adapter: vercel(),
});
