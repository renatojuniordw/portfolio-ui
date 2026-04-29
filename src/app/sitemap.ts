import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";
import { PROJECTS } from "@/app/projetos/page";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SOCIALS.personal.site;
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/projetos",
    "/curriculo",
    "/contato",
    "/links",
  ];

  const projectRoutes = PROJECTS.map((project) => project.link);

  const routes = [...staticRoutes, ...projectRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
