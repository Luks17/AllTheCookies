import type { authorSchema } from "@/content/_schemas";
import type { z } from "astro:content";

export type Author = z.infer<ReturnType<typeof authorSchema>>;
