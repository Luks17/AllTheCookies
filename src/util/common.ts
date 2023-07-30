export function getSlug(name: string): string {
  let slug = name.toLowerCase().trim();

  // replaces all '-' and spaces by '-'
  slug = slug.replace(/[\s-]+/g, "-");

  // replaces all accents and special symbols to their closes unicode equivalent
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return slug;
}
