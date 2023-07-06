import { defineConfig, sharpImageService } from "astro/config";

import path from "path";
import { fileURLToPath } from "url";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

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
  experimental: { assets: true, redirects: true },
  integrations: [react(), tailwind(), markdoc()],
  image: {
    service: sharpImageService(),
  },
  redirects: {
    "/posts": "/posts/all",
  },

  site: "http://127.0.0.1:3000",
});
