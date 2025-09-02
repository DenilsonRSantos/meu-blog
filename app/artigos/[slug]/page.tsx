import type { Metadata } from "next";
import { getArticleBySlug, getArticles, formatDate, getDescriptionSnippet } from "@/lib/articles";

export const dynamic = "force-static"; // SSG por padrão (dados locais)

type Params = { slug: string };

export async function generateStaticParams() {
  const artigos = await getArticles();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const artigo = await getArticleBySlug(params.slug);
  if (!artigo) return { title: "Artigo não encontrado" };
  return {
    title: artigo.titulo,
    description: getDescriptionSnippet(artigo.conteudo, 160),
    openGraph: {
      title: artigo.titulo,
      description: getDescriptionSnippet(artigo.conteudo, 200),
      type: "article"
    },
    twitter: {
      card: "summary",
      title: artigo.titulo,
      description: getDescriptionSnippet(artigo.conteudo, 160)
    }
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const artigo = await getArticleBySlug(params.slug);
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
        {artigo.conteudo.split("\n\n").map((p, i) => (<p key={i}>{p}</p>))}
      </div>
    </article>
  );
}

/* =======================
 * Como alternar para SSR com CRUDCRUD (exemplo rápido):
 * 1) Troque para:
 *    export const dynamic = "force-dynamic";
 * 2) Implemente fetch na própria page para buscar por slug:
 *    const res = await fetch(`${process.env.CCRUD_BASE}/artigos`, { cache: "no-store" });
 *    // Filtrar pelo slug no resultado da API.
 * 3) Não use generateStaticParams para CRUDCRUD em tempo de execução.
 * Veja o README.md para a versão completa.
 * ======================= */
