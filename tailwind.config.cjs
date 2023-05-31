/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // extend: {
    backgroundColor: {
      primary: "var(--base)",
      crust: "var(--crust)",
      mantle: "var(--mantle)",
      selected: "var(--surface2)",
      "fg-base": "var(--surface0)",
      "fg-secondary": "var(--surface1)",
      "fg-third": "var(--surface2)",

      "glow-primary": "var(--sky)",
    },

    textColor: {
      skin: {
        base: "var(--text)",
        subtext: "var(--subtext0)",
        muted: "var(--overlay1)",
        selected: "var(--yellow)",
        "accent": "var(--lavender)",
        "accent-secondary": "var(--mauve)",
        "alternate": "var(--maroon)",
      }
    },

    borderColor: {
      "primary": "var(--peach)",
    }
    // }
  },
  plugins: [],
}
