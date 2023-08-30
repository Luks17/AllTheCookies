import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  integrations: [
    react(),
    tailwind({
      // Disables injecting a basic `base.css` import on every page.
      // Needed because I have my own base.css.
      applyBaseStyles: false,
    }),
    markdoc(),
    sitemap(),
  ],
  redirects: {
    "/posts": "/posts/all",
  },
  site: "https://www.allthecookies.com.br",
});
