import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    authorGreet: {
      render: component("./src/components/tags/AuthorGreet.astro"),
      attributes: {
        author: { type: String },
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
