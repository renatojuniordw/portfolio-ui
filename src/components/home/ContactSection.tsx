import { SOCIALS } from "@/lib/constants";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function ContactSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="w-full px-6 sm:px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-bg relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
          Vamos trabalhar juntos?
        </span>
        <h2 id="contato-heading" className="text-4xl lg:text-6xl font-display font-light tracking-tight text-text mb-8">
          Disponível para novos projetos
        </h2>
        <p className="text-xl text-text-secondary font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Tem uma ideia ou projeto em mente? Entre em contato pelo WhatsApp para uma resposta rápida.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6">
          <MagneticButton
            as="a"
            href={SOCIALS.personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full min-h-12 items-center justify-center px-8 py-4 bg-text text-bg rounded-full font-medium text-base text-center hover:opacity-90 transition-opacity group"
          >
            <WhatsAppIcon className="w-5 h-5 mr-3 shrink-0" />
            Falar no WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </MagneticButton>

          <MagneticButton
            as="link"
            href="/contato"
            className="inline-flex max-w-full min-h-12 items-center justify-center px-8 py-4 border border-border text-text rounded-full font-medium text-base text-center hover:border-text transition-colors group"
          >
            Outras formas de contato
            <span
              aria-hidden="true"
              className="ml-3 w-6 h-6 shrink-0 rounded-full bg-text/10 flex items-center justify-center group-hover:bg-text/20 transition-colors"
            >
              <span className="transform -rotate-45 block text-xs text-text">→</span>
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
