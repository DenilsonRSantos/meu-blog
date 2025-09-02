import Link from "next/link";
import { ArticleWithSlug, formatDate } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="card">
      <div className="meta">
        <time dateTime={article.publicadoEm}>{formatDate(article.publicadoEm)}</time> · <span>{article.autor}</span>
      </div>
      <h2 className="title">
        <Link href={`/artigos/${article.slug}`}>{article.titulo}</Link>
      </h2>
      <p className="excerpt">{article.conteudo.slice(0, 120)}…</p>
    </article>
  );
}
