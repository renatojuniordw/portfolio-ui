import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { getPostSummaries } from "@/lib/blog";
import { isIsoDate } from "@/lib/dates";

/**
 * `lastModified` só é informado quando há data editorial conhecida (data do
 * artigo). Páginas e cases sem data registrada omitem o campo em vez de
 * receber a data do build. /links (noindex) fica fora de propósito.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SOCIALS.personal.site;

  const staticRoutes: { path: string; priority: number; changeFreq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFreq: "weekly" },
    { path: "/projetos", priority: 0.9, changeFreq: "weekly" },
    { path: "/unificando", priority: 0.8, changeFreq: "monthly" },
    { path: "/blog", priority: 0.9, changeFreq: "weekly" },
    { path: "/curriculo", priority: 0.7, changeFreq: "monthly" },
    { path: "/certificacoes", priority: 0.7, changeFreq: "monthly" },
    { path: "/contato", priority: 0.5, changeFreq: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      changeFrequency: r.changeFreq,
      priority: r.priority,
    })),
    ...getPostSummaries().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      ...(isIsoDate(post.date) ? { lastModified: post.date } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...PROJECTS.map((project) => ({
      url: `${baseUrl}${project.link}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
