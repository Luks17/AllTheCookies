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
    summary: {
      render: getTag("Summary.astro"),
    },
    quote: {
      render: getTag("Quote.astro"),
      attributes: {
        title: { type: String },
        author: { type: String },
        url: { type: String },
      },
    },
    codepen: {
      render: getTag("Codepen.astro"),
      attributes: {
        url: { type: String },
        penName: { type: String },
        defaultTab: {
          type: String,
          matches: ["html", "css", "js"],
        },
      },
    },
    // buzzword: {
    //   render: getTag("Buzzword.astro"),
    //   attributes: {
    //     word: { type: String },
    //   },
    // },
  },
});
