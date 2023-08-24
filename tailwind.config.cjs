/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundColor: {
      primary: "var(--base)",
      crust: "var(--crust)",
      mantle: "var(--mantle)",
      selected: "var(--surface2)",
      "fg-base": "var(--surface0)",
      "fg-secondary": "var(--surface1)",
      "fg-third": "var(--surface2)",

      alternate: "var(--overlay1)",

      "glow-primary": "var(--sky)",
    },

    textColor: {
      skin: {
        base: "var(--text)",
        subtext: "var(--subtext0)",
        muted: "var(--overlay1)",
        selected: "var(--yellow)",
        accent: "var(--lavender)",
        "accent-secondary": "var(--mauve)",
        alternate: "var(--maroon)",

        bright: "#fff",
        dark: "#272829",
      },
    },

    gradientColorStops: {
      primary: "var(--base)",
      crust: "var(--crust)",
      mantle: "var(--mantle)",
    },

    borderColor: {
      primary: "var(--peach)",
      secondary: "var(--mauve)",
      crust: "var(--crust)",
      third: "var(--surface0)",
    },

    outlineColor: {
      primary: "var(--blue)",
      error: "var(--red)",
    },

    fontFamily: {
      primary: ["Raleway Variable", "sans-serif"],
    },

    boxShadowColor: {
      black: "#000",
      "light-constrast": "var(--shadow)",
    },

    extend: {
      transitionProperty: {
        "max-height": "max-height",
      },
    },
  },
  plugins: [],
};
