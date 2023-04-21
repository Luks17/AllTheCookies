import type { MarkdownInstance } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

// variable to store loaded posts so they don't get reloaded all the time
let loaded_posts: CollectionEntry<"post">[];

// loads all the non-draft posts, should not be used all the time because it's heavy
async function load_posts(): Promise<void> {
  const posts = await getCollection("post", ({ data }) => data.draft !== true);

  loaded_posts = posts;
}

export async function getSortedPosts(): Promise<CollectionEntry<"post">[]> {
  if (!loaded_posts)
    await load_posts();

  return loaded_posts
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getNumberOfPosts(): Promise<number> {
  if (!loaded_posts)
    await load_posts();

  return loaded_posts.length;
}

export function getPostDescription(post: MarkdownInstance<any>) {
  return post.rawContent().slice(0, 100).trim();
}

export function getPagesNumber(): number {
  return 0;
}

