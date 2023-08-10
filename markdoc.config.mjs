import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

const tagsDir = "./src/components/tags/";

const getTag = (tag) => component(tagsDir + tag);

export default defineMarkdocConfig({
  tags: {
    authorGreet: {
      render: getTag("AuthorGreet.astro"),
      attributes: {
        author: { type: String },
      },
    },
    aside: {
      render: getTag("Aside.astro"),
      attributes: {
        type: {
          type: String,
          matches: ["note", "tip", "caution", "danger"],
        },
        title: { type: String },
      },
    },
    anchor: {
      render: getTag("Anchor.astro"),
      attributes: {
        name: { type: String },
      },
    },
  },
});
