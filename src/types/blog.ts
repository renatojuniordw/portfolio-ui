export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Data ISO (AAAA-MM-DD) do frontmatter. */
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
}

/** Metadados do artigo, sem o Markdown: formato enviado a componentes client. */
export type BlogPostSummary = Omit<BlogPost, "content">;

export interface PostHeading {
  id: string;
  text: string;
  depth: number;
}
