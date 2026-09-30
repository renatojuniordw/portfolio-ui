/** Normaliza texto para busca: sem acentos, minúsculo e com espaços simples. */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

interface Searchable {
  title: string;
  description: string;
  tags: string[];
}

/**
 * Busca local por título, descrição e tags (não no texto completo).
 * Todos os termos da consulta precisam aparecer em algum desses campos.
 */
export function searchPosts<T extends Searchable>(posts: T[], query: string): T[] {
  const terms = normalizeText(query).split(" ").filter(Boolean);
  if (terms.length === 0) return posts;
  return posts.filter((post) => {
    const haystack = normalizeText([post.title, post.description, ...post.tags].join(" "));
    return terms.every((term) => haystack.includes(term));
  });
}
