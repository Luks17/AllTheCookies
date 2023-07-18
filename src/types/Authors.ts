import type { authorSchema } from "@/content/_schemas";
import type { z } from "astro:content";

export type AuthorFrontmatter = z.infer<ReturnType<typeof authorSchema>>;
