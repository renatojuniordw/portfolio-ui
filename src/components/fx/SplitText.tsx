import { Fragment, memo, type CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
  /** Atraso inicial em segundos. */
  delay?: number;
  as?: "h1" | "h2" | "p" | "div";
};

const CHAR_STAGGER_MS = 15;
const MAX_CHAR_DELAY_MS = 450;

/**
 * Título animado caractere a caractere, só com CSS.
 *
 * - O texto completo é exposto uma única vez via `.sr-only`; os caracteres
 *   animados ficam em `aria-hidden`, então leitores de tela leem o título
 *   inteiro e o elemento semântico (`as`) mantém seu nome acessível.
 * - A animação usa `animation-fill-mode: both`, por isso o texto termina
 *   visível mesmo sem JavaScript; `prefers-reduced-motion` desliga o efeito.
 * - Cada palavra é um bloco inline-flex: quebra entre palavras normalmente e
 *   só quebra dentro da palavra se ela for maior que a linha inteira.
 */
export const SplitText = memo(function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: Props) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="inline-flex max-w-full flex-wrap">
              {Array.from(word).map((char, c) => {
                const ms = Math.min(
                  delay * 1000 + charIndex++ * CHAR_STAGGER_MS,
                  delay * 1000 + MAX_CHAR_DELAY_MS,
                );
                return (
                  <span
                    key={c}
                    className="split-char"
                    style={{ "--split-delay": `${ms}ms` } as CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
});
