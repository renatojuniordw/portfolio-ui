import { ExternalLink, Globe, Home, Play, ShieldCheck, Smartphone, Zap } from "lucide-react";

import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import { SeuBarracoGallery } from "@/components/projects/SeuBarracoGallery";
import { serviceJsonLd } from "@/lib/structured-data";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase } from "@/types/project";
import { breadcrumbs, card } from "./helpers";

function Overview() {
  return (
    <>
      <p>
        O <strong>Seu Barraco Esperto</strong> nasceu para desmistificar a ideia
        de que <strong>automação residencial</strong> é algo caro ou extremamente
        complexo.
      </p>
      <p>
        O foco é utilizar dispositivos acessíveis (como <strong>Alexa</strong>,
        Tuya e Sonoff) para criar soluções de <strong>casa inteligente</strong>{" "}
        que realmente facilitam o dia a dia: desde controle de iluminação
        inteligente até monitoramento de segurança e economia de energia em{" "}
        <strong>Recife</strong>.
      </p>
    </>
  );
}

function SocialLinksCard() {
  return (
    <nav className="flex flex-col gap-3">
      <SocialLinkCard
        href={SOCIALS.barraco.insta}
        icon={ExternalLink}
        label="Instagram"
        hoverAccentClass="group-hover:bg-barraco"
      />
      <SocialLinkCard
        href={SOCIALS.barraco.youtube}
        icon={ExternalLink}
        label="YouTube"
        hoverAccentClass="group-hover:bg-barraco"
      />
      <SocialLinkCard
        href={SOCIALS.barraco.tiktok}
        icon={ExternalLink}
        label="TikTok"
        hoverAccentClass="group-hover:bg-barraco"
      />
    </nav>
  );
}

export const seuBarracoEspertoCase: ProjectCase = {
  id: "seu-barraco-esperto",
  pathSegments: ["seu-barraco-esperto"],
  schemas: [serviceJsonLd()],
  card: card(
    "seu-barraco-esperto",
    "Seu Barraco Esperto",
    "IoT / Automação Residencial",
    "Automação residencial prática e sem frescura com Alexa e IoT.",
    "barraco",
    ["IoT", "Alexa Skills", "Node.js", "AWS"],
  ),
  jsonLd: {
    name: "Seu Barraco Esperto",
    description:
      "Projeto focado em automação residencial acessível e casa inteligente com Alexa em Recife.",
    url: `${SOCIALS.personal.site}/projetos/seu-barraco-esperto`,
  },
  breadcrumbs: breadcrumbs({
    name: "Seu Barraco Esperto",
    item: "/projetos/seu-barraco-esperto",
  }),
  categoryBadge: "IoT & Automação Residencial",
  title: "Seu Barraco Esperto",
  shortDescription: (
    <>
      <strong>Automação residencial</strong> prática, acessível e sem frescura
      para transformar qualquer casa em uma <strong>casa inteligente</strong> em
      Recife.
    </>
  ),
  themeColor: "barraco",
  liveUrl: SOCIALS.barraco.insta,
  overviewTitle: "O Conceito: Automação com Alexa",
  overviewContent: <Overview />,
  featuresTitle: "Pilares do Projeto",
  features: [
    {
      icon: <Home className="text-barraco" aria-hidden="true" />,
      title: "Acessibilidade",
      description:
        "Uso de hardware custo-benefício que qualquer pessoa pode configurar para sua casa inteligente.",
    },
    {
      icon: <Zap className="text-barraco" aria-hidden="true" />,
      title: "Integração Total",
      description:
        "Conectividade avançada entre Alexa e hubs de automação residencial.",
    },
    {
      icon: <Smartphone className="text-barraco" aria-hidden="true" />,
      title: "Controle Remoto",
      description:
        "Gerenciamento completo da casa inteligente de qualquer lugar do mundo via app.",
    },
    {
      icon: <ShieldCheck className="text-barraco" aria-hidden="true" />,
      title: "Segurança",
      description:
        "Monitoramento inteligente e automações de presença para seu barraco esperto.",
    },
  ],
  extraSections: [
    {
      id: "videos-title",
      icon: <Play className="text-barraco" aria-hidden="true" />,
      title: "Na Prática",
      content: <SeuBarracoGallery />,
    },
  ],
  sidebarTechStackTitle: "Tecnologias",
  sidebarTechStack: [
    { label: "Ecosystem", name: "Alexa" },
    { label: "Hardware", name: "Tuya / Sonoff" },
    { label: "Central Hub", name: "Home Assistant" },
  ],
  sidebarExtraCards: [
    {
      icon: <Globe size={20} className="text-barraco mr-2" aria-hidden="true" />,
      title: "Presença Online",
      content: <SocialLinksCard />,
    },
  ],
};
