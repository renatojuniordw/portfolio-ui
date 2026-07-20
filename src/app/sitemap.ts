import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SOCIALS.personal.site;

  const staticRoutes: { path: string; priority: number; changeFreq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFreq: "weekly" },
    { path: "/projetos", priority: 0.9, changeFreq: "weekly" },
    { path: "/blog", priority: 0.9, changeFreq: "weekly" },
    { path: "/curriculo", priority: 0.7, changeFreq: "monthly" },
    { path: "/certificacoes", priority: 0.7, changeFreq: "monthly" },
    { path: "/contato", priority: 0.5, changeFreq: "monthly" },
    { path: "/links", priority: 0.5, changeFreq: "monthly" },
  ];

  const posts = getAllPosts();
  const postRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFreq: "monthly" as const,
    lastModified: new Date(post.date),
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    path: project.link,
    priority: 0.8,
    changeFreq: "monthly" as const,
    lastModified: new Date(),
  }));

  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: r.priority,
    })),
    ...postRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: r.lastModified,
      changeFrequency: r.changeFreq,
      priority: r.priority,
    })),
    ...projectRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: r.lastModified,
      changeFrequency: r.changeFreq,
      priority: r.priority,
    })),
  ];
}
