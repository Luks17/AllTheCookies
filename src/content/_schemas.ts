import { SITE } from "@/config.mjs";
import { AuthorPossibleSocials } from "@/types/Authors";
import { validateAuthorTags } from "@/util/authors";
import { validateCategory, validateTags } from "@/util/post-validation";
import { z, type ImageFunction } from "astro:content";

export const postSchema = ({ image }: { image: ImageFunction }) =>
  z.object({
    authors: z.array(z.string()),
    title: z.string().refine((title) => title.length < 70, {
      message: "Title cannot be longer than 70 characters",
    }),
    description: z.string().refine((desc) => desc.length < 200, {
      message: "Description cannot be longer than 200 characters",
    }),
    thumbnail: z.object({
      img: image().refine((img) => img.width === 1280 && img.height === 720, {
        message:
          "Thumbnail must be 1280x720 (same dimensions as a youtube thumb)",
      }),
      alt: z.string(),
    }),
    publishDate: z.date(),
    category: z.string().refine((category) => validateCategory(category), {
      message: "Category in post does not exist",
    }),
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
    tags: z.array(z.string()).refine((tags) => validateAuthorTags(tags), {
      message: "Author tags do not exist",
    }),
  });
