import { SITE } from "@/config.mjs";
import { postsCategories } from "@/resources/static/links";

const categories = postsCategories.map((category) => category.slug);

export function validateTags(tags: string[]): boolean {
  if (tags.length > SITE.maxTagsPerPost) return false;

  for (const tag of tags) {
    if (!SITE.tags.includes(tag)) {
      return false;
    }
  }

  return true;
}

export function validateCategory(category: string): boolean {
  return categories.includes(category);
}
