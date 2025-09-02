import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://example.com";
  const artigos = await getArticles();
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...artigos.map((a) => ({
      url: `${base}/artigos/${a.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
  return items;
}
