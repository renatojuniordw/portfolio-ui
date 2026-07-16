import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SOCIALS.personal.site;
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/projetos",
    "/curriculo",
    "/contato",
    "/links",
    "/blog",
    "/certificacoes",
  ];

  const projectRoutes = PROJECTS.map((project) => project.link);
  const blogRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);

  const routes = [...staticRoutes, ...projectRoutes, ...blogRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
