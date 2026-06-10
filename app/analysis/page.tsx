import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FULL_ARTICLES, getFullArticle } from "@/lib/full-articles"
import { ArticleView } from "@/components/article-view"

// ─── Pre-render every article at build time ───────────────────────────────
export function generateStaticParams() {
  return FULL_ARTICLES.map(a => ({ slug: a.slug }))
}

// ─── Per-article SEO metadata ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getFullArticle(slug)
  if (!article) return { title: "Not Found" }
  return {
    title: article.title,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getFullArticle(slug)
  if (!article) notFound()
  return <ArticleView article={article} />
}