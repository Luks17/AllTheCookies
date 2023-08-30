import { SITE } from "@/config.mjs";
import type {
  OptimizedImg,
  PostCollectionEntry,
  PostFrontmatter,
} from "@/types/Posts";
import { getImage } from "astro:assets";
import { type CollectionEntry, getCollection } from "astro:content";
import { getSlug } from "./common";

// variable to store loaded posts so they don't get reloaded all the time
let loaded_posts: PostCollectionEntry[];

async function getOptImg(
  img: OptimizedImg,
  width: number,
  height: number
): Promise<OptimizedImg> {
  const optImg = await getImage({
    src: img,
    width,
    height,
    format: "webp",
  });

  return {
    src: optImg.src,
    width: optImg.options.width,
    height: optImg.options.height,
    format: optImg.options.format,
  } as OptimizedImg;
}

async function optimizePostImages(
  posts: CollectionEntry<"post">[]
): Promise<PostCollectionEntry[]> {
  return await Promise.all(
    posts.map(async (post): Promise<PostCollectionEntry> => {
      const img = await getOptImg(post.data.thumbnail.img, 720, 405);
      const smallImg = await getOptImg(post.data.thumbnail.img, 400, 225);

      const optThumb = {
        img,
        smallImg,
        alt: post.data.thumbnail.alt,
      };

      return {
        ...post,
        data: {
          ...post.data,
          thumbnail: optThumb,
        },
      } as PostCollectionEntry;
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

function filterPostsByCategory(posts: PostCollectionEntry[], category: string) {
  return posts.filter((post) => post.data.category === category);
}

const hasCategory = (category: string | undefined) =>
  category !== undefined && category !== "all";

export async function getUnsortedPosts(
  category?: string
): Promise<PostCollectionEntry[]> {
  if (!loaded_posts) await load_posts();

  let posts = loaded_posts;

  if (hasCategory(category)) posts = filterPostsByCategory(posts, category!);

  return posts;
}

export async function getSortedPosts(
  category?: string
): Promise<PostCollectionEntry[]> {
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
  return Math.ceil((await getNumberOfPosts(category)) / SITE.postsPerPage);
}

export async function getPostsByAuthor(author: CollectionEntry<"author">) {
  const posts = await getSortedPosts();

  const authorSlug = getSlug(author.data.name);

  return posts.filter((post) => post.data.authors.includes(authorSlug));
}
