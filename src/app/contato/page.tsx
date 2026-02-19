import { SplitText } from "@/components/fx/SplitText";
import { SOCIALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

export default function ContactPage() {
  const CONTACTS = [
    {
      name: "Instagram Pessoal",
      icon: <Instagram />,
      url: SOCIALS.personalInsta,
      handle: "@renatobezerra.jr",
    },
    {
      name: "Seu Barraco Esperto",
      icon: <Instagram />,
      url: SOCIALS.barracoInsta,
      handle: "@seubarracoesperto",
    },
    {
      name: "Unificando Digital",
      icon: <Instagram />,
      url: SOCIALS.unificandoInsta,
      handle: "@unificando.digital",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      url: SOCIALS.linkedin,
      handle: "In/renatobezerrajr",
    },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <header className="mb-16 text-center">
        <SplitText
          text="Vamos Conversar?"
          className="text-4xl md:text-6xl font-display font-bold mb-4"
        />
        <p className="text-xl text-text-secondary max-w-xl mx-auto">
          Estou sempre aberto a novos projetos, parcerias ou uma boa conversa
          sobre tecnologia.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONTACTS.map((contact) => (
          <Card
            key={contact.name}
            className="hover:border-tech/30 transition-all group"
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

      <div className="mt-20 text-center">
        <p className="text-text-secondary mb-4">
          Ou se preferir algo mais formal:
        </p>
        <Button size="lg" variant="primary">
          <Mail className="mr-2" /> renato.bezerra@exemplo.com
        </Button>
      </div>
    </div>
  );
}
