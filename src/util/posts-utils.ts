import { SITE } from "@/config.mjs";
import type { OptimizedImg, PostFrontmatter } from "@/types/Posts";
import { getImage } from "astro:assets";
import { CollectionEntry, getCollection } from "astro:content";
import { getSlug } from "./common";

// variable to store loaded posts so they don't get reloaded all the time
let loaded_posts: CollectionEntry<"post">[];

async function optimizePostImages(
  posts: CollectionEntry<"post">[]
): Promise<CollectionEntry<"post">[]> {
  return await Promise.all(
    posts.map(async (post): Promise<CollectionEntry<"post">> => {
      let optPost = post;

      const optImg = await getImage({
        src: post.data.thumbnail.img,
        width: 880,
        height: 495,
        format: "webp",
      });

      const optThumb = {
        img: {
          src: optImg.src,
          width: optImg.options.width,
          height: optImg.options.height,
          format: optImg.options.format,
        } as OptimizedImg,
        alt: post.data.thumbnail.alt,
      };

      optPost.data.thumbnail = optThumb;

      return optPost;
    })
  );
}

// loads all the non-draft posts, should not be used all the time because it's heavy
async function load_posts(): Promise<void> {
  const unoptimizedPosts = await getCollection(
    "post",
    ({ data }) => data.draft !== true
  );
  loaded_posts = await optimizePostImages(unoptimizedPosts);
}

function getPostDateTime(post: PostFrontmatter): number {
  return post.publishDate.getTime();
}

function filterPostsByCategory(
  posts: CollectionEntry<"post">[],
  category: string
) {
  return posts.filter((post) => post.data.category === category);
}

const hasCategory = (category: string | undefined) =>
  category !== undefined && category !== "all";

export async function getUnsortedPosts(
  category?: string
): Promise<CollectionEntry<"post">[]> {
  if (!loaded_posts) await load_posts();

  let posts = loaded_posts;

  if (hasCategory(category)) posts = filterPostsByCategory(posts, category!);

  return posts;
}

export async function getSortedPosts(
  category?: string
): Promise<CollectionEntry<"post">[]> {
  const posts = await getUnsortedPosts(category);

  return posts.sort(
    (a, b) => getPostDateTime(b.data) - getPostDateTime(a.data)
  );
}

export async function getNumberOfPosts(category?: string): Promise<number> {
  if (!loaded_posts) await load_posts();

  let posts = loaded_posts;

  if (hasCategory(category)) posts = filterPostsByCategory(posts, category!);

  return posts.length;
}

export async function getNumberOfPages(category?: string): Promise<number> {
  return Math.ceil(
    (await getNumberOfPosts(category ? category : undefined)) /
      SITE.postsPerPage
  );
}

export async function getPostsByAuthor(author: CollectionEntry<"author">) {
  if (!loaded_posts) await load_posts();

  const authorSlug = getSlug(author.data.name);

  return loaded_posts.filter((post) => post.data.authors.includes(authorSlug));
}
