import type { AuthorFrontmatter } from "@/types/Authors";
import type { PostFrontmatter } from "@/types/Posts";
import { getEntry } from "astro:content";
import { getSlug } from "./common";

export async function extractAuthorsFromPost(
  post: PostFrontmatter
): Promise<AuthorFrontmatter[]> {
  return await Promise.all(
    post.authors.map(async (author) => {
      const authors = await getEntry("author", getSlug(author));

      return authors!.data;
    })
  );
}
