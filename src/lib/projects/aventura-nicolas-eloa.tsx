import { Cpu, Gamepad2, Github, Globe, Smartphone, SpellCheck } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

const GITHUB_URL = "https://github.com/renatojuniordw/aventura-nicolas_eloa";
const LIVE_URL = "https://game.unificando.com.br/";

function Overview() {
  return (
    <>
      <p>
        <strong>Aventura do Nicolas&amp;Eloá</strong> é um jogo de plataforma 2D
        educativo, em português, para crianças em alfabetização. O jogador corre e
        pula para coletar a <strong>letra, sílaba ou palavra pedida</strong>.
      </p>
      <p>
        O motor (laço de jogo, física, cenas e gameplay) é{" "}
        <strong>TypeScript puro com Canvas 2D</strong>, sem framework de jogo. A
        interface (menus, HUD e controles de toque) é React, e uma regra
        executável garante que motor e UI nunca se importem.
      </p>
    </>
  );
}

function LinksCard() {
  return (
    <nav className="flex flex-col gap-3">
      <SocialLinkCard
        href={LIVE_URL}
        icon={Globe}
        label="Jogar online"
        hoverAccentClass="group-hover:bg-tech"
      />
      <SocialLinkCard
        href={GITHUB_URL}
        icon={Github}
        label="Repositório"
        hoverAccentClass="group-hover:bg-tech"
      />
    </nav>
  );
}

export const aventuraNicolasEloaCase: ProjectCase = {
  id: "aventura-nicolas-eloa",
  pathSegments: ["aventura-nicolas-eloa"],
  card: card(
    "aventura-nicolas-eloa",
    "Aventura do Nicolas&Eloá",
    "Jogo / Educação",
    "Jogo de plataforma 2D educativo para alfabetização, com motor em TypeScript e Canvas 2D e interface em React.",
    "tech",
    ["TypeScript", "Canvas 2D", "React", "PWA"],
    { areas: ["frontend"] },
  ),
  jsonLd: {
    name: "Aventura do Nicolas&Eloá",
    description:
      "Jogo de plataforma 2D educativo, em português, para crianças em alfabetização.",
    url: LIVE_URL,
  },
  breadcrumbs: breadcrumbs({
    name: "Aventura do Nicolas&Eloá",
    item: "/projetos/aventura-nicolas-eloa",
  }),
  categoryBadge: "Jogo Educativo",
  title: "Aventura do Nicolas&Eloá",
  shortDescription: (
    <>
      <strong>Jogo de plataforma 2D</strong> educativo para crianças em
      alfabetização, com motor próprio em TypeScript e Canvas 2D.
    </>
  ),
  themeColor: "tech",
  githubUrl: GITHUB_URL,
  liveUrl: LIVE_URL,
  overviewTitle: "O Projeto",
  overviewContent: <Overview />,
  featuresTitle: "Destaques",
  features: [
    {
      icon: <SpellCheck className="text-tech" aria-hidden="true" />,
      title: "Alfabetização jogando",
      description:
        "Fases em que a criança coleta a letra, sílaba ou palavra pedida, reforçando a leitura de forma lúdica.",
    },
    {
      icon: <Gamepad2 className="text-tech" aria-hidden="true" />,
      title: "Motor próprio",
      description:
        "Laço de jogo, física e cenas em TypeScript estrito com Canvas 2D, sem framework de jogo.",
    },
    {
      icon: <Cpu className="text-tech" aria-hidden="true" />,
      title: "Entrada abstraída",
      description:
        "Teclado e toque compartilham a mesma abstração de entrada, deixando o caminho pronto para um controle físico com ESP32.",
    },
    {
      icon: <Smartphone className="text-tech" aria-hidden="true" />,
      title: "PWA e produção",
      description:
        "Instalável e funcional offline após a primeira sessão, servido por Nginx em contêiner Docker, com suíte de testes extensa.",
    },
  ],
  sidebarTechStackTitle: "Solução Técnica",
  sidebarTechStack: [
    { label: "Motor", name: "TypeScript + Canvas 2D" },
    { label: "UI", name: "React" },
    { label: "Build", name: "Vite + Vitest" },
    { label: "Deploy", name: "Docker + Nginx" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
