import { CalendarClock, Globe, Layers, ShoppingBag, Wallet } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

const LIVE_URL = "https://omundodochocolate.com.br";

function Overview() {
  return (
    <>
      <p>
        <strong>Mundo do Chocolate</strong> é uma loja de doces, ovos de Páscoa e
        itens de chocolate feita <strong>sob encomenda</strong>. O cliente monta o
        pedido, escolhe data e horário de retirada, informa a forma de pagamento e
        confirma no site; a loja recebe o aviso e aceita ou recusa pelo painel.
      </p>
      <p>
        Como tudo é produzido sob demanda, o controle não é de estoque, e sim de{" "}
        <strong>agenda</strong>: antecedência mínima, datas bloqueadas, faixas de
        horário e limite de pedidos por dia. Não há gateway de pagamento: o sinal é
        pago por Pix e registrado pela dona da loja no admin.
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
        label="Website Oficial"
        hoverAccentClass="group-hover:bg-tech"
      />
    </nav>
  );
}

export const lojaDocesCase: ProjectCase = {
  id: "loja-doces",
  pathSegments: ["loja-doces"],
  card: card(
    "loja-doces",
    "Mundo do Chocolate",
    "Full Stack / E-commerce",
    "Loja de encomendas de doces e chocolates com agenda de retirada, painel administrativo e sinal por Pix.",
    "tech",
    ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
    { areas: ["frontend"] },
  ),
  jsonLd: {
    name: "Mundo do Chocolate",
    description:
      "Loja de encomendas de doces, ovos de Páscoa e chocolates, com agenda de retirada e painel administrativo.",
    url: LIVE_URL,
  },
  breadcrumbs: breadcrumbs({
    name: "Mundo do Chocolate",
    item: "/projetos/loja-doces",
  }),
  categoryBadge: "Full Stack / Encomendas",
  title: "Mundo do Chocolate",
  shortDescription: (
    <>
      <strong>Loja de encomendas</strong> de doces e chocolates, com{" "}
      <strong>agenda de retirada</strong>, painel administrativo e sinal por Pix.
    </>
  ),
  themeColor: "tech",
  liveUrl: LIVE_URL,
  overviewTitle: "O Projeto",
  overviewContent: <Overview />,
  featuresTitle: "Destaques",
  features: [
    {
      icon: <ShoppingBag className="text-tech" aria-hidden="true" />,
      title: "Pedido direto no site",
      description:
        "O cliente monta o pedido e confirma online; a loja aceita ou recusa pelo painel e o cliente é avisado por e-mail e WhatsApp.",
    },
    {
      icon: <CalendarClock className="text-tech" aria-hidden="true" />,
      title: "Controle por agenda",
      description:
        "Antecedência mínima, datas bloqueadas, faixas de horário por dia da semana e limites de pedidos, no lugar de controle de estoque.",
    },
    {
      icon: <Wallet className="text-tech" aria-hidden="true" />,
      title: "Sinal por Pix",
      description:
        "Pix por chave, com QR e copia-e-cola; o pedido só é confirmado após o sinal mínimo, registrado pela loja no admin.",
    },
    {
      icon: <Layers className="text-tech" aria-hidden="true" />,
      title: "Três apps em um monorepo",
      description:
        "Loja (Next.js), admin (React + Vite, instalável como PWA) e API (NestJS + Prisma), organizados com pnpm workspaces.",
    },
  ],
  sidebarTechStackTitle: "Solução Técnica",
  sidebarTechStack: [
    { label: "Loja", name: "Next.js + Tailwind CSS" },
    { label: "Admin", name: "React + Vite + MUI" },
    { label: "API", name: "NestJS + Prisma" },
    { label: "Banco", name: "PostgreSQL" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-tech mr-2" aria-hidden="true" />,
      title: "Links",
      content: <LinksCard />,
    },
  ],
};
