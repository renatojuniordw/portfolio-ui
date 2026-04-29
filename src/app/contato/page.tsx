import { SplitText } from "@/components/fx/SplitText";
import { SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
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
      name: "WhatsApp",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.633 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
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
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Coluna Esquerda: Texto */}
        <header className="text-left">
          <h1 className="sr-only">Contato - Renato Bezerra, Recife</h1>
          <SplitText
            text="Vamos Conversar?"
            className="text-5xl md:text-7xl font-display font-light tracking-tighter mb-6 text-[#111111]"
          />
          <p className="text-xl text-[#666666] font-light leading-relaxed max-w-md mb-8">
            Estou sempre aberto a novos projetos de{" "}
            <strong>desenvolvimento front-end</strong>,{" "}
            <strong>automação residencial</strong> ou consultoria em{" "}
            <strong>IA</strong>.
          </p>
          
          <div className="hidden lg:block pt-8 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#777777] uppercase tracking-widest mb-2">
              Localização
            </p>
            <p className="text-base text-[#111111] font-medium">
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
                  ? "bg-[#111111] text-white border-[#111111] hover:bg-black"
                  : "bg-[#FFFFFF] text-[#111111] border-[#E5E5E5] hover:border-[#111111]"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn(
                  "text-sm font-medium uppercase tracking-wider",
                  contact.primary ? "text-[#777777]" : "text-[#777777]"
                )}>
                  {contact.name}
                </CardTitle>
                <div className={contact.primary ? "text-white" : "text-[#111111]"}>
                  {contact.icon}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="text-xl font-medium tracking-tight">
                  {contact.handle}
                </div>
                <Button
                  size="sm"
                  variant={contact.primary ? "secondary" : "outline"}
                  className={cn(
                    "rounded-full px-6",
                    contact.primary
                      ? "bg-white text-black hover:bg-gray-200"
                      : "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white"
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
            <p className="text-sm text-[#777777] mb-2">Ou envie um e-mail</p>
            <a
              href={`mailto:${SOCIALS.personal.email}`}
              className="text-lg font-medium text-[#111111] hover:underline underline-offset-4"
            >
              {SOCIALS.personal.email}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

