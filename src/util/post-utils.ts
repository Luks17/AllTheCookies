import type { MarkdownInstance } from "astro";

export function getDescription(post: MarkdownInstance<any>) {
  return post.rawContent().slice(0, 100).trim();
}

