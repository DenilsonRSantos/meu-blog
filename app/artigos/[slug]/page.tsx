import type { Metadata } from "next";
import {
  getArticleBySlug,
  getArticles,
  formatDate,
  getDescriptionSnippet,
} from "@/lib/articles";

export const dynamic = "force-static"; // SSG com dados locais

type Params = { slug: string };
type PageProps = { params: Promise<Params> };


export async function generateStaticParams() {
  const artigos = await getArticles();
  return artigos.map((a) => ({ slug: a.slug }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArticleBySlug(slug);
  if (!artigo) return { title: "Artigo não encontrado" };

  const desc = getDescriptionSnippet(artigo.conteudo, 160);

  return {
    title: artigo.titulo,
    description: desc,
    openGraph: {
      title: artigo.titulo,
      description: getDescriptionSnippet(artigo.conteudo, 200),
      type: "article",
    },
    twitter: {
      card: "summary",
      title: artigo.titulo,
      description: desc,
    },
  };
}


export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const artigo = await getArticleBySlug(slug);

  if (!artigo) {
    return <div>Artigo não encontrado.</div>;
  }

  return (
    <article className="article">
      <h1>{artigo.titulo}</h1>
      <div style={{ marginBottom: ".5rem" }}>
        <span className="by">Por {artigo.autor}</span> ·{" "}
        <time dateTime={artigo.publicadoEm}>{formatDate(artigo.publicadoEm)}</time>
      </div>
      <div className="content">
        {artigo.conteudo.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
