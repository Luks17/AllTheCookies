import path from "path";
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import markdoc from "@astrojs/markdoc";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// https://astro.build/config

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  },
  integrations: [react(), tailwind(), mdx(), markdoc()],
  site: "http://127.0.0.1:3000"
});