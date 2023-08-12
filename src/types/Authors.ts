import type { authorSchema } from "@/content/_schemas";
import type { z } from "astro:content";

export type AuthorFrontmatter = z.infer<ReturnType<typeof authorSchema>>;

export enum AuthorPossibleSocials {
  github = "github",
  twitter = "twitter",
  linkedin = "linkedin",
  mail = "mail",
  instagram = "instagram",
}

export type AuthorSocial = {
  name: AuthorPossibleSocials;
  link: string;
};
