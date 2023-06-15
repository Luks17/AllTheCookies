import { z } from "astro:content";

export const postSchema = z.object({
  author: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.object({
    // TODO: change from endsWith(".png") to .webp
    img: z.string().refine((img) => img.endsWith(".png"), {
      message: "Thumbnail img must be webp",
    }),
    alt: z.string(),
  }),
  publishDate: z.date(),
  category: z.string(),
  tags: z.array(z.string()),
  draft: z.boolean(),
  minutesRead: z.number(),
});
