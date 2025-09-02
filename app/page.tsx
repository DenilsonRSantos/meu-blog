import { getArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-static"; // SSG da listagem

export default async function HomePage() {
  const artigos = await getArticles();
  return (
    <div>
      <div style={{ margin: "0 0 1rem 0", color: "var(--muted)" }}>
        Artigos mais recentes
      </div>
      <div className="grid">
        {artigos.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
