import { Layers, MessageCircle, Store, Tags } from "lucide-react";

import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        <strong>Oferticando</strong> é um SaaS para{" "}
        <strong>criadores de conteúdo e afiliados</strong>. O objetivo é reunir em
        uma só plataforma a curadoria de promoções, cupons e ofertas: o usuário
        monta suas vitrines, importa ofertas por URL e organiza a divulgação em
        grupos de WhatsApp.
      </p>
      <p>
        O produto nasceu como um projeto pessoal de curadoria de ofertas e evoluiu
        para uma plataforma com <strong>planos e limites de uso</strong>, painel
        administrativo e landing page pública.
      </p>
      <p>
        <strong>Status:</strong> o projeto está em desenvolvimento e ainda não foi
        finalizado.
      </p>
    </>
  );
}

export const oferticandoCase: ProjectCase = {
  id: "oferticando",
  pathSegments: ["oferticando"],
  card: card(
    "oferticando",
    "Oferticando",
    "SaaS / Afiliados",
    "SaaS para criadores e afiliados montarem vitrines de ofertas e cupons, com planos, painel administrativo e API própria.",
    "tech",
    ["Next.js", "NestJS", "TypeScript", "Redis"],
    { areas: ["frontend"], status: "em-desenvolvimento" },
  ),
  jsonLd: {
    name: "Oferticando",
    description:
      "SaaS em desenvolvimento para criadores de conteúdo e afiliados gerenciarem vitrines de ofertas e cupons.",
    url: "https://renatobezerra.com.br/projetos/oferticando",
  },
  breadcrumbs: breadcrumbs({ name: "Oferticando", item: "/projetos/oferticando" }),
  categoryBadge: "SaaS / Afiliados",
  title: "Oferticando",
  shortDescription: (
    <>
      <strong>SaaS para criadores e afiliados</strong> gerenciarem vitrines de
      ofertas e cupons. Projeto em desenvolvimento.
    </>
  ),
  themeColor: "tech",
  overviewTitle: "Objetivo",
  overviewContent: <Overview />,
  featuresTitle: "Escopo",
  features: [
    {
      icon: <Store className="text-tech" aria-hidden="true" />,
      title: "Vitrines e ofertas",
      description:
        "Criação de vitrines e ofertas próprias, com importação de ofertas por URL e em lote.",
    },
    {
      icon: <Tags className="text-tech" aria-hidden="true" />,
      title: "Planos e limites",
      description:
        "Planos Free, Starter e Pro, com limites de uso aplicados por regra no back-end.",
    },
    {
      icon: <MessageCircle className="text-tech" aria-hidden="true" />,
      title: "Grupos de WhatsApp",
      description:
        "Gestão de grupos e fila de clonagem de ofertas para divulgação.",
    },
    {
      icon: <Layers className="text-tech" aria-hidden="true" />,
      title: "Quatro serviços",
      description:
        "API, aplicativo do usuário, painel administrativo e landing page pública, em repositórios separados e rodando em Docker.",
    },
  ],
  sidebarTechStackTitle: "Stack",
  sidebarTechStack: [
    { label: "Front-end", name: "Next.js 16 / React 19" },
    { label: "Estilo", name: "Tailwind CSS 4" },
    { label: "API", name: "NestJS + TypeORM" },
    { label: "Cache", name: "Redis" },
  ],
};
