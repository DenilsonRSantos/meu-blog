import artigosData from "@/data/artigos.json";
import { toSlug } from "./slug";

export type Article = {
  id: string;
  titulo: string;
  autor: string;
  publicadoEm: string; // ISO date
  conteudo: string;
};

export type ArticleWithSlug = Article & { slug: string };

export async function getArticles(): Promise<ArticleWithSlug[]> {
  // Fonte local (SSG). Se quiser usar API externa (CRUDCRUD),
  // veja o README para alternar para SSR.
  const artigos = (artigosData as { artigos: Article[] }).artigos;
  return artigos.map(a => ({
    ...a,
    slug: toSlug(a.titulo)
  }));
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithSlug | undefined> {
  const list = await getArticles();
  return list.find(a => a.slug === slug);
}

export function formatDate(iso: string, locale = "pt-BR") {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(d);
}

export function getDescriptionSnippet(content: string, size = 160) {
  const clean = content.replace(/\s+/g, " ").trim();
  return clean.length > size ? clean.slice(0, size - 1) + "…" : clean;
}
