import Image from "next/image";
import Link from "next/link";
import { SOCIALS, PROFILE } from "@/lib/constants";
import type { CSSProperties } from "react";
import {
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  Instagram,
  Bot,
  Home,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const LINKS_DATA = [
  {
    title: "Websites Principais",
    items: [
      {
        href: "/",
        icon: Home,
        title: "Portfólio Oficial",
        subtitle: "Conheça minha trajetória e stack técnica",
        variant: "personal" as const,
      },
    ],
  },
  {
    title: "Meus Produtos",
    items: [
      {
        href: SOCIALS.unificando.site,
        icon: Bot,
        title: "Unificando",
        subtitle: "Laboratório de projetos autorais & IA",
        variant: "unificando" as const,
      },
      {
        href: SOCIALS.barraco.insta,
        icon: Bot,
        title: "Seu Barraco Esperto",
        subtitle: "Smart Home & IoT sem frescura",
        variant: "barraco" as const,
      },
    ],
  },
  {
    title: "Onde me encontrar",
    items: [
      {
        href: SOCIALS.personal.linkedin,
        icon: Linkedin,
        title: "LinkedIn",
        subtitle: "Conexões profissionais e carreira",
        variant: "default" as const,
      },
      {
        href: SOCIALS.personal.github,
        icon: Github,
        title: "GitHub",
        subtitle: "Meus repositórios e projetos open source",
        variant: "default" as const,
      },
      {
        href: SOCIALS.personal.insta,
        icon: Instagram,
        title: "Instagram Pessoal",
        subtitle: "Bastidores e cotidiano",
        variant: "default" as const,
      },
    ],
  },
  {
    title: "Canais do Barraco",
    items: [
      {
        href: SOCIALS.barraco.youtube,
        icon: Youtube,
        title: "YouTube",
        subtitle: "Tutoriais de Automação",
        variant: "barraco" as const,
      },
      {
        href: SOCIALS.barraco.tiktok,
        icon: MessageCircle,
        title: "TikTok",
        subtitle: "Dicas rápidas do @seubarracoesperto",
        variant: "barraco" as const,
      },
    ],
  },
];

const rise = (delaySeconds: number) =>
  ({ "--fx-delay": `${Math.round(delaySeconds * 1000)}ms` }) as CSSProperties;

const LinkItem = ({
  href,
  icon: Icon,
  title,
  subtitle,
  delay = 0,
  variant = "default",
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  delay?: number;
  variant?: "default" | "barraco" | "unificando" | "personal";
}) => {
  const themes = {
    default: "hover:border-text hover:bg-surface-2",
    personal: "hover:border-tech/30 hover:bg-tech/5",
    barraco: "hover:border-barraco/30 hover:bg-barraco/5",
    unificando: "hover:border-ia/30 hover:bg-ia/5",
  };

  const isExternal = !href.startsWith("/");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={rise(delay)}
      className={`fx-rise group relative flex items-center p-4 rounded-2xl border border-border bg-bg shadow-sm transition-colors duration-300 ${themes[variant]}`}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-surface-2 border border-border group-hover:scale-110 motion-reduce:group-hover:scale-100 transition-transform duration-300">
        <Icon
          size={24}
          className="text-text group-hover:text-text transition-colors"
          aria-hidden="true"
        />
      </div>
      <div className="ml-4 flex-grow text-left">
        <h3 className="font-medium text-sm tracking-tight text-text">
          {title}
          {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
        </h3>
        {subtitle && (
          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="text-muted group-hover:text-text transition-colors"
        aria-hidden="true"
      />
    </a>
  );
};

export function LinksClient() {
  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col items-center py-16 px-6">
      {/* Background Decorative Elements (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square bg-surface-2 blur-[120px] rounded-full -z-10" />

      {/* Back to Portfolio Button */}
      <div className="w-full max-w-[480px] mb-8 flex justify-start">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition-colors px-4 rounded-full border border-border bg-bg hover:border-text"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Voltar para o Portfólio
        </Link>
      </div>

      <div className="w-full max-w-[480px] space-y-12 text-center relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center space-y-4">
          <div
            className="fx-rise relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-surface-2"
          >
            <Image
              src="/RenatoBezerra.avif"
              alt={PROFILE.name}
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="96px"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-display font-light tracking-tight text-text">
              {PROFILE.name}
            </h1>
            <p className="text-xs text-text-secondary uppercase tracking-wider">
              {PROFILE.title}
            </p>
          </div>
        </header>

        {/* Links Grid — o <main> da página vem do layout. */}
        <div className="space-y-8 pb-10">
          {LINKS_DATA.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="space-y-3"
              aria-labelledby={`links-secao-${sectionIndex}`}
            >
              <h2
                id={`links-secao-${sectionIndex}`}
                className="text-xs font-medium uppercase tracking-widest text-muted text-left pl-2"
              >
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item, itemIndex) => (
                  <LinkItem
                    key={item.title}
                    {...item}
                    delay={sectionIndex * 0.1 + itemIndex * 0.05}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer info */}
        <footer className="pt-4 border-t border-border">
          <p className="text-xs text-muted tracking-wider uppercase">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
