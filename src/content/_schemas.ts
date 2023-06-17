import { z, ImageFunction } from "astro:content";

export const postSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    author: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.object({
      img: image(),
      alt: z.string(),
    }),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean(),
    minutesRead: z.number(),
  });
