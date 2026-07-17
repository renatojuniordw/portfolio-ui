import { SplitText } from "@/components/fx/SplitText";
import { SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = () =>
  buildMetadata({
    title: "Contato | Renato Bezerra",
    description:
      "Entre em contato com Renato Bezerra para projetos de engenharia de software, front-end (React, Angular, Next.js), automação com IA e consultoria. Disponível via WhatsApp, LinkedIn ou email.",
    path: "/contato",
    keywords: [
      "Contato", "Renato Bezerra", "WhatsApp", "LinkedIn",
      "Contratação", "Freelance", "Consultoria IA",
    ],
  });

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Contato", item: "/contato" },
  ];

  const CONTACTS = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon className="w-6 h-6" />,
      url: SOCIALS.personal.whatsapp,
      handle: "+55 (81) 98698-6332",
      primary: true,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin aria-hidden="true" />,
      url: SOCIALS.personal.linkedin,
      handle: "in/renato-bezerra",
    },
    {
      name: "GitHub",
      icon: <Github aria-hidden="true" />,
      url: SOCIALS.personal.github,
      handle: "@renatojuniordw",
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Coluna Esquerda: Texto */}
        <header className="text-left">
          <h1 className="sr-only">Contato - Renato Bezerra, Recife</h1>
          <SplitText
            text="Vamos Conversar?"
            className="text-5xl md:text-7xl font-display font-light tracking-tighter mb-6 text-text"
          />
          <p className="text-xl text-text-secondary font-light leading-relaxed max-w-md mb-8">
            Estou sempre aberto a novos projetos de{" "}
            <strong>desenvolvimento front-end</strong>,{" "}
            <strong>automação residencial</strong> ou consultoria em{" "}
            <strong>IA</strong>.
          </p>
          
          <div className="hidden lg:block pt-8 border-t border-border">
            <p className="text-sm text-muted uppercase tracking-widest mb-2">
              Localização
            </p>
            <p className="text-base text-text font-medium">
              Recife, PE — Atuação Global
            </p>
          </div>
        </header>

        {/* Coluna Direita: Cards de Contato */}
        <div className="flex flex-col gap-6">
          {CONTACTS.map((contact) => (
            <Card
              key={contact.name}
              className={cn(
                "transition-all duration-300 hover:translate-x-2 border",
                contact.primary
                  ? "bg-text text-bg border-text hover:opacity-90"
                  : "bg-surface border-border hover:border-text"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn(
                  "text-sm font-medium uppercase tracking-wider",
                  contact.primary ? "text-bg/60" : "text-muted"
                )}>
                  {contact.name}
                </CardTitle>
                <div className={contact.primary ? "text-bg" : "text-text"}>
                  {contact.icon}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className={cn("text-xl font-medium tracking-tight", contact.primary ? "text-bg" : "text-text")}>
                  {contact.handle}
                </div>
                <Button
                  size="sm"
                  variant={contact.primary ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full px-6",
                    contact.primary
                      ? "bg-bg text-text hover:bg-surface"
                      : "border-border text-text hover:bg-text hover:text-bg"
                  )}
                  asChild
                >
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.primary ? "Iniciar Conversa" : "Conectar"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}

          <div className="mt-4 text-center lg:text-left">
            <p className="text-sm text-muted mb-2">Ou envie um e-mail</p>
            <a
              href={`mailto:${SOCIALS.personal.email}`}
              className="text-lg font-medium text-text hover:underline underline-offset-4"
            >
              {SOCIALS.personal.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
