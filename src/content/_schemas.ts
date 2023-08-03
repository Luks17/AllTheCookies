import { SITE } from "@/config.mjs";
import { AuthorPossibleSocials } from "@/types/Authors";
import { validateTags } from "@/util/post-validation";
import { z, ImageFunction } from "astro:content";

export const postSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    authors: z.array(z.string()),
    title: z.string(),
    description: z.string(),
    thumbnail: z.object({
      img: image(),
      alt: z.string(),
    }),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).refine((tags) => validateTags(tags), {
      message: `Cannot have more than ${SITE.maxTagsPerPost} tags.\nYour post tags may not be valid`,
    }),
    draft: z.boolean(),
    edited: z.boolean(),
    minutesRead: z.number(),
  });

export const authorSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    name: z.string(),
    image: image(),
    socials: z.array(
      z
        .object({
          name: z.nativeEnum(AuthorPossibleSocials),
          link: z.string(),
        })
        .optional()
    ),
  });
