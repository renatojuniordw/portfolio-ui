import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostSummary } from "@/types/blog";
import { normalizeText } from "./search";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

function getAllSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => f.replace(/\.md$/, ""));
}

function parsePost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      content,
      readingTime: data.readingTime || estimateReadingTime(content),
    };
  } catch {
    return null;
  }
}

function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllSlugs();
  const posts = slugs.map(parsePost).filter((p): p is BlogPost => p !== null);
  return sortByDate(posts);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return parsePost(slug);
}

export function getRecentPosts(count: number = 3): BlogPostSummary[] {
  return getPostSummaries().slice(0, count);
}

/** Metadados de todos os artigos, sem o Markdown (seguro para enviar ao client). */
export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(toSummary);
}

function toSummary(post: BlogPost): BlogPostSummary {
  const { slug, title, description, date, tags, readingTime } = post;
  return { slug, title, description, date, tags, readingTime };
}

export interface RelatedPosts {
  /** "related": há tags em comum; "recent": nenhuma relação, mostra recentes. */
  kind: "related" | "recent";
  posts: BlogPostSummary[];
}

/**
 * Artigos relacionados por quantidade de tags em comum (normalizadas),
 * excluindo o atual; empate por data (mais recente) e depois slug.
 * Sem nenhuma tag em comum, devolve os mais recentes como "Outros artigos".
 */
export function getRelatedPosts(
  slug: string,
  count = 2,
  posts: BlogPostSummary[] = getPostSummaries(),
): RelatedPosts {
  const current = posts.find((post) => post.slug === slug);
  const others = posts.filter((post) => post.slug !== slug);
  const tags = new Set((current?.tags ?? []).map(normalizeText));

  const scored = others
    .map((post) => ({
      post,
      score: new Set(post.tags.map(normalizeText).filter((tag) => tags.has(tag))).size,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.date.localeCompare(a.post.date) ||
        a.post.slug.localeCompare(b.post.slug),
    );

  if (scored.length > 0) {
    return { kind: "related", posts: scored.slice(0, count).map(({ post }) => post) };
  }
  const recent = [...others].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
  return { kind: "recent", posts: recent.slice(0, count) };
}
