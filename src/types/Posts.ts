import type { postSchema } from "@/content/_schemas";
import type { z } from "astro:content";

export interface PostCategory {
  slug: string;
  name: string;
  description: string;
}

// PostSchema is of type zodObject and all of it's items are of zod types too
// z.infer converts those zod types to regular typescript types
// ReturnType is used because postSchema technically it's a function,
// but I don't care about the function call, I just want the return
export type PostFrontmatter = z.infer<ReturnType<typeof postSchema>>;
