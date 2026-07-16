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

  return routes.map((route) => {
    let priority = 0.5;
    let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";

    if (route === "") {
      priority = 1;
      changeFrequency = "weekly";
    } else if (route === "/blog" || route === "/projetos") {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route === "/curriculo" || route === "/certificacoes") {
      priority = 0.7;
      changeFrequency = "monthly";
    } else if (route.startsWith("/blog/")) {
      priority = 0.6;
      changeFrequency = "monthly";
    } else if (route.startsWith("/projetos/")) {
      priority = 0.8;
      changeFrequency = "monthly";
    } else {
      priority = 0.5;
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
