import Link from "next/link";
import { SOCIALS } from "@/lib/constants";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-bg relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
          Vamos trabalhar juntos?
        </span>
        <h2 className="text-4xl lg:text-6xl font-display font-light tracking-tight text-text mb-8">
          Disponível para novos projetos
        </h2>
        <p className="text-xl text-text-secondary font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Tem uma ideia ou projeto em mente? Entre em contato diretamente pelo WhatsApp para uma resposta rápida.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <MagneticButton>
            <a
              href={SOCIALS.personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-text text-bg rounded-full font-medium text-base hover:bg-black transition-colors group"
            >
              <WhatsAppIcon className="w-5 h-5 mr-3" />
              Falar no WhatsApp
            </a>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-text rounded-full font-medium text-base hover:border-[#111111] transition-colors group"
            >
              Outras formas de contato
              <span className="ml-3 w-6 h-6 rounded-full bg-text/10 flex items-center justify-center group-hover:bg-text/20 transition-colors">
                <span className="transform -rotate-45 block text-xs text-text">→</span>
              </span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
