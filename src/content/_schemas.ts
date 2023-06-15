import { z } from "astro:content";

export const postSchema = ({ image }) =>
  z.object({
    author: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.object({
      src: image(),
      alt: z.string(),
    }),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean(),
    minutesRead: z.number(),
  });
