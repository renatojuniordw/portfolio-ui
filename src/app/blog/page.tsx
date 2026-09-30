import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getPostSummaries } from "@/lib/blog";

export const generateMetadata = () =>
  buildMetadata({
    title: "Blog | Renato Bezerra — Engenharia de Software & IA",
    description:
      "Artigos sobre engenharia de software, front-end (React, Angular, Next.js), IA Generativa, automação com n8n, RAG, segurança de LLMs e arquitetura de software por Renato Bezerra.",
    path: "/blog",
    keywords: [
      "Blog", "Engenharia de Software", "React", "Angular", "Next.js",
      "IA Generativa", "Prompt Engineering", "Automação", "n8n",
      "AWS Lambda", "SharePoint", "Tecnologia",
    ],
  });

export default function BlogPage() {
  const posts = getPostSummaries();

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ];

  return (
    <PageLayout maxWidth="5xl">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHeader
        title="Blog"
        description="Artigos sobre engenharia de software, IA e tecnologia."
      />

      <BlogIndex posts={posts} />
    </PageLayout>
  );
}
