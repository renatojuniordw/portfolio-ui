import { buildMetadata } from "@/lib/seo";
import { SOCIALS } from "@/lib/constants";
import {
  serviceJsonLd,
  projectJsonLd,
  breadcrumbJsonLd,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeuBarracoClient } from "./SeuBarracoClient";

export const generateMetadata = () =>
  buildMetadata({
    title: "Seu Barraco Esperto - Automação Residencial & Alexa em Recife",
    description:
      "Aprenda como transformar sua casa em uma casa inteligente com Alexa, dispositivos Tuya e Sonoff. Automação residencial acessível em Recife.",
    path: "/projetos/seu-barraco-esperto",
  });

export default function SeuBarracoEspertoPage() {
  const projectData = {
    name: "Seu Barraco Esperto",
    description:
      "Projeto focado em automação residencial acessível e casa inteligente com Alexa em Recife.",
    url: `${SOCIALS.personal.site}/projetos/seu-barraco-esperto`,
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Projetos", item: "/projetos" },
    { name: "Seu Barraco Esperto", item: "/projetos/seu-barraco-esperto" },
  ];

  return (
    <>
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={projectJsonLd(projectData)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <SeuBarracoClient />
    </>
  );
}
