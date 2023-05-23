/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // extend: {
    backgroundColor: {
      primary: "var(--bg-primary)",
      secondary: "var(--bg-secondary)",
    },
    backgroundImage: {
      "gradient-image": "var(--bg-gradient)",
    },
    textColor: {
      skin: {
        base: "var(--color-text-base)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-text-accent)",
        inverted: "var(--color-text-inverted)"
      }
    }
    // }
  },
  plugins: [],
}
