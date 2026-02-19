import { SplitText } from "@/components/fx/SplitText";
import { SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Github, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Contato | Renato Bezerra",
    description:
      "Entre em contato com Renato Bezerra para projetos de engenharia de software, automação residencial e consultoria em IA em Recife.",
    path: "/contato",
  });

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Contato", item: "/contato" },
  ];

  const CONTACTS = [
    {
      name: "LinkedIn",
      icon: <Linkedin aria-hidden="true" />,
      url: SOCIALS.personal.linkedin,
      handle: "In/renato-bezerra",
    },
    {
      name: "GitHub",
      icon: <Github aria-hidden="true" />,
      url: SOCIALS.personal.github,
      handle: "@renatojuniordw",
    },
  ];

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <header className="mb-16 text-center">
        <h1 className="sr-only">Contato - Renato Bezerra, Recife</h1>
        <SplitText
          text="Vamos Conversar?"
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        />
        <p className="text-xl text-text-secondary max-w-xl mx-auto">
          Estou sempre aberto a novos projetos de{" "}
          <strong>desenvolvimento front-end</strong>,{" "}
          <strong>automação residencial</strong> ou uma boa conversa sobre
          tecnologia em <strong>Recife</strong>.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-6">
        {CONTACTS.map((contact) => (
          <Card
            key={contact.name}
            className="hover:border-tech/30 transition-all group w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[280px] max-w-[320px]"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {contact.name}
              </CardTitle>
              <div className="text-text-secondary group-hover:text-tech transition-colors">
                {contact.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold mb-4">{contact.handle}</div>
              <Button size="sm" variant="outline" className="w-full" asChild>
                <a href={contact.url} target="_blank" rel="noopener noreferrer">
                  Seguir / Contactar
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <nav className="mt-20 text-center" aria-label="Contato direto">
        <p className="text-text-secondary mb-4">Ou se preferir</p>
        <Button size="lg" variant="primary" asChild>
          <a href={`mailto:${SOCIALS.personal.email}`}>
            <Mail className="mr-2" aria-hidden="true" />{" "}
            {SOCIALS.personal.email}
          </a>
        </Button>
      </nav>
    </main>
  );
}
