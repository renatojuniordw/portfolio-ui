import { buildMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";
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
  return (
    <>
      <JsonLd data={serviceJsonLd()} />
      <SeuBarracoClient />
    </>
  );
}
