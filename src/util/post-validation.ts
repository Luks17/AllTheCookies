import { SITE } from "@/config.mjs";

export function validateTags(tags: string[]): boolean {
  if (tags.length > SITE.maxTagsPerPost) return false;

  for (const tag in tags) {
    if (!SITE.tags.includes(tag)) {
      return false;
    }
  }

  return true;
}
