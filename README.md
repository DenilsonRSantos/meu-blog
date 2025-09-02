# Blog App Router (Next.js 15)

Blog de exemplo com **App Router**, **rotas dinâmicas**, **data fetching**, **SSG/SSR** e **SEO dinâmico** (`generateMetadata`).

## ✅ O que está implementado
- Home: `app/page.tsx` lista os artigos (SSG com `force-static`).
- Rotas dinâmicas: `app/artigos/[slug]/page.tsx` para cada artigo.
- Data source padrão: **JSON local** em `data/artigos.json`.
- `generateStaticParams` para SSG dos slgs.
- SEO dinâmico por artigo com `generateMetadata`.
- `sitemap.ts` e `robots.ts` básicos.
- Estilos simples em `app/globals.css`.

> **Observação:** Este template usa **SSG** com dados locais. No final do README há um guia para alternar para **SSR** usando **CRUDCRUD**.

---

## 🧱 Estrutura
```text
app/
  artigos/[slug]/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  ArticleCard.tsx
data/
  artigos.json
lib/
  articles.ts
  slug.ts
next.config.ts
package.json
tsconfig.json
```

---

## ▶️ Rodar localmente
Requisitos: Node 18+
```bash
npm install
npm run dev
```
Acesse: http://localhost:3000

---

## 🚀 Deploy (Vercel)
1. Suba o repositório no GitHub (veja comandos abaixo).
2. Acesse **vercel.com -> Add New -> Project** e importe seu repo.
3. Build preset: **Next.js** (detecta automaticamente).
4. Deploy.

---

## ⬆️ Enviar para o GitHub
```bash
git init
git add .
git commit -m "feat: blog app router ssg + seo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/blog-next-app-router.git
git push -u origin main
```

---

## 🌐 Links de entrega
- **Repositório GitHub:** substitua aqui com o link depois de subir
- **App na Vercel:** substitua aqui com a URL após o deploy

---

## 🔁 Alternando para SSR com CRUDCRUD
Se preferir buscar de uma API externa (ex.: CRUDCRUD), faça assim:

1. **Crie um endpoint no CRUDCRUD** (ver docs do serviço) e obtenha a base URL, por exemplo:
   ```
   https://crudcrud.com/api/SEU_TOKEN/artigos
   ```

2. **Defina variáveis de ambiente**:
   Crie `.env.local` na raiz:
   ```ini
   CCRUD_BASE=https://crudcrud.com/api/SEU_TOKEN
   ```

3. **Altere a página dinâmica para SSR**:
   Em `app/artigos/[slug]/page.tsx`, troque a diretiva:
   ```ts
   export const dynamic = "force-dynamic"; // SSR
   ```

   E busque os dados diretamente na page (exemplo simplificado):
   ```ts
   // dentro do componente async ArticlePage
   const res = await fetch(`${process.env.CCRUD_BASE}/artigos`, { cache: "no-store" });
   if (!res.ok) throw new Error("Falha ao buscar artigos");
   const list: any[] = await res.json();
   const artigo = list
     .map(a => ({ ...a, slug: (await import("@/lib/slug")).toSlug(a.titulo) }))
     .find(a => a.slug === params.slug);
   ```

   > Nesse modo **não use** `generateStaticParams`, pois o conteúdo depende de cada request.

4. **Home SSR ou ISR** (opcional):
   - SSR: em `app/page.tsx`, use `export const dynamic = "force-dynamic"` e `fetch(..., { cache: "no-store" })`.
   - ISR: use `fetch(..., { next: { revalidate: 60 } })` para revalidar a cada 60s.

---

## 📦 Slugs
Usamos a lib `slugify` para gerar slugs a partir do título.
- Ver função `toSlug` em `lib/slug.ts`.
- Em dados locais, os slugs são gerados no build (SSG).

---

## 🧪 Boas práticas
- Server Components por padrão (sem `use client` nas pages).
- `generateMetadata` por artigo para `title` e `description`.
- `sitemap`/`robots` para SEO técnico.
- Código tipado (TypeScript).

---

## 📄 Licença
MIT
