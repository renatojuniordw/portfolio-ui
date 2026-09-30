"use client";

import { Suspense, useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Tag } from "@/components/ui/Tag";
import { formatPostDate, isIsoDate } from "@/lib/dates";
import { searchPosts } from "@/lib/search";
import type { BlogPostSummary } from "@/types/blog";

const URL_UPDATE_DELAY_MS = 250;

interface BlogIndexProps {
  /** Metadados dos artigos (sem Markdown), em ordem de publicação. */
  posts: BlogPostSummary[];
}

/**
 * Listagem do blog com busca local. O HTML estático (fallback do Suspense)
 * traz a listagem completa; no cliente, o termo fica sincronizado com `q`.
 */
export function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <Suspense fallback={<BlogListing posts={posts} query="" />}>
      <SearchableBlog posts={posts} />
    </Suspense>
  );
}

function SearchableBlog({ posts }: BlogIndexProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [syncedUrlQuery, setSyncedUrlQuery] = useState(urlQuery);
  const [lastWritten, setLastWritten] = useState(urlQuery);

  // A URL mudou por fora (voltar/avançar, link direto): reflete no campo.
  if (urlQuery !== syncedUrlQuery) {
    setSyncedUrlQuery(urlQuery);
    if (urlQuery !== lastWritten) setQuery(urlQuery);
  }

  // Grava o termo na URL com atraso e sem criar uma entrada por letra.
  useEffect(() => {
    if (query === urlQuery) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set("q", query);
      else params.delete("q");
      const search = params.toString();
      setLastWritten(query);
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    }, URL_UPDATE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [query, urlQuery, searchParams, pathname, router]);

  return <BlogListing posts={posts} query={query} onQueryChange={setQuery} />;
}

function BlogListing({
  posts,
  query,
  onQueryChange,
}: BlogIndexProps & { query: string; onQueryChange?: (query: string) => void }) {
  const inputId = useId();
  const searching = query.trim().length > 0;
  const results = searchPosts(posts, query);
  const [featured, ...remaining] = posts;

  return (
    <>
      <form
        role="search"
        action="/blog"
        method="get"
        onSubmit={(e) => e.preventDefault()}
        className="mb-12 max-w-xl"
      >
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-text">
          Buscar artigos
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <input
            id={inputId}
            name="q"
            type="search"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            placeholder="Título, assunto ou tag"
            autoComplete="off"
            enterKeyHint="search"
            className="h-12 w-full rounded-full border border-border bg-bg pl-11 pr-12 text-base text-text placeholder:text-muted focus:border-text [&::-webkit-search-cancel-button]:hidden"
          />
          {searching && (
            <button
              type="button"
              onClick={() => onQueryChange?.("")}
              aria-label="Limpar busca"
              className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-text-secondary hover:bg-surface-1 hover:text-text"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>
        <p role="status" aria-live="polite" className="mt-2 text-sm text-text-secondary">
          {searching
            ? results.length === 1
              ? "1 artigo encontrado"
              : `${results.length} artigos encontrados`
            : ""}
        </p>
      </form>

      {posts.length === 0 ? (
        <p className="text-text-secondary text-lg">Nenhum artigo publicado ainda. Volte em breve!</p>
      ) : searching ? (
        results.length > 0 ? (
          <section aria-labelledby="resultados-busca">
            <h2 id="resultados-busca" className="sr-only">
              Resultados da busca
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <div className="rounded-3xl border border-border p-8 text-center">
            <p className="text-text-secondary">
              Nenhum artigo encontrado para “{query.trim()}”.
            </p>
            <button
              type="button"
              onClick={() => onQueryChange?.("")}
              className="mt-4 min-h-11 rounded-full border border-border px-5 text-sm font-medium text-text hover:border-text"
            >
              Limpar busca
            </button>
          </div>
        )
      ) : (
        <>
          {featured && <FeaturedPost post={featured} />}
          {remaining.length > 0 && (
            <section aria-labelledby="mais-artigos">
              <h2
                id="mais-artigos"
                className="text-xs font-medium text-muted uppercase tracking-widest mb-6"
              >
                Mais artigos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remaining.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

function FeaturedPost({ post }: { post: BlogPostSummary }) {
  return (
    <section aria-labelledby="artigo-destaque" className="mb-16">
      <h2
        id="artigo-destaque"
        className="text-xs font-medium text-muted uppercase tracking-widest mb-4"
      >
        Em destaque
      </h2>
      <Link
        href={`/blog/${post.slug}`}
        className="group block p-8 md:p-12 project-card hover:border-text transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-4">
              <time dateTime={isIsoDate(post.date) ? post.date : undefined} className="text-muted">
                {formatPostDate(post.date)}
              </time>
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                {post.readingTime} de leitura
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-bold text-text mb-4 group-hover:text-text-secondary transition-colors">
              {post.title}
            </h3>

            <p className="text-text-secondary leading-relaxed line-clamp-3 max-w-2xl">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          <div className="shrink-0 self-end md:self-center">
            <span className="flex items-center gap-2 text-sm font-medium text-text group-hover:gap-3 transition-all">
              Ler artigo
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
