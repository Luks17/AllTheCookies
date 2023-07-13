import type { Author } from "@/types/Authors";
import type { PostFrontmatter } from "@/types/Posts";
import { getEntry } from "astro:content";

export async function extractAuthorsFromPost(
  post: PostFrontmatter
): Promise<Author[]> {
  return await Promise.all(
    post.authors.map(async (author) => {
      const authors = await getEntry("author", author.toLowerCase());

      return authors!.data;
    })
  );
}
