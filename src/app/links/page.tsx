import { buildMetadata } from "@/lib/seo";
import { LinksClient } from "./LinksClient";

export const generateMetadata = () =>
  buildMetadata({
    title: "Links e Redes Sociais | Renato Bezerra",
    description:
      "Conecte-se com Renato Bezerra: Portfólio, Unificando (IA), Seu Barraco Esperto (Automação), LinkedIn, GitHub e mais.",
    path: "/links",
  });

export default function LinksPage() {
  return <LinksClient />;
}
