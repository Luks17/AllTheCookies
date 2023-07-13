import { defineCollection } from "astro:content";
import { postSchema, authorSchema } from "./_schemas";

const post = defineCollection({
  schema: postSchema,
});

const author = defineCollection({
  schema: authorSchema,
});

export const collections = { post, author };
