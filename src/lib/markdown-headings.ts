import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Heading, Root } from "mdast";
import type { PostHeading } from "@/types/blog";

export function slugify(text: string): string {
  const slug = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "secao";
}

/** Gera slugs únicos na ordem do documento: "a", "a-1", "a-2"... */
function createSlugger() {
  const used = new Set<string>();
  return (text: string) => {
    const base = slugify(text);
    let slug = base;
    for (let n = 1; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    return slug;
  };
}

/**
 * Plugin remark: atribui IDs determinísticos a todos os headings a partir da
 * árvore Markdown (texto de links, ênfase e código inline incluídos; `##`
 * dentro de blocos de código não é heading). É o mesmo código usado para
 * renderizar o artigo e para montar o sumário, então os IDs sempre batem.
 */
export function remarkHeadingIds() {
  return (tree: Root) => {
    const slug = createSlugger();
    visit(tree, "heading", (node: Heading) => {
      const id = slug(toString(node));
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
    });
  };
}

/** Headings h2/h3 do artigo, com os mesmos IDs usados na renderização. */
export function extractHeadings(markdown: string): PostHeading[] {
  const processor = unified().use(remarkParse).use(remarkGfm);
  const tree = processor.parse(markdown);
  remarkHeadingIds()(tree);
  const headings: PostHeading[] = [];
  visit(tree, "heading", (node: Heading) => {
    if (node.depth < 2 || node.depth > 3) return;
    headings.push({
      id: String(node.data?.hProperties?.id),
      text: toString(node),
      depth: node.depth,
    });
  });
  return headings;
}

/** Quantidade mínima de headings para exibir o sumário. */
export const TOC_MIN_HEADINGS = 3;
