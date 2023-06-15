import type { postSchema } from "@/content/_schemas";
import type { z } from "astro:content";

export interface PostCategory {
  slug: string;
  name: string;
  description: string;
}

export type PostFrontmatter = z.infer<typeof postSchema>;
