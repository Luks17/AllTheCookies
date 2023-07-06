import type { LinkTemplate } from "@/types/Links";

import { links } from "./json/links.json";
import { getCategoryIcon } from "./Icons";

function getIcons(link: LinkTemplate): LinkTemplate {
  const icon = getCategoryIcon(link.slug);
  let sublinks: LinkTemplate[] | undefined = undefined;

  if (link.sublinks !== undefined) {
    sublinks = link.sublinks.map((sublink) => getIcons(sublink));
  }

  const normalizedLink = {
    ...link,
    Icon: icon,
    sublinks,
  } as LinkTemplate;

  return normalizedLink;
}

// gets all links, their sublinks (if they are not undefined) and fetches their icons from Icons.tsx.
export const navLinks: LinkTemplate[] = links.map((link) => getIcons(link));

// parses through the json and gets only the item with a slug equal to 'posts' and fetches it's sublinks,
// does not fetch any icons from Icons.tsx
export const postsCategories: LinkTemplate[] = links.flatMap((link) => {
  if (link.slug === "posts" && link.sublinks !== undefined)
    return link.sublinks;
  else return [];
});
