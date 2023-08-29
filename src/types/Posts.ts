import type { CollectionEntry } from "astro:content";

type IncompletePostFrontmatter = CollectionEntry<"post">["data"];

export type OptimizedImg = IncompletePostFrontmatter["thumbnail"]["img"];

// adds smallImg property to thumbnail
type Thumb = CollectionEntry<"post">["data"]["thumbnail"] & {
  smallImg: OptimizedImg;
};

// overrides thumbnail with thumbnail that has smallImg property to frontmatter
export type PostFrontmatter = IncompletePostFrontmatter & {
  thumbnail: Thumb;
};

// overrides frontmatter with frontmatter that has thumbnail property to PostCollectionEntry
export type PostCollectionEntry = CollectionEntry<"post"> & {
  data: PostFrontmatter;
};
