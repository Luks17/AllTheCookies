
import { CollectionEntry, getCollection } from "astro:content";

// variable to store loaded posts so they don't get reloaded all the time
let loaded_posts: CollectionEntry<"post">[];

// loads all the non-draft posts, should not be used all the time because it's heavy
async function load_posts(): Promise<void> {
  loaded_posts = await getCollection("post", ({ data }) => data.draft !== true);
}

function getPostCategory(post: CollectionEntry<"post">): string {
  return post.data.category;
}

function getPostDateTime(post: CollectionEntry<"post">): number {
  return post.data.publishDate.getTime();
}

function filterPostsByCategory(posts: CollectionEntry<"post">[], category: string) {
  return posts.filter(post => getPostCategory(post) === category);
}

export async function getSortedPosts(category?: string): Promise<CollectionEntry<"post">[]> {
  if (!loaded_posts)
    await load_posts();

  let posts = loaded_posts;

  if (category !== undefined)
    posts = filterPostsByCategory(posts, category);

  return posts.sort((a, b) => getPostDateTime(b) - getPostDateTime(a))
}

export async function getNumberOfPosts(category?: string): Promise<number> {
  if (!loaded_posts)
    await load_posts();

  let posts = loaded_posts;

  if (category !== undefined)
    posts = filterPostsByCategory(posts, category);

  return posts.length;
}


