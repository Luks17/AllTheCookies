import type { AuthorFrontmatter } from "@/types/Authors";
import type { PostFrontmatter } from "@/types/Posts";
import { type CollectionEntry, getEntry } from "astro:content";
import { getSlug } from "./common";
import { getPostsByAuthor } from "./posts-utils";
import { SITE } from "@/config.mjs";

export async function extractAuthorsFromPost(
  post: PostFrontmatter,
): Promise<AuthorFrontmatter[]> {
  return await Promise.all(
    post.authors.map(async (author) => {
      const authors = await getEntry("author", getSlug(author));

      return authors!.data;
    }),
  );
}

export const getAuthorPostCount = async (author: CollectionEntry<"author">) =>
  (await getPostsByAuthor(author)).length;

export function validateAuthorTags(tags: string[]) {
  for (const tag of tags) {
    if (!SITE.authorTags.includes(tag)) {
      return false;
    }
  }

  return true;
}
