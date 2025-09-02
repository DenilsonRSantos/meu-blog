import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const artigos = await getArticles();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...artigos.map(a => ({
      url: `${base}/artigos/${a.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
