import { describe, expect, it } from "vitest";
import { getPostBySlug, getPostSummaries, getRelatedPosts } from "../blog";
import { formatPostDate, isIsoDate } from "../dates";
import { extractHeadings, slugify } from "../markdown-headings";
import { normalizeText, searchPosts } from "../search";
import type { BlogPostSummary } from "@/types/blog";

describe("busca do blog", () => {
  const posts = [
    { title: "Automação com n8n", description: "Fluxos", tags: ["IA"] },
    { title: "SharePoint", description: "CRUD com PnP JS", tags: ["Microsoft"] },
    { title: "Prompt injection", description: "Defesa na prática", tags: ["Segurança", "LLM"] },
  ];

  it("ignora caixa e acentos", () => {
    expect(normalizeText("  AUTOMAÇÃO   Ágil ")).toBe("automacao agil");
    expect(searchPosts(posts, "automacao").map((p) => p.title)).toEqual(["Automação com n8n"]);
    expect(searchPosts(posts, "SEGURANCA")).toHaveLength(1);
  });

  it("busca em título, descrição e tags, exigindo todos os termos", () => {
    expect(searchPosts(posts, "pnp")).toHaveLength(1);
    expect(searchPosts(posts, "llm defesa")).toHaveLength(1);
    expect(searchPosts(posts, "llm sharepoint")).toHaveLength(0);
  });

  it("consulta vazia devolve tudo; sem resultado devolve vazio", () => {
    expect(searchPosts(posts, "   ")).toHaveLength(3);
    expect(searchPosts(posts, "kubernetes")).toEqual([]);
  });

  it("resumos enviados ao client não carregam o Markdown", () => {
    for (const summary of getPostSummaries()) {
      expect(summary).not.toHaveProperty("content");
    }
  });
});

describe("headings e sumário", () => {
  it("slug suporta acentos e pontuação", () => {
    expect(slugify("O padrão UNIX aplicado a prompt!")).toBe("o-padrao-unix-aplicado-a-prompt");
    expect(slugify("Por quê? — (de novo)")).toBe("por-que-de-novo");
    expect(slugify("¿?")).toBe("secao");
  });

  it("não inclui # dentro de blocos de código e gera IDs únicos para duplicados", () => {
    const md = [
      "# Título da página",
      "## Instalação",
      "```bash",
      "## não é heading",
      "# comentário",
      "```",
      "### Com `npx` e [link](https://x.dev)",
      "## Instalação",
      "#### Profundo demais",
    ].join("\n");
    expect(extractHeadings(md)).toEqual([
      { id: "instalacao", text: "Instalação", depth: 2 },
      { id: "com-npx-e-link", text: "Com npx e link", depth: 3 },
      { id: "instalacao-1", text: "Instalação", depth: 2 },
    ]);
  });

  it("artigo real: comentário de shell no código não entra no sumário", () => {
    const post = getPostBySlug("engenharia-de-prompt-no-terminal")!;
    const texts = extractHeadings(post.content).map((h) => h.text);
    expect(texts).toContain("O padrão UNIX aplicado a prompt");
    expect(texts.some((t) => t.startsWith("cola o texto"))).toBe(false);
  });
});

describe("datas", () => {
  it("valida datas ISO de calendário", () => {
    expect(isIsoDate("2026-05-12")).toBe(true);
    expect(isIsoDate("2026-02-31")).toBe(false);
    expect(isIsoDate("12/05/2026")).toBe(false);
  });

  it("não desloca o dia por fuso horário", () => {
    expect(formatPostDate("2026-05-12", { day: true })).toBe("12 de maio de 2026");
    expect(formatPostDate("2020-01-01", { month: "short" })).toMatch(/jan/);
    expect(formatPostDate("2020-01-01", { month: "short" })).toMatch(/2020/);
  });

  it("data inválida é exibida sem conversão", () => {
    expect(formatPostDate("em breve")).toBe("em breve");
  });

  it("todos os artigos têm data ISO válida", () => {
    for (const post of getPostSummaries()) expect(isIsoDate(post.date), post.slug).toBe(true);
  });
});

describe("artigos relacionados", () => {
  const make = (slug: string, date: string, tags: string[]): BlogPostSummary => ({
    slug,
    title: slug,
    description: "",
    date,
    tags,
    readingTime: "1 min",
  });
  const posts = [
    make("atual", "2026-01-01", ["IA", "Automação"]),
    make("uma-tag", "2026-03-01", ["ia"]),
    make("duas-tags", "2020-01-01", ["IA", "automacao"]),
    make("uma-tag-b", "2026-03-01", ["IA"]),
    make("sem-relacao", "2026-09-01", ["CSS"]),
  ];

  it("ordena por tags em comum, depois data, depois slug, excluindo o atual", () => {
    const result = getRelatedPosts("atual", 3, posts);
    expect(result.kind).toBe("related");
    expect(result.posts.map((p) => p.slug)).toEqual(["duas-tags", "uma-tag", "uma-tag-b"]);
  });

  it("limita a dois por padrão", () => {
    expect(getRelatedPosts("atual", undefined, posts).posts).toHaveLength(2);
  });

  it("sem tags em comum devolve recentes como outros artigos", () => {
    const result = getRelatedPosts("sem-relacao", 2, posts);
    expect(result.kind).toBe("recent");
    expect(result.posts.map((p) => p.slug)).not.toContain("sem-relacao");
    expect(result.posts[0].slug).toBe("uma-tag");
  });
});
