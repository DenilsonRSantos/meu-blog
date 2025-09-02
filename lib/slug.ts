import slugify from "slugify";

export function toSlug(title: string) {
  return slugify(title, { lower: true, strict: true, trim: true });
}
