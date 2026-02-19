import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SOCIALS.personal.site;
  const lastModified = new Date();

  const routes = [
    "",
    "/projetos",
    "/projetos/unificando/automacao",
    "/projetos/unificando/vitrine",
    "/projetos/mariaclarasantos",
    "/projetos/seu-barraco-esperto",
    "/sobre",
    "/curriculo",
    "/contato",
    "/links",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
