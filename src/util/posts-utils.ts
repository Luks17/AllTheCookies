import type { OptimizedImg, PostFrontmatter } from "@/types/Posts";
import { getImage } from "astro:assets";
import { CollectionEntry, getCollection } from "astro:content";

// variable to store loaded posts so they don't get reloaded all the time
let loaded_posts: PostFrontmatter[];

async function optimizePostImages(posts: CollectionEntry<"post">[]) {
  return await Promise.all(
    posts.map(async ({ data }): Promise<PostFrontmatter> => {
      const optImg = await getImage({
        src: data.thumbnail.img,
        width: 1280,
        height: 720,
        format: "webp",
      });

      const optThumb = {
        img: {
          src: optImg.src,
          width: optImg.options.width,
          height: optImg.options.height,
          format: optImg.options.format,
        } as OptimizedImg,
        alt: data.thumbnail.alt,
      };

      return {
        ...data,
        thumbnail: optThumb,
      };
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

function getPostCategory(post: PostFrontmatter): string {
  return post.category;
}

function getPostDateTime(post: PostFrontmatter): number {
  return post.publishDate.getTime();
}

export function filterPostsByCategory(
  posts: PostFrontmatter[],
  category: string
) {
  return posts.filter((post) => getPostCategory(post) === category);
}

export async function getUnsortedPosts(
  category?: string
): Promise<PostFrontmatter[]> {
  if (!loaded_posts) await load_posts();

  let posts = loaded_posts;

  if (category !== undefined) posts = filterPostsByCategory(posts, category);

  return posts;
}

export async function getSortedPosts(
  category?: string
): Promise<PostFrontmatter[]> {
  const posts = await getUnsortedPosts(category);

  return posts.sort((a, b) => getPostDateTime(b) - getPostDateTime(a));
}

export async function getNumberOfPosts(category?: string): Promise<number> {
  if (!loaded_posts) await load_posts();

  let posts = loaded_posts;

  if (category !== undefined) posts = filterPostsByCategory(posts, category);

  return posts.length;
}
