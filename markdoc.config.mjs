import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    image: {
      render: component("./src/components/tags/Image.astro"),
      attributes: {
        src: { type: String },
        alt: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    },
    aside: {
      render: component("./src/components/tags/Aside.astro"),
      attributes: {
        type: {
          type: String,
          matches: ["note", "tip", "caution", "danger"],
        },
        title: { type: String },
      },
    },
  },
});
