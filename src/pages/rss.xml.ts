import rss from "@astrojs/rss";
import { SITE } from "@/config.mjs";
import { getSortedPosts } from "@/util/posts-utils";
import { getSlug } from "@/util/common";

export async function get() {
  const posts = await getSortedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: posts.map((post) => ({
      link: `posts/${getSlug(post.data.title)}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
    })),
  });
}
