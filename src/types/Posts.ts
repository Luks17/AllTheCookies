import { postSchema } from "@/content/_schemas";
import { z } from "astro:content";

export interface PostCategory {
  slug: string;
  name: string;
  description: string;
}

export type PostFrontmatter = z.infer<typeof postSchema>;
