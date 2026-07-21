"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SOCIALS, PROFILE } from "@/lib/constants";
import { EASE_OUT } from "@/lib/utils";
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  Zap,
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
        subtitle: "Automação & IA para Atendimento",
        variant: "unificando" as const,
      },
      {
        href: SOCIALS.oferticando.site,
        icon: Zap,
        title: "Oferticando",
        subtitle: "Ofertas & Cupons em tempo real",
        variant: "oferticando" as const,
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
      {
        href: SOCIALS.oferticando.insta,
        icon: Instagram,
        title: "Instagram Oferticando",
        subtitle: "As melhores promoções do dia",
        variant: "oferticando" as const,
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

const LINK_INITIAL = { opacity: 0, y: 20 };
const LINK_ANIMATE = { opacity: 1, y: 0 };

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
  variant?: "default" | "barraco" | "unificando" | "personal" | "oferticando";
}) => {
  const themes = {
    default: "hover:border-text hover:bg-surface-2",
    personal: "hover:border-tech/30 hover:bg-tech/5",
    barraco: "hover:border-barraco/30 hover:bg-barraco/5",
    unificando: "hover:border-ia/30 hover:bg-ia/5",
    oferticando: "hover:border-tech/30 hover:bg-tech/5",
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith("/") ? undefined : "_blank"}
      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      initial={LINK_INITIAL}
      animate={LINK_ANIMATE}
      transition={{ delay, duration: 0.5, ease: EASE_OUT }}
      className={`group relative flex items-center p-4 rounded-2xl border border-border bg-bg shadow-sm transition-all duration-300 ${themes[variant]}`}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-surface-2 border border-border group-hover:scale-110 transition-transform duration-300">
        <Icon
          size={24}
          className="text-text group-hover:text-text transition-colors"
          aria-hidden="true"
        />
      </div>
      <div className="ml-4 flex-grow text-left">
        <h3 className="font-medium text-sm tracking-tight text-text">{title}</h3>
        {subtitle && (
          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">{subtitle}</p>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="text-muted group-hover:text-text transition-colors"
        aria-hidden="true"
      />
    </motion.a>
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
          className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text transition-colors px-3 py-1.5 rounded-full border border-border bg-bg hover:border-text"
        >
          <ArrowLeft size={14} />
          Voltar para o Portfólio
        </Link>
      </div>

      <div className="w-full max-w-[480px] space-y-12 text-center relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-surface-2"
          >
            <Image
              src="/RenatoBezerra.png"
              alt={PROFILE.name}
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="96px"
            />
          </motion.div>

          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-display font-light tracking-tight text-text"
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-text-secondary uppercase tracking-wider"
            >
              {PROFILE.title}
            </motion.p>
          </div>
        </header>

        {/* Links Grid */}
        <main className="space-y-8 pb-10">
          {LINKS_DATA.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="space-y-3"
              aria-labelledby={`section-${sectionIndex}`}
            >
              <h2
                id={`section-${sectionIndex}`}
                className="text-[10px] font-medium uppercase tracking-widest text-muted text-left pl-2"
              >
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item, itemIndex) => (
                  <LinkItem
                    key={item.title}
                    {...item}
                    delay={(sectionIndex * 0.1) + (itemIndex * 0.05)}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer info */}
        <footer className="pt-4 border-t border-border">
          <p className="text-[10px] text-muted tracking-wider uppercase">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
