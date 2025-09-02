import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Blog App Router",
    template: "%s · Blog App Router"
  },
  description: "Um blog de exemplo com Next.js (App Router), rotas dinâmicas, SSG/SSR e SEO dinâmico."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <header>
            <Link href="/"><h1>Blog App Router</h1></Link>
          </header>
          <main>{children}</main>
          <footer>© {new Date().getFullYear()} · Feito com Next.js</footer>
        </div>
      </body>
    </html>
  );
}
