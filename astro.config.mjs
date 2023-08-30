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
  integrations: [react(), tailwind(), markdoc(), sitemap()],
  redirects: {
    "/posts": "/posts/all",
  },
  site: "https://www.allthecookies.com.br",
});
