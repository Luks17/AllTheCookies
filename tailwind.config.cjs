/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // extend: {
    backgroundImage: {
      "gradient-image": "var(--bg-gradient)",
    },
    backgroundColor: {
      primary: "var(--base)",
      crust: "var(--crust)",
      mantle: "var(--mantle)",
      selected: "var(--surface2)",
      fg_base: "var(--surface0)",
      fg_secondary: "var(--surface1)",
      fg_third: "var(--surface2)",
    },

    textColor: {
      skin: {
        base: "var(--text)",
        subtext: "var(--subtext0)",
        muted: "var(--overlay1)",
        selected: "var(--mauve)",
        accent: "var(--lavender)",
        alternate: "var(--maroon)",
      }
    }
    // }
  },
  plugins: [],
}
