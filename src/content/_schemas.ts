import { z } from "astro:content";

export const postSchema = z.object({
  author: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  publishDate: z.date(),
  category: z.string(),
  tags: z.array(z.string()),
  draft: z.boolean(),
  minutesRead: z.number(),
});

export type blogFrontmatter = z.infer<typeof postSchema>;

