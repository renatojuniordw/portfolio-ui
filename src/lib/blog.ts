import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types/blog";

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

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
