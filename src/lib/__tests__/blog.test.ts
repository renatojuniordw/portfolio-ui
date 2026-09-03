import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug, getRecentPosts } from "../blog";

describe("blog", () => {
  it("retorna posts ordenados por data decrescente", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);

    const dates = posts.map((post) => new Date(post.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it("faz parse do frontmatter de um post conhecido", () => {
    const post = getPostBySlug("engenharia-de-prompt-no-terminal");
    expect(post).not.toBeNull();
    expect(post!.title.length).toBeGreaterThan(0);
    expect(post!.content.length).toBeGreaterThan(0);
  });

  it("retorna null para slug inexistente", () => {
    expect(getPostBySlug("post-que-nao-existe")).toBeNull();
  });

  it("getRecentPosts respeita o limite", () => {
    expect(getRecentPosts(2)).toHaveLength(2);
  });
});